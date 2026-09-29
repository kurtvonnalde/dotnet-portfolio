import { Code2, Cloud, Sparkles, Award, ArrowRight } from "lucide-react";
import BentoCard from "./BentoCard";
import { aboutContent } from "../data/about";
import { caseStudies } from "../data/caseStudies";
import { certifications } from "../data/certifications";
import { homeContent } from "../data/home";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { services } from "../data/services";

const serviceIcons = [Code2, Cloud, Sparkles];
const avatarColors = ["bg-indigo-500", "bg-emerald-500", "bg-rose-500"];

export default function BentoGrid() {
  return (
    <section className="mt-8">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <BentoCard title="Projects">
            <ul className="space-y-4">
              {projects.map((project) => (
                <li
                  key={project.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">
                      {project.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </BentoCard>
        </div>

        <div className="lg:col-span-3">
          <BentoCard title="About" dark>
            <p className="text-sm leading-relaxed text-slate-200">
              {aboutContent.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-bold">
                {profile.initials}
              </div>
              <div>
                <p className="text-sm font-semibold">{profile.name}</p>
                <p className="text-xs text-slate-400">{profile.role}</p>
              </div>
            </div>
          </BentoCard>
        </div>

        <div className="lg:col-span-3">
          <BentoCard title="AI Builds">
            <ul className="space-y-3">
              {homeContent.aiBuilds.map((build, i) => (
                <li key={build.title} className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${avatarColors[i % avatarColors.length]}`}
                  >
                    {build.title.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {build.title}
                    </p>
                    <p className="text-xs text-slate-500">{build.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </BentoCard>
        </div>

        <div className="lg:col-span-4">
          <BentoCard title="Certifications">
            <ul className="space-y-3">
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
          </BentoCard>
        </div>

        <div className="lg:col-span-4">
          <BentoCard title="Services">
            <ul className="space-y-3">
              {services.map((service, i) => {
                const Icon = serviceIcons[i % serviceIcons.length];
                return (
                  <li key={service.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 ring-1 ring-indigo-100">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {service.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {service.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </BentoCard>
        </div>

        <div className="lg:col-span-4">
          <BentoCard title="Case Studies">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {caseStudies[0].client}
                </p>
                <h3 className="mt-1 font-bold text-slate-900">
                  {caseStudies[0].title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {caseStudies[0].summary}
                </p>
                <p className="mt-3 text-sm font-medium text-emerald-600">
                  {caseStudies[0].outcome}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {caseStudies[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="#"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Read case study <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
