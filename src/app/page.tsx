import styles from "./page.module.css";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CtaBanner from "./components/CtaBanner";
import HeroSection from "./components/HeroSection";
import HomePricingSection from "./components/HomePricingSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <SiteNavbar activePage="home" />

      {/* Hero */}
      <HeroSection />

      {/* Pillars — Edveo Intelligence (AI-first) */}
      <section className={`${styles.section} ${styles.pillarsSection}`}>
        <div className={styles.container}>
          <h2 className={`${styles.textCenter} ${styles.sectionTitleWithLine} ${styles.pillarsHeadlineAi}`}>
            <span style={{ color: "#111827", display: "block" }}>Meet Edveo Intelligence.</span>
            <span style={{ color: "var(--accent)" }}>AI Built Into Everything You Do.</span>
          </h2>
          <p className={styles.pillarsSubhead}>
            Not a chatbot. Not a bolt-on feature.<br />
            AI that runs your courses, your revenue, and your students —
          </p>
          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={`${styles.pillarIcon} ${styles.iconGreen}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3>AI Course Engine</h3>
              <ul className={styles.pillarList}>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Generate a full quiz from any chapter in 30 seconds</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Auto-create course outlines from your syllabus</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Identify which lessons students skip or struggle with</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Content gap detection — know what to teach next</span>
                </li>
              </ul>
              <p className={styles.pillarCardFooter}>🤖 Powered by Edveo Intelligence</p>
            </div>

            <div className={styles.pillarCard}>
              <div className={`${styles.pillarIcon} ${styles.iconTeal}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 3v18h18" />
                  <path d="M18 17V9" />
                  <path d="M13 17V5" />
                  <path d="M8 17v-3" />
                </svg>
              </div>
              <h3>AI Revenue Engine</h3>
              <ul className={styles.pillarList}>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Predict which students are likely to drop before they do</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Automated fee reminders via WhatsApp + SMS — zero manual follow-up</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Smart pricing suggestions based on enrollment patterns</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>0% commission — every rupee goes directly to you</span>
                </li>
              </ul>
              <p className={styles.pillarCardFooter}>🤖 Powered by Edveo Intelligence</p>
            </div>

            <div className={styles.pillarCard}>
              <div className={`${styles.pillarIcon} ${styles.iconViolet}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>AI Student Engine</h3>
              <ul className={styles.pillarList}>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Auto-score every lead and prioritize who to follow up with first</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Personalized learning paths based on each student&apos;s performance</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>At-risk student detection before they stop showing up</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Parent communication automated — attendance, results, reminders</span>
                </li>
              </ul>
              <p className={styles.pillarCardFooter}>🤖 Powered by Edveo Intelligence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "12px" }}>Go Live in 5 Min</h2>
          <p style={{ color: "#9CA3AF", marginBottom: "40px" }}>No complex coding. No lengthy migrations.</p>

          <div className={styles.timelineGrid}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>1</div>
              <h3>Sign Up</h3>
              <p>Quick onboarding with your institute details.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>2</div>
              <h3>Configure</h3>
              <p>Upload student data &amp; setup your fee structure.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={`${styles.timelineNumber} ${styles.timelineNumberSuccess}`}>3</div>
              <h3>Go Live</h3>
              <p>Apps published. Classes started. Revenue flowing.</p>
            </div>
          </div>

          <div className={styles.trustBarSection}>
            <div className={styles.trustBarContainer}>
              <div className={styles.trustBarItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                99.9% Uptime SLA
              </div>
              <div className={styles.trustBarItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                24 x 7 Support
              </div>
              <div className={styles.trustBarItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                Data Security Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className={styles.comparisonSection}>
        <div className={styles.container}>
          <div className={styles.compareHeader}>
            <h2 className={styles.compareTitle}>The only platform that runs your entire institute — not just your content.</h2>
            <p className={styles.compareSubtitle}>Classplus gives you courses. Classpro gives you operations. <strong>Edveo gives you both.</strong></p>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.competitorTable}>
              <thead>
                <tr>
                  <th className={styles.colFeature}>Feature</th>
                  <th className={styles.colEdveo}>Edveo</th>
                  <th>Classplus</th>
                  <th>Learnyst</th>
                  <th>Classpro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.featureName}>LMS + ERP + CRM in one platform</td>
                  <td className={styles.cellEdveo}><span className={styles.check}>✓</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Attendance &amp; Timetable</td>
                  <td className={styles.cellEdveo}><span className={styles.check}>✓</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.featureName}>CRM / Lead Pipeline</td>
                  <td className={styles.cellEdveo}><span className={styles.check}>✓</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Online Course Delivery</td>
                  <td className={styles.cellEdveo}><span className={styles.check}>✓</span></td>
                  <td><span className={styles.check}>✓</span></td>
                  <td><span className={styles.check}>✓</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Fee Collection</td>
                  <td className={styles.cellEdveo}><span className={styles.check}>✓</span></td>
                  <td><span className={styles.partial}>Partial</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Parent Portal</td>
                  <td className={styles.cellEdveo}><span className={styles.check}>✓</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.featureName}>WhatsApp Integration</td>
                  <td className={styles.cellEdveo}><span className={styles.check}>✓</span></td>
                  <td><span className={styles.partial}>Partial</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.featureName}>Custom Domain</td>
                  <td className={styles.cellEdveo}><span className={styles.check}>✓</span></td>
                  <td><span className={styles.check}>✓</span></td>
                  <td><span className={styles.checkLabel}>✓ (paid)</span></td>
                  <td><span className={styles.cross}>✗</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* Ecosystem Section */}
      <section className={styles.ecosystemSection}>
        <div className={styles.container}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "40px", textAlign: "center" }}>One Ecosystem. Every Feature.</h2>

          <div className={styles.bentoGrid}>
            {/* 1. Smart Live Classes (Span 2x2) */}
            <div className={`${styles.bentoCard} ${styles.bentoWhite} ${styles.bentoSpan2x2}`}>
              <div style={{ flex: 1 }}>
                <div className={styles.bentoIconBox}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>
                </div>
                <h3>Smart Live Classes</h3>
                <p style={{ maxWidth: "280px" }}>Integrated Zoom/Meet alternative with auto-recording, attendance logs, and interactive whiteboards.</p>
              </div>
              <div style={{ flex: 0.8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#D1D5DB", fontWeight: "600", fontSize: "0.9rem" }}>Live Class Feature</span>
              </div>
            </div>

            {/* 2. Fee Management (Blue) */}
            <div className={`${styles.bentoCard} ${styles.bentoBlue}`}>
              <h3>Fee Management</h3>
              <p>Auto-GST invoices, reminders, and partial payment support.</p>
            </div>

            {/* 3. Deep Analytics (White) */}
            <div className={`${styles.bentoCard} ${styles.bentoWhite}`}>
              <h3>Deep Analytics</h3>
              <p>Student rank analysis and subject-wise progress tracking.</p>
            </div>

            {/* 4. Mobile App (Span 2x1 Green) */}
            <div className={`${styles.bentoCard} ${styles.bentoGreen} ${styles.bentoSpan2x1}`} style={{ gridColumn: "3 / 5" }}>
              <div>
                <h3 style={{ color: "#166534" }}>Mobile App</h3>
                <p>Your logo on PlayStore & AppStore.</p>
              </div>
              <div style={{ color: "#2EAA6E" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
              </div>
            </div>

            {/* 5. CRM Tools (White) */}
            <div className={`${styles.bentoCard} ${styles.bentoWhite}`}>
              <h3>CRM Tools</h3>
              <p>Inquiry to admission funnel.</p>
            </div>

            {/* 6. Timetable (Dark) */}
            <div className={`${styles.bentoCard} ${styles.bentoDark}`}>
              <h3>Timetable</h3>
              <p>Conflict-free scheduling for faculty.</p>
            </div>
          </div>
        </div>
      </section>

      <HomePricingSection />

      <CtaBanner
        variant="dark"
        headline="You've Been Running Your Institute on 4 Tools."
        accentSub="There's a Better Way."
        primaryLabel="Start Your Free Trial"
        secondaryLabel="Talk to an Expert"
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
