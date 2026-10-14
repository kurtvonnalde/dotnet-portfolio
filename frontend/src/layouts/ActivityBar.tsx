import { Files, MessageSquareText, Download } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ActivityBarProps = {
  explorerOpen: boolean;
  chatOpen: boolean;
  onToggleExplorer: () => void;
  onToggleChat: () => void;
};

export default function ActivityBar({
  explorerOpen,
  chatOpen,
  onToggleExplorer,
  onToggleChat,
}: ActivityBarProps) {
  return (
    <div className="workspace-activity-bar hidden w-12 shrink-0 flex-col items-center justify-between border-r py-2 lg:flex">
      <div className="flex flex-col items-center gap-1">
        <ActivityIcon label="Explorer" active={explorerOpen} onClick={onToggleExplorer} Icon={Files} />
        <ActivityIcon label="Chat" active={chatOpen} onClick={onToggleChat} Icon={MessageSquareText} />
      </div>

      <a
        href="/doc/Kurt-Vonn-Alde-CV.pdf"
        download="Kurt-Vonn-Alde-CV.pdf"
        aria-label="Download CV"
        title="Download CV"
        className="flex h-11 w-11 items-center justify-center text-[var(--chrome-muted)] transition-colors hover:text-[var(--chrome-text)]"
      >
        <Download className="h-5 w-5" />
      </a>
    </div>
  );
}

function ActivityIcon({
  label,
  active,
  onClick,
  Icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  Icon: LucideIcon;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      onClick={onClick}
      className={`relative flex h-11 w-11 items-center justify-center transition-colors ${
        active ? "text-[var(--chrome-text)]" : "text-[var(--chrome-muted)] hover:text-[var(--chrome-text)]"
      }`}
    >
      {active && <span className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-[var(--chrome-text)]" />}
      <Icon className="h-5 w-5" />
    </button>
  );
}
