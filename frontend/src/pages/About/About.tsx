import { Award, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { aboutContent } from "../../data/about";
import { certifications } from "../../data/certifications";
import { education } from "../../data/education";
import { employment } from "../../data/employment";

const timeline = [
  ...education.map((entry) => ({
    id: entry.id,
    category: "education" as const,
    startYear: entry.startYear,
    period: entry.period,
    title: entry.qualification,
    organization: entry.institution,
    description: entry.description,
  })),
  ...employment.map((entry) => ({
    id: entry.id,
    category: "employment" as const,
    startYear: entry.startYear,
    period: entry.period,
    title: entry.role,
    organization: entry.company,
    description: entry.description,
  })),
].sort((first, second) => first.startYear - second.startYear);

export default function About() {
  return (
    <section>
      <h1 className="text-3xl font-extrabold text-slate-900">About</h1>

      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
        {aboutContent.description}
      </p>

      <section className="mt-10" aria-labelledby="history-heading">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 ring-1 ring-slate-200">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h2 id="history-heading" className="text-xl font-bold text-slate-900">
            Education &amp; Employment
          </h2>
        </div>

        <div className="relative mt-7">
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-1.5 top-2 w-px bg-sky-200 lg:left-1/2"
          />
          <ol
            className="space-y-5"
            aria-label="Education and employment timeline"
          >
            {timeline.map((entry, index) => {
              const isEducation = entry.category === "education";
              const Icon = isEducation ? GraduationCap : BriefcaseBusiness;
              const colorClass = isEducation
                ? "text-sky-700 bg-sky-50 ring-sky-100"
                : "text-blue-700 bg-blue-50 ring-blue-100";
              const markerClass = isEducation ? "bg-sky-500" : "bg-blue-700";
              const sideClass =
                index % 2 === 0
                  ? "lg:col-start-1 lg:text-right"
                  : "lg:col-start-3";

              return (
                <li
                  key={entry.id}
                  className="relative pl-8 lg:grid lg:grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] lg:items-start lg:gap-x-4 lg:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-5 h-3 w-3 rounded-full border-2 border-white ring-1 ring-slate-200 lg:static lg:col-start-2 lg:row-start-1 lg:mt-5 lg:justify-self-center ${markerClass}`}
                  />
                  <article
                    className={`rounded-md border border-slate-200 bg-white p-4 ${sideClass}`}
                  >
                    <div
                      className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${colorClass}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {isEducation ? "Education" : "Employment"}
                    </div>
                    <p
                      className={`text-sm font-semibold ${isEducation ? "text-sky-700" : "text-blue-700"}`}
                    >
                      {entry.period}
                    </p>
                    <h3 className="mt-1 font-semibold text-slate-900">
                      {entry.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-700">
                      {entry.organization}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {entry.description}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Certifications</h2>
      <ul className="mt-4 space-y-3">
        {certifications.map((cert) => (
          <li key={cert.title} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500 ring-1 ring-amber-100">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {cert.title}
              </p>
              <p className="text-xs text-slate-500">{cert.issuer}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
