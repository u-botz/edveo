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
        
        {/* Eyebrow — product line (matches Intelligence positioning) */}
        <div className={`${styles.eyebrowBadge} ${styles.eyebrowBadgeSolo}`}>
          <span className={styles.eyebrowBadgeText}>Powered by Edveo Intelligence™</span>
        </div>

        {/* Headline */}
        <h1 className={styles.heroHeadline}>
          Your institute runs itself.
          <br />
          You just teach.
        </h1>

        {/* Sub-headline */}
        <p className={styles.heroSub}>
          Edveo Intelligence™ handles your fees, your leads, your attendance, your student follow-ups — so you can focus entirely on teaching.
        </p>

        {/* Micro-copy — directly above primary CTA */}
        <p className={styles.microCopy}>
          Free forever &middot; Zero commission &middot; Live in 1 min
        </p>

        {/* Actions */}
        <div className={styles.heroActions}>
          <Link href="/register" className={styles.primaryButton}>
            Get started free <ArrowRightIcon />
          </Link>
        </div>

        {/* --- SP-1 INSERTION --- */}
        <style>
          {`
            .sp-stats-bar { display: flex; justify-content: center; gap: 24px; margin: 48px 0 24px; flex-wrap: wrap; }
            .sp-stat { font-size: 14px; font-weight: 600; color: #111827; background: #F9FAFB; padding: 8px 16px; border-radius: 4px; border: 1px solid #E5E7EB; }
            .sp-testimonials-row { display: flex; gap: 16px; margin-bottom: 64px; flex-wrap: wrap; justify-content: center; width: 100%; max-width: 1200px; }
            .sp-testimonial-card { flex: 1 1 300px; max-width: 100%; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px; text-align: left; box-sizing: border-box; }
            .sp-quote { font-size: 14px; color: #374151; margin-bottom: 16px; font-style: normal; line-height: 1.5; }
            .sp-name { font-size: 14px; font-weight: bold; color: #111827; margin: 0 0 4px 0; }
            .sp-institute { font-size: 12px; color: #6B7280; margin: 0; }
            
            .sp-full-quote-card { background: #F9FAFB; border-left: 4px solid #15803D; border-radius: 8px; padding: 24px 32px; margin: 48px auto; width: 100%; max-width: 1200px; box-sizing: border-box; text-align: left; }
            .sp-full-quote-text { font-size: 15px; color: #374151; font-style: italic; margin-bottom: 16px; line-height: 1.6; }
            
            .sp-personas-section { margin: 64px auto; text-align: center; max-width: 1200px; padding: 0 24px; }
            .sp-section-heading { font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 8px; }
            .sp-section-sub { font-size: 16px; color: #6B7280; margin-bottom: 48px; }
            .sp-badge { display: inline-block; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; margin-bottom: 16px; }
            .sp-badge-offline { background: #DCFCE7; color: #15803D; }
            .sp-badge-online { background: #DBEAFE; color: #1D4ED8; }
            .sp-badge-teacher { background: #FEF9C3; color: #854D0E; }
            
            .sp-trust-bar { text-align: center; padding: 48px 24px; background: #FFFFFF; border-top: 1px solid #E5E7EB; border-bottom: 1px solid #E5E7EB; margin: 64px 0; }
            .sp-trust-title { font-size: 22px; font-weight: 600; color: #111827; margin-bottom: 16px; }
            .sp-stars { color: #F59E0B; font-size: 20px; margin-bottom: 8px; }
            .sp-trust-sub { font-size: 13px; color: #6B7280; margin-bottom: 24px; }
            .sp-pills-row { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
            .sp-pill { background: #F3F4F6; color: #374151; border-radius: 999px; padding: 6px 16px; font-size: 12px; font-weight: 500; }

            @media (max-width: 768px) {
              .sp-testimonials-row { flex-direction: column; }
              .sp-full-quote-card { padding: 24px; }
            }
          `}
        </style>
        <div className="sp-stats-bar">
          <div className="sp-stat">120+ Institutes</div>
          <div className="sp-stat">⭐ 4.9 / 5 Rating</div>
          <div className="sp-stat">Kerala&apos;s #1 Edtech Platform</div>
        </div>
        <div className="sp-testimonials-row">
          <div className="sp-testimonial-card">
            <p className="sp-quote">&quot;Fee collection used to take my staff 3 days every month. Now it&apos;s done in the morning automatically.&quot;</p>
            <p className="sp-name">Director</p>
            <p className="sp-institute">Mentora LearnX, Manjeri, Kerala</p>
          </div>
          <div className="sp-testimonial-card">
            <p className="sp-quote">&quot;The AI told me which students were about to drop out before I even noticed. That alone is worth it.&quot;</p>
            <p className="sp-name">Director</p>
            <p className="sp-institute">Mentora Junior, Manjeri, Kerala</p>
          </div>
        </div>
        {/* --- END SP-1 --- */}

        {/* Audience path */}
        <h2 className={styles.audienceHeading}>Built for every institution type</h2>
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
