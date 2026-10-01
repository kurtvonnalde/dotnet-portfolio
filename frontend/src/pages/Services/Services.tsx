import {
  ArrowRight,
  BarChart3,
  Boxes,
  Cloud,
  Code2,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { services } from "../../data/services";

const serviceIcons: Record<string, LucideIcon> = {
  "Web App Development": Code2,
  "Cloud & DevOps": Cloud,
  "AI Integration": Sparkles,
  "Report Development": BarChart3,
  "Low-Code No-Code Development": Boxes,
  Automation: Workflow,
};

const serviceTags: Record<string, string[]> = {
  "Web App Development": ["React", ".NET", "Azure", "TypeScript"],
  "Cloud & DevOps": ["Azure", "Docker", "GitHub Actions", "CI/CD"],
  "AI Integration": ["Azure OpenAI/Foundry", "OpenAI", "RAG"],
  "Report Development": ["Power BI", "SQL Server", "Excel"],
  "Low-Code No-Code Development": ["Mendix", "Power Apps", "SharePoint"],
  Automation: ["Power Automate", "n8n", "Logic Apps"],
};

const visualStyles: Record<string, { panel: string; frame: string; tile: string; icon: string }> = {
  "Web App Development": {
    panel: "bg-blue-50",
    frame: "border-blue-200",
    tile: "bg-blue-100",
    icon: "text-blue-700",
  },
  "Cloud & DevOps": {
    panel: "bg-sky-50",
    frame: "border-sky-200",
    tile: "bg-sky-100",
    icon: "text-sky-700",
  },
  "AI Integration": {
    panel: "bg-indigo-500/10",
    frame: "border-white/10",
    tile: "bg-white/10",
    icon: "text-indigo-100",
  },
  "Report Development": {
    panel: "bg-emerald-50",
    frame: "border-emerald-200",
    tile: "bg-emerald-100",
    icon: "text-emerald-700",
  },
  "Low-Code No-Code Development": {
    panel: "bg-violet-50",
    frame: "border-violet-200",
    tile: "bg-violet-100",
    icon: "text-violet-700",
  },
  Automation: {
    panel: "bg-amber-50",
    frame: "border-amber-200",
    tile: "bg-amber-100",
    icon: "text-amber-700",
  },
};

function ServiceVisual({
  title,
  className = "",
  dark = false,
}: {
  title: string;
  className?: string;
  dark?: boolean;
}) {
  const Icon = serviceIcons[title] ?? Sparkles;
  const style = visualStyles[title] ?? visualStyles["AI Integration"];

  return (
    <div
      aria-hidden="true"
      className={`relative flex min-h-24 items-center justify-center overflow-hidden rounded-lg border ${
        dark ? "border-white/10 bg-white/5" : `border-transparent ${style.panel}`
      } ${className}`}
    >
      <div
        className={`absolute h-24 w-24 rotate-12 rounded-2xl border ${
          dark ? "border-white/10" : style.frame
        }`}
      />
      <div
        className={`relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm ${
          dark ? "bg-white/10" : style.tile
        }`}
      >
        <Icon className={`h-8 w-8 ${dark ? "text-indigo-100" : style.icon}`} />
      </div>
    </div>
  );
}

function ServiceTags({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {(serviceTags[title] ?? []).map((tag) => (
        <span
          key={tag}
          className={`rounded-md px-2 py-1 text-[11px] font-medium ${
            dark
              ? "bg-white/10 text-slate-100 ring-1 ring-white/10"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function Services() {
  const featured = services.find((service) => service.title === "AI Integration");
  const webDevelopment = services.find(
    (service) => service.title === "Web App Development",
  );
  const supportingServices = services.filter(
    (service) =>
      service.title !== "AI Integration" &&
      service.title !== "Web App Development" &&
      service.title !== "Low-Code No-Code Development",
  );
  const lowCode = services.find(
    (service) => service.title === "Low-Code No-Code Development",
  );

  return (
    <section>
      <header className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
            Services
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Turning ideas into real solutions.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            From web applications and cloud delivery to AI, reporting, and automation,
            I help take useful ideas from first draft to dependable tools.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-5">
          {[
            [String(services.length), "Service areas"],
            ["3+ Years", "Experience"],
          ].map(([value, label]) => (
            <div key={label} className="min-w-24 border-l-2 border-indigo-300 pl-3">
              <p className="text-lg font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        {featured && (
          <article className="grid gap-5 overflow-hidden rounded-lg bg-slate-900 p-5 text-white sm:p-6 lg:col-span-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-200">
                <Sparkles className="h-3.5 w-3.5" /> Featured service
              </span>
              <h2 className="mt-4 text-2xl font-bold">{featured.title}</h2>
              <p className="mt-1 text-sm font-medium text-slate-200">
                {featured.description}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {featured.overview}
              </p>
              <div className="mt-4">
                <ServiceTags title={featured.title} dark />
              </div>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
              >
                Explore AI solutions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ServiceVisual title={featured.title} className="min-h-48" dark />
          </article>
        )}

        {webDevelopment && (
          <article className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[minmax(0,1fr)_128px] lg:col-span-2 lg:grid-cols-1">
            <div className="flex min-w-0 flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                  <Code2 className="h-5 w-5" />
                </div>
                <h2 className="min-w-0 text-lg font-bold text-slate-900">
                  {webDevelopment.title}
                </h2>
                <span className="shrink-0 rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                  {webDevelopment.badge}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {webDevelopment.description}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {webDevelopment.overview}
              </p>
              <div className="mt-3">
                <ServiceTags title={webDevelopment.title} />
              </div>
              <Link
                to="/contact"
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800 transition-colors hover:bg-blue-100"
              >
                Explore web development <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ServiceVisual title={webDevelopment.title} className="min-h-28 lg:min-h-32" />
          </article>
        )}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {supportingServices.map((service) => {
          const Icon = serviceIcons[service.title] ?? Sparkles;
          return (
            <article
              key={service.title}
              className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_112px] sm:items-center"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="min-w-0 text-base font-bold text-slate-900">
                    {service.title}
                  </h2>
                  <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                    {service.badge}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600">{service.description}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {service.overview}
                </p>
                <div className="mt-3">
                  <ServiceTags title={service.title} />
                </div>
                <Link
                  to="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                >
                  Explore service <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <ServiceVisual title={service.title} className="min-h-28" />
            </article>
          );
        })}
      </div>

      {lowCode && (
        <article className="mt-4 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_minmax(140px,0.45fr)_auto] sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-violet-50 text-violet-600">
                <Boxes className="h-4 w-4" />
              </div>
              <h2 className="min-w-0 text-base font-bold text-slate-900">
                {lowCode.title}
              </h2>
              <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                {lowCode.badge}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-600">{lowCode.description}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              {lowCode.overview}
            </p>
            <div className="mt-3">
              <ServiceTags title={lowCode.title} />
            </div>
          </div>
          <ServiceVisual title={lowCode.title} className="min-h-24" />
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-50 px-4 py-2.5 text-xs font-semibold text-indigo-800 transition-colors hover:bg-indigo-100"
          >
            Explore low-code solutions <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </article>
      )}
    </section>
  );
}