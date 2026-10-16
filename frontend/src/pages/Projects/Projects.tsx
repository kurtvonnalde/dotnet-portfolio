import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, FileText, LayoutDashboard, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, type PortfolioProject } from "../../data/projects";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "AI", "Full Stack", ...new Set(projects.flatMap((project) => [
    ...project.tags.filter((tag) => tag !== "Azure OpenAI"),
    project.category,
  ]))];
  const filtered = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "AI") return project.tags.includes("Azure OpenAI");
    if (filter === "Full Stack") return project.tags.includes("React") && project.tags.includes(".NET");
    return project.category === filter || project.tags.includes(filter);
  });
  const featured = filtered.find((project) => project.featured);
  const others = filtered.filter((project) => project !== featured);

  return (
    <section className="projects-page">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Projects</h1>
          <p className="mt-2 text-slate-600">Things I've designed, engineered, and shipped.</p>
        </div>
        <p className="font-mono text-[11px] leading-relaxed text-[var(--chrome-muted)]">
          // Build. Solve. Improve.<br />// One project at a time.
        </p>
      </header>

      <div role="group" aria-label="Filter projects" className="my-6 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0078d4] ${
              filter === item
                ? "border-[#0078d4] bg-[#0078d4] text-white"
                : "border-[var(--chrome-border)] text-[var(--chrome-text)] hover:bg-[var(--chrome-hover)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p role="status" className="sr-only">{filtered.length} projects shown</p>
      {featured && (
        <section aria-labelledby="featured-project-heading">
          <h2 id="featured-project-heading" className="mb-3 text-sm font-semibold text-slate-700">Featured Project</h2>
          <ProjectCard project={featured} featured />
        </section>
      )}
      {others.length > 0 && (
        <section aria-labelledby="other-projects-heading" className={featured ? "mt-6" : ""}>
          <h2 id="other-projects-heading" className="mb-3 text-sm font-semibold text-slate-700">
            {featured ? "Other Projects" : "Matching Projects"}
          </h2>
          <div className="grid gap-4 @min-[64rem]/editor:grid-cols-2">
            {others.map((project) => <ProjectCard key={project.title} project={project} />)}
          </div>
        </section>
      )}
      {filtered.length === 0 && <p className="py-8 text-slate-600">No projects match this filter.</p>}
    </section>
  );
}

function ProjectCard({ project, featured = false }: { project: PortfolioProject; featured?: boolean }) {
  return (
    <article aria-label={project.title} className={`project-showcase grid min-w-0 gap-5 rounded-lg border bg-white p-4 shadow-sm ${
      featured
        ? "border-[#0078d4] ring-1 ring-[#0078d4] @min-[48rem]/editor:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] @min-[48rem]/editor:items-center"
        : "border-slate-200 @min-[40rem]/editor:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] @min-[64rem]/editor:grid-cols-1"
    }`}>
      <ProjectPreview project={project} />
      <div className="min-w-0">
        <span className="inline-flex rounded-full border border-sky-500/50 bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--file-color)]">
          {project.category}
        </span>
        <h3 className={`mt-2 font-bold text-slate-900 ${featured ? "text-2xl" : "text-lg"}`}>{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{project.description}</p>
        <ul className="mt-3 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
              <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              {highlight}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600">{tag}</span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#0078d4] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1483da]">
              View Project <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          ) : (
            <button type="button" disabled title="Project link not available yet" className="inline-flex cursor-not-allowed items-center gap-2 rounded-md bg-[#0078d4] px-3 py-2 text-xs font-semibold text-white opacity-60">
              View Project <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          )}
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-action">
              <FaGithub aria-hidden="true" className="h-3.5 w-3.5" /> GitHub
            </a>
          ) : (
            <button type="button" disabled title="GitHub link not available yet" className="project-action cursor-not-allowed opacity-60">
              <FaGithub aria-hidden="true" className="h-3.5 w-3.5" /> GitHub
            </button>
          )}
          {project.caseStudyUrl && (
            <a href={project.caseStudyUrl} target="_blank" rel="noreferrer" className="project-action">
              <FileText aria-hidden="true" className="h-3.5 w-3.5" /> Case Study
            </a>
          )}
        </div>
        <details className="mt-3 text-xs text-slate-600">
          <summary className="project-action w-fit cursor-pointer list-none">
            <FileText aria-hidden="true" className="h-3.5 w-3.5" /> Project details
            <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />
          </summary>
          <p className="mt-3 border-l-2 border-[#0078d4] pl-3 leading-relaxed">{project.impact}</p>
        </details>
      </div>
    </article>
  );
}

function ProjectPreview({ project }: { project: PortfolioProject }) {
  const applications = project.preview === "applications";
  return (
    <figure className={`min-w-0 overflow-hidden rounded-md border border-white/10 ${applications ? "bg-[#eef2ff]" : "bg-[#17163c]"}`}>
      <div aria-hidden="true" className={`flex items-center gap-1 border-b px-3 py-2 ${applications ? "border-[#dce2f0] bg-[#f9faff]" : "border-white/10 bg-[#24204d]"}`}>
        {["bg-rose-400", "bg-amber-400", "bg-emerald-400"].map((color) => <span key={color} className={`h-1.5 w-1.5 rounded-full ${color}`} />)}
        <span className={`ml-2 truncate text-[9px] font-medium ${applications ? "text-[#475569]" : "text-[#c4b5fd]"}`}>{project.title}</span>
      </div>
      <div aria-hidden="true" className="flex min-h-56">
        <div className={`flex w-10 shrink-0 flex-col items-center gap-5 py-5 ${applications ? "bg-[#2563eb] text-white/80" : "bg-[#201d4a] text-[#a5b4fc]"}`}>
          <LayoutDashboard className="h-4 w-4" />
          <FileText className="h-4 w-4" />
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1 p-4">
          <p className={`text-lg font-bold leading-tight ${applications ? "text-[#172554]" : "text-[#c4b5fd]"}`}>
            {applications ? "Your next chapter starts here." : "Turn ideas into clear plans."}
          </p>
          <p className={`mt-2 text-[10px] ${applications ? "text-[#64748b]" : "text-[#a5a0ca]"}`}>
            {applications ? "Applications. Opportunities. All in one place." : "A little direction. A clearer way forward."}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {(applications ? ["Applications", "Tailored CVs", "Job matches"] : ["Ideas", "Plans", "Priorities"]).map((label) => (
              <div key={label} className={`min-w-0 rounded p-2 ${applications ? "bg-white" : "bg-[#332e65]"}`}>
                <div className={`mb-2 h-1.5 w-6 rounded ${applications ? "bg-[#93c5fd]" : "bg-[#818cf8]"}`} />
                <span className={`block break-words text-[9px] ${applications ? "text-[#475569]" : "text-[#ddd6fe]"}`}>{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {[0, 1, 2].map((row) => (
              <div key={row} className={`flex items-center gap-3 rounded px-2 py-2.5 ${applications ? "bg-white/80" : "bg-white/5"}`}>
                <span className={`h-1.5 w-1/2 rounded ${applications ? "bg-[#cbd5e1]" : "bg-[#655c9b]"}`} />
                <span className={`ml-auto h-2 w-8 rounded-full ${applications ? "bg-[#bfdbfe]" : "bg-[#4f46e5]"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className={`px-3 py-2 text-[9px] ${applications ? "text-[#64748b]" : "text-[#a5a0ca]"}`}>
        Illustrative preview &middot; {project.title}
      </figcaption>
    </figure>
  );
}
