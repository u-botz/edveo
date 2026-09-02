import shell from "./home.module.css";
import styles from "./featureGrid.module.css";

type Feature = { title: string; body: string; icon: React.ReactNode };

const I = (d: string) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const FEATURES: Feature[] = [
  {
    title: "Fees and invoicing",
    body: "Raise invoices, collect online through Razorpay, and let the reminders chase themselves.",
    icon: I("M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"),
  },
  {
    title: "Attendance",
    body: "Mark students and staff once. It reaches the register, the parent and the payroll together.",
    icon: I("M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"),
  },
  {
    title: "Admissions and enquiries",
    body: "Every enquiry lands in a pipeline with an owner and a next step, instead of a chat thread.",
    icon: I("M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 7a4 4 0 1 0 0 .1M20 8v6M23 11h-6"),
  },
  {
    title: "Timetable and classes",
    body: "Schedule batches, rooms and teachers in one grid — online, in-person or both.",
    icon: I("M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"),
  },
  {
    title: "Staff payroll and leave",
    body: "Salaries, advances and leave balances derive from attendance you already recorded.",
    icon: I("M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"),
  },
  {
    title: "Study material and tests",
    body: "Share videos, notes and assignments, then see exactly who opened what.",
    icon: I("M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"),
  },
  {
    title: "WhatsApp notifications",
    body: "Fee due, absent today, results published — sent where parents actually read them.",
    icon: I("M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"),
  },
  {
    title: "Edveo Intelligence",
    body: "Ask in plain language who is at risk, who hasn't paid, who to call first — and act on the answer.",
    icon: I("M12 2a5 5 0 0 1 5 5v1a4 4 0 0 1 0 8v1a5 5 0 0 1-10 0v-1a4 4 0 0 1 0-8V7a5 5 0 0 1 5-5zM12 8v8"),
  },
];

export default function FeatureGrid() {
  return (
    <section className={`${shell.section} ${shell.groundTint2}`} id="features">
      <div className={shell.container}>
        <div className={shell.heading}>
          <span className={shell.eyebrow}>Everything included</span>
          <h2 className={shell.title}>One platform for the whole institute</h2>
          <p className={shell.subtitle}>
            Not modules you unlock later. Every plan gets the operations stack —
            the tiers only change how many students and branches it covers.
          </p>
        </div>

        <ul className={styles.grid}>
          {FEATURES.map((f) => (
            <li key={f.title} className={styles.card}>
              <span className={styles.icon}>{f.icon}</span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardBody}>{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
