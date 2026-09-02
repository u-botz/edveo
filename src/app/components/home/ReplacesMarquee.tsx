import shell from "./home.module.css";
import styles from "./replacesMarquee.module.css";

/* The things an institute stops maintaining once Edveo is live. Drawn from the
   hero's own promise ("Replacing WhatsApp + Excel") rather than customer logos —
   at 5 institutes there is no honest logo wall to show yet. */
const ROW_A = [
  "Excel fee sheets",
  "WhatsApp broadcast lists",
  "Attendance registers",
  "Paper fee receipts",
  "Admission diaries",
];

const ROW_B = [
  "Printed timetables",
  "Fee reminder phone calls",
  "Google Forms enquiries",
  "Salary spreadsheets",
  "Staff leave notebooks",
];

function Track({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className={styles.viewport}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ""}`}>
        {/* Duplicated once so the loop seam is invisible; aria-hidden on the
            copy so screen readers read each item a single time. */}
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.group} aria-hidden={copy === 1}>
            {items.map((item) => (
              <li key={item} className={styles.chip}>
                <span className={styles.strike}>{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function ReplacesMarquee() {
  return (
    <section className={`${shell.section} ${shell.groundWhite}`}>
      <div className={shell.container}>
        <div className={styles.lead}>
          <span className={styles.kicker}>What Edveo replaces</span>
        </div>
        <div className={styles.rows}>
          <Track items={ROW_A} />
          <Track items={ROW_B} reverse />
        </div>
      </div>
    </section>
  );
}
