using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces;

public interface IProjectRepository
{
    Task<List<Project>> GetAllAsync();

    Task<Project?> GetByIdAsync(Guid id);
}
