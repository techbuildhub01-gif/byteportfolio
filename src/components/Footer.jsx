import { ArrowUp } from "lucide-react";
import { nav, profile } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="text-accent">&lt;</span>
            <span>{profile.brand}</span>
            <span className="text-glow">/&gt;</span>
          </a>
          <p className="mt-2 max-w-xs text-sm text-faint">
            Built by {profile.name} with React, Vite & Framer Motion.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="font-mono text-sm text-muted transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <span className="font-mono text-xs text-faint">© {year} {profile.name}</span>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
