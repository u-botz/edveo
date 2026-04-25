import Link from "next/link";
import styles from "./hero.module.css";

/* ── SVG icons ── */
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
      <div className={styles.heroContainer}>

        {/* ═══ LEFT COLUMN ═══════════════════════════════ */}
        <div className={styles.heroLeft}>

          {/* § 1 — Category claim eyebrow */}
          <p className={styles.heroEyebrow}>India&apos;s only AI-native platform unifying LMS, ERP &amp; CRM</p>

          {/* § 2 — Headline */}
          <div className={styles.heroHeadline} role="heading" aria-level={1}>
            <span className={styles.headlineLine1}>Built for educators.</span>
            <span className={styles.headlineLine2}>Not <span className={styles.greenText}>adapted</span></span>
            <span className={styles.headlineLine3}>for them.</span>
          </div>

          {/* § 3 — Sub-headline */}
          <p className={styles.heroSub}>
            Whether you teach online or run a coaching institute — one AI-native platform handles your courses, operations, and revenue end to end.
          </p>

          {/* § 4 — Audience cards */}
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

          {/* § 5 — Micro-copy */}
          <p className={styles.microCopy}>
            14-day free trial · No credit card required · Go live today
          </p>
        </div>

        {/* ═══ RIGHT COLUMN — Dashboard Mockup ═══════════ */}
        <div className={styles.heroRight}>
          <div className={styles.mockWrap}>

            {/* Floating Card 2 — AI Active (top-right, outside mockFrame) */}
            <div className={styles.floatAi} aria-hidden>
              <div className={styles.floatAiLine1}><span className={styles.iconOrange}>⚡</span> AI Active</div>
              <div className={styles.floatAiLine2}>3 insights ready</div>
            </div>

            {/* Dashboard frame */}
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

            {/* Floating Card 1 — Your Domain (bottom-right) */}
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
