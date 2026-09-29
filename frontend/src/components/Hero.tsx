import { ArrowRight } from "lucide-react";
import { homeContent } from "../data/home";

export default function Hero() {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="max-w-4xl text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
          {homeContent.tagline}
        </h1>

        <p className="mt-6 max-w-3xl text-xl text-slate-600">
          {homeContent.summary}
        </p>
      </div>

      <a
        href="#"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        Get Started <ArrowRight className="h-4 w-4" />
      </a>
    </section>
  );
}
