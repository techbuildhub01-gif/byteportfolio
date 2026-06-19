import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// A soft radial glow that trails the pointer. Disabled for touch / reduced
// motion. Sits behind content (-z) and uses screen blend so it only lifts
// the darks, never washes out text.
export default function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const move = (e) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full opacity-60 mix-blend-screen"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(110,86,207,0.22),rgba(110,86,207,0.06)_40%,transparent_70%)]" />
    </motion.div>
  );
}
