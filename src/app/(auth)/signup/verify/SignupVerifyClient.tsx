"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import {
  fetchPlansForCategory,
  verifyInstitutionSignupEmail,
  completeInstitutionSignup,
  selfSignupAuxStorageKey,
  type InstitutionEmailVerifyCategory,
  type SelfSignupAuxPayload,
} from "@/lib/api/signupApi";
import styles from "../../register/page.module.css";

const VALID: InstitutionEmailVerifyCategory[] = ["edtech", "offline_institution"];

function parseAux(
  signupToken: string
): { payload: SelfSignupAuxPayload | null; rawPresent: boolean } {
  if (typeof window === "undefined") {
    return { payload: null, rawPresent: false };
  }
  try {
    const raw = sessionStorage.getItem(selfSignupAuxStorageKey(signupToken));
    if (!raw) return { payload: null, rawPresent: false };
    const parsed = JSON.parse(raw) as Partial<SelfSignupAuxPayload>;
    if (
      typeof parsed.planId === "number" &&
      (parsed.billingCycle === "monthly" || parsed.billingCycle === "annual")
    ) {
      return {
        payload: {
          googleContinuationToken:
            typeof parsed.googleContinuationToken === "string"
              ? parsed.googleContinuationToken
              : null,
          planId: parsed.planId,
          billingCycle: parsed.billingCycle,
        },
        rawPresent: true,
      };
    }
  } catch {
    /* ignore */
  }
  return { payload: null, rawPresent: false };
}

export default function SignupVerifyClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const signupToken = searchParams.get("token") ?? "";
  const rawCategory = searchParams.get("category") ?? "";
  const category = VALID.includes(rawCategory as InstitutionEmailVerifyCategory)
    ? (rawCategory as InstitutionEmailVerifyCategory)
    : null;

  const [code, setCode] = useState("");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [auxHint, setAuxHint] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!signupToken || signupToken.length !== 64 || !category) {
      router.replace("/register?error=session_expired");
    }
  }, [signupToken, category, router]);

  useEffect(() => {
    if (!signupToken || signupToken.length !== 64) return;
    try {
      const raw = sessionStorage.getItem(selfSignupAuxStorageKey(signupToken));
      if (!raw) {
        setAuxHint(
          "If you used Google sign-in, open this page in the same browser where you finished naming your workspace, or verification may fail."
        );
      } else {
        setAuxHint(null);
      }
    } catch {
      setAuxHint(null);
    }
  }, [signupToken]);

  const resolvePlanContext = useCallback(async () => {
    if (!category) throw new Error("Invalid category");
    const { payload } = parseAux(signupToken);
    if (payload) {
      return payload;
    }
    const plans = await fetchPlansForCategory(category);
    const trial = plans.find((p) => p.is_trial) ?? plans[0];
    if (!trial) throw new Error("No plan available");
    return {
      googleContinuationToken: null as string | null,
      planId: trial.id,
      billingCycle: "monthly" as const,
    };
  }, [category, signupToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    if (!category || signupToken.length !== 64) return;
    const digits = code.replace(/\D/g, "");
    if (digits.length !== 6) {
      setGlobalError("Enter the 6-digit code from your email.");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyInstitutionSignupEmail(category, signupToken, digits);
      const aux = await resolvePlanContext();
      const done = await completeInstitutionSignup(category, {
        token: signupToken,
        plan_id: aux.planId,
        billing_cycle: aux.billingCycle,
        google_continuation_token:
          aux.googleContinuationToken && aux.googleContinuationToken.length > 0
            ? aux.googleContinuationToken
            : null,
      });

      try {
        sessionStorage.removeItem(selfSignupAuxStorageKey(signupToken));
      } catch {
        /* ignore */
      }

      if (done.status === "provisioned") {
        window.location.assign(done.dashboard_url);
        return;
      }

      setGlobalError(
        "This trial was set up, but paid checkout from this screen is not available yet. Please contact support or pick the free trial plan."
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setGlobalError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!category || signupToken.length !== 64) {
    return null;
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={`${styles.header} ${styles.headerCenter}`}>
        <div className={styles.logo}>edveo</div>
      </header>
      <main className={styles.mainContent}>
        <div className={`${styles.screenContainer} ${styles.slideInRight}`}>
          <h1 className={styles.heading}>Enter your verification code</h1>
          <p className={styles.subheading}>
            We sent a 6-digit code to the email you used at signup. Enter it below
            to create your workspace.
          </p>

          {auxHint && (
            <p className={styles.footerText} style={{ marginBottom: 16 }}>
              {auxHint}
            </p>
          )}

          {globalError && (
            <div className={`${styles.globalError} ${styles.formContainer}`} role="alert">
              <AlertCircle size={16} />
              {globalError}
            </div>
          )}

          <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="verify-code" className={styles.label}>
                Verification code
              </label>
              <input
                id="verify-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="000000"
                className={styles.input}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                disabled={isSubmitting}
                aria-invalid={!!globalError}
              />
            </div>

            <button type="submit" className={styles.primaryButton} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className={styles.spinner} size={20} /> Verifying…
                </>
              ) : (
                "Verify and open my workspace"
              )}
            </button>

            <p className={styles.footerText}>
              Wrong email or need to start over?{" "}
              <Link href="/register" className={styles.linkDark}>
                Back to registration
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
