import { ArrowRight } from "lucide-react";
import { caseStudies } from "../../data/caseStudies";

export default function CaseStudies() {
  return (
    <section>
      <h1 className="text-3xl font-extrabold text-slate-900">Case Studies</h1>
      <p className="mt-2 text-slate-600">
        A closer look at problems I've solved and the results.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {caseStudies.map((study) => (
          <article
            key={study.title}
            className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-100 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400" />

            <div className="flex items-center justify-between gap-3 pt-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {study.client}
              </p>
              <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-700 ring-1 ring-violet-100">
                {study.badge}
              </span>
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              {study.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {study.summary}
            </p>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-slate-900">Problem</dt>
                <dd className="mt-1 text-slate-600">{study.problem}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Solution</dt>
                <dd className="mt-1 text-slate-600">{study.solution}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Outcome</dt>
                <dd className="mt-1 text-slate-600">{study.outcome}</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition-colors group-hover:text-violet-700"
            >
              Read case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
