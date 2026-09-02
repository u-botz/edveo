import shell from "./home.module.css";
import styles from "./statsBand.module.css";

const STATS = [
  { value: "5", label: "Institutes running on Edveo" },
  { value: "5 min", label: "Average time to go live" },
  { value: "₹0", label: "Setup and onboarding fees" },
];

export default function StatsBand() {
  return (
    <section className={`${shell.section} ${shell.groundWhite}`}>
      <div className={shell.container}>
        <div className={styles.grid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.value}>{s.value}</div>
              <div className={styles.label}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
