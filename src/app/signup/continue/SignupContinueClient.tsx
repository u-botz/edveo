"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import {
  fetchGoogleSignupContinuation,
  isInitiateSignupResponse,
  selfSignupAuxStorageKey,
  type TenantCategory,
} from "@/lib/api/signupApi";
import TeacherOnboardingWizard, {
  type TeacherWizardResult,
} from "@/features/teacher-onboarding-wizard/TeacherOnboardingWizard";
import styles from "../../(auth)/register/page.module.css";

const VALID_CATEGORIES: TenantCategory[] = [
  "standalone_teacher",
  "offline_institution",
  "edtech",
];

export default function SignupContinueClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const googleToken = searchParams.get("token") ?? "";
  const categoryParam = searchParams.get("category")?.trim() ?? "";

  const [continuationPhase, setContinuationPhase] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const [category, setCategory] = useState<TenantCategory | null>(null);
  const [prefillName, setPrefillName] = useState("");
  const [prefillEmail, setPrefillEmail] = useState("");
  const [successEmail, setSuccessEmail] = useState("");
  const [step, setStep] = useState<"wizard" | "success">("wizard");

  useEffect(() => {
    if (!googleToken.trim()) {
      router.replace("/signup?error=session_expired");
    }
  }, [googleToken, router]);

  useEffect(() => {
    if (categoryParam && !VALID_CATEGORIES.includes(categoryParam as TenantCategory)) {
      router.replace("/signup?error=session_expired");
    }
  }, [categoryParam, router]);

  useEffect(() => {
    if (!googleToken.trim()) return;
    if (categoryParam && !VALID_CATEGORIES.includes(categoryParam as TenantCategory)) return;
    let cancelled = false;
    setContinuationPhase("loading");
    (async () => {
      try {
        const payload = await fetchGoogleSignupContinuation(googleToken);
        if (cancelled) return;
        if (categoryParam && payload.category !== categoryParam) {
          setContinuationPhase("error");
          return;
        }
        if (!VALID_CATEGORIES.includes(payload.category)) {
          setContinuationPhase("error");
          return;
        }
        setCategory(payload.category);
        setPrefillName(payload.name);
        setPrefillEmail(payload.email);
        setContinuationPhase("ready");
      } catch {
        if (!cancelled) setContinuationPhase("error");
      }
    })();
    return () => { cancelled = true; };
  }, [googleToken, categoryParam]);

  useEffect(() => {
    if (continuationPhase === "error") {
      router.replace("/signup?error=session_expired");
    }
  }, [continuationPhase, router]);

  const handleWizardSuccess = (result: TeacherWizardResult) => {
    // For the standalone_teacher path, the backend returns pending_verification directly.
    // If it's an initiate response (unusual but future-proof), redirect to verify page.
    if (isInitiateSignupResponse(result.submitResult) && result.trialPlanId) {
      const aux = {
        googleContinuationToken: googleToken || null,
        planId: result.trialPlanId,
        billingCycle: "monthly" as const,
      };
      try {
        sessionStorage.setItem(
          selfSignupAuxStorageKey(result.submitResult.token),
          JSON.stringify(aux)
        );
      } catch {
        /* ignore */
      }
      router.replace(
        `/signup/verify?token=${encodeURIComponent(result.submitResult.token)}&category=standalone_teacher`
      );
      return;
    }

    setSuccessEmail(result.email);
    setStep("success");
    window.scrollTo(0, 0);
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (continuationPhase === "loading") {
    return (
      <div className={styles.pageWrapper}>
        <header className={`${styles.header} ${styles.headerCenter}`}>
          <div className={styles.logo}>edveo</div>
        </header>
        <main className={styles.mainContent}>
          <div className={`${styles.screenContainer} ${styles.slideInRight}`}>
            <div className={styles.loadingShimmer} style={{ height: 120, marginBottom: 24 }} />
            <p className={styles.subheading} style={{ textAlign: "center" }}>
              <Loader2 className={styles.spinner} size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: 8 }} />
              Resuming your Google sign-in…
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (continuationPhase === "error" || !category) {
    return null;
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className={styles.pageWrapper}>
        <header className={`${styles.header} ${styles.headerCenter}`}>
          <div className={styles.logo}>edveo</div>
        </header>
        <main className={styles.mainContent}>
          <div className={styles.screen3Container}>
            <div className={styles.successIconWrap}>
              <Mail size={32} color="#1B6B3A" />
            </div>
            <h1 className={styles.screen3Heading}>Check your inbox</h1>
            <p className={styles.screen3Sub}>
              We&apos;ve sent a verification link to{" "}
              <span className={styles.screen3Email}>{successEmail}</span>.<br />
              Click the link to activate your free 14-day trial.
            </p>
            <div className={styles.screen3Steps}>
              <div className={styles.screen3StepTitle}>What happens next</div>
              <ol className={styles.screen3StepList}>
                <li className={styles.screen3StepItem}>
                  <span className={styles.screen3StepNum}>1</span>
                  Open the verification email from Edveo.
                </li>
                <li className={styles.screen3StepItem}>
                  <span className={styles.screen3StepNum}>2</span>
                  Click the link — your workspace is created in seconds.
                </li>
                <li className={styles.screen3StepItem}>
                  <span className={styles.screen3StepNum}>3</span>
                  Log in with your Google account at your new dashboard URL.
                </li>
              </ol>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── Wizard (standalone_teacher only — non-teacher categories are not yet enabled) ──
  return (
    <div className={styles.pageWrapper}>
      <header className={`${styles.header} ${styles.headerCenter}`}>
        <div className={styles.logo}>edveo</div>
      </header>
      <main className={styles.mainContent} style={{ paddingTop: 32 }}>
        <p className={styles.subheading} style={{ marginBottom: 32 }}>
          Signed in as <strong>{prefillEmail}</strong> via Google.
        </p>

        {category === "standalone_teacher" ? (
          <TeacherOnboardingWizard
            prefillName={prefillName}
            prefillEmail={prefillEmail}
            googleContinuationToken={googleToken}
            onSuccess={handleWizardSuccess}
          />
        ) : (
          /* Fallback for other (currently locked) categories */
          <div className={`${styles.globalError}`} role="alert" style={{ maxWidth: 400 }}>
            <AlertCircle size={16} />
            This account type is not yet available. Please contact support.
          </div>
        )}

        <p className={styles.footerText} style={{ marginTop: 32 }}>
          By continuing, you agree to Edveo&apos;s{" "}
          <Link href="/terms-of-service" className={styles.linkDark}>Terms of Service</Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className={styles.linkDark}>Privacy Policy</Link>
        </p>
      </main>
    </div>
  );
}
