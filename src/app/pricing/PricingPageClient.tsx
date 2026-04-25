"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";

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
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", background: "#fff", borderRadius: 999, padding: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            {(["online", "teachers", "institutes"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "10px 24px", borderRadius: 999, border: "none", cursor: "pointer",
                  fontWeight: 600, fontSize: 14,
                  background: tab === t ? "#0D2D4E" : "transparent",
                  color: tab === t ? "#fff" : "#4b5563",
                  whiteSpace: "nowrap",
                }}
              >
                {t === "online" ? "Online Academies" : t === "teachers" ? "Standalone Teachers" : "Coaching Institutes"}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 48 }}>

          {/* ── ONLINE ACADEMIES ── */}
          {tab === "online" && <>
            <PlanCard
              name="Creator"
              who="For educators launching their first online course"
              price={price(1999, 1666)}
              billing={billing}
              cta="Start Free Trial"
              features={["Up to 100 students","Course creation & delivery","Razorpay payments","Student progress tracking","Landing page builder","Subdomain included"]}
            />
            <PlanCard
              name="Academy"
              who="For growing online academies"
              price={price(4999, 4166)}
              billing={billing}
              cta="Get Started"
              popular
              features={["Up to 500 students","Full custom domain","Branded mobile app","Live & recorded classes","CRM & email automation","Subscription billing"]}
            />
            <PlanCard
              name="Scale"
              who="For established academies with large student bases"
              price="Custom"
              billing={billing}
              cta="Contact Sales"
              ghost
              features={["Unlimited students","Multi-instructor","Advanced analytics","API access","White-label everything","Dedicated account manager"]}
            />
          </>}

          {/* ── STANDALONE TEACHERS ── */}
          {tab === "teachers" && <>
            <PlanCard
              name="Free"
              who="For teachers just getting started"
              price="₹0"
              billing={billing}
              cta="Get Started Free"
              features={["Up to 25 students","1 course","Basic storefront","Razorpay payment links","Edveo subdomain"]}
            />
            <PlanCard
              name="Educator"
              who="For teachers building a personal brand"
              price={price(999, 832)}
              billing={billing}
              cta="Start Free Trial"
              popular
              features={["Up to 200 students","Unlimited courses","Custom domain","Progress tracking","WhatsApp automation","Remove Edveo branding"]}
            />
            <PlanCard
              name="Pro"
              who="For full-time educators scaling their income"
              price={price(2499, 2082)}
              billing={billing}
              cta="Start Free Trial"
              features={["Up to 1,000 students","Live classes","Branded mobile app","Advanced analytics","Priority support"]}
            />
          </>}

          {/* ── COACHING INSTITUTES ── */}
          {tab === "institutes" && <>
            <PlanCard
              name="Starter"
              who="For small coaching centres getting started"
              price={price(3499, 2916)}
              billing={billing}
              cta="Start Free Trial"
              features={["Up to 200 students","LMS + ERP + CRM","Fee collection & attendance","Digital timetable","Razorpay integration","WhatsApp notifications"]}
            />
            <PlanCard
              name="Professional"
              who="For growing institutes with multiple batches"
              price={price(6999, 5832)}
              billing={billing}
              cta="Get Started"
              popular
              features={["Up to 1,000 students","WhatsApp CRM + AI scoring","Multi-batch management","AI quiz generation","Performance reports","Priority support"]}
            />
            <PlanCard
              name="Business"
              who="For large institutes and multi-branch operations"
              price="Custom"
              billing={billing}
              cta="Contact Sales"
              ghost
              features={["Unlimited students","Multi-branch management","White-label branded app","Dedicated account manager","Enterprise SLA","API access"]}
            />
          </>}

        </div>

        {/* Trust row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", color: "#6b7280", fontSize: 13, marginBottom: 64 }}>
          {["Powered by Razorpay", "SSL Secured", "Cancel anytime", "No setup fee", "14-day free trial"].map((t) => (
            <span key={t}>✓ {t}</span>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 800, color: "#0D2D4E", marginBottom: 32 }}>
            Frequently Asked Questions
          </h2>
          {FAQS.map((f) => (
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
          Chat with us on WhatsApp — we'll tell you exactly which plan fits your institute in under 10 minutes.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/register" style={{ background: "#fff", color: "#0D2D4E", fontWeight: 700, padding: "14px 32px", borderRadius: 8, textDecoration: "none" }}>
            Start Free Trial →
          </Link>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" style={{ background: "#2EAA6E", color: "#fff", fontWeight: 700, padding: "14px 32px", borderRadius: 8, textDecoration: "none" }}>
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
  name, who, price, billing, cta, features, popular, ghost,
}: {
  name: string;
  who: string;
  price: string;
  billing: "monthly" | "annual";
  cta: string;
  features: string[];
  popular?: boolean;
  ghost?: boolean;
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
          Most Popular
        </span>
      )}
      <div style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: 6 }}>{name}</div>
      <div style={{ fontSize: "0.82rem", opacity: 0.65, marginBottom: 20, lineHeight: 1.4 }}>{who}</div>

      {price === "Custom" ? (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 800, fontSize: "1.6rem" }}>Custom Pricing</div>
          <div style={{ fontSize: "0.78rem", opacity: 0.55, marginTop: 4 }}>Based on size & requirements</div>
        </div>
      ) : (
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontWeight: 800, fontSize: "2rem" }}>{price}</span>
          <span style={{ fontSize: "0.85rem", opacity: 0.6, marginLeft: 4 }}>/month</span>
          {billing === "annual" && (
            <div style={{ fontSize: "0.75rem", marginTop: 4, color: popular ? "#a7f3d0" : "#2EAA6E" }}>
              billed annually
            </div>
          )}
        </div>
      )}

      {ghost ? (
        <button style={{
          width: "100%", padding: "12px 0", borderRadius: 8, marginBottom: 24,
          border: `1.5px solid ${popular ? "rgba(255,255,255,0.3)" : "rgba(13,45,78,0.2)"}`,
          background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: "0.9rem",
          color: popular ? "#fff" : "#0D2D4E",
        }}>
          {cta}
        </button>
      ) : (
        <Link href="/register" style={{
          display: "block", textAlign: "center", padding: "12px 0", borderRadius: 8, marginBottom: 24,
          background: popular ? "#2EAA6E" : "#0D2D4E",
          color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
        }}>
          {cta}
        </Link>
      )}

      <div style={{ fontSize: "0.75rem", opacity: 0.5, marginBottom: 16 }}>14-day free trial · No credit card</div>

      <hr style={{ border: "none", borderTop: `1px solid ${popular ? "rgba(255,255,255,0.12)" : "rgba(13,45,78,0.08)"}`, marginBottom: 20 }} />

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.85rem", opacity: 0.85 }}>
            <span style={{ color: "#2EAA6E", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
            {f}
          </li>
        ))}
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
  { q: "Is there really no credit card required for the free trial?", a: "Correct. You get 14 days of full access with no payment information required. At the end of your trial, you choose a plan or your account pauses — no automatic charges." },
  { q: "Can I switch between plans after I sign up?", a: "Yes. Upgrade anytime, effective immediately. Downgrade at the end of your billing cycle. No penalty either way." },
  { q: "Do you support Razorpay for fee collection?", a: "Yes. Razorpay is the default payment processor for all Indian billing — both your subscription to Edveo and the fees you collect from your students." },
  { q: "What happens if I exceed my student limit?", a: "You will be notified when you reach 90% of your student limit. You can upgrade immediately or archive inactive students. We never cut off access suddenly." },
  { q: "Is there a setup fee or implementation charge?", a: "None. No setup fee, no implementation charge, no onboarding cost. You go live the same day." },
  { q: "Do you offer discounts for paying annually?", a: "Yes. Annual billing saves you two months — you pay for 10 months and get 12." },
  { q: "What support is available?", a: "All plans include WhatsApp support. Professional and Academy plans include priority email support. Business and Scale plans include a dedicated account manager." },
];
