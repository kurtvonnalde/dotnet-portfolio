import { NavLink } from "react-router-dom";
import {
  Home,
  FolderClosed,
  Database,
  Wrench,
  Star,
  User,
  MessageCircle,
  Moon,
  Sparkles,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaDiscord } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import profileImage from "../assets/hero.png";
import { contactContent } from "../data/contact";
import { profile } from "../data/profile";

const socialIcons = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  discord: FaDiscord,
};

const nav = [
  { label: "Home", to: "/", Icon: Home, end: true },
  { label: "Projects", to: "/projects", Icon: FolderClosed },
  { label: "Services", to: "/services", Icon: Database },
  { label: "Tools", to: "/tools", Icon: Wrench },
  { label: "Case Studies", to: "/case-studies", Icon: Star },
  { label: "About", to: "/about", Icon: User },
  { label: "Contact", to: "/contact", Icon: MessageCircle },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen flex-col border-r border-slate-200 bg-[#f5f5ef] p-6">
      <div className="flex flex-col items-center">
        <div className="rounded-full p-1 ring-1 ring-slate-200">
          <img
            src={profileImage}
            alt={profile.name}
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>

        <h2 className="mt-4 flex items-center gap-1.5 text-center text-lg font-bold text-slate-900">
          {profile.name}
          <MdVerified className="h-4 w-4 text-blue-500" />
        </h2>

        <p className="text-center text-sm text-slate-400">{profile.handle}</p>

        <div className="mt-4 flex gap-2.5">
          {contactContent.socials.map(({ platform, label, href }) => {
            const Icon = socialIcons[platform];
            const active = platform === "linkedin";
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors ${
                  active
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-slate-900 hover:bg-slate-700"
                }`}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}

          <button
            type="button"
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-700"
          >
            <Moon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="my-6 border-t border-slate-200" />

      <nav className="space-y-1.5">
        {nav.map(({ label, to, Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:bg-white/60 hover:text-slate-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`h-4 w-4 ${isActive ? "text-orange-500" : "text-slate-400"}`}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="my-6 border-t border-slate-200" />
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <p className="text-xs leading-tight text-slate-400">
            © 2026
            <br />
            {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  );
}
