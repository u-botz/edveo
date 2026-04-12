"use client";

import { useCallback, useState } from "react";
import styles from "../page.module.css";
import pricingStyles from "../pricing/pricing.module.css";
import PricingCardsBlock, { createPlanPanelIds, type Billing, type Segment } from "../pricing/PricingCardsBlock";

export default function HomePricingSection() {
  const [billing, setBilling] = useState<Billing>("annual");
  const [segment, setSegment] = useState<Segment>("coaching");
  const planPanelIds = createPlanPanelIds("home-");

  const showTab = useCallback((tabName: Segment) => {
    setSegment(tabName);
  }, []);

  return (
    <section className={styles.pricingSection} id="pricing">
      <div
        className={styles.pricingHtmlComment}
        dangerouslySetInnerHTML={{
          __html: "<!-- PRICING: Confirm all three tier prices with founder before go-live -->",
        }}
      />
      <div className={pricingStyles.pricingInner}>
        <div className={styles.homePricingEyebrowWrap}>
          <span className={pricingStyles.pricingEyebrow}>Simple, Transparent Pricing</span>
        </div>
        <h2 className={`${styles.textCenter} ${styles.homePricingHeadline}`}>Pricing That Scales With You</h2>
        <p className={`${styles.textCenter} ${styles.homePricingSub}`}>
          No hidden setup fees. Transparent monthly plans.
        </p>

        <PricingCardsBlock
          billing={billing}
          onBillingChange={setBilling}
          segment={segment}
          onSegmentChange={showTab}
          planPanelIds={planPanelIds}
          featuresComparisonHref="/pricing#feature-comparison"
        />

        <p className={styles.homePricingFullLink}>
          <a href="/pricing">View full pricing, comparison tables &amp; FAQ →</a>
        </p>
      </div>
    </section>
  );
}
