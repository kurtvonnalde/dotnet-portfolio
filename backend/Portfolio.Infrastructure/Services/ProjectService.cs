using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _repository;

    public ProjectService(
        IProjectRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Project>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Project?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }
}