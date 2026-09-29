import { Code2, Cloud, Sparkles, Award, ArrowRight } from "lucide-react";
import BentoCard from "./BentoCard";
import { aboutContent } from "../data/about";
import { certifications } from "../data/certifications";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { services } from "../data/services";

const serviceIcons = [Code2, Cloud, Sparkles];

export default function BentoGrid() {
  return (
    <section className="mt-8">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <BentoCard title="Projects">
            <ul className="grid gap-3 md:grid-cols-2">
              {projects.map((project) => (
                <li
                  key={project.title}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">
                      {project.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
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

        <div className="lg:col-span-4">
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

        <div className="lg:col-span-6">
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

        <div className="lg:col-span-6">
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

      </div>
    </section>
  );
}
