"use client";

import Link from "next/link";
import styles from "../page.module.css";
import pricingStyles from "../pricing/pricing.module.css";

export default function HomePricingSection() {
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
        <p className={`${styles.textCenter} ${styles.homePricingSub}`} style={{ marginBottom: '40px' }}>
          No hidden setup fees. Transparent monthly plans.
        </p>

        <div style={{ textAlign: 'center' }}>
          <Link href="/pricing" style={{
            display: "inline-block",
            background: "#2EAA6E",
            color: "#fff",
            fontWeight: 700,
            padding: "16px 40px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "1.1rem"
          }}>
            View full pricing &amp; comparison →
          </Link>
        </div>
      </div>
    </section>
  );
}
