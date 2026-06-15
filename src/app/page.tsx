import styles from "./page.module.css";
import heroStyles from "./components/hero.module.css";
import Link from "next/link";
import { TeacherIcon, EdtechIcon, InstitutionIcon } from "./components/HeroSection";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CtaBanner from "./components/CtaBanner";
import HeroSection from "./components/HeroSection";
import FeatureExplorer from "./components/FeatureExplorer";
import MobileAppBanner from "./components/MobileAppBanner";
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

      {/* --- SP-2 INSERTION --- */}
      <div style={{ padding: "0 24px" }}>
        <div className="sp-full-quote-card">
          <p className="sp-full-quote-text">&quot;I asked Edveo how many students were at risk this month. It flagged 7 names with reasons in under 10 seconds. That would have taken me a full day to figure out manually.&quot;</p>
          <p className="sp-name">Director</p>
          <p className="sp-institute">Mentora LearnX, Manjeri, Kerala</p>
        </div>
      </div>
      {/* --- END SP-2 --- */}

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
            <span>Free forever, no card needed</span>
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

      <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "56px", paddingBottom: "56px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <h2 className={heroStyles.audienceHeading}>BUILT FOR EVERY INSTITUTION TYPE</h2>
          <div className={heroStyles.audienceCards} role="group" aria-label="Choose your path">
            <Link href="/teacher" className={heroStyles.audienceCard}>
              <div className={heroStyles.audienceCardIcon}>
                <TeacherIcon />
              </div>
              <div className={heroStyles.audienceCardBody}>
                <span className={heroStyles.audienceCardTitle}>I&apos;m a Teacher</span>
                <span className={heroStyles.audienceCardDesc}>Sell courses under your brand and keep 100% of what you earn — zero commission.</span>
              </div>
              <span className={heroStyles.audienceCardArrow}>→</span>
            </Link>

            <Link href="/edtech" className={heroStyles.audienceCard}>
              <div className={heroStyles.audienceCardIcon}>
                <EdtechIcon />
              </div>
              <div className={heroStyles.audienceCardBody}>
                <span className={heroStyles.audienceCardTitle}>I Run an Edtech</span>
                <span className={heroStyles.audienceCardDesc}>Scale your online academy with AI-powered sales, CRM, and multi-instructor ops.</span>
              </div>
              <span className={heroStyles.audienceCardArrow}>→</span>
            </Link>

            <Link href="/institutions" className={heroStyles.audienceCard}>
              <div className={heroStyles.audienceCardIcon}>
                <InstitutionIcon />
              </div>
              <div className={heroStyles.audienceCardBody}>
                <span className={heroStyles.audienceCardTitle}>I Run an Offline Institute</span>
                <span className={heroStyles.audienceCardDesc}>Manage batches, fees, attendance, and staff — all from one dashboard.</span>
              </div>
              <span className={heroStyles.audienceCardArrow}>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Explorer — tabbed, equal real estate for all 5 features */}
      <FeatureExplorer />

      {/* Mobile App — standalone premium section */}
      <MobileAppBanner />

      {/* ROI / Pain-to-Outcome Bridge */}
      <section className={styles.roiSection} aria-labelledby="roi-section-heading">
        <div className={styles.container}>
          <p className={styles.roiEyebrow}>The cost of doing nothing</p>
          <h2 id="roi-section-heading" className={styles.roiTitle}>
            What your current setup is actually costing you
          </h2>
          <p className={styles.roiSubtitle}>
            Three segments. Three different pain points. All verified from real operations.
          </p>

          <div className={styles.roiGrid}>

            {/* Offline institutes */}
            <div className={styles.roiCard}>
              <div className={styles.roiCardHeader}>
                <div className={styles.roiPersonaBadge} data-persona="institute">🏫 Offline institutes</div>
              </div>
              <div className={styles.roiRow}>
                <div className={styles.roiBefore}>
                  <div className={styles.roiBeforeLabel}>Today</div>
                  <div className={styles.roiBeforeItem}>₹40K–₹80K/yr lost to fee leakage from manual collection</div>
                  <div className={styles.roiBeforeItem}>10–15 hrs/week chasing fees and attendance manually</div>
                  <div className={styles.roiBeforeItem}>Parents calling for updates you can&apos;t easily pull</div>
                </div>
                <div className={styles.roiArrow} aria-hidden>→</div>
                <div className={styles.roiAfter}>
                  <div className={styles.roiAfterLabel}>With Edveo</div>
                  <div className={styles.roiAfterItem}>Automated reminders collect fees without staff</div>
                  <div className={styles.roiAfterItem}>Attendance and fees updated in real time</div>
                  <div className={styles.roiAfterItem}>Parents get instant updates — zero calls to handle</div>
                </div>
              </div>
              <div className={styles.roiOutcome}>
                <span className={styles.roiOutcomeNumber}>8 hrs</span>
                <span className={styles.roiOutcomeText}>saved every week on admin — from day one</span>
              </div>
            </div>

            {/* Online academies */}
            <div className={styles.roiCard}>
              <div className={styles.roiCardHeader}>
                <div className={styles.roiPersonaBadge} data-persona="edtech">🚀 Online academies</div>
              </div>
              <div className={styles.roiRow}>
                <div className={styles.roiBefore}>
                  <div className={styles.roiBeforeLabel}>Today</div>
                  <div className={styles.roiBeforeItem}>₹10K–₹50K/mo across 5–6 disconnected tools</div>
                  <div className={styles.roiBeforeItem}>Leads lost in spreadsheets and WhatsApp DMs</div>
                  <div className={styles.roiBeforeItem}>No attribution — you can&apos;t see which channel converts</div>
                </div>
                <div className={styles.roiArrow} aria-hidden>→</div>
                <div className={styles.roiAfter}>
                  <div className={styles.roiAfterLabel}>With Edveo</div>
                  <div className={styles.roiAfterItem}>One subscription replaces all tools — LMS + CRM + ERP</div>
                  <div className={styles.roiAfterItem}>AI scores and prioritises every lead automatically</div>
                  <div className={styles.roiAfterItem}>Full funnel visibility — channel tracked to enrolment</div>
                </div>
              </div>
              <div className={styles.roiOutcome}>
                <span className={styles.roiOutcomeNumber}>5–6 tools</span>
                <span className={styles.roiOutcomeText}>replaced by one subscription on day one</span>
              </div>
            </div>

            {/* Standalone teachers */}
            <div className={styles.roiCard}>
              <div className={styles.roiCardHeader}>
                <div className={styles.roiPersonaBadge} data-persona="teacher">👩‍🏫 Standalone teachers</div>
              </div>
              <div className={styles.roiRow}>
                <div className={styles.roiBefore}>
                  <div className={styles.roiBeforeLabel}>Today</div>
                  <div className={styles.roiBeforeItem}>Up to 30% of every sale paid to Udemy or Graphy</div>
                  <div className={styles.roiBeforeItem}>No student data — the platform owns it, not you</div>
                  <div className={styles.roiBeforeItem}>Your brand buried under their marketplace</div>
                </div>
                <div className={styles.roiArrow} aria-hidden>→</div>
                <div className={styles.roiAfter}>
                  <div className={styles.roiAfterLabel}>With Edveo</div>
                  <div className={styles.roiAfterItem}>0% commission — every rupee of every sale is yours</div>
                  <div className={styles.roiAfterItem}>You own your students and their data — always</div>
                  <div className={styles.roiAfterItem}>Your name, your domain, your brand — fully white-label</div>
                </div>
              </div>
              <div className={styles.roiOutcome}>
                <span className={styles.roiOutcomeNumber}>₹10,000+/mo</span>
                <span className={styles.roiOutcomeText}>in platform commissions on entry plans — kept by you</span>
              </div>
            </div>

          </div>

          <p className={styles.roiDisclaimer}>
            All figures sourced from ROI analysis and market data — no made-up averages
          </p>
        </div>
      </section>

      {/* --- SP-3 INSERTION --- */}
      <section className="sp-personas-section">
        <h2 className="sp-section-heading">Institutes like yours are already live</h2>
        <p className="sp-section-sub">One story for every type of educator on Edveo</p>
        <div className="sp-testimonials-row">
          <div className="sp-testimonial-card">
            <div className="sp-badge sp-badge-offline">Offline Institute</div>
            <p className="sp-quote">&quot;We recovered ₹60,000 in pending fees within the first month. I didn&apos;t chase a single parent — Edveo did it automatically.&quot;</p>
            <p className="sp-name">Director</p>
            <p className="sp-institute">Mentora LearnX, Manjeri, Kerala</p>
          </div>
          <div className="sp-testimonial-card">
            <div className="sp-badge sp-badge-online">Online Academy</div>
            <p className="sp-quote">&quot;We shut down 5 subscriptions the day we moved to Edveo. One platform replaced all of them and our lead conversion went up 40%.&quot;</p>
            <p className="sp-name">Director</p>
            <p className="sp-institute">Mentora Junior, Manjeri, Kerala</p>
          </div>
        </div>
      </section>
      {/* --- END SP-3 --- */}

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
                q: "What happens to my student data if I stay on the free plan?",
                a: "Nothing is deleted. Your courses, student records, and progress data stay preserved. You can upgrade when you need more capacity, and you can export your data at any time.",
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

      {/* --- SP-4 INSERTION --- */}
      <div className="sp-trust-bar">
        <div className="sp-trust-title">Trusted by 120+ institutes across Kerala</div>
        <div className="sp-stars">★★★★★</div>
        <div className="sp-trust-sub">4.9 out of 5 &middot; Based on 80+ institute reviews</div>
        <div className="sp-pills-row">
          <span className="sp-pill">Mentora LearnX &middot; Manjeri, Kerala</span>
          <span className="sp-pill">Mentora Junior &middot; Manjeri, Kerala</span>
        </div>
      </div>
      {/* --- END SP-4 --- */}

      <CtaBanner
        variant="dark"
        headline="You've Been Running Your Institute on 4 Tools."
        accentSub="There's a Better Way."
        primaryLabel="Get started free →"
        secondaryLabel="Talk to an Expert"
        secondaryHref={COMPANY_WHATSAPP_URL}
        trustItems={["Free forever", "No credit card required", "Data stored in India", "Cancel anytime"]}
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
