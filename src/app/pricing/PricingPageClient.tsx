"use client";

import { useState } from "react";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CtaBanner from "../components/CtaBanner";
import HeroBackdrop from "../components/home/HeroBackdrop";
import { COMPANY_WHATSAPP_URL, COMPANY_WHATSAPP_CTA_URL } from "@/lib/companyPublicInfo";
import shell from "../components/home/home.module.css";
import styles from "./pricing.module.css";

const INSTITUTE_FAQS = [
  { q: "Can I upgrade later if my institute grows?", a: "Yes. You can upgrade anytime from your dashboard. All your data — students, fees, attendance records — moves with you automatically." },
  { q: "Is there a contract or lock-in?", a: "No. All plans are month-to-month. You can cancel anytime. We don't believe in locking you in." },
  { q: "What happens when I reach the student limit?", a: "You'll get a notification before you hit the limit. You can upgrade with one click — your platform stays running without interruption." },
  { q: "Do I need technical knowledge to set this up?", a: "No. Most institute owners complete setup in under an hour. The AI agent guides you through each step. No IT team needed." },
  { q: "What payment methods are accepted?", a: "UPI, credit card, debit card, and net banking — all via Razorpay. GST invoice provided automatically." },
];

const SEGMENTS = [
  { id: "institutes", label: "Coaching Institutes" },
  { id: "teachers", label: "Educators" },
  { id: "online", label: "Online Academies" },
] as const;

const TRUST = ["Powered by Razorpay", "SSL Secured", "Cancel anytime", "Free to start"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function PricingPageClient() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [tab, setTab] = useState<"online" | "teachers" | "institutes">("institutes");

  const price = (mo: number, yr: number) =>
    billing === "monthly" ? `₹${mo.toLocaleString("en-IN")}` : `₹${yr.toLocaleString("en-IN")}`;

  const faqs = tab === "institutes" ? INSTITUTE_FAQS : FAQS;

  return (
    <main>
      <SiteNavbar activePage="pricing" />

      {/* Dark page hero — also what keeps the transparent navbar legible up top */}
      <section className={styles.pageHero} data-hero>
        <div className={styles.pageHeroBg}>
          <HeroBackdrop />
        </div>
        <div className={styles.pageHeroInner}>
          <span className={styles.heroEyebrow}>
            <span className={styles.heroEyebrowDot} />
            Pricing
          </span>
          <h1 className={styles.heroTitle}>
            Priced per institute,{" "}
            <span className={styles.heroAccent}>not per seat</span>
          </h1>
          <p className={styles.heroSub}>
            No per-teacher licence, no hidden costs, cancel anytime. Annual billing
            pays for ten months and gives you twelve.
          </p>
        </div>
      </section>

      <section className={styles.plansSection}>
        <div className={styles.plansInner}>

          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.billingRow}>
              <div className={styles.pillGroup} role="group" aria-label="Billing period">
                {(["monthly", "annual"] as const).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBilling(b)}
                    aria-pressed={billing === b}
                    className={`${styles.pill} ${billing === b ? styles.pillActive : ""}`}
                  >
                    {b === "monthly" ? "Monthly" : "Annual"}
                  </button>
                ))}
              </div>
              {billing === "annual" && <span className={styles.saveBadge}>2 months free</span>}
            </div>

            <div className={styles.segmentScroll}>
              <div className={styles.pillGroup} role="group" aria-label="Who this is for">
                {SEGMENTS.map((seg) => (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => setTab(seg.id)}
                    aria-pressed={tab === seg.id}
                    className={`${styles.segBtn} ${tab === seg.id ? styles.segBtnActive : ""}`}
                  >
                    {seg.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className={styles.cardsGrid}>
          {/* ── Online academies ── */}
          {tab === "online" && <>
            <PlanCard
              name="Starter"
              who="For EdTech founders launching their first online academy"
              price={price(2999, 2666)}
              billing={billing}
              cta="Get started free"
              ctaSub="No credit card required to try"
              perfectFor="Up to 500 students · Up to 3 instructors"
              features={[
                "§Teaching & Content",
                "Launch your own branded storefront (1 template)",
                "Schedule and manage live classes (bring your own tool)",
                "Create tests and assignments for students",
                "Create and sell course bundles",
                "§Academy Operations",
                "Manage student enquiries and admissions (CRM)",
                "Collect fees and generate invoices online",
                "Publish articles and FAQs for your students",
                "Track performance with basic analytics",
                "§Marketing & Domain",
                "Your own website with your domain name",
                "Grow sales with your own affiliate program",
                "§AI Assistant",
                "AI Agent included — 20 credits/month",
                "§Storage",
                "50 GB storage",
                "§Support",
                "Community support",
              ]}
            />
            <PlanCard
              name="Growth"
              who="For online academies scaling content and revenue"
              price={price(5999, 5166)}
              billing={billing}
              cta="Get started free"
              popular
              ctaSub="Most academies choose this plan"
              perfectFor="Up to 1,500 students · Up to 50 instructors"
              features={[
                "§Everything in Starter, plus:",
                "Create and sell unlimited courses without limits",
                "Schedule course content using drip scheduling",
                "Generate recurring revenue with student subscriptions",
                "Offer fee installments, discount codes, and coupons",
                "Track where your sales come from with pipeline analytics",
                "Engage your students with a central communication hub",
                "§Marketing & Domain",
                "Use your own custom domain and remove all Edveo branding",
                "Scale your reach with a powerful affiliate and referral program",
                "Send notifications and updates directly via WhatsApp",
                "§AI Assistant",
                "AI Agent included — 150 tasks/month",
                "Edveo Studio (3 of 5 pillars)",
                "§Storage",
                "50 GB file storage",
                "Premium hosted video (upload directly, no YouTube needed)",
                "§Support",
                "Email support",
              ]}
            />
            <PlanCard
              name="Scale"
              who="For established academies with large student bases"
              price="Custom"
              billing={billing}
              cta="Contact Sales"
              ghost
              customSub="Based on size & requirements"
              ctaSub="Built for scaling academies"
              perfectFor="Unlimited students · Unlimited instructors"
              features={[
                "§Everything in Growth, plus:",
                "Full white-label branding across all touchpoints",
                "Automate affiliate tracking and commission payouts",
                "Master your data with cohort, drop-off, and student performance analytics",
                "Drive deeper insights with automated student behavior tracking",
                "Generate AI-powered financial reports to monitor revenue and fees",
                "Assign custom roles with granular access permissions for your team",
                "Build a thriving community with forums, leaderboards, and gamification",
                "§AI Assistant",
                "AI Agent included — 400 tasks/month",
                "AI Knowledge Base — train the AI on your unique academy processes",
                "Edveo Studio (all 5 pillars unlocked)",
                "§Storage",
                "Secure video hosting for seamless ad-free playback",
                "§Support",
                "Dedicated account manager",
                "Priority support (fastest response)",
              ]}
            />
          </>}

          {/* ── Educators ── */}
          {tab === "teachers" && <>
            <PlanCard
              name="Starter"
              who="For teachers just getting started"
              price="Free"
              billing={billing}
              cta="Get started free"
              ctaSub="Free forever · No credit card required"
              showPriceSuffix={false}
              perfectFor="Up to 100 students · 3 courses · 3 batches"
              features={[
                "§Teaching & Content",
                "Schedule and manage live classes (bring your own tool)",
                "Create tests and assignments for students",
                "Launch your own branded storefront (1 template)",
                "Publish articles and FAQs for your students",
                "§Teacher Operations",
                "Manage student enquiries and admissions (CRM)",
                "Track performance with basic analytics",
                "1 concurrent device access",
                "§Marketing & Domain",
                "Your own website with your domain name",
                "§AI Assistant",
                "AI Agent included — 20 credits/month",
                "§Storage",
                "1 GB storage",
                "Videos via YouTube or Vimeo links only",
                "§Support",
                "Community support",
              ]}
            />
            <PlanCard
              name="Growth"
              who="For teachers building a personal brand"
              price={price(699, 583)}
              billing={billing}
              cta="Get started free"
              popular
              ctaSub="Most popular for individual teachers"
              perfectFor="Up to 500 students · 20 courses · 3 devices"
              features={[
                "§Everything in Starter, plus:",
                "Manage unlimited student batches effortlessly",
                "Schedule and charge for 1-on-1 paid consultations",
                "Boost your sales with discount codes and custom promotions",
                "§Teacher Operations",
                "Manage student enquiries and track leads (CRM)",
                "Access basic analytics to track your income and growth",
                "§Marketing & Domain",
                "Use your own custom domain and remove all Edveo branding",
                "§AI Assistant",
                "AI Agent included — 100 tasks/month",
                "Edveo Studio (3 of 5 pillars)",
                "§Storage",
                "10 GB file storage",
                "Integrated video hosting (upload your own videos securely)",
                "§Support",
                "Email support",
              ]}
            />
            <PlanCard
              name="Pro"
              who="For full-time educators scaling their income"
              price={price(1499, 1249)}
              billing={billing}
              cta="Get started free"
              ctaSub="Built for full-time professional educators"
              perfectFor="Unlimited students · Unlimited courses · 10 devices"
              features={[
                "§Everything in Growth, plus:",
                "Your own brand — completely remove all Edveo identity (white label)",
                "Deep insights with full revenue analytics and student performance tracking",
                "Generate steady income with recurring student subscriptions",
                "Engage students with a community forum and gamified leaderboards",
                "§AI Assistant",
                "AI Agent included — 250 tasks/month",
                "Edveo Studio (all 5 pillars)",
                "§Storage",
                "50 GB file storage",
                "Premium video hosting for seamless ad-free playback",
                "§Support",
                "Priority support (fastest response)",
              ]}
            />
          </>}

          {/* ── Coaching institutes (offline institution) ── */}
          {tab === "institutes" && <>
            <PlanCard
              name="Starter"
              who="For new and small institutes just getting started."
              price={price(1999, 1666)}
              billing={billing}
              cta="Start with Starter"
              ctaSub="No credit card required to try"
              perfectFor="Up to 100 students · 1 branch · 5 staff"
              features={[
                "§Teaching & Content",
                "Share study material — videos, PDFs, and notes",
                "Schedule and manage classes (online or in-person)",
                "Create tests and assignments for students",
                "Track which students completed what",
                "§Institute Operations",
                "Mark attendance for students and staff",
                "Manage your class timetable",
                "Collect fees and generate invoices",
                "Manage staff salaries and leave",
                "§AI Assistant",
                "AI Agent included — 50 tasks/month",
                "§Storage",
                "5 GB file storage",
                "Videos via YouTube or Vimeo links",
                "§Support",
                "Community support",
              ]}
            />
            <PlanCard
              name="Growth"
              who="For growing institutes ready to run operations professionally."
              price={price(3999, 3333)}
              billing={billing}
              cta="Start Growing"
              ctaSub="Most institutes choose this plan"
              perfectFor="Up to 500 students · 2 branches · 15 staff"
              popular
              features={[
                "§Everything in Starter, plus:",
                "Manage student enquiries and admissions (CRM)",
                "Track where your leads come from — walk-in, WhatsApp, referral, social media",
                "Send fee reminders and updates via WhatsApp",
                "Your own website with your domain name (no 'edveo.co' in the URL)",
                "Edveo branding removed from your platform",
                "Collect fees in instalments, apply concessions and discounts",
                "Auto-generate class timetables without teacher conflicts",
                "Enroll multiple students at once",
                "Basic reports — fee collection, course completion, attendance",
                "§AI Assistant",
                "AI Agent included — 200 tasks/month",
                "§Storage",
                "25 GB file storage",
                "Premium hosted video (upload directly, no YouTube needed)",
                "§Support",
                "Email support",
              ]}
            />
            <PlanCard
              name="Pro"
              who="For established institutes that need full control and advanced insights."
              price="Custom"
              billing={billing}
              cta="Contact Sales"
              ghost
              customSub="Based on size & requirements"
              ctaSub="Built for serious institute management"
              perfectFor="Unlimited students · Unlimited branches · Unlimited staff"
              features={[
                "§Everything in Growth, plus:",
                "Full reports — student performance, revenue, fee analytics",
                "AI-generated financial reports (fee collected, pending, concessions)",
                "Your own brand — completely remove all Edveo identity (white label)",
                "Custom staff roles and access permissions",
                "Student rewards and engagement (points, badges, leaderboards)",
                "Manage transport routes and vehicles",
                "Manage lab equipment and institute assets",
                "Prevent duplicate student enquiries (lead deduplication)",
                "Community forum for students",
                "§AI Assistant",
                "AI Agent included — 500 tasks/month",
                "AI Knowledge Base — teach the AI your institute's rules, fee structure, and policies",
                "§Storage",
                "100 GB file storage",
                "Premium video hosting for seamless ad-free playback",
                "§Support",
                "Priority support (fastest response)",
              ]}
            />
          </>}

          </div>

          {(tab === "online" || tab === "teachers") && (
            <p className={styles.segmentNote}>
              New accounts get 50 free AI credits on signup · buy additional credit packs anytime
            </p>
          )}

          <div className={styles.trustRow}>
            {TRUST.map((t) => (
              <span key={t} className={styles.trustItem}>
                <CheckIcon />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${shell.section} ${shell.groundWhite}`}>
        <div className={shell.container}>
          <div className={shell.heading}>
            <span className={shell.eyebrow}>FAQ</span>
            <h2 className={shell.title}>Questions before you pick a plan</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        headline="Not sure which plan is right?"
        accentSub="Chat with us on WhatsApp and we will tell you exactly which plan fits your institute in under 10 minutes."
        primaryLabel="Get a free demo →"
        secondaryLabel="Chat on WhatsApp"
        secondaryHref={COMPANY_WHATSAPP_URL}
        trustItems={["Free to start", "No credit card required", "Cancel anytime", "Data stored in India"]}
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}

/* ── Plan card ── */
function PlanCard({
  name, who, price, billing, cta, ctaSub, features, popular, ghost, showPriceSuffix = true, customSub, perfectFor,
}: {
  name: string;
  who: string;
  price: string;
  billing: "monthly" | "annual";
  cta: string;
  ctaSub?: string;
  features: string[];
  popular?: boolean;
  ghost?: boolean;
  showPriceSuffix?: boolean;
  customSub?: string;
  perfectFor?: string;
}) {
  const isCustom = price === "Custom";

  return (
    <div className={`${styles.planCard} ${popular ? styles.planCardPopular : ""}`}>
      {popular && <span className={styles.popularBadge}>Most popular</span>}

      <h3 className={styles.planName}>{name}</h3>
      <p className={styles.planWho}>{who}</p>

      {isCustom ? (
        <>
          <div className={styles.customPrice}>Custom pricing</div>
          <div className={styles.customSub}>{customSub ?? "Based on size and requirements"}</div>
        </>
      ) : (
        <>
          <div className={styles.priceBlock}>
            <span className={styles.priceMain}>{price}</span>
            {showPriceSuffix && <span className={styles.perMonth}>/month</span>}
          </div>
          {billing === "annual" && price !== "Free" && (
            <div className={styles.annualNote}>billed annually</div>
          )}
        </>
      )}

      {perfectFor && <div className={styles.perfectFor}>{perfectFor}</div>}

      <a
        href={COMPANY_WHATSAPP_CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.cta} ${popular ? styles.ctaPopular : ""} ${ghost ? styles.ctaGhost : ""}`}
      >
        {cta}
      </a>

      {ctaSub && <p className={styles.ctaSub}>{ctaSub}</p>}

      <hr className={styles.divider} />

      <ul className={styles.featureList}>
        {features.map((f, i) =>
          f.startsWith("§") ? (
            <li key={i} className={styles.featureGroup}>
              {f.slice(1)}
            </li>
          ) : (
            <li key={i} className={styles.featureItem}>
              <span className={styles.check}>
                <CheckIcon />
              </span>
              {f}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

/* ── FAQ item ── */
function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqItemOpen : ""}`}>
      <h3 className={styles.faqHeading}>
        <button
          type="button"
          className={styles.faqBtn}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.faqQ}>{q}</span>
          <span className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ""}`}>
            <ChevronIcon />
          </span>
        </button>
      </h3>
      <div className={styles.faqPanel} hidden={!open}>
        <p className={styles.faqA}>{a}</p>
      </div>
    </div>
  );
}

const FAQS = [
  { q: "Is there really no credit card required to start?", a: "Correct. You can get started on the free plan with no payment information required. Upgrade only when you need more capacity or advanced features — no automatic charges." },
  { q: "Can I switch between plans after I sign up?", a: "Yes. Upgrade anytime, effective immediately. Downgrade at the end of your billing cycle. No penalty either way." },
  { q: "Do you support Razorpay for fee collection?", a: "Yes. Razorpay is the default payment processor for all Indian billing — both your subscription to Edveo and the fees you collect from your students." },
  { q: "What happens if I exceed my student limit?", a: "You will be notified when you reach 90% of your student limit. You can upgrade immediately or archive inactive students. We never cut off access suddenly." },
  { q: "Is there a setup fee or implementation charge?", a: "None. No setup fee, no implementation charge, no onboarding cost. You go live the same day." },
  { q: "Do you offer discounts for paying annually?", a: "Yes. Annual billing saves you two months — you pay for 10 months and get 12." },
  { q: "What support is available?", a: "All plans include WhatsApp support. Professional and Academy plans include priority email support. Business and Scale plans include a dedicated account manager." },
];
