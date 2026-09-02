"use client";

import { useState } from "react";
import shell from "./home.module.css";
import styles from "./faqAccordion.module.css";

/* Same answers as /pricing, trimmed to the questions an institute owner asks
   before booking a demo. */
const FAQS = [
  {
    q: "Is there really no credit card required to start?",
    a: "Correct. You can get started with no payment information required. Upgrade only when you need more capacity or advanced features — there are no automatic charges.",
  },
  {
    q: "Is there a setup fee or implementation charge?",
    a: "None. No setup fee, no implementation charge, no onboarding cost. You go live the same day.",
  },
  {
    q: "Do you support Razorpay for fee collection?",
    a: "Yes. Razorpay is the default payment processor for all Indian billing — both your subscription to Edveo and the fees you collect from your students.",
  },
  {
    q: "Can I switch between plans after I sign up?",
    a: "Yes. Upgrade anytime, effective immediately. Downgrade at the end of your billing cycle. There is no penalty either way.",
  },
  {
    q: "What happens if I exceed my student limit?",
    a: "You are notified at 90% of your limit. You can upgrade immediately or archive inactive students. We never cut off access suddenly.",
  },
  {
    q: "Where is our institute's data stored?",
    a: "In India. Your student records, fee history and staff data stay on Indian infrastructure.",
  },
];

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={`${shell.section} ${shell.groundFaint2}`} id="faq">
      <div className={shell.container}>
        <div className={shell.heading}>
          <span className={shell.eyebrow}>FAQ</span>
          <h2 className={shell.title}>Everything you need to know</h2>
          <p className={shell.subtitle}>
            The questions institute owners ask us before the first demo.
          </p>
        </div>

        <div className={styles.list}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
                <h3 className={styles.qHeading}>
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={styles.qText}>{f.q}</span>
                    <span className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ""}`}>
                      <Chevron />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={styles.panel}
                  hidden={!isOpen}
                >
                  <p className={styles.answer}>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
