"use client";

import Link from "next/link";
import styles from "./pricing.module.css";

export type Segment = "online" | "teachers" | "institutes";

const ONLINE_STARTER_FEATURES = [
  "Up to 150 students",
  "Up to 3 instructors",
  "Up to 5 courses",
  "3 concurrent devices",
  "5 GB storage",
  "Video via YouTube / Vimeo links only",
  "Basic storefront (1 template)",
  "Live classes (bring your own tool)",
  "Quizzes & assignments",
  "CRM & lead management",
  "Student fee collection",
  "Blog & FAQ",
  "AI Agent — 20 credits/month",
  "Course bundles",
  "Custom domain",
  "Affiliate program",
  "Analytics",
] as const;

const ONLINE_GROWTH_FEATURES = [
  "Up to 1,000 students",
  "Up to 15 instructors",
  "Unlimited courses",
  "10 concurrent devices",
  "25 GB storage",
  "Cloudflare Stream — 1,000 min included",
  "Course bundles & drip scheduling",
  "Custom domain + remove Edveo branding",
  "Student subscription billing (recurring)",
  "Affiliate & referral program",
  "Fee installments, discount codes & coupons",
  "CRM pipeline analytics & source tracking",
  "Basic analytics",
  "Communication hub (full inbox)",
  "WhatsApp integration",
  "AI Agent — 150 credits/month",
  "Edveo Studio (3 of 5 pillars)",
] as const;

const ONLINE_SCALE_FEATURES = [
  "Unlimited students",
  "Unlimited instructors",
  "Unlimited courses",
  "25 concurrent devices",
  "100 GB storage",
  "Cloudflare Stream — 5,000 min included",
  "White label (full brand replacement)",
  "Advanced affiliate + commission management",
  "Full analytics + cohort & drop-off analysis",
  "Student performance insights",
  "AI financial reports",
  "Custom roles (full RBAC)",
  "Gamification & community forum",
  "AI Knowledge Base (custom academy context)",
  "AI Agent — 400 credits/month",
  "Edveo Studio (all 5 pillars)",
  "Dedicated account manager",
  "Priority support",
] as const;

const TEACHER_STARTER_FEATURES = [
  "Up to 100 students",
  "3 courses",
  "3 batches",
  "1 concurrent device",
  "1 GB storage",
  "Video via YouTube / Vimeo links only",
  "Live classes (bring your own tool)",
  "Quizzes & assignments",
  "Basic storefront (1 template)",
  "Blog & FAQ",
  "AI Agent — 20 credits/month",
  "Custom domain",
  "CRM / lead management",
  "Analytics",
] as const;

const TEACHER_GROWTH_FEATURES = [
  "Up to 500 students",
  "20 courses",
  "Unlimited batches",
  "3 concurrent devices",
  "10 GB storage",
  "Cloudflare Stream — 500 min included",
  "Custom domain",
  "Remove Edveo branding",
  "CRM & lead management",
  "1-on-1 paid consultations",
  "Basic analytics",
  "Discount codes & promotions",
  "AI Agent — 100 credits/month",
  "Edveo Studio (3 of 5 pillars)",
] as const;

const TEACHER_PRO_FEATURES = [
  "Unlimited students",
  "Unlimited courses",
  "Unlimited batches",
  "10 concurrent devices",
  "50 GB storage",
  "Cloudflare Stream — 2,000 min included",
  "White label (full brand replacement)",
  "Full analytics + student performance insights",
  "Student subscriptions (recurring billing)",
  "Gamification & community forum",
  "AI Agent — 250 credits/month",
  "Edveo Studio (all 5 pillars)",
  "Priority support",
] as const;

const INSTITUTE_STARTER_FEATURES = [
  "Up to 200 students",
  "Up to 5 staff / teachers",
  "1 branch (main only)",
  "3 concurrent devices",
  "5 GB storage",
  "Video via YouTube / Vimeo links only",
  "Up to 20 courses · Up to 10 batches",
  "Attendance & timetable (ERP)",
  "CRM & lead management (included from free)",
  "Student fee collection",
  "Live classes (bring your own tool)",
  "Quizzes & assignments",
  "AI Agent — 20 credits/month",
  "Payroll & leave management",
  "WhatsApp integration",
  "Custom domain",
  "Analytics",
] as const;

const INSTITUTE_GROWTH_FEATURES = [
  "Up to 2,000 students",
  "Up to 30 staff / teachers",
  "Up to 3 branches",
  "10 concurrent devices",
  "25 GB storage",
  "Cloudflare Stream — 1,000 min included",
  "Unlimited courses & batches",
  "Payroll & leave management (ERP)",
  "Recurring timetable templates + conflict detection",
  "WhatsApp integration",
  "CRM pipeline analytics & source tracking",
  "Fee installments, concessions & discount codes",
  "Custom domain + remove Edveo branding",
  "Basic analytics",
  "Communication hub (full inbox)",
  "Blog & AI blog writer",
  "AI Agent — 200 credits/month",
  "Edveo Studio (3 of 5 pillars)",
] as const;

const INSTITUTE_PRO_FEATURES = [
  "Unlimited students",
  "Unlimited staff / teachers",
  "Unlimited branches",
  "25 concurrent devices",
  "100 GB storage",
  "Cloudflare Stream — 5,000 min included",
  "Transport management (routes & vehicles)",
  "Asset management (labs & equipment)",
  "Lead deduplication + full CRM reports",
  "Revenue foregone tracking + credit notes",
  "Custom roles (full RBAC)",
  "White label (full brand replacement)",
  "Full analytics + student performance insights",
  "AI financial reports",
  "Gamification & community forum",
  "AI Knowledge Base (custom institutional context)",
  "AI Agent — 500 credits/month",
  "Edveo Studio (all 5 pillars)",
  "Priority support",
] as const;

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
          Educators
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
          className={segment !== "online" ? styles.tabPanelHidden : ""}
          role="tabpanel"
          id={planPanelIds.online}
          aria-hidden={segment !== "online"}
        >
          <div className={styles.cardsGrid}>
            <article className={styles.planCard}>
              <h3 className={styles.planName}>Starter</h3>
              <p className={styles.planWho}>For EdTech founders launching their first online academy</p>
              <div className={styles.priceBlock}>
                <PriceArea billing={billing} monthly="₹1,999" annual="₹1,666" />
              </div>
              <Link href="/register" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
                Get started free
              </Link>
              <p className={styles.ctaSub}>Free forever · No credit card</p>
              <div className={styles.divider} />
              <div className={styles.featuresHeading}>What&apos;s included</div>
              <ul className={styles.featureList}>
                {ONLINE_STARTER_FEATURES.map((t) => (
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
              <span className={styles.popularBadge}>Most popular</span>
              <h3 className={styles.planName}>Growth</h3>
              <p className={styles.planWho}>For online academies scaling content and revenue</p>
              <div className={styles.priceBlock}>
                <PriceArea billing={billing} monthly="₹4,999" annual="₹4,166" />
              </div>
              <Link href="/register" className={`${styles.ctaFull} ${styles.ctaPopular}`}>
                Get started free
              </Link>
              <p className={styles.ctaSub}>Free forever · No credit card</p>
              <div className={styles.divider} />
              <div className={styles.featuresHeading}>What&apos;s included</div>
              <ul className={styles.featureList}>
                {ONLINE_GROWTH_FEATURES.map((t) => (
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
                <div className={styles.customSub}>Based on size &amp; requirements</div>
              </div>
              <button type="button" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
                Contact Sales
              </button>
              <p className={styles.ctaSub}>Free forever · No credit card</p>
              <div className={styles.divider} />
              <div className={styles.featuresHeading}>What&apos;s included</div>
              <ul className={styles.featureList}>
                {ONLINE_SCALE_FEATURES.map((t) => (
                  <li key={t} className={styles.featureItem}>
                    <CheckIcon />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className={styles.segmentPlanFooter}>
            New academies get 50 free AI credits on signup · Buy additional credit packs anytime
          </p>
        </div>

        <div
          className={segment !== "teachers" ? styles.tabPanelHidden : ""}
          role="tabpanel"
          id={planPanelIds.teachers}
          aria-hidden={segment !== "teachers"}
        >
          <div className={styles.cardsGrid}>
            <article className={styles.planCard}>
              <h3 className={styles.planName}>Starter</h3>
              <p className={styles.planWho}>For teachers just getting started</p>
              <div className={styles.priceBlock}>
                <div className={styles.priceAnnualRow}>
                  <span className={styles.priceMain}>Free</span>
                </div>
              </div>
              <Link href="/register" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
                Get started free
              </Link>
              <p className={styles.ctaSub}>Free forever · No credit card</p>
              <div className={styles.divider} />
              <div className={styles.featuresHeading}>What&apos;s included</div>
              <ul className={styles.featureList}>
                {TEACHER_STARTER_FEATURES.map((t) => (
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
              <span className={styles.popularBadge}>Most popular</span>
              <h3 className={styles.planName}>Growth</h3>
              <p className={styles.planWho}>For teachers building a personal brand</p>
              <div className={styles.priceBlock}>
                <PriceArea billing={billing} monthly="₹699" annual="₹583" />
              </div>
              <Link href="/register" className={`${styles.ctaFull} ${styles.ctaPopular}`}>
                Get started free
              </Link>
              <p className={styles.ctaSub}>Free forever · No credit card</p>
              <div className={styles.divider} />
              <div className={styles.featuresHeading}>What&apos;s included</div>
              <ul className={styles.featureList}>
                {TEACHER_GROWTH_FEATURES.map((t) => (
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
                <PriceArea billing={billing} monthly="₹1,499" annual="₹1,249" />
              </div>
              <Link href="/register" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
                Get started free
              </Link>
              <p className={styles.ctaSub}>Free forever · No credit card</p>
              <div className={styles.divider} />
              <div className={styles.featuresHeading}>What&apos;s included</div>
              <ul className={styles.featureList}>
                {TEACHER_PRO_FEATURES.map((t) => (
                  <li key={t} className={styles.featureItem}>
                    <CheckIcon />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className={styles.segmentPlanFooter}>
            New teachers get 50 free AI credits on signup · Buy additional credit packs anytime
          </p>
        </div>

        <div
          className={`${styles.cardsGrid} ${segment !== "institutes" ? styles.tabPanelHidden : ""}`}
          role="tabpanel"
          id={planPanelIds.institutes}
          aria-hidden={segment !== "institutes"}
        >
          <article className={styles.planCard}>
            <h3 className={styles.planName}>Starter</h3>
            <p className={styles.planWho}>For small institutes just getting started</p>
            <div className={styles.priceBlock}>
              <div className={styles.priceAnnualRow}>
                <span className={styles.priceMain}>Free</span>
              </div>
            </div>
            <Link href="/register" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
              Get started free
            </Link>
            <p className={styles.ctaSub}>Free forever · No credit card</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>What&apos;s included</div>
            <ul className={styles.featureList}>
              {INSTITUTE_STARTER_FEATURES.map((t) => (
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
            <span className={styles.popularBadge}>Most popular</span>
            <h3 className={styles.planName}>Growth</h3>
            <p className={styles.planWho}>For growing institutes managing real operations</p>
            <div className={styles.priceBlock}>
              <PriceArea billing={billing} monthly="₹1,999" annual="₹1,666" />
            </div>
            <Link href="/register" className={`${styles.ctaFull} ${styles.ctaPopular}`}>
              Get started free
            </Link>
            <p className={styles.ctaSub}>Free forever · No credit card</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>What&apos;s included</div>
            <ul className={styles.featureList}>
              {INSTITUTE_GROWTH_FEATURES.map((t) => (
                <li key={t} className={styles.featureItem}>
                  <CheckIcon />
                  {t}
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.planCard}>
            <h3 className={styles.planName}>Pro</h3>
            <p className={styles.planWho}>For multi-branch institutions scaling seriously</p>
            <div className={styles.priceBlock}>
              <PriceArea billing={billing} monthly="₹3,999" annual="₹3,333" />
            </div>
            <Link href="/register" className={`${styles.ctaFull} ${styles.ctaOutline}`}>
              Get started free
            </Link>
            <p className={styles.ctaSub}>Free forever · No credit card</p>
            <div className={styles.divider} />
            <div className={styles.featuresHeading}>What&apos;s included</div>
            <ul className={styles.featureList}>
              {INSTITUTE_PRO_FEATURES.map((t) => (
                <li key={t} className={styles.featureItem}>
                  <CheckIcon />
                  {t}
                </li>
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
