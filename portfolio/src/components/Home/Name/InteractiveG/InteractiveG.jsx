import { useEffect, useRef } from "react";
import "./InteractiveG.scss";

function getNextUiState(current) {
  // 0 -> 1 (accent)
  // 1 -> 2 (accent + compact)
  // 2 -> 0 (default)
  return (current + 1) % 3;
}

export default function InteractiveG({
  strength = 6,
  activeRadius = 140,
  maxRotate = 2.5,
  label = "G",
  className = "",
  ...props
}) {
  const ref = useRef(null);

  // Magnetic hover effect (subtle)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const dist = Math.hypot(dx, dy);

      // If cursor is far away, reset and do nothing.
      if (dist > activeRadius) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          el.style.setProperty("--tx", "0px");
          el.style.setProperty("--ty", "0px");
          el.style.setProperty("--rot", "0deg");
        });
        return;
      }

      // Falloff: 0 at edge of radius, 1 at center
      const t = 1 - dist / activeRadius;

      // Normalize direction
      const nx = dx / (dist || 1);
      const ny = dy / (dist || 1);

      // Apply very small movement
      const move = strength * t; // fades in smoothly
      const rot = maxRotate * nx * t;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.setProperty("--tx", `${nx * move}px`);
        el.style.setProperty("--ty", `${ny * move}px`);
        el.style.setProperty("--rot", `${rot}deg`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [strength, activeRadius, maxRotate]);

  useEffect(() => {
    const saved = Number(localStorage.getItem("uiState"));
    const uiState =
      Number.isInteger(saved) && saved >= 0 && saved <= 2 ? saved : 0;
    document.documentElement.dataset.ui = String(uiState);
  }, []);

  const handleClick = () => {
    const current = Number(document.documentElement.dataset.ui || 0);
    const next = getNextUiState(Number.isNaN(current) ? 0 : current);

    document.documentElement.dataset.ui = String(next);
    localStorage.setItem("uiState", String(next));
  };

  return (
    <button
      ref={ref}
      type="button"
      className={`interactive-g ${className}`}
      onClick={handleClick}
      {...props}>
      {label}
    </button>
  );
}
