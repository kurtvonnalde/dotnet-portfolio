import { Braces, Code2, Database, GitBranch, Layers } from "lucide-react";
import { SiDotnet, SiReact, SiTailwindcss, SiVite } from "react-icons/si";
import { FaFacebookF, FaLinkedinIn, FaDiscord } from "react-icons/fa6";
import { contactContent } from "../data/contact";

const socialIcons = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  discord: FaDiscord,
};

export default function StatusBar() {
  return (
    <footer aria-label="Workspace status bar" className="workspace-status-bar sticky bottom-0 z-40 flex h-7 w-full shrink-0 items-center justify-between gap-2 px-2 text-[11px] lg:static">
      <div role="group" aria-label="Built with" tabIndex={0} className="workspace-status-techs flex h-full min-w-0 items-center gap-1 overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white">
        <span title="Portfolio workspace" className="hidden h-full shrink-0 items-center gap-1.5 px-2 lg:inline-flex">
          <GitBranch aria-hidden="true" className="h-3 w-3" /> portfolio
        </span>
        <span title="Frontend: React and TypeScript" className="workspace-status-item">
          <SiReact aria-hidden="true" className="h-3 w-3" /> React + TypeScript
        </span>
        <span title="Backend: ASP.NET Core on .NET 10" className="workspace-status-item">
          <SiDotnet aria-hidden="true" className="h-3 w-3" /> .NET 10
        </span>
        <span title="Styling: Tailwind CSS" className="workspace-status-item">
          <SiTailwindcss aria-hidden="true" className="h-3 w-3" /> Tailwind CSS
        </span>
        <span title="Build tool: Vite" className="workspace-status-item">
          <SiVite aria-hidden="true" className="h-3 w-3" /> Vite
        </span>
        <span title="Database: PostgreSQL via Npgsql" className="workspace-status-item">
          <Database aria-hidden="true" className="h-3 w-3" /> PostgreSQL
        </span>
        <span title="Data access: Entity Framework Core" className="workspace-status-item">
          <Layers aria-hidden="true" className="h-3 w-3" /> EF Core
        </span>
      </div>
      <div className="flex h-full shrink-0 items-center gap-1">
        <span title="Text encoding" className="hidden px-2 lg:inline">UTF-8</span>
        <span title="Line endings" className="hidden px-2 lg:inline">LF</span>
        <span className="hidden items-center gap-1.5 px-2 xl:inline-flex">
          <Code2 aria-hidden="true" className="h-3 w-3" /> TypeScript React
        </span>
        <span className="hidden items-center gap-1.5 px-2 sm:inline-flex">
          <Braces aria-hidden="true" className="h-3 w-3" /> Portfolio
        </span>
        <nav aria-label="Social links" className="flex h-full items-center">
          {contactContent.socials.map(({ platform, label, href }) => {
            const Icon = socialIcons[platform];
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-6 items-center justify-center transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
              >
                <Icon aria-hidden="true" className="h-3 w-3" />
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
