import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { skills } from "../data";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionLabel index={2}>skills</SectionLabel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((cat, i) => (
          <motion.div
            key={cat.group}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="edge-glow group rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-5 transition-colors hover:bg-[var(--color-card)]"
          >
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="font-display text-lg font-semibold text-ink">{cat.group}</h3>
              <span className="font-mono text-xs text-faint">
                {String(cat.items.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-[var(--color-line)] bg-[rgba(11,12,16,0.5)] px-2.5 py-1 font-mono text-xs text-muted transition-colors group-hover:border-[var(--color-line-strong)] group-hover:text-ink/90"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
