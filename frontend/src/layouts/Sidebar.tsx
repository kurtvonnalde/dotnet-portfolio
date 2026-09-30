import { Link, NavLink } from "react-router-dom";
import {
  Home,
  FolderClosed,
  Database,
  Wrench,
  User,
  MessageCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaDiscord } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import type { LucideIcon } from "lucide-react";
import { contactContent } from "../data/contact";
import { profile } from "../data/profile";

const socialIcons = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  discord: FaDiscord,
};

type NavItem = {
  label: string;
  detail: string;
  to: string;
  Icon: LucideIcon;
  end?: boolean;
};

const mainNav: NavItem[] = [
  { label: "Home", detail: "Overview & updates", to: "/", Icon: Home, end: true },
  { label: "Projects", detail: "Featured work", to: "/projects", Icon: FolderClosed },
  { label: "Services", detail: "What I offer", to: "/services", Icon: Database },
  { label: "Tools", detail: "Tech stack & tools", to: "/tools", Icon: Wrench },
];

const secondaryNav: NavItem[] = [
  { label: "About", detail: "My journey", to: "/about", Icon: User },
  { label: "Contact", detail: "Let's work together", to: "/contact", Icon: MessageCircle },
];

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`flex min-h-screen flex-col border-r border-slate-200 bg-[#f5f5ef] p-6 lg:sticky lg:top-0 lg:h-screen lg:min-h-0 lg:self-start lg:overflow-y-auto ${
        collapsed ? "lg:px-2" : ""
      }`}
    >
      <section
        className={`rounded-2xl bg-gradient-to-br from-[#26366f] via-[#182344] to-[#312765] p-4 text-center text-white shadow-lg shadow-indigo-950/10 ${
          collapsed ? "lg:bg-none lg:p-0 lg:shadow-none" : ""
        }`}
        aria-label="Profile"
      >
        <div className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-xl font-bold ring-2 ring-white/15 ${
          collapsed ? "lg:h-8 lg:w-8 lg:text-xs" : ""
        }`}>
          {profile.initials}
          <span className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-[#1b2854] bg-emerald-400 ${
            collapsed ? "lg:h-2.5 lg:w-2.5" : ""
          }`} />
        </div>

        <h2 className={`mt-3 flex items-center justify-center gap-1.5 text-base font-bold ${collapsed ? "lg:hidden" : ""}`}>
          {profile.name}
          <MdVerified className="h-4 w-4 shrink-0 text-sky-400" />
        </h2>
        <p className={`mt-1 text-xs text-slate-300 ${collapsed ? "lg:hidden" : ""}`}>
          {profile.role}
        </p>
        <div className={`mt-4 flex justify-center gap-2 border-t border-white/10 pt-4 ${collapsed ? "lg:hidden" : ""}`}>
          {contactContent.socials.map(({ platform, label, href }) => {
            const Icon = socialIcons[platform];
            const active = platform === "linkedin";
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors ${
                  active
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}

          <a
            href={`mailto:${contactContent.email}`}
            aria-label="Send email"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

      </section>

      <nav id="primary-navigation" className="mt-6 space-y-5">
        <div>
          <p className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 ${collapsed ? "lg:hidden" : ""}`}>
            Main
          </p>
          <div className="space-y-1">{renderNavItems(mainNav, collapsed)}</div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <p className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 ${collapsed ? "lg:hidden" : ""}`}>
            More
          </p>
          <div className="space-y-1">{renderNavItems(secondaryNav, collapsed)}</div>
        </div>
      </nav>

      <Link
        to="/contact"
        className={`mt-auto flex items-center gap-3 rounded-xl bg-indigo-50 p-3 text-slate-800 transition-colors hover:bg-indigo-100 ${
          collapsed ? "lg:hidden" : "mt-6"
        }`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold">Let's build something great!</span>
          <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
            Have a project in mind? Let's talk.
          </span>
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-indigo-500" />
      </Link>

      <div className="mt-auto border-t border-slate-200 pt-4">
        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          aria-controls="primary-navigation"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggle}
          className={`ml-auto hidden items-center justify-center rounded-md p-2 text-slate-500 transition hover:bg-white hover:text-slate-900 lg:flex ${
            collapsed ? "lg:mx-auto" : ""
          }`}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

    </aside>
  );
}

function renderNavItems(
  items: NavItem[],
  collapsed: boolean,
) {
  return items.map(({ label, detail, to, Icon, end }) => (
    <NavLink
      key={label}
      to={to}
      end={end}
      title={collapsed ? `${label} · ${detail}` : undefined}
      aria-label={label}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl border-l-2 px-3 py-2.5 transition-colors ${
          collapsed ? "lg:justify-center lg:px-0" : ""
        } ${
          isActive
            ? "border-indigo-500 bg-indigo-50 text-slate-950"
            : "border-transparent text-slate-600 hover:bg-white hover:text-slate-950"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-indigo-600" : "text-slate-500"}`} />
          <span className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
            <span className="block text-sm font-semibold leading-tight">{label}</span>
            <span className="mt-0.5 block text-[11px] leading-tight text-slate-500">{detail}</span>
          </span>
        </>
      )}
    </NavLink>
  ));
}
