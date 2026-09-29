using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces;

public interface IProjectService
{
    Task<List<Project>> GetAllAsync();

    Task<Project?> GetByIdAsync(Guid id);
}
