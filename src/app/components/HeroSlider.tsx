import styles from "../page.module.css";

function WaIconHero() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function HeroSlider() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroShell}>
        <div className={styles.heroStack}>
          <div className={styles.heroIntro}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} aria-hidden />
              <span className={styles.heroBadgeStar}>✦</span> FOR TEACHERS & ONLINE ACADEMIES
            </div>

            <h1 className={styles.heroTitle}>
              Launch Your Academy.
              <br />
              <span className={styles.heroTitleGreen}>Keep 100% of What</span>
              <br />
              <span className={styles.heroTitleGreen}>You Earn.</span>
            </h1>

            <p className={styles.heroSub}>
              Your courses, your brand, your students — one platform. No commission. Live today.
            </p>

            <div className={styles.heroCtas}>
              <button type="button" className={styles.heroBtnPrimary}>
                Start Free Trial
                <ArrowRightIcon />
              </button>
              <button type="button" className={styles.heroBtnWa}>
                <WaIconHero />
                Chat on WhatsApp
              </button>
            </div>

            <p className={styles.heroReassurance}>14-day free trial · No credit card required · Go live today</p>
          </div>

          <div className={styles.heroVisualCluster}>
            <div className={styles.heroMockStage}>
              <div className={styles.heroMockFrame}>
                <div className={styles.heroChromeBar}>
                  <div className={styles.heroChromeDots}>
                    <span className={styles.heroChromeDot} style={{ background: "#FF5F57" }} />
                    <span className={styles.heroChromeDot} style={{ background: "#FFBD2E" }} />
                    <span className={styles.heroChromeDot} style={{ background: "#27C93F" }} />
                  </div>
                  <div className={styles.heroUrlBar}>yourname.edveo.com</div>
                </div>

                <div className={styles.heroAppBody}>
                  <aside className={styles.heroSidebar} aria-hidden>
                    <div className={styles.heroSidebarGroupLabel}>Dashboard</div>
                    <div className={styles.heroNavItemActive}>
                      <span className={styles.heroNavBullet}>▪</span> Home
                    </div>
                    <div className={styles.heroNavItem}>
                      <span className={styles.heroNavBullet}>▪</span> Courses
                    </div>
                    <div className={styles.heroNavItem}>
                      <span className={styles.heroNavBullet}>▪</span> Students
                    </div>
                    <div className={styles.heroSidebarDivider} />
                    <div className={styles.heroSidebarGroupLabel}>Financials</div>
                    <div className={styles.heroNavItem}>
                      <span className={styles.heroNavBullet}>▪</span> Revenue
                    </div>
                    <div className={styles.heroNavItem}>
                      <span className={styles.heroNavBullet}>▪</span> Fee Collection
                    </div>
                    <div className={styles.heroNavItem}>
                      <span className={styles.heroNavBullet}>▪</span> Reports
                    </div>
                  </aside>

                  <div className={styles.heroMain}>
                    <div className={styles.heroMetricRow}>
                      <div className={styles.heroMetricTile}>
                        <div className={styles.heroMetricLabel}>Total students</div>
                        <div className={styles.heroMetricNumber}>1,284</div>
                        <div className={styles.heroMetricSubGreen}>↑ +12% this month</div>
                      </div>
                      <div className={styles.heroMetricTile}>
                        <div className={styles.heroMetricLabel}>Course completion</div>
                        <div className={styles.heroMetricNumber}>84.6%</div>
                        <div className={styles.heroMetricSubGreen}>↑ High performing</div>
                      </div>
                      <div className={styles.heroMetricTileAccent}>
                        <div className={styles.heroMetricLabelAccent}>Revenue this month</div>
                        <div className={styles.heroMetricNumber}>₹2.4L</div>
                        <div className={styles.heroMetricSubMuted}>0% platform commission</div>
                      </div>
                    </div>

                    <div className={styles.heroCourseList}>
                      <div className={styles.heroCourseRow}>
                        <div className={styles.heroCourseTop}>
                          <span className={styles.heroCourseNameSm}>NEET Physics 2026</span>
                          <span className={styles.heroCourseStudentsGreenSm}>41 students</span>
                        </div>
                        <div className={styles.heroProgressTrackSm}>
                          <div className={styles.heroProgressFillSm} style={{ width: "76%" }} />
                        </div>
                        <div className={styles.heroCourseMetaSm}>76% completion rate</div>
                      </div>

                      <div className={styles.heroCourseRow}>
                        <div className={styles.heroCourseTop}>
                          <span className={styles.heroCourseNameSm}>JEE Chemistry Crash Course</span>
                          <span className={styles.heroCourseStudentsBlueSm}>28 students</span>
                        </div>
                        <div className={styles.heroProgressTrackSm}>
                          <div className={styles.heroProgressFillBlueSm} style={{ width: "54%" }} />
                        </div>
                        <div className={styles.heroCourseMetaSm}>54% completion rate</div>
                      </div>

                      <div className={styles.heroCourseRowHighlightSm}>
                        <div className={styles.heroCourseNewSm}>+ New course published today</div>
                        <div className={styles.heroCourseNewSubSm}>Spoken English for Professionals · 12 enrolled</div>
                        <div className={styles.heroCourseAiHint}>
                          ✦ AI suggested optimal publish time based on your audience
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.heroFloatBadgeLeft}>
                <div className={styles.heroFloatBadgeHead}>
                  <span className={styles.heroFloatBadgeDot} aria-hidden />
                  <span>Live attendance</span>
                </div>
                <div className={styles.heroFloatBadgeStat}>98.4%</div>
              </div>

              <div className={styles.heroFloatBadgeRight}>
                <div className={styles.heroFloatBadgeHead}>
                  <span className={styles.heroFloatBadgeDot} aria-hidden />
                  <span>Your domain</span>
                </div>
                <div className={styles.heroFloatDomainLine1}>yourname</div>
                <div className={styles.heroFloatDomainLine2}>.edveo.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
