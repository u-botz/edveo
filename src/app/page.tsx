import styles from "./page.module.css";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CtaBanner from "./components/CtaBanner";
import HeroSection from "./components/HeroSection";
import { IntelligenceDemoSection } from "@/features/intelligence-demo";
import { COMPANY_WHATSAPP_URL } from "@/lib/companyPublicInfo";

export default function Home() {
  return (
    <main className={styles.main}>
      <SiteNavbar activePage="home" />

      {/* Hero */}
      <HeroSection />

      {/* Intelligence Demo Section */}
      <IntelligenceDemoSection />

      {/* Trust bar — honest early-stage signals, no fake logos */}
      <div className={styles.trustStrip}>
        <div className={styles.trustStripInner}>
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Data stays in your region</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M7 10h4M7 14h10" strokeLinecap="round"/></svg>
            <span>Payments via Razorpay</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
            <span>14-day free trial, no card needed</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            <span>Go live in under 1 minute</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="7" width="11" height="10" rx="1.5"/><rect x="11" y="5" width="11" height="10" rx="1.5"/></svg>
            <span>Multiple payment gateways</span>
          </div>
        </div>
      </div>



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
                <div style={{ width: "100%", maxWidth: "260px", background: "linear-gradient(135deg, #0D2D4E 0%, #1a4a7a 100%)", borderRadius: "12px", padding: "20px", color: "#fff" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "10px" }}>● LIVE NOW</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "12px" }}>NEET Chemistry — Organic Reactions</div>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)" }}>👥 84 students</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)" }}>⏱ 42 min</div>
                  </div>
                  <div style={{ marginTop: "14px", height: "4px", background: "rgba(255,255,255,0.15)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: "62%", height: "100%", background: "#2EAA6E", borderRadius: "2px" }} />
                  </div>
                </div>
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

      {/* ROI / Pain-to-Outcome Bridge */}
      <section className={styles.roiSection}>
        <div className={styles.container}>
          <p className={styles.roiEyebrow}>The cost of doing nothing</p>
          <h2 className={styles.roiTitle}>What Your Current Setup Is Actually Costing You</h2>

          <div className={styles.roiGrid}>

            {/* Teachers */}
            <div className={styles.roiCard}>
              <div className={styles.roiCardHeader}>
                <div className={styles.roiPersonaBadge} data-persona="teacher">👩‍🏫 Teachers</div>
              </div>
              <div className={styles.roiRow}>
                <div className={styles.roiBefore}>
                  <div className={styles.roiBeforeLabel}>Today</div>
                  <div className={styles.roiBeforeItem}>₹30,000–₹2L/yr in commissions to Udemy</div>
                  <div className={styles.roiBeforeItem}>No student data — platform owns it</div>
                  <div className={styles.roiBeforeItem}>Your brand buried under theirs</div>
                </div>
                <div className={styles.roiArrow}>→</div>
                <div className={styles.roiAfter}>
                  <div className={styles.roiAfterLabel}>With Edveo</div>
                  <div className={styles.roiAfterItem}>0% commission — every rupee yours</div>
                  <div className={styles.roiAfterItem}>You own your students and their data</div>
                  <div className={styles.roiAfterItem}>Your name, your domain, your brand</div>
                </div>
              </div>
              <div className={styles.roiOutcome}>
                <span className={styles.roiOutcomeNumber}>₹2L+</span>
                <span className={styles.roiOutcomeText}>saved per year by the average full-time teacher</span>
              </div>
            </div>

            {/* Edtech */}
            <div className={styles.roiCard}>
              <div className={styles.roiCardHeader}>
                <div className={styles.roiPersonaBadge} data-persona="edtech">🚀 Online Academies</div>
              </div>
              <div className={styles.roiRow}>
                <div className={styles.roiBefore}>
                  <div className={styles.roiBeforeLabel}>Today</div>
                  <div className={styles.roiBeforeItem}>₹50K–₹2L/mo on 5–6 disconnected tools</div>
                  <div className={styles.roiBeforeItem}>Leads lost in spreadsheets and WhatsApp</div>
                  <div className={styles.roiBeforeItem}>No attribution — blind marketing spend</div>
                </div>
                <div className={styles.roiArrow}>→</div>
                <div className={styles.roiAfter}>
                  <div className={styles.roiAfterLabel}>With Edveo</div>
                  <div className={styles.roiAfterItem}>One subscription replaces all tools</div>
                  <div className={styles.roiAfterItem}>AI scores and prioritises every lead</div>
                  <div className={styles.roiAfterItem}>Full funnel visibility — channel to revenue</div>
                </div>
              </div>
              <div className={styles.roiOutcome}>
                <span className={styles.roiOutcomeNumber}>34%</span>
                <span className={styles.roiOutcomeText}>higher lead-to-enrollment conversion on average</span>
              </div>
            </div>

            {/* Institutes */}
            <div className={styles.roiCard}>
              <div className={styles.roiCardHeader}>
                <div className={styles.roiPersonaBadge} data-persona="institute">🏫 Offline Institutes</div>
              </div>
              <div className={styles.roiRow}>
                <div className={styles.roiBefore}>
                  <div className={styles.roiBeforeLabel}>Today</div>
                  <div className={styles.roiBeforeItem}>₹40K–₹80K/yr in fee leakage from manual collection</div>
                  <div className={styles.roiBeforeItem}>8+ hrs/week chasing fees and attendance</div>
                  <div className={styles.roiBeforeItem}>Parents calling for updates you can&apos;t easily pull</div>
                </div>
                <div className={styles.roiArrow}>→</div>
                <div className={styles.roiAfter}>
                  <div className={styles.roiAfterLabel}>With Edveo</div>
                  <div className={styles.roiAfterItem}>Automated reminders collect fees without staff</div>
                  <div className={styles.roiAfterItem}>Attendance and fees updated in real time</div>
                  <div className={styles.roiAfterItem}>Parents get instant updates — zero calls</div>
                </div>
              </div>
              <div className={styles.roiOutcome}>
                <span className={styles.roiOutcomeNumber}>8 hrs</span>
                <span className={styles.roiOutcomeText}>saved every week on admin — from day one</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Go Live — objection-closer, lives near the decision point */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "12px" }}>Go Live in 1 Min</h2>
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

      {/* FAQ / Objection Handling */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqLeft}>
            <p className={styles.faqEyebrow}>Common questions</p>
            <h2 className={styles.faqTitle}>Everything you want to know before you sign up.</h2>
            <p className={styles.faqSub}>
              Still have a question?{" "}
              <a href="/contact" className={styles.faqLink}>Talk to our team →</a>
            </p>
          </div>
          <div className={styles.faqRight}>
            {[
              {
                q: "What happens to my student data after the 14-day trial ends?",
                a: "Nothing is deleted. If you don't upgrade, your account is paused — your courses, student records, and progress data are preserved for 30 days. You can export everything at any time, no questions asked.",
              },
              {
                q: "Can I import my existing students and fee records?",
                a: "Yes. Edveo has a one-click CSV import for student data, fee history, and course enrollments. Our onboarding team migrates your data with you — it typically takes under 20 minutes for institutes with up to 500 students.",
              },
              {
                q: "Will my students lose their progress if I move from another platform?",
                a: "No. We import completion records and progress history from most major platforms (Udemy, Teachable, Learnyst, Thinkific). Students log in and pick up exactly where they left off.",
              },
              {
                q: "Do you take a cut of my course revenue?",
                a: "Never. Edveo charges a flat monthly subscription — not a percentage of your earnings. Every rupee your students pay goes directly into your Razorpay account. Your revenue is yours.",
              },
              {
                q: "Is my student data safe? Where is it stored?",
                a: "All data is stored on servers in India, fully isolated per account. We comply with the IT Act 2000 and applicable data protection rules. No student data is ever shared with or accessible to other institutes on the platform.",
              },
              {
                q: "Can I run both recorded courses and live batches on the same platform?",
                a: "Yes — hybrid delivery is a first-class feature. You can mix pre-recorded video modules with scheduled live sessions in the same course. Students see everything in one place, not across two different apps.",
              },
              {
                q: "What if I need help setting things up?",
                a: "Every plan includes onboarding support. We get on a call, set up your portal together, and make sure you're live before we hang up. For Business and Scale plans, you get a dedicated account manager reachable on WhatsApp.",
              },
            ].map(({ q, a }) => (
              <details key={q} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{q}</summary>
                <p className={styles.faqAnswer}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        variant="dark"
        headline="You've Been Running Your Institute on 4 Tools."
        accentSub="There's a Better Way."
        primaryLabel="Start Your Free Trial →"
        secondaryLabel="Talk to an Expert"
        secondaryHref={COMPANY_WHATSAPP_URL}
        trustItems={["14-day free trial", "No credit card required", "Data stored in India", "Cancel anytime"]}
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
