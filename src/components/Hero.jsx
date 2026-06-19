import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ByteMatrix from "./ByteMatrix";
import DecodeText from "./DecodeText";
import { GitHubIcon, LinkedInIcon, XIcon } from "./Icons";
import { profile, stats } from "../data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const socials = [
  { Icon: GitHubIcon, href: profile.socials.github, label: "GitHub" },
  { Icon: LinkedInIcon, href: profile.socials.linkedin, label: "LinkedIn" },
  { Icon: XIcon, href: profile.socials.twitter, label: "X (Twitter)" },
].filter((s) => s.href && s.href !== "#");

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      {/* signature background */}
      <div className="absolute inset-0 z-0">
        <ByteMatrix />
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl px-5 py-28 sm:px-8"
      >
        {/* status pill */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[rgba(20,22,29,0.6)] px-3.5 py-1.5 font-mono text-xs text-muted backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
            </span>
            {profile.status}
          </span>
        </motion.div>

        {/* headline */}
        <h1 className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.4rem]">
          {profile.headline.map((line, i) => (
            <motion.span
              key={i}
              variants={item}
              className={`block ${
                i === profile.headline.length - 1 ? "text-gradient" : "text-ink"
              }`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* role + decoded tagline */}
        <motion.div variants={item} className="mt-7 max-w-2xl">
          <div className="font-mono text-sm text-accent-soft">
            <DecodeText text={`> ${profile.role}`} delay={650} />
          </div>
          <p className="mt-3 text-lg leading-relaxed text-muted sm:text-xl">{profile.tagline}</p>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-all hover:bg-accent-soft hover:shadow-[0_8px_30px_-8px_var(--color-accent)] active:scale-95"
          >
            View selected work
            <ArrowDown size={17} className="transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-6 py-3 font-medium text-ink transition-colors hover:bg-[var(--color-card)]"
          >
            Get in touch
          </a>
          <div className="ml-1 flex items-center gap-1">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="rounded-full p-2.5 text-muted transition-colors hover:bg-[var(--color-card)] hover:text-ink"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* stats */}
        <motion.dl
          variants={item}
          className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-[var(--color-line)] pt-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-3xl font-bold text-ink sm:text-4xl">{s.value}</dt>
              <dd className="mt-1 font-mono text-xs uppercase tracking-wider text-faint">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
