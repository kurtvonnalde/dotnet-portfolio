using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly PortfolioDbContext _dbContext;

    public ProjectsController(PortfolioDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var projects = await _dbContext.Projects.ToListAsync();

        return Ok(projects);
    }

    [HttpGet("{id:guid}")]
public async Task<IActionResult> GetProject(Guid id)
{
    var project = await _dbContext.Projects
        .FirstOrDefaultAsync(x => x.Id == id);

    if (project is null)
    {
        return NotFound();
    }

    return Ok(project);
}
}