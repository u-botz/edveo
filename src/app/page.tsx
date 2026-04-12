import styles from "./page.module.css";
import EdveoLogo from "./components/EdveoLogo";
import HeroSlider from "./components/HeroSlider";
import HomePricingSection from "./components/HomePricingSection";
import SegmentNav from "./components/SegmentNav";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.navHeaderSticky}>
        <SegmentNav active="teachers" />
        <nav className={styles.navbar}>
          <a href="/" className={styles.navBrand}>
            <EdveoLogo variant="nav" />
          </a>
          <div className={styles.navLinks}>
            <a href="#solutions">Solutions</a>
            <a href="/pricing">Pricing</a>
            <a href="#resources">Resources</a>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <button className={styles.btnTertiary}>Login</button>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>Start Free Trial</button>
          </div>
        </nav>
      </div>

      {/* Hero Slider Component */}
      <HeroSlider />

      {/* Pillars — Edveo Intelligence (AI-first) */}
      <section className={`${styles.section} ${styles.pillarsSection}`}>
        <div className={styles.container}>
          <h2 className={`${styles.textCenter} ${styles.sectionTitleWithLine} ${styles.pillarsHeadlineAi}`}>
            Meet Edveo Intelligence.
            <br />
            <span>AI Built Into Everything You Do.</span>
          </h2>
          <p className={styles.pillarsSubhead}>
            Not a chatbot. Not a bolt-on feature.
            <br />
            AI that runs your courses, your revenue, and your students — automatically.
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
          <h2 style={{ fontSize: "2.5rem", marginBottom: "12px" }}>Go Live in 24 Hours</h2>
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
              <p>Upload student data & setup your fee structure.</p>
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
                Local Support (Kerala)
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
          <div className={styles.comparisonGrid}>
            <div className={`${styles.compareCard} ${styles.compareRed}`}>
              <h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                Stop The Tool Fatigue
              </h3>
              <ul className={styles.compareList}>
                <li><span>Zoom Pro Subscriptions</span> <span className={styles.badgeRed}>EXHAUSTING</span></li>
                <li><span>Endless Excel Attendance Sheets</span> <span className={styles.badgeRed}>CHAOTIC</span></li>
                <li><span>WhatsApp API Costs & Spam</span> <span className={styles.badgeRed}>EXPENSIVE</span></li>
                <li><span>Classplus Generic Apps</span> <span className={styles.badgeRed}>LIMITING</span></li>
              </ul>
            </div>

            <div className={`${styles.compareCard} ${styles.compareGreen}`}>
              <h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                The Edveo Advantage
              </h3>
              <ul className={styles.compareList}>
                <li><span>Leads tracked from first inquiry to enrollment</span> <span className={styles.badgeGreen}>UNLIMITED</span></li>
                <li><span>Your brand, your domain, your platform</span> <span className={styles.badgeGreen}>AUTOMATED</span></li>
                <li><span>Automated WhatsApp + SMS fee reminders</span> <span className={styles.badgeGreen}>ZERO COST</span></li>
                <li><span>Student app under your institute&apos;s name</span> <span className={styles.badgeGreen}>PREMIUM</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className={styles.ecosystemSection}>
        <div className={styles.container}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "40px" }}>One Ecosystem. Every Feature.</h2>
          
          <div className={styles.bentoGrid}>
            {/* 1. Smart Live Classes (Span 2x2) */}
            <div className={`${styles.bentoCard} ${styles.bentoWhite} ${styles.bentoSpan2x2}`}>
              <div style={{ flex: 1 }}>
                <div className={styles.bentoIconBox}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
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
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
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

      {/* CTA Section */}
      <section style={{ padding: "0 24px", position: "relative", zIndex: 10 }}>
        <div className={styles.container}>
          <div className={styles.finalCta}>
            <h2>You've Been Running Your Institute<br />on 4 Tools.</h2>
            <div className={styles.finalSubheadline}>There's a Better Way.</div>
            <div className={styles.ctaBtnGroup}>
              <button className={styles.ctaBtnWhite}>Start Your Free Trial</button>
              <button className={styles.ctaBtnGreen}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerLinkCol} style={{ flex: 2 }}>
              <a href="/" className={styles.footerBrandLink}>
                <EdveoLogo variant="footer" />
              </a>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", maxWidth: "250px" }}>Transforming Education for the Indian Coaching Institutes. Connecting workflow, elevating results, and managing scale smoothly.</p>
            </div>
            <div className={styles.footerLinkCol}>
              <h4>Product</h4>
              <a href="#">LMS Suite</a>
              <a href="#">ERP Management</a>
              <a href="#">Fee Management</a>
              <a href="#">Student CRM</a>
            </div>
            <div className={styles.footerLinkCol}>
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
            <div className={styles.footerLinkCol}>
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Documentation</a>
              <a href="#">API Status</a>
              <a href="#">Tutorials</a>
            </div>
            <div className={styles.footerLinkCol}>
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Compliance</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <div>© 2024 Edveo Technologies Pvt Ltd. Proudly developed for the Indian Coaching Institutes.</div>
            <div style={{ width: "40px", height: "40px", backgroundColor: "var(--accent)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>WhatsApp</div>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFloat}
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </main>
  );
}
