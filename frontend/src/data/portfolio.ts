import type { CaseStudy } from "../types/caseStudy";

export const portfolio = {
  name: "Kurt Vonn Alde",
  role: "Full Stack Developer",
  tagline: "Build it once. Run it forever.",
  summary:
    "Full-stack developer focused on React, .NET, Azure and AI-powered applications.",

  technologies: [
    "React",
    "TypeScript",
    ".NET",
    "Azure",
    "SQL",
    "PostgreSQL",
    "Test",
    "Sample"
  ],

  projects: [
    {
      title: "AI Job Match Assistant",
      description:
        "AI-powered platform that matches candidates to roles using semantic search. and for testing",
      tags: ["React", ".NET", "Azure OpenAI"],
    },
    {
      title: "Planwise",
      description:
        "Smart planning app with real-time collaboration and reminders.",
      tags: ["TypeScript", "PostgreSQL", "SignalR"],
    },
    {
      title: "DevMetrics Dashboard",
      description:
        "Analytics dashboard visualizing team velocity and deployment health.",
      tags: ["React", "SQL", "Grafana"],
    },
  ],

  about:
    "I'm a full-stack developer with 5+ years building reliable web apps. I care about clean architecture, great DX, and shipping software that keeps running long after launch.",

  aiBuilds: [
    { title: "Resume Parser", subtitle: "LLM + embeddings" },
    { title: "Support Copilot", subtitle: "RAG over docs" },
    { title: "Code Reviewer", subtitle: "Agentic workflow" },
  ],

  certifications: [
    { title: "Azure Developer Associate", issuer: "Microsoft — AZ-204" },
    { title: "Azure Fundamentals", issuer: "Microsoft — AZ-900" },
    { title: "Professional Scrum Developer", issuer: "Scrum.org" },
  ],

  services: [
    { title: "Web App Development", description: "React & .NET end-to-end." },
    { title: "Cloud & DevOps", description: "Azure deployments & CI/CD." },
    { title: "AI Integration", description: "LLM features & automation." },
  ],

  caseStudies: [
    {
      title: "Scaling Checkout to 1M Orders",
      client: "Northwind Labs",
      summary: "Rebuilt the checkout pipeline to survive peak traffic.",
      problem:
        "The legacy checkout buckled under Black Friday load, dropping orders.",
      solution:
        "Re-architected with .NET queues and Azure autoscaling for elastic throughput.",
      outcome: "Handled 1M+ orders with zero downtime and 40% faster checkout.",
      tags: [".NET", "Azure", "SQL"],
    },
    {
      title: "AI Support Copilot",
      client: "Helpwise",
      summary: "Cut support response time with a RAG-powered assistant.",
      problem: "Agents spent hours digging through docs to answer tickets.",
      solution:
        "Built a retrieval-augmented copilot grounded in the knowledge base.",
      outcome: "Reduced average handle time by 55% in the first month.",
      tags: ["React", "Azure OpenAI", "TypeScript"],
    },
  ] satisfies CaseStudy[],
};