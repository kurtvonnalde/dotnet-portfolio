using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Interfaces;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _service;

    public ProjectsController(
        IProjectService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var projects = await _service.GetAllAsync();

        return Ok(projects);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetProject(Guid id)
    {
        var project = await _service.GetByIdAsync(id);

        if (project is null)
        {
            return NotFound();
        }

        return Ok(project);
    }
}