import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&{}[]<>/\\";

// Resolves random glyphs into the target text, character by character.
// Honors reduced-motion by rendering the final text immediately.
export default function DecodeText({ text, className = "", delay = 0, speed = 28 }) {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(reduce ? text : "");
  const frame = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    if (reduce) {
      setOutput(text);
      return;
    }
    let revealed = 0;
    let tick = 0;
    const start = performance.now() + delay;

    const run = (now) => {
      if (now < start) {
        raf.current = requestAnimationFrame(run);
        return;
      }
      tick++;
      if (tick % 2 === 0) revealed += 1;

      const out = text
        .split("")
        .map((ch, i) => {
          if (i < revealed || ch === " ") return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setOutput(out);
      frame.current = tick;

      if (revealed <= text.length) {
        raf.current = requestAnimationFrame(run);
      } else {
        setOutput(text);
      }
    };

    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduce, delay, speed]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{output || "\u00A0"}</span>
    </span>
  );
}
