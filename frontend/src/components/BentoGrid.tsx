import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import BentoCard from "./BentoCard";
import { aboutContent } from "../data/about";
import { certifications } from "../data/certifications";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { services } from "../data/services";

const projectIcons = [BriefcaseBusiness, Sparkles];
const serviceIcons = [Code2, Cloud, Sparkles, BarChart3, Layers, Zap];

export default function BentoGrid() {
  return (
    <section className="mt-8">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <BentoCard title="PROJECTS" className="border-indigo-100">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Featured Projects
              </h2>
              <Link
                to="/projects"
                className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {projects.map((project, index) => {
                const Icon = projectIcons[index % projectIcons.length];
                return (
                  <li
                    key={project.title}
                    className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                  >
                    <div
                      className={`flex aspect-[16/7] items-center justify-between px-5 py-4 ${
                        index % 2 === 0
                          ? "bg-slate-900 text-white"
                          : "bg-sky-50 text-slate-900"
                      }`}
                    >
                      <div>
                        <p
                          className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                            index % 2 === 0 ? "text-indigo-200" : "text-sky-700"
                          }`}
                        >
                          {project.category}
                        </p>
                        <p className="mt-2 font-mono text-xs opacity-70">
                          SELECTED WORK / 0{index + 1}
                        </p>
                      </div>
                      <Icon
                        aria-hidden="true"
                        className={`h-10 w-10 ${
                          index % 2 === 0 ? "text-indigo-300" : "text-sky-600"
                        }`}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="flex items-center justify-between gap-2 font-semibold text-slate-900">
                        {project.title}
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-indigo-600" />
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {project.description}
                      </p>
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
                  </li>
                );
              })}
            </ul>
          </BentoCard>
        </div>

        <div className="lg:col-span-4">
          <BentoCard title="ABOUT ME" dark className="bg-[#101a35]">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold ring-1 ring-white/15">
                {profile.initials}
              </div>
              <div>
                <h2 className="font-semibold text-white">{profile.name}</h2>
                <p className="text-xs text-slate-300">{profile.role}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-200">
              {aboutContent.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
              {["React", ".NET", "Azure", "AI"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </BentoCard>
        </div>

        <div className="lg:col-span-4">
          <BentoCard title="CERTIFICATIONS">
            <ul className="space-y-2.5">
              {certifications.map((cert) => (
                <li
                  key={`${cert.title}-${cert.year}`}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-amber-500 ring-1 ring-amber-200">
                    <Award aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {cert.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {cert.issuer} <span aria-hidden="true">·</span> {cert.year}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-semibold uppercase text-emerald-700">
                    {cert.badge}
                  </span>
                </li>
              ))}
            </ul>
          </BentoCard>
        </div>

        <div className="lg:col-span-8">
          <BentoCard title="SERVICES">
            <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
              {services.map((service, i) => {
                const Icon = serviceIcons[i % serviceIcons.length];
                const iconColors = [
                  "bg-sky-100 text-sky-700",
                  "bg-indigo-100 text-indigo-700",
                  "bg-violet-100 text-violet-700",
                  "bg-emerald-100 text-emerald-700",
                  "bg-blue-100 text-blue-700",
                  "bg-amber-100 text-amber-700",
                ];
                return (
                  <li
                    key={service.title}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-3 transition-colors hover:border-slate-200 hover:bg-white"
                  >
                    <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-md ${iconColors[i % iconColors.length]}`}>
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold leading-snug text-slate-900">
                      {service.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {service.description}
                    </p>
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
