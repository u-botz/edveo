import shell from "./home.module.css";
import styles from "./comparisonBento.module.css";

const ROWS: { label: string; before: string; after: string }[] = [
  { label: "Fee collection", before: "Excel sheet + reminder calls", after: "Auto-invoiced, auto-chased" },
  { label: "Attendance", before: "Paper register, typed up later", after: "Marked once, visible instantly" },
  { label: "Admissions", before: "Enquiries lost in WhatsApp", after: "Tracked pipeline with follow-ups" },
  { label: "Staff payroll", before: "A second spreadsheet", after: "Salaries and leave in one ledger" },
  { label: "Who is falling behind", before: "Nobody finds out until the exam", after: "Flagged by AI, weeks earlier" },
];

function Cross() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function ComparisonBento() {
  return (
    <section className={`${shell.section} ${shell.groundFaint}`} id="how-it-works">
      <div className={shell.container}>
        <div className={shell.heading}>
          <span className={shell.eyebrow}>The difference</span>
          <h2 className={shell.title}>Five tools that don&apos;t talk to each other. Or one that does.</h2>
          <p className={shell.subtitle}>
            Most institutes don&apos;t lack software — they have too much of it, none of it connected.
            Edveo replaces the stack, not just one part of it.
          </p>
        </div>

        {/* Two-panel bento with the VS disc straddling the seam */}
        <div className={styles.bento}>
          <div className={`${styles.panel} ${styles.panelBefore}`}>
            <span className={styles.panelTag}>Today</span>
            <h3 className={styles.panelTitle}>Excel, WhatsApp, a register and a prayer</h3>
            <p className={styles.panelBody}>
              Every number lives somewhere different. Reconciling them is somebody&apos;s
              whole week, every month.
            </p>
          </div>

          <div className={styles.vsDisc} aria-hidden="true">VS</div>

          <div className={`${styles.panel} ${styles.panelAfter}`}>
            <span className={`${styles.panelTag} ${styles.panelTagAfter}`}>With Edveo</span>
            <h3 className={styles.panelTitle}>One system, and agents that work it</h3>
            <p className={styles.panelBody}>
              Fees, attendance, admissions and payroll share one record — so the
              AI can act on all of it instead of guessing.
            </p>
          </div>
        </div>

        {/* Row-by-row comparison; the Edveo column is outlined top to bottom */}
        <div className={styles.tableScroll}>
          <div className={styles.table} role="table" aria-label="Before and after comparison">
            <div className={styles.thead} role="row">
              <div className={styles.thLabel} role="columnheader" />
              <div className={styles.thBefore} role="columnheader">Without Edveo</div>
              <div className={styles.thAfter} role="columnheader">
                <span className={styles.thAfterBadge}>Edveo</span>
              </div>
            </div>

            {ROWS.map((r, i) => (
              <div className={styles.tr} role="row" key={r.label} data-last={i === ROWS.length - 1 || undefined}>
                <div className={styles.tdLabel} role="cell">{r.label}</div>
                <div className={styles.tdBefore} role="cell">
                  <span className={styles.iconBad}><Cross /></span>
                  {r.before}
                </div>
                <div className={styles.tdAfter} role="cell">
                  <span className={styles.iconGood}><Check /></span>
                  {r.after}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
