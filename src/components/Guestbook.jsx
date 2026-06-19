import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // load existing messages when the section mounts
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/guestbook");
        const data = await res.json();
        if (active && res.ok) setMessages(data.messages || []);
      } catch {
        /* ignore load errors */
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.name.trim() || !form.message.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((m) => [data.message, ...m]);
        setForm({ name: "", message: "" });
      } else {
        setError(data.error || "Could not post your message.");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSending(false);
    }
  };

  const fmtDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-[var(--color-line)] bg-[rgba(11,12,16,0.5)] px-4 py-3 text-ink placeholder:text-faint transition-colors focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-60";

  return (
    <section id="guestbook" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionLabel index={5}>guestbook</SectionLabel>

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* left: intro + form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Sign the <span className="text-gradient">guestbook.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Drop a note, say hi, or leave a thought — it'll show up right here for
            everyone to see.
          </p>

          <div className="mt-8 space-y-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-6 sm:p-7">
            <div>
              <label htmlFor="gb-name" className="mb-1.5 block font-mono text-xs text-faint">
                name
              </label>
              <input
                id="gb-name"
                type="text"
                value={form.name}
                onChange={update("name")}
                disabled={sending}
                maxLength={60}
                placeholder="Your name"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="gb-msg" className="mb-1.5 block font-mono text-xs text-faint">
                message
              </label>
              <textarea
                id="gb-msg"
                rows={3}
                value={form.message}
                onChange={update("message")}
                disabled={sending}
                maxLength={500}
                placeholder="Say something nice…"
                className={`${fieldClass} resize-none`}
              />
            </div>

            <button
              onClick={submit}
              disabled={!form.name.trim() || !form.message.trim() || sending}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-all hover:bg-accent-soft hover:shadow-[0_8px_30px_-8px_var(--color-accent)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
            >
              {sending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Posting…
                </>
              ) : (
                "Sign guestbook"
              )}
            </button>

            {error && <p className="text-center font-mono text-xs text-red-400">{error}</p>}
          </div>
        </motion.div>

        {/* right: messages wall */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-faint">
              {loading
                ? "loading…"
                : `${messages.length} message${messages.length === 1 ? "" : "s"}`}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center rounded-2xl border border-[var(--color-line)] py-16">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-line-strong)] border-t-accent" />
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--color-line)] py-16 text-center text-muted">
              No messages yet — be the first to sign! ✍️
            </div>
          ) : (
            <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-4"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium text-ink">{m.name}</span>
                    <span className="shrink-0 font-mono text-xs text-faint">
                      {fmtDate(m.created_at)}
                    </span>
                  </div>
                  <p className="mt-1.5 leading-relaxed text-muted">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
