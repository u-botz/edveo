"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { verifyTeacherSignupEmailLink } from "@/lib/api/signupApi";
import styles from "../../../register/page.module.css";

function fallbackLoginUrl(subdomain: string): string {
  const host = process.env.NEXT_PUBLIC_TENANT_DOMAIN ?? "educoreos.com";
  return `https://${subdomain}.${host}/${subdomain}/auth/login`;
}

export default function TeacherVerifyClient() {
  const searchParams = useSearchParams();
  const idRaw = searchParams.get("id") ?? "";
  const token = searchParams.get("token") ?? "";
  const id = idRaw !== "" ? Number.parseInt(idRaw, 10) : NaN;

  const [phase, setPhase] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [signInUrl, setSignInUrl] = useState("");
  const ranRef = useRef(false);
  const navigateDoneRef = useRef(false);

  const navigateToSignIn = useCallback(() => {
    if (navigateDoneRef.current || !signInUrl) return;
    navigateDoneRef.current = true;
    window.location.assign(signInUrl);
  }, [signInUrl]);

  useEffect(() => {
    if (ranRef.current) return;
    if (!Number.isFinite(id) || id < 1 || token === "") {
      setPhase("error");
      setErrorMessage(
        "This link is missing required information. Open the link from your verification email, or start signup again."
      );
      return;
    }

    ranRef.current = true;
    let cancelled = false;

    void (async () => {
      try {
        const res = await verifyTeacherSignupEmailLink(id, token);
        if (cancelled) return;
        const url =
          res.data.login_url?.trim() !== ""
            ? res.data.login_url
            : fallbackLoginUrl(res.data.subdomain);
        const msg =
          typeof res.message === "string" && res.message.trim() !== ""
            ? res.message.trim()
            : "Your email is verified and your workspace is ready.";
        setSuccessMessage(msg);
        setSignInUrl(url);
        setPhase("success");
      } catch (e) {
        if (cancelled) return;
        setPhase("error");
        setErrorMessage(e instanceof Error ? e.message : "Verification failed.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, token]);

  useEffect(() => {
    if (phase !== "success" || !signInUrl) return;
    const t = window.setTimeout(() => navigateToSignIn(), 4500);
    return () => window.clearTimeout(t);
  }, [phase, signInUrl, navigateToSignIn]);

  if (phase === "loading") {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>edveo</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              padding: "24px 0",
            }}
          >
            <Loader2
              className={styles.spinner}
              size={40}
              strokeWidth={2}
              color="#6366f1"
            />
            <p style={{ margin: 0, color: "#475569", textAlign: "center" }}>
              Verifying your email and preparing your workspace…
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "success") {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>edveo</div>
          <div style={{ textAlign: "center", padding: "8px 0 0" }}>
            <CheckCircle2
              size={52}
              strokeWidth={2}
              color="#059669"
              style={{ margin: "0 auto", display: "block" }}
              aria-hidden
            />
            <h1
              style={{
                margin: "20px 0 0",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              You&apos;re verified
            </h1>
            <p
              style={{
                margin: "16px 0 0",
                textAlign: "left",
                lineHeight: 1.55,
                color: "#475569",
                fontSize: 15,
              }}
            >
              {successMessage}
            </p>
            <p
              style={{
                margin: "14px 0 0",
                textAlign: "left",
                fontSize: 13,
                color: "#64748b",
                lineHeight: 1.5,
              }}
            >
              You&apos;ll be taken to sign in in a few seconds. Use the email and password from your inbox, or
              &quot;Continue with Google&quot; if you signed up with Google.
            </p>
            <button
              type="button"
              onClick={() => navigateToSignIn()}
              style={{
                marginTop: 24,
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "none",
                background: "#059669",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Go to sign in now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>edveo</div>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            padding: "16px 0",
            color: "#b45309",
          }}
        >
          <AlertCircle size={22} style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ margin: 0, lineHeight: 1.5 }}>{errorMessage}</p>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: "#64748b" }}>
          <Link href="/register" style={{ color: "#4f46e5" }}>
            Back to registration
          </Link>
        </p>
      </div>
    </div>
  );
}
