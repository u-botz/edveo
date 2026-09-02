import styles from "./heroSideCards.module.css";

/*
  The flanking elements around the hero screen: three agent-activity cards on
  the left joined to the device by dashed connectors, and an Ask Edveo
  conversation panel overlapping the right edge. Decorative.
*/

const CARDS = [
  {
    tone: "good",
    title: "Fee reminders sent",
    sub: "to 23 parents",
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .1M19 8v6M22 11h-6",
  },
  {
    tone: "warn",
    title: "Arun M. absent",
    sub: "for a 3rd day",
    d: "M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  },
  {
    tone: "info",
    title: "New enquiry",
    sub: "Class 11 Biology",
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15h6",
  },
];

export function HeroLeftCards() {
  return (
    <div className={styles.leftRail}>
      {/* Dashed connectors, drawn behind the cards and pointing at the screen */}
      <svg className={styles.connectors} viewBox="0 0 300 420" aria-hidden="true" focusable="false">
        <defs>
          <marker id="edveoArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="rgba(160,190,240,0.75)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {[
          "M 196 46 C 244 60, 258 86, 292 112",
          "M 196 206 C 240 206, 254 206, 292 206",
          "M 196 366 C 244 352, 258 326, 292 300",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(160,190,240,0.42)"
            strokeWidth="1.4"
            strokeDasharray="5 6"
            strokeLinecap="round"
            markerEnd="url(#edveoArrow)"
          />
        ))}
      </svg>

      {CARDS.map((c) => (
        <div key={c.title} className={styles.card}>
          <span className={`${styles.icon} ${styles[c.tone]}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={c.d} />
            </svg>
          </span>
          <span className={styles.cardText}>
            <span className={styles.cardTitle}>{c.title}</span>
            <span className={styles.cardSub}>{c.sub}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function HeroAskPanel() {
  return (
    <div className={styles.askPanel}>
      <div className={styles.askHead}>
        <span className={styles.askAvatar}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5 10.1 10.9 5.5 9l4.6-1.4z" />
          </svg>
        </span>
        <span className={styles.askName}>Ask Edveo</span>
        <span className={styles.askBadge}>AI</span>
      </div>

      <div className={styles.askQuestion}>Who hasn&rsquo;t paid this month?</div>

      <div className={styles.askAnswer}>
        <p className={styles.answerLine}>23 students have pending fees.</p>
        <p className={styles.answerMeta}>Total outstanding</p>
        <p className={styles.answerValue}>₹68,400</p>
        <span className={styles.answerLink}>View students →</span>
      </div>

      <div className={styles.askInput}>
        <span className={styles.askPlaceholder}>Ask anything…</span>
        <span className={styles.askSend}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
