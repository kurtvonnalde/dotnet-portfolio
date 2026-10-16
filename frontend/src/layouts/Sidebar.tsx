import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight, FileCode, Folder, FolderOpen } from "lucide-react";
import { profile } from "../data/profile";
import { workspacePages } from "../data/workspacePages";

type NavItem = {
  label: string;
  file: string;
  to: string;
  end?: boolean;
};

const pagesNav = workspacePages.filter((page) => page.group === "pages");
const profileNav = workspacePages.filter((page) => page.group === "profile");

export default function Sidebar() {
  const [rootOpen, setRootOpen] = useState(true);
  const [pagesOpen, setPagesOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(true);

  return (
    <aside aria-label="File explorer" className="workspace-sidebar flex h-full w-full flex-col overflow-hidden border-b lg:w-[260px] lg:border-b-0 lg:border-r">
      <div className="workspace-sidebar-rule flex h-9 shrink-0 items-center border-b px-4">
        <span className="workspace-sidebar-heading text-[11px] font-semibold uppercase tracking-[0.12em]">
          Explorer
        </span>
      </div>

      <div className="workspace-sidebar-rule flex shrink-0 items-center gap-2 border-b px-3 py-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--avatar-bg)] text-[11px] font-bold text-white">
          {profile.initials}
        </span>
        <div className="min-w-0">
          <p className="workspace-sidebar-title truncate text-xs font-semibold">{profile.name}</p>
          <p className="workspace-sidebar-muted truncate text-[10px]">{profile.role}</p>
        </div>
      </div>

      <nav aria-label="Portfolio files" className="min-h-0 flex-1 overflow-y-auto py-2 text-[13px]">
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
