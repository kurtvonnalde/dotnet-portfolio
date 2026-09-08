import { Wrench } from "lucide-react";
import { portfolio } from "../../data/portfolio";

export default function Tools() {
  return (
    <section>
      <h1 className="text-3xl font-extrabold text-slate-900">Tools</h1>
      <p className="mt-2 text-slate-600">The stack I reach for every day.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {portfolio.technologies.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
          >
            <Wrench className="h-4 w-4 text-slate-400" />
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
