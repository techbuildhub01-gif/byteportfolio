import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { GitHubIcon, LinkedInIcon, XIcon } from "./Icons";
import { profile } from "../data";

const socials = [
  { Icon: GitHubIcon, href: profile.socials.github, label: "GitHub" },
  { Icon: LinkedInIcon, href: profile.socials.linkedin, label: "LinkedIn" },
  { Icon: XIcon, href: profile.socials.twitter, label: "X (Twitter)" },
].filter((s) => s.href && s.href !== "#");

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const send = () => {
    const subject = encodeURIComponent(`Project enquiry from ${form.name || "your site"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-[var(--color-line)] bg-[rgba(11,12,16,0.5)] px-4 py-3 text-ink placeholder:text-faint transition-colors focus:border-[var(--color-accent)] focus:outline-none";

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionLabel index={4}>contact</SectionLabel>

      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* pitch + direct links */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Have something <span className="text-gradient">worth building?</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            I'm open to freelance projects, full-time roles, and the occasional ambitious
            side-quest. Tell me what you're working on.
          </p>

          <button
            onClick={copyEmail}
            className="group mt-8 inline-flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 font-mono text-sm transition-colors hover:bg-[var(--color-card)]"
          >
            <Mail size={16} className="text-accent-soft" />
            <span className="text-ink">{profile.email}</span>
            {copied ? (
              <Check size={15} className="text-glow" />
            ) : (
              <Copy size={15} className="text-faint transition-colors group-hover:text-ink" />
            )}
          </button>

          <div className="mt-8 flex items-center gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="rounded-xl border border-[var(--color-line)] p-3 text-muted transition-colors hover:border-[var(--color-line-strong)] hover:text-ink"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-6 sm:p-8"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-faint">
                name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={update("name")}
                placeholder="Jane Doe"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-faint">
                email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="jane@company.com"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-faint">
                message
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={update("message")}
                placeholder="A few lines about the project…"
                className={`${fieldClass} resize-none`}
              />
            </div>
            <button
              onClick={send}
              disabled={!form.message}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-all hover:bg-accent-soft hover:shadow-[0_8px_30px_-8px_var(--color-accent)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
            >
              Send message
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <p className="text-center font-mono text-xs text-faint">
              opens your mail app — no data leaves the page
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
