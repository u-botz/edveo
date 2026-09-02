import styles from "./heroBackdrop.module.css";

/*
  Hero atmosphere: concentric contour rings radiating from the lower corners,
  plus a scatter of glow points. Drawn as SVG so it stays crisp at any width.
  Purely decorative.
*/

/** Rings radiating from a point, thinning and fading as they travel outward. */
function rings(cx: number, cy: number, count: number, step: number, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const r = step * (i + 1);
    // Outer rings sit further from the source, so they read fainter.
    const fade = 1 - i / count;
    return (
      <circle
        key={`${seed}-${i}`}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="url(#edveoRingStroke)"
        strokeWidth={i % 2 === 0 ? 1.1 : 0.7}
        opacity={0.1 + fade * 0.34}
      />
    );
  });
}

/* Fixed scatter — deliberately hand-placed rather than random so the
   composition is stable across renders. */
const DOTS: { x: number; y: number; r: number; o: number }[] = [
  { x: 232, y: 396, r: 3.2, o: 0.85 },
  { x: 118, y: 604, r: 2.1, o: 0.5 },
  { x: 402, y: 300, r: 1.6, o: 0.4 },
  { x: 596, y: 508, r: 2.4, o: 0.55 },
  { x: 918, y: 250, r: 2.0, o: 0.45 },
  { x: 1128, y: 430, r: 3.4, o: 0.8 },
  { x: 1296, y: 604, r: 2.2, o: 0.5 },
  { x: 1372, y: 336, r: 1.7, o: 0.38 },
  { x: 764, y: 690, r: 1.9, o: 0.42 },
];

export default function HeroBackdrop() {
  return (
    <svg
      className={styles.backdrop}
      viewBox="0 0 1440 812"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="edveoRingStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#82B1FA" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#3E7BE8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0B5CFF" stopOpacity="0.05" />
        </linearGradient>

        <radialGradient id="edveoDotGlow">
          <stop offset="0%" stopColor="#DCE8FF" stopOpacity="1" />
          <stop offset="42%" stopColor="#5795F8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0B5CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Lower-left source */}
      <g className={styles.ringsLeft}>{rings(-40, 880, 9, 132, 1)}</g>

      {/* Right source, tighter and higher */}
      <g className={styles.ringsRight}>{rings(1560, 660, 8, 118, 2)}</g>

      {/* Glow points */}
      <g>
        {DOTS.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={d.y} r={d.r * 5} fill="url(#edveoDotGlow)" opacity={d.o * 0.5} />
            <circle cx={d.x} cy={d.y} r={d.r} fill="#DCE8FF" opacity={d.o} />
          </g>
        ))}
      </g>
    </svg>
  );
}
