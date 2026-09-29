using System.Net.Http.Json;
using Microsoft.Extensions.Options;

namespace Portfolio.Infrastructure.Rag;

public sealed record LlmMessage(string Role, string Content);

public sealed class OpenAiClient(HttpClient http, IOptions<RagOptions> options)
{
    private readonly RagOptions _options = options.Value;

    public async Task<IReadOnlyList<float[]>> EmbedAsync(
        IReadOnlyList<string> inputs,
        CancellationToken cancellationToken)
    {
        using var response = await http.PostAsJsonAsync(
            "embeddings",
            new { model = _options.EmbeddingModel, input = inputs },
            cancellationToken);

        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<EmbeddingResponse>(cancellationToken)
            ?? throw new HttpRequestException("Empty embedding response.");

        return payload.Data.OrderBy(d => d.Index).Select(d => d.Embedding).ToList();
    }

    public async Task<string> ChatAsync(
        IEnumerable<LlmMessage> messages,
        CancellationToken cancellationToken)
    {
        using var response = await http.PostAsJsonAsync(
            "chat/completions",
            new
            {
                model = _options.ChatModel,
                temperature = 0.2,
                messages = messages.Select(m => new { role = m.Role, content = m.Content }),
            },
            cancellationToken);

        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<ChatCompletionResponse>(cancellationToken);

        return payload?.Choices.FirstOrDefault()?.Message.Content?.Trim()
            ?? throw new HttpRequestException("Empty chat completion response.");
    }

    private sealed record EmbeddingResponse(List<EmbeddingData> Data);

    private sealed record EmbeddingData(int Index, float[] Embedding);

    private sealed record ChatCompletionResponse(List<ChatChoice> Choices);

    private sealed record ChatChoice(ChatChoiceMessage Message);

    private sealed record ChatChoiceMessage(string? Content);
}
