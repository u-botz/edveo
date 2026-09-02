"use client";

import { useEffect, useState } from "react";
import styles from "./headlineRotator.module.css";

/* The rotating second line of the hero headline. Isolated into its own client
   component so HeroSection itself can stay on the server. */

const WORDS = ["Intelligently", "Automatically", "Profitably", "Effortlessly"];

const HOLD_MS = 2600;

export default function HeadlineRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Readers who ask for reduced motion keep the first word, permanently.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, HOLD_MS);

    return () => clearInterval(id);
  }, []);

  return (
    <span className={styles.rotator}>
      {WORDS.map((word, i) => (
        <span
          key={word}
          className={`${styles.word} ${i === index ? styles.wordActive : ""}`}
          /* Every variant stays in the DOM so the stack reserves the width of
             the longest one. Only the first is exposed, so the heading reads as
             one stable sentence rather than whichever frame happened to paint. */
          aria-hidden={i !== 0}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
