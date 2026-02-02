import { useEffect, useMemo, useState } from "react";
import "./SkillFlip.scss";

export default function SkillFlip({
  items = [],
  intervalMs = 1800,
  transitionMs = 500,
}) {
  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const count = safeItems.length;

  const [index, setIndex] = useState(0);
  const [resetting, setResetting] = useState(false);

  // advance one item at a time
  useEffect(() => {
    if (count <= 1) return;

    const id = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, intervalMs);

    return () => clearInterval(id);
  }, [count, intervalMs]);

  // when we hit the duplicate slide, jump back to 0 with no transition
  useEffect(() => {
    if (count <= 1) return;
    if (index !== count) return;

    const t = setTimeout(() => {
      setResetting(true);
      setIndex(0);

      // re-enable transitions next frame
      requestAnimationFrame(() => setResetting(false));
    }, transitionMs);

    return () => clearTimeout(t);
  }, [index, count, transitionMs]);

  if (count === 0) return null;

  const loopItems = count > 1 ? [...safeItems, safeItems[0]] : safeItems;

  return (
    <span className="skill-flip" aria-label={`Skills: ${safeItems.join(", ")}`}>
      <span className="skill-viewport" aria-hidden="true">
        <span
          className={`skill-track ${resetting ? "is-resetting" : ""}`}
          style={{
            "--index": index,
            "--transition-ms": `${transitionMs}ms`,
          }}>
          {loopItems.map((text, i) => (
            <span className="skill-item" key={`${text}-${i}`}>
              {text}
            </span>
          ))}
        </span>
      </span>

      <span className="sr-only">{safeItems.join(", ")}</span>
    </span>
  );
}
