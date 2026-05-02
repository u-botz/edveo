import Link from "next/link";
import styles from "./hero.module.css";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function TeacherIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
      <path d="M2 20c0-4 4-7 10-7s10 3 10 7" />
    </svg>
  );
}

function EdtechIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3-3 3" />
      <path d="M13 14h4" />
    </svg>
  );
}

function InstitutionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}></div>
      <div className={styles.heroContainer}>
        
        {/* Eyebrow Badge */}
        <div className={styles.eyebrowBadge}>
          <span className={styles.eyebrowBadgeTag}>
            <span className={styles.eyebrowBadgeDot}></span> NEW
          </span>
          <span className={styles.eyebrowBadgeText}>Introducing Edveo Intelligence™ — AI inside every workflow</span>
          <span className={styles.eyebrowBadgeIcon}><ArrowRightIcon /></span>
        </div>

        {/* Headline */}
        <h1 className={styles.heroHeadline}>
          Your institute runs itself.
          <br />
          You just teach.
        </h1>

        {/* Sub-headline */}
        <p className={styles.heroSub}>
          Edveo Intelligence™ handles your fees, your leads, your attendance, your student follow-ups — so you can focus entirely on teaching.{" "}
          <span className={styles.darkText}>Zero commission. Built for India.</span>
        </p>

        {/* Actions */}
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.primaryButton}>
            Start for free <ArrowRightIcon />
          </Link>
          <button className={styles.secondaryButton}>
            <PlayIcon /> See how it works
          </button>
        </div>

        {/* Micro-copy */}
        <p className={styles.microCopy}>
          14-day free trial &middot; No credit card &middot; Live in 1 min
        </p>

        {/* Audience cards */}
        <div className={styles.audienceCards} role="group" aria-label="Choose your path">
          <Link href="/teacher" className={styles.audienceCard} data-variant="teachers">
            <div className={styles.audienceCardIcon} data-variant="teachers">
              <TeacherIcon />
            </div>
            <div className={styles.audienceCardBody}>
              <span className={styles.audienceCardTitle}>I&apos;m a Teacher</span>
              <span className={styles.audienceCardDesc}>Sell courses under your brand and keep 100% of what you earn — zero commission.</span>
            </div>
            <span className={styles.audienceCardArrow}><ArrowIcon /></span>
          </Link>

          <Link href="/edtech" className={styles.audienceCard} data-variant="edtech">
            <div className={styles.audienceCardIcon} data-variant="edtech">
              <EdtechIcon />
            </div>
            <div className={styles.audienceCardBody}>
              <span className={styles.audienceCardTitle}>I Run an Edtech</span>
              <span className={styles.audienceCardDesc}>Scale your online academy with AI-powered sales, CRM, and multi-instructor ops.</span>
            </div>
            <span className={styles.audienceCardArrow}><ArrowIcon /></span>
          </Link>

          <Link href="/institutions" className={styles.audienceCard} data-variant="institutions">
            <div className={styles.audienceCardIcon} data-variant="institutions">
              <InstitutionIcon />
            </div>
            <div className={styles.audienceCardBody}>
              <span className={styles.audienceCardTitle}>I Run an Offline Institute</span>
              <span className={styles.audienceCardDesc}>Manage batches, fees, attendance, and staff — all from one dashboard.</span>
            </div>
            <span className={styles.audienceCardArrow}><ArrowIcon /></span>
          </Link>
        </div>

        <p className={styles.intelligenceBridge}>
          Powered by Edveo Intelligence™ — the AI that knows your institute the way you do.
        </p>

      </div>
    </section>
  );
}
