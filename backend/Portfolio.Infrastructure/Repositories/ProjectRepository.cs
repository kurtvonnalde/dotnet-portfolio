using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Infrastructure.Data;

namespace Portfolio.Infrastructure.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly PortfolioDbContext _dbContext;

    public ProjectRepository(
        PortfolioDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Project>> GetAllAsync()
    {
        return await _dbContext.Projects
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Project?> GetByIdAsync(Guid id)
    {
        return await _dbContext.Projects
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
    }
}