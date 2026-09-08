import type { ReactNode } from "react";
import { SiReact, SiTypescript, SiDotnet, SiPostgresql } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaDatabase } from "react-icons/fa";
import { portfolio } from "../data/portfolio";

const techIcons: Record<string, ReactNode> = {
  React: <SiReact className="text-[#61DAFB]" />,
  TypeScript: <SiTypescript className="text-[#3178C6]" />,
  ".NET": <SiDotnet className="text-[#512BD4]" />,
  Azure: <VscAzure className="text-[#0078D4]" />,
  SQL: <FaDatabase className="text-[#4479A1]" />,
  PostgreSQL: <SiPostgresql className="text-[#4169E1]" />,
};

export default function TechStack() {
  const items = portfolio.technologies;

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4">
      <div className="marquee-fade">
        <div className="marquee">
          {[0, 1].map((copy) => (
            <div className="marquee-content" key={copy} aria-hidden={copy === 1}>
              {items.map((tech) => (
                <span
                  key={`${copy}-${tech}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm"
                >
                  <span className="text-base">{techIcons[tech]}</span>
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
