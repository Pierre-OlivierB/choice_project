import { useEffect, useRef } from "react";
import { DIE_PALETTES, drawDie } from "./icosahedron";

export const ROLL_DURATION_MS = 1500;

const CANVAS_SIZE = 240;
const IDLE_SPIN = [0.35, -0.5, 0.1];
// Whole turns, so the die slows down into its rest pose without a jump.
const ROLL_SPIN = [Math.PI * 8, Math.PI * 6, Math.PI * 4];

function easeOutQuint(progress) {
  return 1 - (1 - progress) ** 5;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// state is "idle", "rolling", "success" or "failure". The result is decided
// before the animation starts: the die only reveals it.
function Die3D({ state }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const pixels = CANVAS_SIZE * Math.min(window.devicePixelRatio || 1, 2);
    const scale = pixels / CANVAS_SIZE;
    const palette = DIE_PALETTES[state] || DIE_PALETTES.idle;
    const start = performance.now();
    let frame = 0;

    canvas.width = pixels;
    canvas.height = pixels;
    context.scale(scale, scale);

    function render(spin) {
      drawDie(context, CANVAS_SIZE, spin, palette);
    }

    function idleFrame(time) {
      const t = (time - start) / 1000;

      render([
        IDLE_SPIN[0] + Math.sin(t * 0.7) * 0.22,
        IDLE_SPIN[1] + t * 0.35,
        IDLE_SPIN[2] + Math.cos(t * 0.5) * 0.12,
      ]);
      frame = window.requestAnimationFrame(idleFrame);
    }

    function rollFrame(time) {
      const progress = Math.min((time - start) / ROLL_DURATION_MS, 1);
      const remaining = 1 - easeOutQuint(progress);

      render(ROLL_SPIN.map((turns) => turns * remaining));

      if (progress < 1) {
        frame = window.requestAnimationFrame(rollFrame);
      }
    }

    if (state === "rolling" && !prefersReducedMotion()) {
      frame = window.requestAnimationFrame(rollFrame);
    } else if (state === "idle" && !prefersReducedMotion()) {
      frame = window.requestAnimationFrame(idleFrame);
    } else {
      render(state === "idle" ? IDLE_SPIN : [0, 0, 0]);
    }

    return () => window.cancelAnimationFrame(frame);
  }, [state]);

  return <canvas aria-hidden="true" className="die-canvas" ref={canvasRef} />;
}

export default Die3D;
