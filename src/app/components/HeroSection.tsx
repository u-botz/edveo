import Link from "next/link";
import styles from "./hero.module.css";

/* ── SVG icons ── */
function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>

        {/* ═══ LEFT COLUMN ═══════════════════════════════ */}
        <div className={styles.heroLeft}>

          {/* § 1 — Badges */}
          <div className={styles.badgeRow}>
            <span className={`${styles.badge} ${styles.badgeImageNavy}`}>
              <span className={styles.iconYellow}>✦</span> FOR TEACHERS &amp; ONLINE ACADEMIES
            </span>
          </div>

          <h3 className={styles.heroPreHeadline}>
            India&apos;s Only AI Across LMS + ERP + CRM
          </h3>

          {/* § 2 — Headline */}
          <div className={styles.heroHeadline} role="heading" aria-level={1}>
            <span className={styles.headlineLine1}>Launch Your Academy.</span>
            <span className={styles.headlineLine2}>Keep <span className={styles.greenText}>100%</span> of What</span>
            <span className={styles.headlineLine3}>You Earn.</span>
          </div>

          {/* § 3 — Sub-headline */}
          <p className={styles.heroSub}>
            Your courses, your brand, your students — one platform. No commission. Live today.
          </p>

          {/* § 4 — AI differentiator line */}
          <div className={styles.aiLine}>
            <span className={styles.aiIcon}>✦</span> Runs your entire academy—not just your sales funnel.
          </div>

          {/* § 5 — CTAs */}
          <div className={styles.ctaRow}>
            <Link href="/register" className={styles.btnPrimary} id="hero-start-trial">
              Start Free Trial
              <span className={styles.btnArrow} aria-hidden>→</span>
            </Link>
            <button type="button" className={styles.btnSecondary} id="hero-whatsapp">
              <WaIcon />
              Chat on WhatsApp
            </button>
          </div>

          {/* § 6 — Micro-copy */}
          <p className={styles.microCopy}>
            14-day free trial · No credit card required · Go live today
          </p>
        </div>

        {/* ═══ RIGHT COLUMN — Dashboard Mockup ═══════════ */}
        <div className={styles.heroRight}>
          {/* mockWrap: position:relative + overflow:visible so cards aren't clipped */}
          <div className={styles.mockWrap}>

            {/* Floating Card 2 — AI Active (top-right, outside mockFrame) */}
            <div className={styles.floatAi} aria-hidden>
              <div className={styles.floatAiLine1}><span className={styles.iconOrange}>⚡</span> AI Active</div>
              <div className={styles.floatAiLine2}>3 insights ready</div>
            </div>

            {/* Dashboard frame — overflow:hidden clips internals only */}
            <div className={styles.mockFrame}>

              {/* Browser chrome */}
              <div className={styles.chromeBar}>
                <div className={styles.chromeDots}>
                  <span className={styles.chromeDot} style={{ background: "#FF5F56" }} />
                  <span className={styles.chromeDot} style={{ background: "#FFBD2E" }} />
                  <span className={styles.chromeDot} style={{ background: "#27C93F" }} />
                </div>
                <div className={styles.chromeUrl}>priyaacademy.edveo.com</div>
              </div>

              {/* App body */}
              <div className={styles.appBody}>

                {/* Sidebar */}
                <aside className={styles.sidebar} aria-hidden>
                  <div className={styles.sideGroupLabel}>DASHBOARD</div>
                  <div className={styles.sideItemActive}>Home</div>
                  <div className={styles.sideItem}>Courses</div>
                  <div className={styles.sideItem}>Students</div>
                  <div className={styles.sideNavDivider} />
                  <div className={styles.sideGroupLabel}>FINANCIALS</div>
                  <div className={styles.sideItem}>Revenue</div>
                  <div className={styles.sideItem}>Fee Collection</div>
                </aside>

                {/* Main content */}
                <main className={styles.dashMain} aria-hidden>

                  {/* Stat cards — 2 only for breathing room */}
                  <div className={styles.statRow}>
                    <div className={styles.statCard}>
                      <div className={styles.statLabel}>TOTAL STUDENTS</div>
                      <div className={styles.statValue}>1,284</div>
                      <div className={styles.statSub}>+12% this month</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statLabel}>REVENUE THIS MONTH</div>
                      <div className={styles.statValue}>₹2.4L</div>
                      <div className={styles.statSub}>0% platform commission</div>
                    </div>
                  </div>

                  {/* Course list */}
                  <div className={styles.courseList}>
                    <div className={styles.courseRow}>
                      <div className={styles.courseTop}>
                        <span className={styles.courseName}>NEET Physics 2028</span>
                        <span className={styles.courseStudents}>41 students</span>
                      </div>
                      <div className={styles.progressTrack}>
                        <div className={styles.progressFill} style={{ width: "76%" }} />
                      </div>
                    </div>
                    <div className={styles.courseRow}>
                      <div className={styles.courseTop}>
                        <span className={styles.courseName}>JEE Chemistry Crash Course</span>
                        <span className={styles.courseStudents}>38 students</span>
                      </div>
                      <div className={styles.progressTrack}>
                        <div className={styles.progressFill} style={{ width: "54%" }} />
                      </div>
                    </div>
                  </div>

                </main>
              </div>
            </div>

            {/* Floating Card 1 — Your Domain (bottom-right, outside mockFrame) */}
            <div className={styles.floatDomain} aria-hidden>
              <div className={styles.floatDomainHead}>
                <span className={styles.floatDomainDot} />
                <span className={styles.floatDomainLabel}>YOUR DOMAIN</span>
              </div>
              <div className={styles.floatDomainName}>
                <span className={styles.floatDomainHandle}>priyaacademy</span>
                <span className={styles.floatDomainTld}>.edveo.com</span>
              </div>
            </div>


          </div>{/* end mockWrap */}
        </div>

      </div>
    </section>
  );
}
