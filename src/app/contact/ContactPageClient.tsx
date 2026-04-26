"use client";

import { useState } from "react";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CtaBanner from "../components/CtaBanner";
import styles from "./contact.module.css";
import { CONTACT_EMAIL } from "@/lib/contactEmail";

const REASONS = [
  "Product Demo",
  "Pricing & Plans",
  "Technical Support",
  "Partnership / Integration",
  "Press & Media",
  "Other",
];

const FAQS = [
  {
    q: "How quickly will I get a response?",
    a: "We reply to all messages within 2 business hours on weekdays (Mon–Sat, 10am–7pm IST). For urgent support, WhatsApp is the fastest channel.",
  },
  {
    q: "Can I schedule a live product demo?",
    a: "Absolutely. Fill in the form and select 'Product Demo' — we'll set up a 30-minute walkthrough of the platform tailored to your institute's needs.",
  },
  {
    q: "Do you offer phone support?",
    a: "WhatsApp is our primary support channel for all plans. Dedicated phone support is available on Academy and Scale plans.",
  },
  {
    q: "I'm a first-time user. Where do I start?",
    a: "Start your 14-day free trial — no credit card needed. You'll get full access to every feature, and our onboarding guide walks you through setup in under an hour.",
  },
];

type FormState = {
  name: string;
  institute: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  institute: "",
  email: "",
  phone: "",
  reason: "",
  message: "",
};

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPageClient() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission — replace with real API call later
    setTimeout(() => {
      console.log("Contact form submission:", form);
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div>
      <SiteNavbar activePage="contact" />

      {/* ── Header ── */}
      <section className={styles.header}>
        <div className={styles.headerBadge}>✦ Get in Touch</div>
        <h1 className={styles.headerHeadline}>We Reply Within 2 Hours.</h1>
        <p className={styles.headerSub}>
          Product question, demo request, or just a &ldquo;does this work for
          my institute?&rdquo; — drop us a message and we&apos;ll get back to
          you fast.
        </p>
      </section>

      {/* ── Contact Grid ── */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>

            {/* ── Form ── */}
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successBox}>
                  <div className={styles.successIcon}>✅</div>
                  <div className={styles.successTitle}>Message Received!</div>
                  <p className={styles.successSub}>
                    Thanks for reaching out. Our team will reply within 2 business
                    hours on WhatsApp or email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles.formTitle}>Send Us a Message</div>
                  <div className={styles.formSubtitle}>
                    All fields marked <span style={{ color: "var(--accent)" }}>*</span> are required.
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="name">
                        Your Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={styles.input}
                        placeholder="Rahul Sharma"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="institute">
                        Institute / Business <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="institute"
                        name="institute"
                        type="text"
                        className={styles.input}
                        placeholder="Premier Academy"
                        value={form.institute}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">
                      Email Address <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={styles.input}
                      placeholder={CONTACT_EMAIL}
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="phone">
                      Phone Number
                    </label>
                    <div className={styles.phoneWrapper}>
                      <span className={styles.phonePrefix}>+91</span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className={styles.phoneInput}
                        placeholder="98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="reason">
                      What do you need help with? <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      className={styles.select}
                      value={form.reason}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select a reason…</option>
                      {REASONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="message">
                      Message <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className={styles.textarea}
                      placeholder="Tell us about your institute and what you're looking for…"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                    id="contact-submit-btn"
                  >
                    {loading ? (
                      "Sending…"
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── Info Panel ── */}
            <aside className={styles.infoPanel}>
              <div className={styles.infoPanelTitle}>Contact Information</div>

              <div className={styles.infoItem}>
                <div className={styles.infoIconWrap}>📞</div>
                <div>
                  <div className={styles.infoLabel}>Phone</div>
                  <div className={styles.infoValue}>+91 XXXXX XXXXX</div>
                  <div className={styles.infoHint}>Mon–Sat, 10am–7pm IST</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIconWrap}>📧</div>
                <div>
                  <div className={styles.infoLabel}>Email</div>
                  <a
                    className={styles.infoEmailLink}
                    href={`mailto:${CONTACT_EMAIL}`}
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <div className={styles.infoHint}>We reply within 2 hours</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIconWrap}>💬</div>
                <div>
                  <div className={styles.infoLabel}>WhatsApp</div>
                  <div className={styles.infoValue}>Fastest response channel</div>
                  <a
                    href="https://wa.me/91XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waBtn}
                  >
                    <WaIcon />
                    Chat Now →
                  </a>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.infoItem}>
                <div className={styles.infoIconWrap}>📍</div>
                <div>
                  <div className={styles.infoLabel}>Location</div>
                  <div className={styles.infoValue}>Bangalore, Karnataka</div>
                  <div className={styles.infoHint}>
                    Online-first company — no walk-ins
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.faqHeading}>Quick Answers</h2>
          <p className={styles.faqSub}>Common questions before you reach out.</p>
          <div className={styles.faqList}>
            {FAQS.map((item, i) => (
              <div
                key={item.q}
                className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span className={styles.faqIcon} aria-hidden>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaBanner
        variant="green"
        headline="Prefer to Talk? We're One Message Away."
        subheadline="Average response time: under 2 hours on WhatsApp."
        primaryLabel="Start Free Trial →"
        secondaryLabel="WhatsApp Us Now"
      />

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
