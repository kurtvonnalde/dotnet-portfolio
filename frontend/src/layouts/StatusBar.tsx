import { FileCode } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaDiscord } from "react-icons/fa6";
import { contactContent } from "../data/contact";
import { profile } from "../data/profile";

const socialIcons = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  discord: FaDiscord,
};

export default function StatusBar() {
  return (
    <footer aria-label="Workspace status bar" className="workspace-status-bar sticky bottom-0 z-40 flex h-7 w-full shrink-0 items-center justify-between gap-3 px-3 text-[11px] lg:static">
      <div className="flex min-w-0 items-center gap-2">
        <FileCode aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{profile.name}</span>
        <span className="hidden opacity-80 sm:inline">Portfolio</span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden sm:inline">TypeScript React</span>
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
                className="flex h-7 w-8 items-center justify-center transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
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
