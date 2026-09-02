import styles from "./heroWaves.module.css";

/*
  Ambient light-trail streaks behind the hero. Drawn as a fan of long bezier
  sweeps rather than a bitmap so it stays crisp at any width and costs nothing
  to ship. Purely decorative — hidden from assistive tech.
*/

const COUNT = 11;

/** One sweep per index, fanning upward and spreading as it crosses the frame. */
function sweep(i: number): string {
  const t = i / (COUNT - 1); // 0 → 1 across the fan

  const startY = 812 - t * 150;
  const c1x = 300 - t * 150;
  const c1y = 660 - t * 250;
  const c2x = 860 - t * 190;
  const c2y = 604 - t * 330;
  const endY = 336 - t * 300;

  return `M -80 ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, 1520 ${endY}`;
}

export default function HeroWaves() {
  return (
    <svg
      className={styles.waves}
      viewBox="0 0 1440 812"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Streaks brighten mid-span and dissolve at both edges. */}
        <linearGradient id="edveoWaveStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5795F8" stopOpacity="0" />
          <stop offset="28%" stopColor="#82B1FA" stopOpacity="0.55" />
          <stop offset="58%" stopColor="#DCE8FF" stopOpacity="0.85" />
          <stop offset="82%" stopColor="#5795F8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0B5CFF" stopOpacity="0" />
        </linearGradient>

        <filter id="edveoWaveGlow" x="-10%" y="-40%" width="120%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Blurred copy underneath supplies the bloom. */}
      <g filter="url(#edveoWaveGlow)" opacity="0.5">
        {Array.from({ length: COUNT }, (_, i) => (
          <path
            key={`glow-${i}`}
            d={sweep(i)}
            fill="none"
            stroke="url(#edveoWaveStroke)"
            strokeWidth={i % 3 === 0 ? 3.5 : 2}
          />
        ))}
      </g>

      {/* Crisp strokes on top. */}
      <g>
        {Array.from({ length: COUNT }, (_, i) => (
          <path
            key={`line-${i}`}
            d={sweep(i)}
            fill="none"
            stroke="url(#edveoWaveStroke)"
            strokeWidth={i % 3 === 0 ? 1.5 : 0.9}
            opacity={0.35 + (i % 4) * 0.14}
          />
        ))}
      </g>
    </svg>
  );
}
