export interface Project {
  id: string;
  slug: string;

  title: string;
  shortDescription: string;
  fullDescription: string;

  category: string;

  technologies: string[];

  githubUrl?: string;
  liveUrl?: string;

  featured: boolean;

  imageUrl?: string;
}