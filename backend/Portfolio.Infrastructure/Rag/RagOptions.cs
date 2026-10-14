namespace Portfolio.Infrastructure.Rag;

public sealed class RagOptions
{
    public const string SectionName = "Rag";

    // Any OpenAI-compatible endpoint (OpenAI, Azure OpenAI v1, etc.).
    public string BaseUrl { get; set; } = "https://api.openai.com/v1/";

    // "Authorization" sends "Bearer {ApiKey}" (OpenAI); any other value sends "{ApiKeyHeader}: {ApiKey}" (e.g. Azure's "api-key").
    public string ApiKeyHeader { get; set; } = "Authorization";

    public string ApiKey { get; set; } = string.Empty;

    public string ChatModel { get; set; } = "gpt-4o-mini";

    public string EmbeddingModel { get; set; } = "text-embedding-3-small";

    public int TopK { get; set; } = 5;

    public string KnowledgeFilePath { get; set; } = "Knowledge/portfolio-knowledge.json";
}
