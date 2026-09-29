import { ArrowUpRight, Code2, Cloud, Sparkles } from "lucide-react";
import { services } from "../../data/services";

const serviceIcons = [Code2, Cloud, Sparkles];

export default function Services() {
  return (
    <section>
      <h1 className="text-3xl font-extrabold text-slate-900">Services</h1>
      <p className="mt-2 text-slate-600">How I can help.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          return (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-100 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400" />

              <div className="flex items-start justify-between gap-3 pt-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-sky-50 text-indigo-600 ring-1 ring-indigo-100">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-700 ring-1 ring-indigo-100">
                  {service.badge}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                {service.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{service.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.overview}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                Explore service <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
