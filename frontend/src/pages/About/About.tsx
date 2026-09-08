import { Award } from "lucide-react";
import { portfolio } from "../../data/portfolio";

export default function About() {
  return (
    <section>
      <h1 className="text-3xl font-extrabold text-slate-900">About</h1>

      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
        {portfolio.about}
      </p>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Certifications</h2>
      <ul className="mt-4 space-y-3">
        {portfolio.certifications.map((cert) => (
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
