"use client";

import { useCallback, useState } from "react";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CtaBanner from "../components/CtaBanner";
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
    <main className={styles.pricingPageBg}>
      <SiteNavbar activePage="pricing" />

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

      <CtaBanner
        variant="dark"
        headline="Not Sure Which Plan Is Right?"
        subheadline="Chat with us on WhatsApp. We'll tell you exactly which plan fits your institute — in under 10 minutes."
        primaryLabel="Start Free Trial"
        secondaryLabel="Chat on WhatsApp"
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
