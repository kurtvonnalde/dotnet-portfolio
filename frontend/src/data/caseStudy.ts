import type { CaseStudy } from "../types/caseStudy";


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
  ] satisfies CaseStudy[];