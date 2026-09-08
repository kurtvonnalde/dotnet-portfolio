import { ArrowRight } from "lucide-react";
import { portfolio } from "../../data/portfolio";

export default function Projects() {
  return (
    <section>
      <h1 className="text-3xl font-extrabold text-slate-900">Projects</h1>
      <p className="mt-2 text-slate-600">Some of the things I've built.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {portfolio.projects.map((project) => (
          <div
            key={project.title}
            className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">{project.title}</h2>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-1 text-sm text-slate-600">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
