import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import styles from "./about.module.css";
import { COMPANY_WHATSAPP_URL } from "@/lib/companyPublicInfo";

const STATS = [
  { number: "5,000+", label: "Educators Onboarded", accent: false },
  { number: "₹12 Cr+", label: "Student Fees Processed", accent: true },
  { number: "0%", label: "Commission Charged", accent: true },
  { number: "14 Days", label: "Free Trial — No Card", accent: false },
];

const VALUES = [
  {
    icon: "🔒",
    title: "Your Data, Always Yours",
    desc: "Students, fees, content, and progress data — all of it belongs to you. Export anytime. No lock-in.",
  },
  {
    icon: "🤝",
    title: "No Commissions. Ever.",
    desc: "We charge a flat monthly fee. We never take a cut of what you earn from your students.",
  },
  {
    icon: "🇮🇳",
    title: "Built for India",
    desc: "Razorpay-native payments, WhatsApp automation, Hindi UI-ready, and GST-compliant invoicing.",
  },
  {
    icon: "⚡",
    title: "Speed to Launch",
    desc: "Go from sign-up to live institute in under a day. No tech team, no developers required.",
  },
  {
    icon: "🧠",
    title: "AI That Actually Helps",
    desc: "AI-generated quiz questions, lesson summaries, and student insights — built in, not bolted on.",
  },
  {
    icon: "📞",
    title: "Real Human Support",
    desc: "WhatsApp-first support with under 2-hour response times. A real person, every time.",
  },
];

const TEAM = [
  { initials: "SN", name: "Sayooj NS", role: "Founder" },
  { initials: "SP", name: "Sayanth P", role: "Co-founder" },
];

const TIMELINE = [
  {
    year: "2022",
    title: "The Problem We Lived",
    desc: "Every educator we knew was stitching together 5 different tools — Zoom, Google Forms, Razorpay, WhatsApp, and a spreadsheet. Something had to give.",
  },
  {
    year: "2023",
    title: "First Version, Three Institutes",
    desc: "We built the first version of Edveo for coaching institutes in Kerala. Fee management, quizzes, attendance, and admissions — all in one place.",
  },
  {
    year: "2024",
    title: "Edveo Goes Public",
    desc: "We launched publicly with 3 tiers, no commissions, and a 14-day free trial. 5,000+ educators joined in the first year.",
  },
];

export default function AboutPageClient() {
  return (
    <div>
      <SiteNavbar activePage="about" />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>✦ Our Story</div>
        <h1 className={styles.heroHeadline}>
          Built by Educators.{" "}
          <span className={styles.heroAccent}>For Educators.</span>
        </h1>
        <p className={styles.heroSub}>
          We started Edveo because we lived the problem — scattered tools,
          commission-heavy platforms, and zero ownership of student data. We
          built the platform we wished existed.
        </p>
      </section>

      {/* ── Stats Strip ── */}
      <div className={styles.statsStrip}>
        <div className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statNumber}>
                <span className={s.accent ? styles.statAccent : undefined}>
                  {s.number}
                </span>
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mission & Vision ── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>What Drives Us</div>
          <h2 className={styles.sectionHeadline}>Mission & Vision</h2>
          <div className={styles.missionGrid}>
            <div className={`${styles.missionCard} ${styles.missionCardDark}`}>
              <div className={styles.missionLabel}>Our Mission</div>
              <p className={styles.missionText}>
                Make every educator financially independent. No platform tax. No
                data lock-in. No middleman between you and your students.
              </p>
            </div>
            <div className={`${styles.missionCard} ${styles.missionCardLight}`}>
              <div className={styles.missionLabel}>Our Vision</div>
              <p className={styles.missionText}>
                An India where any teacher — in any city, any subject — can run a
                professionally branded online institute from day one, without
                writing a single line of code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline / Story ── */}
      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>How We Got Here</div>
          <h2 className={styles.sectionHeadline}>Our Story</h2>
          <div className={styles.timeline}>
            {TIMELINE.map((item) => (
              <div key={item.year} className={styles.timelineItem}>
                <div className={styles.timelineYear}>
                  <div className={styles.timelineYearDot} />
                </div>
                <div className={styles.timelineYearLabel}>{item.year}</div>
                <div className={styles.timelineTitle}>{item.title}</div>
                <p className={styles.timelineDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>What We Stand For</div>
          <h2 className={styles.sectionHeadline}>Our Values</h2>
          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <div className={styles.valueTitle}>{v.title}</div>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>The People Behind Edveo</div>
          <h2 className={styles.sectionHeadline}>Our Team</h2>
          <div className={styles.teamGrid}>
            {TEAM.map((member) => (
              <div key={member.name} className={styles.teamCard}>
                <div className={styles.teamAvatar}>{member.initials}</div>
                <div className={styles.teamName}>{member.name}</div>
                <div className={styles.teamRole}>{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hiring Strip ── */}
      <div className={styles.hiringStrip}>
        <h2 className={styles.hiringHeadline}>
          We&apos;re Building the Future of Indian Education.
        </h2>
        <p className={styles.hiringHint}>
          Join us — and help every educator in India succeed.
        </p>
        <div className={styles.hiringBtns}>
          <a href="#careers" className={styles.btnWhite}>
            View Open Roles →
          </a>
          <a
            href={COMPANY_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGreenOutline}
          >
            Chat with Us
          </a>
        </div>
      </div>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
