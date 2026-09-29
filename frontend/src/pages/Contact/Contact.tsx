import { FaFacebookF, FaLinkedinIn, FaDiscord } from "react-icons/fa6";
import { contactContent } from "../../data/contact";

const socialIcons = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  discord: FaDiscord,
};

export default function Contact() {
  return (
    <section>
      <h1 className="text-3xl font-extrabold text-slate-900">Contact</h1>
      <p className="mt-2 text-slate-600">{contactContent.intro}</p>

      <form className="mt-8 max-w-lg space-y-4">
        <input
          type="text"
          placeholder="Your name"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
        />
        <textarea
          rows={4}
          placeholder="Your message"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
        />
        <button
          type="button"
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Send message
        </button>
      </form>

      <div className="mt-8 flex gap-2.5">
        {contactContent.socials.map(({ platform, label, href }) => {
          const Icon = socialIcons[platform];
          return (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-700"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
