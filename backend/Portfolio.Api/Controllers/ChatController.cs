using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Portfolio.Application.DTOs.Chat;
using Portfolio.Application.Interfaces;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableRateLimiting("chat")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;
    private readonly ILogger<ChatController> _logger;

    public ChatController(
        IChatService chatService,
        ILogger<ChatController> logger)
    {
        _chatService = chatService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<ChatResponse>> Ask(
        ChatRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _chatService.AskAsync(request, cancellationToken));
        }
        catch (Exception ex) when ((ex is HttpRequestException or InvalidOperationException or TaskCanceledException)
                                   && !cancellationToken.IsCancellationRequested)
        {
            _logger.LogError(ex, "Chat request failed.");

            return Problem(
                statusCode: StatusCodes.Status503ServiceUnavailable,
                detail: "The assistant is temporarily unavailable. Please try again later.");
        }
    }
}
