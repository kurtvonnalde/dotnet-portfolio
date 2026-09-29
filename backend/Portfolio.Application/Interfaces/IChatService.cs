using Portfolio.Application.DTOs.Chat;

namespace Portfolio.Application.Interfaces;

public interface IChatService
{
    Task<ChatResponse> AskAsync(ChatRequest request, CancellationToken cancellationToken);
}
