import type { Metadata } from "next";
import Link from "next/link";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import CtaBanner from "../components/CtaBanner";
import WhatsAppFloat from "../components/WhatsAppFloat";
import HeroBackdrop from "../components/home/HeroBackdrop";
import { IntelligenceDemoSection } from "@/features/intelligence-demo";
import { COMPANY_WHATSAPP_CTA_URL, COMPANY_WHATSAPP_URL } from "@/lib/companyPublicInfo";
import shell from "../components/home/home.module.css";
import styles from "./product.module.css";

export const metadata: Metadata = {
  title: "Product — Edveo",
  description:
    "Fees, attendance, admissions, timetables and payroll in one system, with AI agents that read your live institute data and act on it.",
};

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const MODULES = [
  {
    title: "Admissions & enquiries",
    body: "Every enquiry lands in a pipeline with an owner and a next step, from first call to enrolled.",
    replaces: "Admission diaries",
    d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 7a4 4 0 1 0 0 .1M20 8v6M23 11h-6",
  },
  {
    title: "Fees & billing",
    body: "Invoices, online collection through Razorpay, installments and discount codes — with reminders that chase themselves.",
    replaces: "Excel fee sheets",
    d: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    title: "Attendance",
    body: "Mark students and staff once. It reaches the register, the parent and the payroll together.",
    replaces: "Attendance registers",
    d: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  },
  {
    title: "Batches & timetable",
    body: "Schedule batches, rooms and faculty in one grid — online, in-person, or a mix of both.",
    replaces: "Printed timetables",
    d: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  },
  {
    title: "Teaching & content",
    body: "Share videos, notes and assignments, run tests, and see exactly who opened what.",
    replaces: "Shared drive links",
    d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  },
  {
    title: "Staff & payroll",
    body: "Salaries, advances and leave balances derive from the attendance you already recorded.",
    replaces: "Salary spreadsheets",
    d: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  },
  {
    title: "Parent communication",
    body: "Fee due, absent today, results published — sent over WhatsApp, where parents actually read them.",
    replaces: "Broadcast lists",
    d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  },
  {
    title: "Reports & analytics",
    body: "Revenue, collection rates, batch performance and drop-off risk — without exporting anything.",
    replaces: "Month-end reconciliation",
    d: "M3 3v18h18M7 15l4-4 3 3 5-6",
  },
];

const AUDIENCES = [
  {
    href: "/teacher",
    title: "I am an independent teacher",
    body: "Manage your batches, share notes and collect fees without the hassle of Excel and WhatsApp groups.",
    d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  },
  {
    href: "/edtech",
    title: "I run an online academy",
    body: "Host recorded courses, run live classes and scale your digital presence on a white-labelled platform.",
    d: "M2 3h20v14H2zM8 21h8M12 17v4",
  },
  {
    href: "/institutions",
    title: "I run a coaching institute",
    body: "Track attendance, manage faculty, process admissions and streamline your offline operations.",
    d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
];

export default function ProductPage() {
  return (
    <main>
      <SiteNavbar activePage="product" />

      {/* Dark page hero — also what keeps the transparent navbar legible up top */}
      <section className={styles.pageHero} data-hero>
        <div className={styles.pageHeroBg}>
          <HeroBackdrop />
        </div>
        <div className={styles.pageHeroInner}>
          <span className={styles.heroEyebrow}>Product overview</span>
          <h1 className={styles.heroTitle}>
            Everything you need to run your institute.{" "}
            <span className={styles.heroAccent}>In one place</span>
          </h1>
          <p className={styles.heroSub}>
            Fees, attendance, admissions, timetables and payroll share a single record — so the
            AI agents can act on all of it instead of guessing.
          </p>
          <div className={styles.heroActions}>
            <a
              href={COMPANY_WHATSAPP_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Book a live demo
            </a>
            <Link href="/pricing" className={styles.btnGhost}>
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Proof: the assistant reading live institute data */}
      <IntelligenceDemoSection />

      <section className={`${shell.section} ${shell.groundFaint}`}>
        <div className={shell.container}>
          <div className={shell.heading}>
            <span className={shell.eyebrow}>What is included</span>
            <h2 className={shell.title}>Eight modules, one system of record</h2>
            <p className={shell.subtitle}>
              Not add-ons you unlock later. Every plan gets the whole operations stack — the
              tiers only change how many students and branches it covers.
            </p>
          </div>

          <ul className={styles.moduleGrid}>
            {MODULES.map((m) => (
              <li key={m.title} className={styles.module}>
                <span className={styles.moduleIcon}>{icon(m.d)}</span>
                <h3 className={styles.moduleTitle}>{m.title}</h3>
                <p className={styles.moduleBody}>{m.body}</p>
                <p className={styles.moduleReplaces}>
                  Replaces <b>{m.replaces}</b>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${shell.section} ${shell.groundTint}`}>
        <div className={shell.container}>
          <div className={shell.heading}>
            <span className={shell.eyebrow}>Pick your setup</span>
            <h2 className={shell.title}>Built for every institution type</h2>
            <p className={shell.subtitle}>
              The same system of record, configured for how you actually teach.
            </p>
          </div>

          <ul className={styles.audienceGrid}>
            {AUDIENCES.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className={styles.audience}>
                  <span className={styles.audienceIcon}>{icon(a.d)}</span>
                  <h3 className={styles.audienceTitle}>{a.title}</h3>
                  <p className={styles.audienceBody}>{a.body}</p>
                  <span className={styles.audienceLink}>Explore &rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        headline="See it running on your own institute's data."
        accentSub="Free to start. No setup fees. Live in 5 minutes."
        primaryLabel="Get a free demo →"
        secondaryLabel="Talk to an Expert"
        secondaryHref={COMPANY_WHATSAPP_URL}
        trustItems={["Free forever", "No credit card required", "Data stored in India", "Cancel anytime"]}
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
