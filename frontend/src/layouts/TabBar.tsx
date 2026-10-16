import { useLocation } from "react-router-dom";
import { FileCode, Moon, Sun } from "lucide-react";
import { workspacePages } from "../data/workspacePages";
import PageSearch from "./PageSearch";

export type WorkspaceTheme = "light" | "dark";

export default function TabBar({
  theme,
  onToggleTheme,
}: {
  theme: WorkspaceTheme;
  onToggleTheme: () => void;
}) {
  const { pathname } = useLocation();
  const active =
    workspacePages.find((tab) => (tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to))) ?? workspacePages[0];

  return (
    <div className="workspace-tab-strip flex h-9 shrink-0 items-center justify-between border-b">
      <div className="workspace-tab flex h-full shrink-0 items-center gap-2 border-r px-3 text-xs font-medium">
        <FileCode className="h-3.5 w-3.5 shrink-0 text-[#519aba]" />
        <span>{active.file}</span>
      </div>
      <PageSearch />
      <button
        type="button"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        onClick={onToggleTheme}
        className="workspace-theme-button ml-auto mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded transition-colors"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  );
}
