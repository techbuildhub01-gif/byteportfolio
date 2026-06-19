import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { GitHubIcon, LinkedInIcon, XIcon } from "./Icons";
import { profile, web3formsKey } from "../data";

const socials = [
  { Icon: GitHubIcon, href: profile.socials.github, label: "GitHub" },
  { Icon: LinkedInIcon, href: profile.socials.linkedin, label: "LinkedIn" },
  { Icon: XIcon, href: profile.socials.twitter, label: "X (Twitter)" },
].filter((s) => s.href && s.href !== "#");

// becomes true once you've pasted a real Web3Forms key in src/data.js
const formReady = web3formsKey && web3formsKey !== "YOUR_ACCESS_KEY_HERE";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const send = async () => {
    if (!form.email.trim() || !form.message.trim()) return;

    // Fallback: no Web3Forms key set yet → open the visitor's mail app.
    if (!formReady) {
      const subject = encodeURIComponent(`Project enquiry from ${form.name || "your site"}`);
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Portfolio enquiry from ${form.name || "a visitor"}`,
          from_name: "BytePortfolio contact form",
          name: form.name || "Anonymous",
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
    "w-full rounded-lg border border-[var(--color-line)] bg-[rgba(11,12,16,0.5)] px-4 py-3 text-ink placeholder:text-faint transition-colors focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-60";

  const sending = status === "sending";

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
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(45,212,191,0.12)]">
                <Check size={26} className="text-glow" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">Message sent!</h3>
              <p className="mt-2 max-w-xs text-muted">
                Thanks for reaching out — I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 font-mono text-sm text-accent-soft transition-colors hover:text-ink"
              >
                Send another →
              </button>
            </div>
          ) : (
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
                  disabled={sending}
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
                  disabled={sending}
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
                  disabled={sending}
                  placeholder="A few lines about the project…"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <button
                onClick={send}
                disabled={!form.email || !form.message || sending}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-all hover:bg-accent-soft hover:shadow-[0_8px_30px_-8px_var(--color-accent)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
              >
                {sending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowUpRight
                      size={17}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-center font-mono text-xs text-red-400">
                  Something went wrong — please try the email button on the left.
                </p>
              )}

              <p className="text-center font-mono text-xs text-faint">
                {formReady
                  ? "Sends straight to my inbox — no mail app needed."
                  : "opens your mail app — no data leaves the page"}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
