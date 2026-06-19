import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { about, profile } from "../data";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionLabel index={1}>about</SectionLabel>

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="edge-glow group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)]">
            {/* fallback: initials on a grid — shows if no photo or photo fails to load */}
            <div className="bg-grid absolute inset-0 opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-7xl font-bold text-[var(--color-card)]">
                {profile.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
            </div>

            {/* your photo — drop the file at public/profile.jpg (path set in data.js) */}
            {profile.photo && profile.photo !== "#" && (
              <img
                src={profile.photo}
                alt={profile.name}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-[var(--color-line)] bg-[rgba(11,12,16,0.7)] px-4 py-3 backdrop-blur-sm">
              <span className="font-mono text-xs text-muted">{profile.location}</span>
              <span className="font-mono text-xs text-glow">● online</span>
            </div>
          </div>
        </motion.div>

        {/* copy + log */}
        <div>
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="mb-5 text-lg leading-relaxed text-muted [&>strong]:text-ink"
            >
              {p}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-8 overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)]"
          >
            <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-2.5">
              <Terminal size={14} className="text-accent-soft" />
              <span className="font-mono text-xs text-faint">build.log</span>
            </div>
            <dl className="divide-y divide-[var(--color-line)]">
              {about.log.map((row) => (
                <div key={row.k} className="flex gap-4 px-4 py-3 font-mono text-sm">
                  <dt className="w-20 shrink-0 text-accent-soft">{row.k}</dt>
                  <dd className="text-ink/90">{row.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
