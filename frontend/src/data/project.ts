import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "1",
    slug: "ai-job-match",

    title: "AI Job Match Assistant",

    shortDescription:
      "AI-powered recruitment platform that matches resumes to job opportunities.",

    fullDescription:
      "Uses AI to analyze resumes, compare job descriptions, and generate recommendations.",

    category: "AI",

    technologies: [
      "React",
      ".NET",
      "Azure OpenAI",
      "PostgreSQL"
    ],

    featured: true,
  },

  {
    id: "2",
    slug: "ai-planning-assistant",

    title: "AI Planning Assistant",

    shortDescription:
      "Smart assistant for project planning and execution.",

    fullDescription:
      "Helps developers generate tasks, architecture plans, and development phases.",

    category: "AI",

    technologies: [
      "React",
      ".NET",
      "Azure OpenAI"
    ],

    featured: true,
  },

  {
    id: "3",
    slug: "fitness-ai",

    title: "Fitness AI",

    shortDescription:
      "Mobile fitness assistant powered by AI.",

    fullDescription:
      "Generates personalized workout plans and nutrition suggestions.",

    category: "Mobile",

    technologies: [
      "React Native",
      ".NET",
      "PostgreSQL"
    ],

    featured: true,
  }
];