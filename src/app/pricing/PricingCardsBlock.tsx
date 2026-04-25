"use client";

import Link from "next/link";
import styles from "./pricing.module.css";

export type Segment = "online" | "teachers" | "institutes";
export type Billing = "monthly" | "annual";

export function createPlanPanelIds(prefix: string): Record<Segment, string> {
  return {
    online: `${prefix}plans-panel-online`,
    teachers: `${prefix}plans-panel-teachers`,
    institutes: `${prefix}plans-panel-institutes`,
  };
}

function CheckIcon() {
  return <span className={styles.checkIcon} aria-hidden />;
}

function RazorpayMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="#3395FF" strokeWidth="1.5" />
      <path d="M7 10h4M7 14h10" stroke="#3395FF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PriceArea({ billing, monthly, annual }: { billing: Billing; monthly: string; annual: string }) {
  if (billing === "annual") {
    return (
      <div className={styles.priceAnnualRow}>
        <span className={styles.priceMain}>{annual}</span>
        <span className={styles.priceStrike}>{monthly}</span>
        <span className={styles.perMonth}>/month</span>
      </div>
    );
  }
  return (
    <div className={styles.priceAnnualRow}>
      <span className={styles.priceMain}>{monthly}</span>
      <span className={styles.perMonth}>/month</span>
    </div>
  );
}

export function SegmentTabBar({
  segment,
  onSegmentChange,
  ariaLabel,
  panelIds,
}: {
  segment: Segment;
  onSegmentChange: (s: Segment) => void;
  ariaLabel: string;
  panelIds: Record<Segment, string>;
}) {
  return (
    <div className={styles.segmentWrap}>
      <div className={styles.segmentPills} role="tablist" aria-label={ariaLabel}>
        <button
          type="button"
          role="tab"
          aria-selected={segment === "online"}
          aria-controls={panelIds.online}
          className={`${styles.segmentBtn} ${segment === "online" ? styles.segmentBtnActive : ""}`}
          onClick={() => onSegmentChange("online")}
        >
          Online Academies
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={segment === "teachers"}
          aria-controls={panelIds.teachers}
          className={`${styles.segmentBtn} ${segment === "teachers" ? styles.segmentBtnActive : ""}`}
          onClick={() => onSegmentChange("teachers")}
        >
          Standalone Teachers
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={segment === "institutes"}
          aria-controls={panelIds.institutes}
          className={`${styles.segmentBtn} ${segment === "institutes" ? styles.segmentBtnActive : ""}`}
          onClick={() => onSegmentChange("institutes")}
        >
          Coaching Institutes
        </button>
      </div>
    </div>
  );
}

export type PricingCardsBlockProps = {
  billing: Billing;
  onBillingChange: (b: Billing) => void;
  segment: Segment;
  onSegmentChange: (s: Segment) => void;
  planPanelIds: Record<Segment, string>;
  /** "See all features" links (Starter / Creator / Free cards) */
  featuresComparisonHref: string;
};

export default function PricingCardsBlock({
  billing,
  onBillingChange,
  segment,
  onSegmentChange,
  planPanelIds,
  featuresComparisonHref,
}: PricingCardsBlockProps) {
  return (
    <>
      <div className={styles.billingRow}>
        <div className={styles.billingPills}>
          <button
            type="button"
            className={`${styles.billingBtn} ${billing === "monthly" ? styles.billingBtnActive : ""}`}
            onClick={() => onBillingChange("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`${styles.billingBtn} ${billing === "annual" ? styles.billingBtnActive : ""}`}
            onClick={() => onBillingChange("annual")}
          >
            Annual
          </button>
        </div>
        {billing === "annual" && <span className={styles.billingBadge}>2 months free</span>}
      </div>

      <div className={styles.planCardsRegion}>
        <SegmentTabBar
          segment={segment}
          onSegmentChange={onSegmentChange}
          ariaLabel="Plans by audience"
          panelIds={planPanelIds}
        />

        <div
          className={`${styles.cardsGrid} ${segment !== "online" ? styles.tabPanelHidden : ""}`}
          role="tabpanel"
          id={planPanelIds.online}
          aria-hidden={segment !== "online"}
        >
          <article className={styles.planCard}>
            <h3 className={styles.planName}>Creator</h3>
            <p className={styles.planWho}>For educators launching their first online course</p>
            <div className={styles.priceBlock}>
              <PriceArea billing={billing} monthly="₹1,999" annual="₹1,666" />
            </div>
            <Link href="/register" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
              Start Free Trial
            </Link>
            <p className={styles.ctaSub}>14-day free trial · No credit card</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>What&apos;s included</div>
            <ul className={styles.featureList}>
              {[
                "Up to 100 students",
                "Course creation & delivery",
                "Basic Razorpay payment integration",
                "Student progress tracking",
                "Landing page builder",
                "Custom domain (subdomain)",
              ].map((t) => (
                <li key={t} className={styles.featureItem}>
                  <CheckIcon />
                  {t}
                </li>
              ))}
            </ul>
            <a href={featuresComparisonHref} className={styles.seeAllLink}>
              See all features ↓
            </a>
          </article>

          <article className={`${styles.planCard} ${styles.planCardPopular}`}>
            <span className={styles.popularBadge}>Most Popular</span>
            <h3 className={styles.planName}>Academy</h3>
            <p className={styles.planWho}>For growing online academies building an audience</p>
            <div className={styles.priceBlock}>
              <PriceArea billing={billing} monthly="₹4,999" annual="₹4,166" />
            </div>
            <Link href="/register" className={`${styles.ctaFull} ${styles.ctaPopular}`}>
              Get Started
            </Link>
            <p className={styles.ctaSub}>14-day free trial · No credit card</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>Everything in Creator, plus</div>
            <ul className={styles.featureList}>
              {[
                "Up to 500 students",
                "Full custom domain",
                "Branded mobile app",
                "Live classes & recorded content",
                "CRM & email automation",
                "Razorpay subscription billing",
              ].map((t) => (
                <li key={t} className={styles.featureItem}>
                  <CheckIcon />
                  {t}
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.planCard}>
            <h3 className={styles.planName}>Scale</h3>
            <p className={styles.planWho}>For established academies with large student bases</p>
            <div className={styles.priceBlock}>
              <div className={styles.customPrice}>Custom Pricing</div>
              <div className={styles.customSub}>Based on audience size & integrations</div>
            </div>
            <button type="button" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
              Contact Sales
            </button>
            <p className={styles.ctaSub}>Typically responds within 2 hours</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>Everything in Academy, plus</div>
            <ul className={styles.featureList}>
              {[
                "Unlimited students",
                "Multi-instructor management",
                "Advanced analytics & reports",
                "API access",
                "White-label everything",
              ].map((t) => (
                <li key={t} className={styles.featureItem}>
                  <CheckIcon />
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div
          className={`${styles.cardsGrid} ${segment !== "teachers" ? styles.tabPanelHidden : ""}`}
          role="tabpanel"
          id={planPanelIds.teachers}
          aria-hidden={segment !== "teachers"}
        >
          <article className={styles.planCard}>
            <h3 className={styles.planName}>Free</h3>
            <p className={styles.planWho}>For teachers just getting started</p>
            <div className={styles.priceBlock}>
              <div className={styles.priceAnnualRow}>
                <span className={styles.priceMain}>₹0</span>
                <span className={styles.perMonth}>/month</span>
              </div>
            </div>
            <Link href="/register" className={`${styles.ctaFull} ${styles.ctaOutline} ${styles.ctaFullNoSub}`}>
              Get Started Free
            </Link>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>What&apos;s included</div>
            <ul className={styles.featureList}>
              {[
                "Up to 25 students",
                "1 course",
                "Basic storefront page",
                "Razorpay payment link integration",
                "Edveo subdomain",
              ].map((t) => (
                <li key={t} className={styles.featureItem}>
                  <CheckIcon />
                  {t}
                </li>
              ))}
            </ul>
            <a href={featuresComparisonHref} className={styles.seeAllLink}>
              See all features ↓
            </a>
          </article>

          <article className={`${styles.planCard} ${styles.planCardPopular}`}>
            <span className={styles.popularBadge}>Most Popular</span>
            <h3 className={styles.planName}>Educator</h3>
            <p className={styles.planWho}>For teachers building a personal brand</p>
            <div className={styles.priceBlock}>
              <PriceArea billing={billing} monthly="₹999" annual="₹832" />
            </div>
            <Link href="/register" className={`${styles.ctaFull} ${styles.ctaPopular}`}>
              Start Free Trial
            </Link>
            <p className={styles.ctaSub}>14-day free trial · No credit card</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>Everything in Free, plus</div>
            <ul className={styles.featureList}>
              {[
                "Up to 200 students",
                "Unlimited courses",
                "Custom domain",
                "Student progress tracking",
                "WhatsApp notification automation",
                "Remove Edveo branding",
              ].map((t) => (
                <li key={t} className={styles.featureItem}>
                  <CheckIcon />
                  {t}
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.planCard}>
            <h3 className={styles.planName}>Pro</h3>
            <p className={styles.planWho}>For full-time educators scaling their income</p>
            <div className={styles.priceBlock}>
              <PriceArea billing={billing} monthly="₹2,499" annual="₹2,082" />
            </div>
            <Link href="/register" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
              Start Free Trial
            </Link>
            <p className={styles.ctaSub}>14-day free trial · No credit card</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>Everything in Educator, plus</div>
            <ul className={styles.featureList}>
              {[
                "Up to 1,000 students",
                "Live classes",
                "Branded mobile app",
                "Advanced analytics",
                "Priority support",
              ].map((t) => (
                <li key={t} className={styles.featureItem}>
                  <CheckIcon />
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div
          className={`${styles.cardsGrid} ${segment !== "institutes" ? styles.tabPanelHidden : ""}`}
          role="tabpanel"
          id={planPanelIds.institutes}
          aria-hidden={segment !== "institutes"}
        >
          <article className={styles.planCard}>
            <h3 className={styles.planName}>Starter</h3>
            <p className={styles.planWho}>For small coaching centres getting started</p>
            <div className={styles.priceBlock}>
              <PriceArea billing={billing} monthly="₹3,499" annual="₹2,916" />
            </div>
            <Link href="/register" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
              Start Free Trial
            </Link>
            <p className={styles.ctaSub}>14-day free trial · No credit card</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>What&apos;s included</div>
            <ul className={styles.featureList}>
              {[
                "Up to 200 students",
                "LMS + ERP + CRM",
                "Fee collection & attendance",
                "Digital timetable",
                "Razorpay payment integration",
                "WhatsApp notifications",
              ].map((t) => (
                <li key={t} className={styles.featureItem}><CheckIcon />{t}</li>
              ))}
            </ul>
            <a href={featuresComparisonHref} className={styles.seeAllLink}>See all features ↓</a>
          </article>

          <article className={`${styles.planCard} ${styles.planCardPopular}`}>
            <span className={styles.popularBadge}>Most Popular</span>
            <h3 className={styles.planName}>Professional</h3>
            <p className={styles.planWho}>For growing institutes managing multiple batches</p>
            <div className={styles.priceBlock}>
              <PriceArea billing={billing} monthly="₹6,999" annual="₹5,832" />
            </div>
            <Link href="/register" className={`${styles.ctaFull} ${styles.ctaPopular}`}>
              Get Started
            </Link>
            <p className={styles.ctaSub}>14-day free trial · No credit card</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>Everything in Starter, plus</div>
            <ul className={styles.featureList}>
              {[
                "Up to 1,000 students",
                "WhatsApp CRM + AI lead scoring",
                "Multi-batch management",
                "AI quiz generation",
                "Result & performance reports",
                "Priority support",
              ].map((t) => (
                <li key={t} className={styles.featureItem}><CheckIcon />{t}</li>
              ))}
            </ul>
          </article>

          <article className={styles.planCard}>
            <h3 className={styles.planName}>Business</h3>
            <p className={styles.planWho}>For large institutes and multi-branch operations</p>
            <div className={styles.priceBlock}>
              <div className={styles.customPrice}>Custom Pricing</div>
              <div className={styles.customSub}>Based on student count & branches</div>
            </div>
            <button type="button" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
              Contact Sales
            </button>
            <p className={styles.ctaSub}>Typically responds within 2 hours</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>Everything in Professional, plus</div>
            <ul className={styles.featureList}>
              {[
                "Unlimited students",
                "Multi-branch management",
                "White-label branded app",
                "Dedicated account manager",
                "Enterprise SLA",
                "API access",
              ].map((t) => (
                <li key={t} className={styles.featureItem}><CheckIcon />{t}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      <div className={styles.trustRow}>
        <span className={styles.razorpayInline}>
          <RazorpayMark />
          Powered by Razorpay
        </span>
        <span className={styles.trustSep}>·</span>
        <span>SSL Secured</span>
        <span className={styles.trustSep}>·</span>
        <span>Cancel anytime</span>
        <span className={styles.trustSep}>·</span>
        <span>No setup fee</span>
      </div>
    </>
  );
}
