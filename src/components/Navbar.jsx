import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav, profile } from "../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled
            ? "my-3 rounded-full border border-[var(--color-line)] bg-[rgba(11,12,16,0.7)] py-2.5 backdrop-blur-xl"
            : "my-4 border border-transparent py-3"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2 font-display text-lg font-bold">
          <span className="text-accent">&lt;</span>
          <span>{profile.brand}</span>
          <span className="text-glow">/&gt;</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-full px-4 py-2 font-mono text-sm text-muted transition-colors hover:bg-[var(--color-card)] hover:text-ink"
            >
              {n.label}
            </a>
          ))}
          {profile.resumeUrl !== "#" && (
            <a
              href={profile.resumeUrl}
              className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-mono text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-95"
            >
              Résumé <ArrowUpRight size={15} />
            </a>
          )}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-ink transition-colors hover:bg-[var(--color-card)] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-4 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[rgba(11,12,16,0.92)] p-2 backdrop-blur-xl md:hidden"
          >
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-mono text-sm text-muted transition-colors hover:bg-[var(--color-card)] hover:text-ink"
              >
                {n.label}
              </a>
            ))}
            {profile.resumeUrl !== "#" && (
              <a
                href={profile.resumeUrl}
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-between rounded-xl bg-ink px-4 py-3 font-mono text-sm font-medium text-bg"
              >
                Résumé <ArrowUpRight size={16} />
              </a>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
