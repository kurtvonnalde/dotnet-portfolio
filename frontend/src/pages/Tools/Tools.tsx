import {
  SiDotnet,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPython,
  SiReact,
  SiSupabase,
} from "react-icons/si";
import { SiCss, SiHtml5 } from "react-icons/si";
import type { IconType } from "react-icons";
import { skills } from "../../data/tools";
import { BiBarChartAlt2, BiBrain, BiCloud, BiGitBranch, BiBot } from "react-icons/bi";

const skillIcons: Record<string, IconType> = {
  python: SiPython,
  supabase: SiSupabase,
  powerbi: BiBarChartAlt2,
  git: SiGit,
  devops: BiGitBranch,
  mongodb: SiMongodb,
  javascript: SiJavascript,
  github: SiGithub,
  dotnet: SiDotnet,
  react: SiReact,
  mysql: SiMysql,
  azure: BiCloud,
  foundry: BiBrain,
  openai: BiBot,
};

export default function Tools() {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Tools I used</h1>
          <p className="mt-2 text-slate-600">
            Languages, frameworks, platforms, and tools.
          </p>
        </div>
        <span className="text-sm font-medium text-slate-500">
          {skills.length} skills
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {skills.map((skill) => {
          const Icon = skillIcons[skill.icon];
          return (
            <li
              key={skill.name}
              className={`flex min-h-32 flex-col justify-between rounded-lg border p-4 transition-colors ${
                skill.featured
                  ? "border-amber-300 bg-amber-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-md ${
                  skill.featured ? "bg-amber-100" : "bg-slate-50"
                }`}
              >
                {skill.icon === "htmlCss" ? (
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <SiHtml5 className="h-5 w-5" style={{ color: "#E34F26" }} />
                    <SiCss className="h-5 w-5" style={{ color: "#1572B6" }} />
                  </span>
                ) : (
                  <Icon
                    aria-hidden="true"
                    className="h-6 w-6"
                    style={{ color: skill.color }}
                  />
                )}
              </div>
              <div className="mt-5">
                <h2 className="text-sm font-semibold leading-snug text-slate-900">
                  {skill.name}
                </h2>
                <p className="mt-1 text-xs text-slate-500">{skill.category}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
