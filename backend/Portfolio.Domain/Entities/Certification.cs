namespace Portfolio.Domain.Entities;

public class Certification
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Issuer { get; set; } = string.Empty;

    public DateTime IssuedDate { get; set; }
}