"use client";

import { useCallback, useState } from "react";
import EdveoLogo from "../components/EdveoLogo";
import homeStyles from "../page.module.css";
import styles from "./pricing.module.css";
import PricingCardsBlock, { createPlanPanelIds, SegmentTabBar, type Billing, type Segment } from "./PricingCardsBlock";

const FAQS = [
  {
    q: "Is there really no credit card required for the free trial?",
    a: "Correct. You get 14 days of full access with no payment information required. At the end of your trial, you choose a plan or your account pauses — no automatic charges.",
  },
  {
    q: "Can I switch between plans after I sign up?",
    a: "Yes. Upgrade anytime, effective immediately. Downgrade at the end of your billing cycle. No penalty either way.",
  },
  {
    q: "Do you support Razorpay for fee collection?",
    a: "Yes. Razorpay is the default payment processor for all Indian billing — both your subscription to Edveo and the fees you collect from your students.",
  },
  {
    q: "What happens if I exceed my student limit?",
    a: "You will be notified when you reach 90% of your student limit. You can upgrade immediately or archive inactive students. We never cut off access suddenly.",
  },
  {
    q: "Is there a setup fee or implementation charge?",
    a: "None. There is no setup fee, no implementation charge, and no onboarding cost. You configure your institute yourself and go live the same day.",
  },
  {
    q: "Do you offer discounts for paying annually?",
    a: "Yes. Annual billing saves you two months — you pay for 10 months and get 12. The saving is shown on every plan card when you select Annual billing.",
  },
  {
    q: "Can I white-label the platform with my institute's brand?",
    a: "Custom domain and branding is available on Academy and Scale for online academies, and Educator and above for teachers. Scale (academies) and Pro (teachers) include the strongest white-label options, including the branded mobile app.",
  },
  {
    q: "What support is available?",
    a: "All plans include access to our help center and WhatsApp support. Professional and Academy plans include priority email support. Business and Scale plans include a dedicated account manager.",
  },
] as const;

function WaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function renderCompareCell(cell: string) {
  if (cell === "✓") return <span className={styles.cellYes}>✓</span>;
  if (cell === "✗") return <span className={styles.cellNo}>✗</span>;
  return cell;
}

const COMPARE_PANEL_IDS: Record<Segment, string> = {
  online: "compare-panel-online",
  teachers: "compare-panel-teachers",
};

export default function PricingPageClient() {
  const [billing, setBilling] = useState<Billing>("annual");
  const [segment, setSegment] = useState<Segment>("online");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const showTab = useCallback((tabName: Segment) => {
    setSegment(tabName);
  }, []);

  const toggleFaq = (i: number) => {
    setOpenFaq((prev) => (prev === i ? null : i));
  };

  return (
    <main className={homeStyles.main}>
      <nav className={homeStyles.navbar}>
        <a href="/" className={homeStyles.navBrand}>
          <EdveoLogo variant="nav" />
        </a>
        <div className={homeStyles.navLinks}>
          <a href="/#solutions">Solutions</a>
          <a href="/#institutions">For Institutes</a>
          <a href="/pricing">Pricing</a>
          <a href="/#resources">Resources</a>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="button" className={homeStyles.btnTertiary}>
            Login
          </button>
          <button type="button" className={`${homeStyles.btn} ${homeStyles.btnPrimary}`}>
            Start Free Trial
          </button>
        </div>
      </nav>

      <div className={styles.pricingPageBg}>
        <div className={styles.pricingInner}>
          <header className={styles.pricingHero}>
            <div className={styles.pricingEyebrow}>Simple, Transparent Pricing</div>
            <h1 className={styles.pricingHeadline}>Start Free. Upgrade as You Grow.</h1>
            <p className={styles.pricingSubhead}>No setup fee. No implementation charge. No hidden costs. Cancel anytime.</p>

          </header>

          <PricingCardsBlock
            billing={billing}
            onBillingChange={setBilling}
            segment={segment}
            onSegmentChange={showTab}
            planPanelIds={createPlanPanelIds("")}
            featuresComparisonHref="#feature-comparison"
          />

          <section className={styles.comparisonSection} id="feature-comparison">
            <h2 className={styles.comparisonHeading}>Full Feature Comparison</h2>
            <p className={styles.comparisonSub}>See exactly what&apos;s included in every plan</p>

            <SegmentTabBar segment={segment} onSegmentChange={showTab} ariaLabel="Comparison by audience" panelIds={COMPARE_PANEL_IDS} />

            <div
              className={`${styles.tableWrap} ${segment !== "online" ? styles.tabPanelHidden : ""}`}
              id="compare-panel-online"
              role="tabpanel"
              aria-hidden={segment !== "online"}
            >
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Creator</th>
                    <th>Academy</th>
                    <th>Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Students", "100", "500", "Unlimited"],
                    ["Course creation & delivery", "✓", "✓", "✓"],
                    ["Razorpay payments", "Basic", "Subscriptions", "Subscriptions"],
                    ["Student progress tracking", "✓", "✓", "✓"],
                    ["Landing page", "✓", "✓", "✓"],
                    ["Custom domain", "Subdomain", "Full", "Full"],
                    ["Branded mobile app", "✗", "✓", "✓"],
                    ["Live & recorded classes", "Basic", "Full", "Full"],
                    ["CRM & email automation", "✗", "✓", "✓"],
                    ["Multi-instructor", "✗", "✗", "✓"],
                    ["Advanced analytics", "✗", "✓", "Full"],
                    ["API access", "✗", "✗", "✓"],
                    ["White-label", "✗", "Partial", "Full"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, j) => (
                        <td key={j}>{renderCompareCell(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className={`${styles.tableWrap} ${segment !== "teachers" ? styles.tabPanelHidden : ""}`}
              id="compare-panel-teachers"
              role="tabpanel"
              aria-hidden={segment !== "teachers"}
            >
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Free</th>
                    <th>Educator</th>
                    <th>Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Students", "25", "200", "1,000"],
                    ["Courses", "1", "Unlimited", "Unlimited"],
                    ["Storefront page", "Basic", "Full", "Full"],
                    ["Razorpay integration", "Payment links", "Full", "Full"],
                    ["Edveo subdomain", "✓", "✗", "✗"],
                    ["Custom domain", "✗", "✓", "✓"],
                    ["Progress tracking", "✗", "✓", "✓"],
                    ["WhatsApp automation", "✗", "✓", "✓"],
                    ["Remove Edveo branding", "✗", "✓", "✓"],
                    ["Live classes", "✗", "✗", "✓"],
                    ["Branded mobile app", "✗", "✗", "✓"],
                    ["Advanced analytics", "✗", "✗", "✓"],
                    ["Priority support", "✗", "✗", "✓"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, j) => (
                        <td key={j}>{renderCompareCell(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.faqSection}>
            <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              {FAQS.map((item, i) => (
                <div key={item.q} className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ""}`}>
                  <button type="button" className={styles.faqQuestion} onClick={() => toggleFaq(i)} aria-expanded={openFaq === i}>
                    <span>{item.q}</span>
                    <span className={styles.faqIcon} aria-hidden>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && <div className={styles.faqAnswer}>{item.a}</div>}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.bottomCta} aria-label="Get help choosing a plan">
          <div className={styles.bottomCtaInner}>
            <h2 className={styles.bottomCtaTitle}>Not Sure Which Plan Is Right?</h2>
            <p className={styles.bottomCtaSub}>
              Chat with us on WhatsApp. We&apos;ll tell you exactly which plan fits your institute — in under 10 minutes.
            </p>
            <div className={styles.bottomCtaBtns}>
              <button type="button" className={styles.bottomBtnWhite}>
                Start Free Trial
              </button>
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className={styles.bottomBtnWa}>
                <WaIcon />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer className={homeStyles.footer}>
        <div className={homeStyles.container}>
          <div className={homeStyles.footerGrid}>
            <div className={homeStyles.footerLinkCol} style={{ flex: 2 }}>
              <a href="/" className={homeStyles.footerBrandLink}>
                <EdveoLogo variant="footer" />
              </a>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", maxWidth: "250px" }}>
                Transforming Education for the Indian Coaching Institutes. Connecting workflow, elevating results, and managing scale smoothly.
              </p>
            </div>
            <div className={homeStyles.footerLinkCol}>
              <h4>Product</h4>
              <a href="#">LMS Suite</a>
              <a href="#">ERP Management</a>
              <a href="#">Fee Management</a>
              <a href="#">Student CRM</a>
            </div>
            <div className={homeStyles.footerLinkCol}>
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
            <div className={homeStyles.footerLinkCol}>
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Documentation</a>
              <a href="#">API Status</a>
              <a href="#">Tutorials</a>
            </div>
            <div className={homeStyles.footerLinkCol}>
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Compliance</a>
            </div>
          </div>
          <div className={homeStyles.footerBottom}>
            <div>© 2024 Edveo Technologies Pvt Ltd. Proudly developed for the Indian Coaching Institutes.</div>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "var(--accent)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              WhatsApp
            </div>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className={homeStyles.whatsappFloat}
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </main>
  );
}
