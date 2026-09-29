import type { ReactNode } from "react";
import {
  SiReact,
  SiTypescript,
  SiDotnet,
  SiPostgresql,
  SiPython,
  SiSupabase,
  SiGit,
  SiMongodb,
  SiJavascript,
  SiGithub,
  SiMysql,
} from "react-icons/si";
import { BiBarChartAlt2 } from "react-icons/bi";
import { VscAzure } from "react-icons/vsc";
import { FaDatabase, FaBrain, FaCode, FaRobot } from "react-icons/fa";
import { technologies } from "../data/tools";

const techIcons: Record<string, ReactNode> = {
  React: <SiReact className="text-[#61DAFB]" />,
  TypeScript: <SiTypescript className="text-[#3178C6]" />,
  ".NET": <SiDotnet className="text-[#512BD4]" />,
  Azure: <VscAzure className="text-[#0078D4]" />,
  SQL: <FaDatabase className="text-[#4479A1]" />,
  PostgreSQL: <SiPostgresql className="text-[#4169E1]" />,
  Python: <SiPython className="text-[#3776AB]" />,
  Supabase: <SiSupabase className="text-[#3ECF8E]" />,
  "Git Source Control": <SiGit className="text-[#F05032]" />,
  "Power BI": <BiBarChartAlt2 className="text-[#F2C811]" />,
  "Azure DevOps": <FaCode className="text-[#0078D4]" />,
  MongoDB: <SiMongodb className="text-[#47A248]" />,
  "HTML & CSS": <FaCode className="text-[#E34F26]" />,
  JavaScript: <SiJavascript className="text-[#F7DF1E]" />,
  Github: <SiGithub className="text-[#111827]" />,
  "React JS/TS": <SiReact className="text-[#61DAFB]" />,
  MySQL: <SiMysql className="text-[#4479A1]" />,
  "Microsoft Foundry": <FaBrain className="text-[#0078D4]" />,
  OpenAI: <FaRobot className="text-[#111827]" />,
  "Github Copilot": <SiGithub className="text-[#111827]" />,
};

export default function TechStack() {
  const items = technologies;

  return (
    <section className="mt-8 border-y border-slate-200 py-5">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Toolkit
        </p>
        <div className="w-full marquee-fade">
          <div className="marquee">
            {[0, 1].map((copy) => (
              <div
                className="marquee-content"
                key={copy}
                aria-hidden={copy === 1}
              >
                {items.map((tech) => (
                  <span
                    key={`${copy}-${tech}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-md border border-slate-200 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700"
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
    </section>
  );
}
