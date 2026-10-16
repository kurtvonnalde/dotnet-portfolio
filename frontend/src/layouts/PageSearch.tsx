import { FileCode, Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { workspacePages } from "../data/workspacePages";

export default function PageSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const listId = useId();
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = workspacePages
    .filter((page) => terms.every((term) => page.searchText.includes(term)))
    .sort((first, second) => {
      const name = query.trim().toLowerCase();
      return Number(second.label.toLowerCase().includes(name)) - Number(first.label.toLowerCase().includes(name));
    });

  useEffect(() => {
    if (open) {
      resultsRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
    }
  }, [selected, open]);

  const choosePage = (to: string) => {
    navigate(to);
    setOpen(false);
    setQuery("");
    setSelected(0);
  };

  return (
    <div
      className="relative mx-2 min-w-0 flex-1 max-w-sm"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="workspace-search flex items-center gap-2 rounded border px-2">
        <Search aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        <input
          role="combobox"
          aria-label="Search pages"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={open && results[selected] ? `${listId}-${selected}` : undefined}
          value={query}
          placeholder="Search pages..."
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              setOpen(false);
            } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              setOpen(true);
              if (results.length) {
                setSelected((current) => (current + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length);
              }
            } else if (event.key === "Enter" && open && results[selected]) {
              event.preventDefault();
              choosePage(results[selected].to);
            }
          }}
          className="h-7 w-full min-w-0 bg-transparent text-xs text-[var(--chrome-text)] placeholder:text-[var(--chrome-muted)] focus:outline-none"
        />
      </div>
      {open && (
        <div className="workspace-search-results absolute left-0 top-full z-50 mt-1 w-full min-w-[160px] overflow-hidden rounded-md border shadow-lg">
          <div ref={resultsRef} id={listId} role="listbox" aria-label="Matching pages" className="max-h-64 overflow-y-auto p-1">
            {results.map((page, index) => (
              <button
                key={page.to}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === selected}
                type="button"
                tabIndex={-1}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choosePage(page.to)}
                className={`flex w-full items-center gap-2 rounded px-2 py-2 text-left text-xs ${
                  index === selected ? "workspace-sidebar-active" : "workspace-sidebar-hover"
                }`}
              >
                <FileCode aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--file-color)]" />
                <span className="min-w-0 flex-1 truncate">{page.label}</span>
                <span className="truncate text-[10px] text-[var(--chrome-muted)]">{page.file}</span>
              </button>
            ))}
          </div>
          {results.length === 0 && <p role="status" className="px-3 py-3 text-xs">No pages found.</p>}
        </div>
      )}
    </div>
  );
}
