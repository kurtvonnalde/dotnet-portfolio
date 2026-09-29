import type { FormEvent } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaDiscord } from "react-icons/fa6";
import { contactContent } from "../../data/contact";

const socialIcons = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  discord: FaDiscord,
};

export default function Contact() {
  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Hi Kurt,\n\n${message}\n\n${name}\n${email}`;

    window.location.href = `mailto:${contactContent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-lg border border-slate-200 border-t-4 border-t-slate-900 bg-white p-5 shadow-sm sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Contact</p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Let's make it real.</h1>
          <p className="mt-3 leading-relaxed text-slate-600">
            {contactContent.intro} Send a note and it will open in your email app, ready to go.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <a
              href={`mailto:${contactContent.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition-colors hover:text-blue-700"
            >
              {contactContent.email}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="flex gap-2.5">
              {contactContent.socials.map(({ platform, label, href }) => {
                const Icon = socialIcons[platform];
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <form onSubmit={sendEmail} className="mt-7 border-t border-slate-200 pt-6">
          <div className="grid gap-4">
          <label className="block text-sm font-medium text-slate-700">
            Your name
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              placeholder="Jane Smith"
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Your email
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="jane@example.com"
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>
          </div>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Your message
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Write your message..."
            className="mt-2 w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-3 text-sm leading-relaxed outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Your email app will open so you can review and send.
          </span>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Send email <Send className="h-4 w-4" />
          </button>
        </div>
        </form>
      </div>
    </section>
  );
}
