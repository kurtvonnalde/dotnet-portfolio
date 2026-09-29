import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects";

import { API_URL } from "../../config/api";
import type { Project } from "../../types/project";

export const projectApi = {
  async getAll(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/projects`);

    if (!response.ok) {
      throw new Error("Failed to load projects");
    }

    return response.json();
  },
};

export default function Projects() {
  return (
    <section>
      <h1 className="text-3xl font-extrabold text-slate-900">Projects</h1>
      <p className="mt-2 text-slate-600">Some of the things I've built.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-100 transition-all duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500" />

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-700 ring-1 ring-sky-100">
                {project.category}
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              {project.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {project.description}
            </p>

            <p className="mt-3 text-sm text-slate-500">{project.impact}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
