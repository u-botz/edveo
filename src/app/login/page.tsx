"use client";

import { useState } from "react";
import Link from "next/link";
import EdveoLogo from "../components/EdveoLogo";

type Step = "identifier" | "password";
type Role = "tenant" | "platform";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("identifier");
  const [role, setRole] = useState<Role>("tenant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  async function handleIdentifier(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setStep("password");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError("");

    const endpoint =
      role === "platform"
        ? `${API_BASE}/api/development/auth/platform/admin/login`
        : `${API_BASE}/api/tenant/auth/login`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.message ?? data?.error ?? "Invalid email or password.");
        setLoading(false);
        return;
      }

      // Store token if returned
      const token = data?.data?.token ?? data?.token ?? data?.access_token;
      if (token) {
        localStorage.setItem("edveo_token", token);
      }

      // Redirect based on role
      const redirect =
        role === "platform"
          ? "/admin/dashboard"
          : (data?.data?.tenant_dashboard_url ?? "/dashboard");
      window.location.href = redirect;
    } catch {
      setError("Could not connect. Please check your internet connection.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f6fa",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "var(--font-body, system-ui, sans-serif)",
    }}>

      {/* Logo */}
      <Link href="/" style={{ marginBottom: 32, display: "inline-block" }}>
        <EdveoLogo variant="nav" />
      </Link>

      {/* Card */}
      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: "40px 40px 36px",
        width: "100%",
        maxWidth: 420,
        boxShadow: "0 4px 32px rgba(13,45,78,0.08)",
        border: "1px solid rgba(13,45,78,0.06)",
      }}>

        {/* Role toggle — only visible on identifier step */}
        {step === "identifier" && (
          <div style={{ display: "flex", background: "#f5f6fa", borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {(["tenant", "platform"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                style={{
                  flex: 1, padding: "9px 0", borderRadius: 8, border: "none", cursor: "pointer",
                  fontWeight: 600, fontSize: 13,
                  background: role === r ? "#fff" : "transparent",
                  color: role === r ? "#0D2D4E" : "#6b7280",
                  boxShadow: role === r ? "0 1px 4px rgba(13,45,78,0.1)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {r === "tenant" ? "Institute / Teacher" : "Platform Admin"}
              </button>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0D2D4E", marginBottom: 6 }}>
          {step === "identifier" ? "Welcome back" : "Enter your password"}
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.88rem", marginBottom: 28 }}>
          {step === "identifier"
            ? "Sign in to your Edveo account"
            : email}
        </p>

        {/* Back button on password step */}
        {step === "password" && (
          <button
            type="button"
            onClick={() => { setStep("identifier"); setError(""); setPassword(""); }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              color: "#6b7280", fontSize: "0.82rem", marginBottom: 20, padding: 0,
            }}
          >
            ← Change email
          </button>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: 8, padding: "12px 16px",
            color: "#dc2626", fontSize: "0.85rem", marginBottom: 20,
          }}>
            {error}
          </div>
        )}

        {/* Step 1 — Email */}
        {step === "identifier" && (
          <form onSubmit={handleIdentifier} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", color: "#374151", marginBottom: 6 }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 10, fontSize: "0.95rem",
                  border: "1.5px solid rgba(13,45,78,0.15)", outline: "none",
                  color: "#0D2D4E", background: "#fff", boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%", padding: "13px 0", borderRadius: 10,
                background: "linear-gradient(135deg,#001831,#0D2D4E)",
                color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                border: "none", cursor: "pointer",
              }}
            >
              Continue →
            </button>
          </form>
        )}

        {/* Step 2 — Password */}
        {step === "password" && (
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontWeight: 600, fontSize: "0.85rem", color: "#374151" }}>
                  Password
                </label>
                <Link href="/forgot-password" style={{ fontSize: "0.8rem", color: "#2EAA6E", textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoFocus
                  style={{
                    width: "100%", padding: "12px 44px 12px 14px", borderRadius: 10, fontSize: "0.95rem",
                    border: "1.5px solid rgba(13,45,78,0.15)", outline: "none",
                    color: "#0D2D4E", background: "#fff", boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "#9ca3af", fontSize: "0.8rem", padding: 0,
                  }}
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px 0", borderRadius: 10,
                background: loading ? "#94a3b8" : "linear-gradient(135deg,#001831,#0D2D4E)",
                color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        )}

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(13,45,78,0.08)" }} />
          <span style={{ color: "#9ca3af", fontSize: "0.78rem" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "rgba(13,45,78,0.08)" }} />
        </div>

        {/* Google SSO */}
        <a
          href={`${API_BASE}/api/auth/google/redirect?role=tenant`}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            width: "100%", padding: "12px 0", borderRadius: 10,
            border: "1.5px solid rgba(13,45,78,0.12)", background: "#fff",
            color: "#0D2D4E", fontWeight: 600, fontSize: "0.9rem",
            textDecoration: "none", boxSizing: "border-box",
          }}
        >
          <GoogleIcon />
          Continue with Google
        </a>

        {/* Footer */}
        <p style={{ textAlign: "center", marginTop: 28, fontSize: "0.82rem", color: "#9ca3af" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "#2EAA6E", fontWeight: 600, textDecoration: "none" }}>
            Start free trial
          </Link>
        </p>
      </div>

      {/* Bottom note */}
      <p style={{ marginTop: 24, fontSize: "0.75rem", color: "#9ca3af", textAlign: "center" }}>
        By signing in you agree to our{" "}
        <Link href="/terms" style={{ color: "#6b7280", textDecoration: "underline" }}>Terms</Link>
        {" "}and{" "}
        <Link href="/privacy" style={{ color: "#6b7280", textDecoration: "underline" }}>Privacy Policy</Link>.
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}
