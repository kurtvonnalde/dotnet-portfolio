export type PortfolioProject = {
  title: string;
  category: string;
  description: string;
  impact: string;
  tags: string[];
  featured?: boolean;
  preview: "applications" | "planning";
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
};

export const projects: PortfolioProject[] = [
  {
    title: "Job Hunter",
    category: "Productivity",
    description:
      "Personal AI-powered platform that tracks my job applications and generates CV to match job posts.",
    impact: "Improved hiring relevance and reduced manual review time.",
    tags: ["React", ".NET", "Azure OpenAI"],
    featured: true,
    preview: "applications",
    liveUrl: "",
    githubUrl: "",
    highlights: [
      "Track job applications in one place",
      "Generate CVs tailored to job posts with AI",
      "Improve hiring relevance and reduce manual review",
    ],
  },
  {
    title: "Software Engineering Helper",
    category: "AI Product",
    description:
      "Smart planning app with Generative AI that will generates contents tailored to the initial input from the user.",
    impact: "Helped teams simplify planning and keep priorities visible.",
    tags: ["React", ".NET", "Azure OpenAI"],
    preview: "planning",
    liveUrl: "",
    githubUrl: "",
    highlights: [
      "Generate planning content from an initial idea",
      "Simplify planning and keep priorities visible",
    ],
  },
];
