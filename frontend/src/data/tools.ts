export const skills = [
  { name: "Python", category: "Language", icon: "python", color: "#3776AB" },
  { name: "Supabase", category: "Framework", icon: "supabase", color: "#54C5F8" },
  { name: "Power BI", category: "Business Intelligence", icon: "powerbi", color: "#F2C811", featured: true },
  { name: "Git Source Control", category: "Version control", icon: "git", color: "#F05032" },
  { name: "Azure DevOps", category: "Business platform", icon: "devops", color: "#5E64FF" },
  { name: "MongoDB", category: "Database", icon: "mongodb", color: "#47A248" },
  { name: "HTML & CSS", category: "Web", icon: "htmlCss", color: "#E34F26" },
  { name: "JavaScript", category: "Language", icon: "javascript", color: "#F7DF1E" },
  { name: "Github", category: "Platform", icon: "github", color: "#0089FF" },
  { name: ".NET", category: "Framework", icon: "dotnet", color: "#512BD4" },
  { name: "React JS/TS", category: "Framework", icon: "react", color: "#111827" },
  { name: "MySQL", category: "Database", icon: "mysql", color: "#4479A1" },
  { name: "Azure", category: "Cloud", icon: "azure", color: "#FF9900" },
  { name: "Microsoft Foundry", category: "AI platform", icon: "foundry", color: "#0078D4" },
  { name: "OpenAI", category: "AI platform", icon: "openai", color: "#111827" },
  { name: "Github Copilot", category: "AI Tool", icon: "ghcp", color: "#111827" },
];

export const technologies = skills.map((skill) => skill.name);
