"use client";
import type { Metadata } from "next";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";


export default function ProductPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteNavbar />
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px", background: "linear-gradient(to bottom, #f8fafc, #ffffff)" }}>
        <div style={{ textAlign: "center", maxWidth: "600px" }}>
          <div style={{ display: "inline-block", background: "#e0e7ff", color: "#4f46e5", padding: "6px 16px", borderRadius: "999px", fontSize: "14px", fontWeight: 700, marginBottom: "24px", letterSpacing: "0.05em" }}>
            PRODUCT OVERVIEW
          </div>
          <h1 style={{ fontSize: "56px", fontWeight: 800, color: "#0f172a", marginBottom: "24px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Everything you need to run your institute.
          </h1>
          <p style={{ fontSize: "20px", color: "#64748b", lineHeight: 1.6, marginBottom: "40px" }}>
            We're currently designing a beautiful showcase for all our product features. In the meantime, you can explore our specific solutions or create a free account to experience the platform firsthand.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <a href="/solutions" style={{ padding: "14px 28px", background: "#fff", color: "#0f172a", borderRadius: "12px", fontWeight: 600, border: "1px solid #e2e8f0", textDecoration: "none", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              Explore Solutions
            </a>
            <a href="/signup" style={{ padding: "14px 28px", background: "#10b981", color: "#fff", borderRadius: "12px", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.2)" }}>
              Get Started Free
            </a>
          </div>
        </div>
      </main>

      <section style={{ padding: "80px 24px", background: "#fff", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", textAlign: "center", marginBottom: "48px", letterSpacing: "-0.02em" }}>
            Built for every institution type
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            
            <a href="/teacher" style={{ display: "block", textDecoration: "none", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", background: "#f8fafc", transition: "transform 0.2s, box-shadow 0.2s" }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#dbeafe", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>I am an independent teacher</h3>
              <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Manage your batches, share notes, and collect fees without the hassle of Excel and WhatsApp groups.</p>
            </a>

            <a href="/edtech" style={{ display: "block", textDecoration: "none", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", background: "#f8fafc", transition: "transform 0.2s, box-shadow 0.2s" }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#d1fae5", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>I run an online academy</h3>
              <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Host recorded courses, conduct live classes, and scale your digital presence with a white-labeled platform.</p>
            </a>

            <a href="/institutions" style={{ display: "block", textDecoration: "none", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", background: "#f8fafc", transition: "transform 0.2s, box-shadow 0.2s" }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#fef3c7", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>I run a coaching institute</h3>
              <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>Track attendance, manage faculty, process admissions, and streamline your offline operations.</p>
            </a>
            
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
