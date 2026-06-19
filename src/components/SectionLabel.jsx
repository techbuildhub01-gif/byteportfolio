import { motion } from "framer-motion";

// "// 01 — about" style eyebrow. The number encodes real reading order,
// so it earns its place as navigation rather than decoration.
export default function SectionLabel({ index, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex items-center gap-3 font-mono text-sm"
    >
      <span className="text-accent">//</span>
      <span className="text-faint tabular-nums">{String(index).padStart(2, "0")}</span>
      <span className="text-faint">—</span>
      <span className="uppercase tracking-[0.2em] text-muted">{children}</span>
      <span className="ml-2 h-px flex-1 bg-[var(--color-line)]" />
    </motion.div>
  );
}
