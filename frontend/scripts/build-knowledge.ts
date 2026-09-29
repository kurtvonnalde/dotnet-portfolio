// Converts src/data/*.ts into text chunks consumed by the backend RAG chatbot.
// Run with: npm run knowledge
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { aboutContent } from "../src/data/about.ts";
import { caseStudies } from "../src/data/caseStudies.ts";
import { certifications } from "../src/data/certifications.ts";
import { contactContent } from "../src/data/contact.ts";
import { education } from "../src/data/education.ts";
import { employment } from "../src/data/employment.ts";
import { homeContent } from "../src/data/home.ts";
import { profile } from "../src/data/profile.ts";
import { projects } from "../src/data/projects.ts";
import { services } from "../src/data/services.ts";
import { skills, technologies } from "../src/data/tools.ts";

type KnowledgeChunk = {
  id: string;
  source: string;
  title: string;
  text: string;
};

const owner = profile.name;
const chunks: KnowledgeChunk[] = [];

const slug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const add = (source: string, title: string, lines: string[]) => {
  chunks.push({
    id: `${source}-${slug(title)}-${chunks.length}`,
    source,
    title,
    text: lines.filter(Boolean).join("\n"),
  });
};

add("profile", `About ${owner}`, [
  `${owner} (${profile.handle}) is a ${profile.role}.`,
  aboutContent.description,
  `Tagline: "${homeContent.tagline}"`,
  homeContent.summary,
]);

for (const p of projects) {
  add("projects", p.title, [
    `Project by ${owner}: ${p.title} (${p.category}).`,
    p.description,
    `Impact: ${p.impact}`,
    `Tech stack: ${p.tags.join(", ")}.`,
  ]);
}

for (const c of caseStudies) {
  add("case-studies", c.title, [
    `Case study by ${owner}: ${c.title} for client ${c.client} (${c.badge}).`,
    `Summary: ${c.summary}`,
    `Problem: ${c.problem}`,
    `Solution: ${c.solution}`,
    `Outcome: ${c.outcome}`,
    `Tech stack: ${c.tags.join(", ")}.`,
  ]);
}

const uniqueCertifications = certifications.filter(
  (cert, index, all) =>
    all.findIndex(
      (other) =>
        other.title === cert.title &&
        other.issuer === cert.issuer &&
        other.year === cert.year,
    ) === index,
);

for (const cert of uniqueCertifications) {
  add("certifications", cert.title, [
    `${owner} holds the "${cert.title}" certification issued by ${cert.issuer} in ${cert.year} (${cert.badge}).`,
    cert.overview,
  ]);
}

for (const s of services) {
  add("services", s.title, [
    `Service offered by ${owner}: ${s.title} (${s.badge}) - ${s.description}`,
    s.overview,
  ]);
}

for (const job of employment) {
  add("employment", `${job.role} at ${job.company}`, [
    `${owner} worked as ${job.role} at ${job.company} (${job.period}).`,
    job.description,
  ]);
}

for (const entry of education) {
  add("education", `${entry.qualification} - ${entry.institution}`, [
    `${owner} completed ${entry.qualification} at ${entry.institution} (${entry.period}).`,
    entry.description,
  ]);
}

add("tools", `${owner}'s technologies`, [
  `Core technologies ${owner} uses: ${technologies.join(", ")}.`,
]);

const skillsByCategory = Object.groupBy(skills, (s) => s.category);
add("tools", `${owner}'s skills and tools`, [
  `Skills and tools ${owner} works with, by category:`,
  ...Object.entries(skillsByCategory).map(
    ([category, items]) =>
      `- ${category}: ${(items ?? []).map((s) => s.name).join(", ")}`,
  ),
]);

const socials = contactContent.socials
  .filter((s) => s.href && s.href !== "#")
  .map((s) => `- ${s.label}: ${s.href}`);

add("contact", `Contacting ${owner}`, [
  contactContent.intro,
  `${owner} can be reached through: ${contactContent.socials.map((s) => s.label).join(", ")}.`,
  ...socials,
  "Visitors can use the Contact page of this website to get in touch.",
]);

const outputPath = resolve(
  import.meta.dirname,
  "../../backend/Portfolio.Api/Knowledge/portfolio-knowledge.json",
);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(chunks, null, 2) + "\n", "utf8");

console.log(`Wrote ${chunks.length} knowledge chunks to ${outputPath}`);
