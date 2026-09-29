using System.Numerics.Tensors;
using System.Text.Json;
using Microsoft.Extensions.Options;

namespace Portfolio.Infrastructure.Rag;

public sealed record KnowledgeChunk(string Id, string Source, string Title, string Text);

// In-memory vector index over the portfolio knowledge file; embeddings are built once per process.
public sealed class KnowledgeBase(IOptions<RagOptions> options)
{
    private readonly SemaphoreSlim _lock = new(1, 1);
    private IReadOnlyList<(KnowledgeChunk Chunk, float[] Vector)>? _index;

    public async Task EnsureIndexedAsync(
        Func<IReadOnlyList<string>, CancellationToken, Task<IReadOnlyList<float[]>>> embed,
        CancellationToken cancellationToken)
    {
        if (_index is not null)
        {
            return;
        }

        await _lock.WaitAsync(cancellationToken);
        try
        {
            if (_index is not null)
            {
                return;
            }

            await using var stream = File.OpenRead(options.Value.KnowledgeFilePath);
            var chunks = await JsonSerializer.DeserializeAsync<List<KnowledgeChunk>>(
                stream,
                JsonSerializerOptions.Web,
                cancellationToken) ?? [];

            var vectors = await embed(
                chunks.Select(c => $"{c.Title}\n{c.Text}").ToList(),
                cancellationToken);

            _index = chunks.Zip(vectors).ToList();
        }
        finally
        {
            _lock.Release();
        }
    }

    public IReadOnlyList<KnowledgeChunk> Search(float[] queryVector, int topK)
    {
        if (_index is null)
        {
            throw new InvalidOperationException("Knowledge base has not been indexed.");
        }

        return _index
            .Select(entry => (entry.Chunk, Score: TensorPrimitives.CosineSimilarity(entry.Vector, queryVector)))
            .OrderByDescending(x => x.Score)
            .Take(topK)
            .Select(x => x.Chunk)
            .ToList();
    }
}
