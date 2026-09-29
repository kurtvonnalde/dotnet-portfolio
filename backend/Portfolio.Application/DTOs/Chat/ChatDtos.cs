using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.DTOs.Chat;

public sealed class ChatRequest
{
    [Required]
    [StringLength(500, MinimumLength = 1)]
    public string Message { get; init; } = string.Empty;

    [MaxLength(10)]
    public List<ChatHistoryMessage> History { get; init; } = [];
}

public sealed class ChatHistoryMessage
{
    [Required]
    [RegularExpression("^(user|assistant)$")]
    public string Role { get; init; } = string.Empty;

    [Required]
    [StringLength(2000)]
    public string Content { get; init; } = string.Empty;
}

public sealed record ChatResponse(string Answer, IReadOnlyList<string> Sources);
