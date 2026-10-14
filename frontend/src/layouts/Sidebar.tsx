import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight, FileCode, Folder, FolderOpen } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaDiscord } from "react-icons/fa6";
import { profile } from "../data/profile";
import { contactContent } from "../data/contact";

const socialIcons = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  discord: FaDiscord,
};

type NavItem = {
  label: string;
  file: string;
  to: string;
  end?: boolean;
};

const pagesNav: NavItem[] = [
  { label: "Home", file: "Home.tsx", to: "/", end: true },
  { label: "Projects", file: "Projects.tsx", to: "/projects" },
  { label: "Services", file: "Services.tsx", to: "/services" },
  { label: "Tools", file: "Tools.tsx", to: "/tools" },
];

const profileNav: NavItem[] = [
  { label: "About", file: "About.tsx", to: "/about" },
  { label: "Contact", file: "Contact.tsx", to: "/contact" },
];

export default function Sidebar() {
  const [rootOpen, setRootOpen] = useState(true);
  const [pagesOpen, setPagesOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(true);

  return (
    <aside className="workspace-sidebar flex h-full w-full flex-col overflow-y-auto border-r lg:w-[260px]">
      <div className="px-4 pb-2 pt-4">
        <span className="workspace-sidebar-heading text-[11px] font-semibold uppercase tracking-[0.12em]">
          Explorer
        </span>
      </div>

      <div className="workspace-sidebar-rule flex items-center gap-2 border-b px-3 pb-3 pt-1">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--avatar-bg)] text-[11px] font-bold text-white">
          {profile.initials}
        </span>
        <div className="min-w-0">
          <p className="workspace-sidebar-title truncate text-xs font-semibold">{profile.name}</p>
          <p className="workspace-sidebar-muted truncate text-[10px]">{profile.role}</p>
        </div>
      </div>

      <nav className="flex-1 py-2 text-[13px]">
        <FolderRow
          depth={0}
          label={profile.name.toUpperCase()}
          open={rootOpen}
          onToggle={() => setRootOpen((current) => !current)}
        />

        {rootOpen && (
          <>
            <FolderRow
              depth={1}
              label="pages"
              open={pagesOpen}
              onToggle={() => setPagesOpen((current) => !current)}
            />
            {pagesOpen && pagesNav.map((item) => <FileRow key={item.to} depth={2} item={item} />)}

            <FolderRow
              depth={1}
              label="profile"
              open={profileOpen}
              onToggle={() => setProfileOpen((current) => !current)}
            />
            {profileOpen && profileNav.map((item) => <FileRow key={item.to} depth={2} item={item} />)}
          </>
        )}
      </nav>

      <div className="workspace-sidebar-rule border-t px-3 py-3">
        <div className="flex items-center justify-center gap-1">
          {contactContent.socials.map(({ platform, label, href }) => {
            const Icon = socialIcons[platform];
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="workspace-sidebar-muted workspace-sidebar-hover flex h-7 w-7 items-center justify-center rounded transition-colors hover:text-[var(--chrome-text)]"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function FolderRow({
  depth,
  label,
  open,
  onToggle,
}: {
  depth: number;
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="workspace-sidebar-hover flex w-full items-center gap-1 py-[3px] pr-2 text-left"
      style={{ paddingLeft: 8 + depth * 14 }}
    >
      {open ? (
        <ChevronDown className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
      )}
      {open ? (
        <FolderOpen className="h-4 w-4 shrink-0 text-[var(--folder-color)]" />
      ) : (
        <Folder className="h-4 w-4 shrink-0 text-[var(--folder-color)]" />
      )}
      <span className="truncate font-medium">{label}</span>
    </button>
  );
}

function FileRow({ depth, item }: { depth: number; item: NavItem }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      title={item.label}
      style={{ paddingLeft: 8 + depth * 14 + 16 }}
      className={({ isActive }) =>
        `flex items-center gap-1.5 py-[3px] pr-2 transition-colors ${
          isActive ? "workspace-sidebar-active" : "workspace-sidebar-hover"
        }`
      }
    >
      <FileCode className="h-4 w-4 shrink-0 text-[var(--file-color)]" />
      <span className="truncate">{item.file}</span>
    </NavLink>
  );
}
