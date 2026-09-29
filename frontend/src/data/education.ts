export interface EducationEntry {
  id: string;
  startYear: number;
  period: string;
  qualification: string;
  institution: string;
  description: string;
}

export const education: EducationEntry[] = [
  {
    id: "bachelors-degree",
    startYear: 2018,
    period: "2018 - 2023",
    qualification: "B.S. in Information Technology",
    institution: "La Salle University - Ozamiz City",
    description: "Sample education entry for previewing the timeline.",
  },
  {
    id: "lexmark-research-and-development",
    startYear: 2022,
    period: "September 2022 - December 2022",
    qualification: "Internship",
    institution: "Lexmark Research and Development",
    description: "Sample education entry for previewing the timeline.",
  },
];