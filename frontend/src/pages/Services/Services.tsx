import { Code2, Cloud, Sparkles } from "lucide-react";
import { portfolio } from "../../data/portfolio";

const serviceIcons = [Code2, Cloud, Sparkles];

export default function Services() {
  return (
    <section>
      <h1 className="text-3xl font-extrabold text-slate-900">Services</h1>
      <p className="mt-2 text-slate-600">How I can help.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.services.map((service, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          return (
            <div
              key={service.title}
              className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 ring-1 ring-indigo-100">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-semibold text-slate-900">
                {service.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
