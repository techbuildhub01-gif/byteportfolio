import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// The signature element: a faint grid of 0/1 "bits". Bits near the pointer
// brighten and tint toward the accent, like a spotlight passing over data.
// With reduced motion it renders once, statically, with no pointer tracking.
export default function ByteMatrix() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const GAP = 26; // px between cells
    const RADIUS = 130; // spotlight radius
    let cells = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };
    let raf = 0;

    const accent = [139, 116, 232]; // --accent-soft
    const teal = [45, 212, 191]; // --glow

    const build = () => {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cells = [];
      const cols = Math.ceil(width / GAP);
      const rows = Math.ceil(height / GAP);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x: c * GAP + GAP / 2,
            y: r * GAP + GAP / 2,
            ch: Math.random() > 0.5 ? "1" : "0",
            // occasional brighter "live" bits for texture
            base: Math.random() > 0.93 ? 0.16 : 0.05,
            flip: Math.random() * 1000,
          });
        }
      }
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const cell of cells) {
        let r = 237,
          g = 238,
          b = 242;
        let alpha = cell.base;

        if (!reduce) {
          const dx = cell.x - pointer.x;
          const dy = cell.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < RADIUS) {
            const k = 1 - dist / RADIUS; // 0..1
            alpha = Math.min(0.95, cell.base + k * 0.9);
            const mix = k * k;
            const col = dx + dy > 0 ? accent : teal; // subtle two-tone field
            r = Math.round(237 + (col[0] - 237) * mix);
            g = Math.round(238 + (col[1] - 238) * mix);
            b = Math.round(242 + (col[2] - 242) * mix);
          }
          // gentle flicker / bit-flip
          if ((t + cell.flip) % 2600 < 16 && Math.random() > 0.5) {
            cell.ch = cell.ch === "1" ? "0" : "1";
          }
        }

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillText(cell.ch, cell.x, cell.y);
      }
    };

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();

    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(0);
    });
    ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
    />
  );
}
