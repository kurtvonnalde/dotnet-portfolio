export interface EmploymentEntry {
  id: string;
  startYear: number;
  period: string;
  role: string;
  company: string;
  description: string;
}

export const employment: EmploymentEntry[] = [
  {
    id: "software-engineer",
    startYear: 2023,
    period: "March 2023 - March 2025",
    role: "Software Engineer",
    company: "Alliance Software Inc.",
    description: "Sample employment entry for previewing the timeline.",
  },
  {
    id: "custom-software-engineer",
    startYear: 2025,
    period: "March 2025 - Present",
    role: "Custom Software Engineer",
    company: "Accenture Inc.",
    description: "Sample employment entry for previewing the timeline.",
  },
];