import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeContent } from "../data/home";

export default function Hero() {
  return (
    <section className="grid overflow-hidden rounded-lg bg-[#111827] text-white lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">
          Full-stack developer <span className="mx-2 text-slate-500">/</span> React · .NET · Azure
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
          {homeContent.tagline}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {homeContent.summary}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-lime-300 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-lime-200"
          >
            Explore projects <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
          >
            Get in touch <ArrowDownRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <aside className="flex flex-col justify-center border-t border-white/10 bg-white/[0.03] px-6 py-6 sm:px-9 lg:border-l lg:border-t-0 lg:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Building across the stack
        </p>
        {[
          ["01", "Frontend", "React · TypeScript · Javascript"],
          ["02", "Backend", ".NET · C# · Python · APIs · SQL"],
          ["03", "Cloud Platform", "Azure · AI Foundry · OpenAI"],
          ["04", "Version Control", "Github · Azure DevOps"],
        ].map(([number, title, detail]) => (
          <div key={number} className="border-t border-white/10 py-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-lime-300">{number}</span>
              <span className="font-semibold">{title}</span>
            </div>
            <p className="mt-1 pl-8 text-sm text-slate-400">{detail}</p>
          </div>
        ))}
      </aside>
    </section>
  );
}
