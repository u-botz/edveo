"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { COMPANY_WHATSAPP_URL } from "@/lib/companyPublicInfo";
import styles from "./pricing.module.css";

const INSTITUTE_FAQS = [
  { q: "Can I upgrade later if my institute grows?", a: "Yes. You can upgrade anytime from your dashboard. All your data — students, fees, attendance records — moves with you automatically." },
  { q: "Is there a contract or lock-in?", a: "No. All plans are month-to-month. You can cancel anytime. We don't believe in locking you in." },
  { q: "What happens when I reach the student limit?", a: "You'll get a notification before you hit the limit. You can upgrade with one click — your platform stays running without interruption." },
  { q: "Do I need technical knowledge to set this up?", a: "No. Most institute owners complete setup in under an hour. The AI agent guides you through each step. No IT team needed." },
  { q: "What payment methods are accepted?", a: "UPI, credit card, debit card, and net banking — all via Razorpay. GST invoice provided automatically." },
];

export default function PricingPageClient() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [tab, setTab] = useState<"online" | "teachers" | "institutes">("online");

  const price = (mo: number, yr: number) =>
    billing === "monthly" ? `₹${mo.toLocaleString("en-IN")}` : `₹${yr.toLocaleString("en-IN")}`;

  return (
    <main style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      <SiteNavbar activePage="pricing" />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 100px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#0D2D4E", marginBottom: 12 }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ color: "#4b5563", fontSize: "1.05rem", maxWidth: 500, margin: "0 auto" }}>
            No setup fee. No hidden costs. Cancel anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ display: "inline-flex", background: "#fff", borderRadius: 999, padding: 4, gap: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <button
              onClick={() => setBilling("monthly")}
              style={{
                padding: "10px 24px", borderRadius: 999, border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: 14,
                background: billing === "monthly" ? "#2EAA6E" : "transparent",
                color: billing === "monthly" ? "#fff" : "#4b5563",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              style={{
                padding: "10px 24px", borderRadius: 999, border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: 14,
                background: billing === "annual" ? "#2EAA6E" : "transparent",
                color: billing === "annual" ? "#fff" : "#4b5563",
              }}
            >
              Annual
            </button>
          </div>
          {billing === "annual" && (
            <span style={{ color: "#2EAA6E", fontWeight: 700, fontSize: 13 }}>2 months free</span>
          )}
        </div>

        {/* Segment tabs */}
        <div className={styles.segmentScrollOuter}>
          <div style={{ display: "inline-flex", background: "#fff", borderRadius: 999, padding: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", flexShrink: 0 }}>
            {(["online", "teachers", "institutes"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "10px 20px", borderRadius: 999, border: "none", cursor: "pointer",
                  fontWeight: 600, fontSize: 14,
                  background: tab === t ? "#0D2D4E" : "transparent",
                  color: tab === t ? "#fff" : "#4b5563",
                  whiteSpace: "nowrap",
                }}
              >
                {t === "online" ? "Online Academies" : t === "teachers" ? "Educators" : "Coaching Institutes"}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className={styles.cardsGrid} style={{ marginBottom: 48 }}>

          {/* ── Online academies ── */}
          {tab === "online" && <>
            <PlanCard
              name="Starter"
              who="For EdTech founders launching their first online academy"
              price={price(2999, 2666)}
              billing={billing}
              cta="Get started free"
              features={[
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
              ]}
            />
            <PlanCard
              name="Growth"
              who="For online academies scaling content and revenue"
              price={price(5999, 5166)}
              billing={billing}
              cta="Get started free"
              popular
              features={[
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
              features={[
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
              showPriceSuffix={false}
              features={[
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
              ]}
            />
            <PlanCard
              name="Growth"
              who="For teachers building a personal brand"
              price={price(699, 583)}
              billing={billing}
              cta="Get started free"
              popular
              features={[
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
              ]}
            />
            <PlanCard
              name="Pro"
              who="For full-time educators scaling their income"
              price={price(1499, 1249)}
              billing={billing}
              cta="Get started free"
              features={[
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
              ]}
            />
          </>}

          {/* ── Coaching institutes (offline institution) ── */}
          {tab === "institutes" && <>
            <PlanCard
              name="Starter"
              who="For new and small institutes just getting started."
              price={price(999, 833)}
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
              price={price(1999, 1666)}
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
                "15 GB video hosting (upload your own videos — no YouTube needed)",
                "§Support",
                "Email support",
              ]}
            />
            <PlanCard
              name="Pro"
              who="For established institutes that need full control and advanced insights."
              price={price(3999, 3333)}
              billing={billing}
              cta="Go Pro"
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
                "40 GB video hosting",
                "§Support",
                "Priority support (fastest response)",
              ]}
            />
          </>}

        </div>

        {tab === "online" && (
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#64748b",
              margin: "0 0 48px",
              lineHeight: 1.5,
            }}
          >
            New academies get 50 free AI credits on signup · Buy additional credit packs anytime
          </p>
        )}

        {tab === "teachers" && (
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#64748b",
              margin: "0 0 48px",
              lineHeight: 1.5,
            }}
          >
            New teachers get 50 free AI credits on signup · Buy additional credit packs anytime
          </p>
        )}

        {/* Trust row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", color: "#6b7280", fontSize: 13, marginBottom: 64 }}>
          {["Powered by Razorpay", "SSL Secured", "Cancel anytime", "No setup fee", "Free forever"].map((t) => (
            <span key={t}>✓ {t}</span>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 800, color: "#0D2D4E", marginBottom: 32 }}>
            Frequently Asked Questions
          </h2>
          {(tab === "institutes" ? INSTITUTE_FAQS : FAQS).map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>

      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,#001831,#0D2D4E)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, marginBottom: 16 }}>
          Not Sure Which Plan Is Right?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: 32 }}>
          Chat with us on WhatsApp — we&apos;ll tell you exactly which plan fits your institute in under 10 minutes.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/register" style={{ background: "#fff", color: "#0D2D4E", fontWeight: 700, padding: "14px 32px", borderRadius: 8, textDecoration: "none" }}>
            Get started free →
          </Link>
          <a href={COMPANY_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ background: "#2EAA6E", color: "#fff", fontWeight: 700, padding: "14px 32px", borderRadius: 8, textDecoration: "none" }}>
            Chat on WhatsApp →
          </a>
        </div>
      </div>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}

/* ── Plan Card ── */
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
  return (
    <div style={{
      background: popular ? "#0D2D4E" : "#fff",
      color: popular ? "#fff" : "#0D2D4E",
      borderRadius: 16,
      padding: 32,
      boxShadow: popular ? "0 8px 32px rgba(13,45,78,0.18)" : "0 2px 16px rgba(13,45,78,0.07)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      border: popular ? "none" : "1px solid rgba(13,45,78,0.07)",
    }}>
      {popular && (
        <span style={{
          position: "absolute", top: 16, right: 16,
          background: "#2EAA6E", color: "#fff",
          fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
          textTransform: "uppercase", padding: "5px 10px", borderRadius: 999,
        }}>
          ⭐ Most Popular
        </span>
      )}
      <div style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: 6 }}>{name}</div>
      <div style={{ fontSize: "0.82rem", opacity: 0.65, marginBottom: 20, lineHeight: 1.4 }}>{who}</div>

      {price === "Custom" ? (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 800, fontSize: "1.6rem" }}>Custom Pricing</div>
          <div style={{ fontSize: "0.78rem", opacity: 0.55, marginTop: 4 }}>
            {customSub ?? "Based on size & requirements"}
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: perfectFor ? 12 : 24 }}>
          <span style={{ fontWeight: 800, fontSize: "2rem" }}>{price}</span>
          {showPriceSuffix && (
            <span style={{ fontSize: "0.85rem", opacity: 0.6, marginLeft: 4 }}>/month</span>
          )}
          {billing === "annual" && price !== "Free" && (
            <div style={{ fontSize: "0.75rem", marginTop: 4, color: popular ? "#a7f3d0" : "#2EAA6E" }}>
              billed annually
            </div>
          )}
        </div>
      )}

      {perfectFor && (
        <div style={{
          fontSize: "0.82rem", fontWeight: 600, marginBottom: 20,
          padding: "8px 12px", borderRadius: 8,
          background: popular ? "rgba(255,255,255,0.1)" : "rgba(46,170,110,0.08)",
          color: popular ? "rgba(255,255,255,0.85)" : "#1a7a4a",
          border: popular ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(46,170,110,0.2)",
        }}>
          {perfectFor}
        </div>
      )}

      {ghost ? (
        <button style={{
          width: "100%", padding: "12px 0", borderRadius: 8, marginBottom: ctaSub ? 6 : 24,
          border: `1.5px solid ${popular ? "rgba(255,255,255,0.3)" : "rgba(13,45,78,0.2)"}`,
          background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: "0.9rem",
          color: popular ? "#fff" : "#0D2D4E",
        }}>
          {cta}
        </button>
      ) : (
        <Link href="/register" style={{
          display: "block", textAlign: "center", padding: "12px 0", borderRadius: 8, marginBottom: ctaSub ? 6 : 24,
          background: popular ? "#2EAA6E" : "#0D2D4E",
          color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
        }}>
          {cta}
        </Link>
      )}

      {ctaSub && (
        <div style={{ fontSize: "0.75rem", opacity: 0.6, textAlign: "center", marginBottom: 18 }}>{ctaSub}</div>
      )}

      {price === "Free" && !ctaSub && (
        <div style={{ fontSize: "0.75rem", opacity: 0.5, marginBottom: 16 }}>Free forever · No credit card</div>
      )}

      <hr style={{ border: "none", borderTop: `1px solid ${popular ? "rgba(255,255,255,0.12)" : "rgba(13,45,78,0.08)"}`, marginBottom: 20 }} />

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {features.map((f, i) => {
          if (f.startsWith("§")) {
            return (
              <li key={i} style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                opacity: 0.5, marginTop: i === 0 ? 0 : 8, paddingBottom: 2,
                borderBottom: `1px solid ${popular ? "rgba(255,255,255,0.1)" : "rgba(13,45,78,0.08)"}`,
              }}>
                {f.slice(1)}
              </li>
            );
          }
          return (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.85rem", opacity: 0.85 }}>
              <span style={{ color: "#2EAA6E", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
              {f}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── FAQ Item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(13,45,78,0.08)", marginBottom: 0 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "18px 0", background: "none", border: "none",
          cursor: "pointer", fontWeight: 600, fontSize: "0.95rem", color: "#0D2D4E",
        }}
      >
        {q}
        <span style={{ fontSize: "1.2rem", color: "#2EAA6E", flexShrink: 0, marginLeft: 16 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 18, fontSize: "0.9rem", color: "#4b5563", lineHeight: 1.65 }}>
          {a}
        </div>
      )}
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
