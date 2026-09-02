import shell from "./home.module.css";
import styles from "./statsBand.module.css";

const STATS = [
  { value: "10K+", label: "Students on the platform" },
  { value: "50+", label: "Institutes running Edveo" },
  { value: "0%", label: "Commission on fees you collect" },
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
