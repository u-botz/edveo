import shell from "./home.module.css";
import styles from "./testimonials.module.css";

/* The two real, attributable quotes — moved out of the hero so the fold isn't
   carrying them, and restyled for a light ground. */
const QUOTES = [
  {
    quote:
      "Fee collection used to take my staff 3 days every month. Now it's done in the morning automatically.",
    name: "Sayooj Neduveli",
    institute: "Mentora LearnX, Manjeri",
    initial: "S",
  },
  {
    quote:
      "The AI told me which students were about to drop out before I even noticed. That alone is worth it.",
    name: "Aiswarya",
    institute: "Mentora Junior, Manjeri",
    initial: "A",
  },
];

export default function Testimonials() {
  return (
    <section className={`${shell.section} ${shell.groundWhite}`}>
      <div className={shell.container}>
        <div className={shell.heading}>
          <span className={shell.eyebrow}>From the institutes</span>
          <h2 className={shell.title}>Run by people who were doing this on paper last year</h2>
          <p className={shell.subtitle}>
            Edveo is built in Kerala, with the institutes using it. These are two of them.
          </p>
        </div>

        <div className={styles.row}>
          {QUOTES.map((q) => (
            <figure key={q.name} className={styles.card}>
              <span className={styles.mark} aria-hidden="true">&ldquo;</span>
              <blockquote className={styles.quote}>{q.quote}</blockquote>
              <figcaption className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">{q.initial}</span>
                <span className={styles.authorText}>
                  <span className={styles.name}>{q.name}</span>
                  <span className={styles.institute}>{q.institute}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
