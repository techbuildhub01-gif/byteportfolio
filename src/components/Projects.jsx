import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { GitHubIcon } from "./Icons";
import { projects } from "../data";

function ProjectCard({ project, index, featured }) {
  const hasLive = project.live && project.live !== "#";
  const hasCode = project.code && project.code !== "#";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className={`edge-glow group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-card)] sm:p-7 ${
        featured ? "lg:col-span-1" : ""
      }`}
    >
      {/* preview image — hides itself if the file isn't in public/ yet */}
      {project.image && (
        <div className="-mx-6 -mt-6 mb-6 overflow-hidden border-b border-[var(--color-line)] sm:-mx-7 sm:-mt-7">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.parentElement.style.display = "none";
            }}
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      {/* index + year */}
      <div className="mb-4 flex items-center justify-between font-mono text-xs text-faint">
        <span className="text-accent-soft">{String(index + 1).padStart(2, "0")}</span>
        <span>{project.year}</span>
      </div>

      <h3 className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-accent-soft sm:text-3xl">
        {project.name}
      </h3>
      {project.role && (
        <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-accent-soft">
          {project.role}
        </p>
      )}

      <p className="mt-3 flex-1 leading-relaxed text-muted">{project.blurb}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <li
            key={t}
            className="rounded-md border border-[var(--color-line)] px-2 py-0.5 font-mono text-xs text-faint"
          >
            {t}
          </li>
        ))}
      </ul>

      {(hasLive || hasCode) && (
        <div className="mt-6 flex items-center gap-3 border-t border-[var(--color-line)] pt-5">
          {hasLive && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-ink transition-colors hover:text-accent-soft"
            >
              Live
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
          {hasLive && hasCode && <span className="text-faint">·</span>}
          {hasCode && (
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-ink"
            >
              <GitHubIcon size={15} /> Code
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionLabel index={3}>selected work</SectionLabel>

      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} featured />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={featured.length + i} />
          ))}
        </div>
      )}
    </section>
  );
}
