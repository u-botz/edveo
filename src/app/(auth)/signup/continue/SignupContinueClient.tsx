"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, Check, X, AlertCircle, Mail } from "lucide-react";
import Link from "next/link";
import {
  fetchPlansForCategory,
  fetchInstitutionTypesForCategory,
  checkSubdomainForCategory,
  submitSignup,
  generateIdempotencyKey,
  isInitiateSignupResponse,
  selfSignupAuxStorageKey,
  fetchGoogleSignupContinuation,
  type TenantCategory,
  type TrialPlan,
  type InstitutionType,
} from "@/lib/api/signupApi";
import styles from "../../register/page.module.css";

const VALID_CATEGORIES: TenantCategory[] = [
  "standalone_teacher",
  "offline_institution",
  "edtech",
];

export default function SignupContinueClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  /** Opaque Redis continuation id (never put name/email in the URL — S-1). */
  const googleToken = searchParams.get("token") ?? "";
  const [continuationPhase, setContinuationPhase] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const [category, setCategory] = useState<TenantCategory | null>(null);
  const [prefillName, setPrefillName] = useState("");
  const [prefillEmail, setPrefillEmail] = useState("");

  useEffect(() => {
    if (!googleToken.trim()) {
      router.replace("/register?error=session_expired");
    }
  }, [googleToken, router]);

  useEffect(() => {
    if (!googleToken.trim()) return;
    let cancelled = false;
    setContinuationPhase("loading");
    (async () => {
      try {
        const payload = await fetchGoogleSignupContinuation(googleToken);
        if (cancelled) return;
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
    return () => {
      cancelled = true;
    };
  }, [googleToken, router]);

  useEffect(() => {
    if (continuationPhase === "error") {
      router.replace("/register?error=session_expired");
    }
  }, [continuationPhase, router]);

  // State
  const [step, setStep] = useState<"form" | "success">("form");
  const [plans, setPlans] = useState<TrialPlan[]>([]);
  const [institutionTypes, setInstitutionTypes] = useState<InstitutionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [subdomain, setSubdomain] = useState("");
  const [slug, setSlug] = useState("");
  const [subdomainStatus, setSubdomainStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "error"
  >("idle");
  const [subdomainSuggestions, setSubdomainSuggestions] = useState<string[]>([]);
  const [institutionTypeId, setInstitutionTypeId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idempotencyKeyRef = useRef<string>(generateIdempotencyKey());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Bootstrap plans / institution types after continuation is resolved
  useEffect(() => {
    if (!category || continuationPhase !== "ready") return;
    setLoading(true);
    (async () => {
      try {
        const tasks: Promise<unknown>[] = [fetchPlansForCategory(category)];
        if (category !== "edtech") {
          tasks.push(
            fetchInstitutionTypesForCategory(
              category as Exclude<TenantCategory, "edtech">
            )
          );
        }
        const results = await Promise.all(tasks);
        setPlans(results[0] as TrialPlan[]);
        if (category !== "edtech" && results[1]) {
          setInstitutionTypes(results[1] as InstitutionType[]);
        }
      } catch {
        setLoadError("Unable to load registration data. Please refresh.");
      } finally {
        setLoading(false);
      }
    })();
  }, [category, continuationPhase]);

  // Slug generation from subdomain input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (subdomain.trim()) {
        const generated = subdomain
          .toLowerCase()
          .replace(/[^a-z0-9 -]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .substring(0, 30)
          .replace(/-+$/, "");
        setSlug(generated);
      } else {
        setSlug("");
        setSubdomainStatus("idle");
      }
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [subdomain]);

  // Subdomain check
  const checkSub = useCallback(async (s: string) => {
    if (!s || s.length < 2 || !category || continuationPhase !== "ready") return;
    setSubdomainStatus("checking");
    try {
      const result = await checkSubdomainForCategory(category, s);
      setSubdomainStatus(result.available ? "available" : "taken");
      setSubdomainSuggestions(result.suggestions ?? []);
    } catch {
      setSubdomainStatus("error");
    }
  }, [category, continuationPhase]);

  useEffect(() => {
    if (!slug) return;
    const t = setTimeout(() => checkSub(slug), 600);
    return () => clearTimeout(t);
  }, [slug, checkSub]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || continuationPhase !== "ready") return;
    const newErrors: Record<string, string> = {};
    if (!slug || slug.length < 2) newErrors.subdomain = "Required — min 2 characters";
    if (subdomainStatus === "taken") {
      newErrors.subdomain = `Taken. Try: ${subdomainSuggestions.join(", ")}`;
    }
    if (category !== "edtech" && !institutionTypeId) {
      newErrors.institution_type_id = "Please select your institution type";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const trialPlan = plans.find((p) => p.is_trial) ?? plans[0];
    if (!trialPlan) {
      setGlobalError("No trial plan available. Please contact support.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitSignup(category, {
        name: prefillName,
        email: prefillEmail,
        phone: "",           // not collected in Google path
        subdomain: slug,
        ...(category !== "edtech" && institutionTypeId
          ? { institution_type_id: parseInt(institutionTypeId, 10) }
          : {}),
        plan_id: trialPlan.id,
        idempotency_key: idempotencyKeyRef.current,
        captcha_token: null,
        website_url: "",
        google_continuation_token: googleToken,
      });

      // Edtech / offline initiate returns a 64-char session token required for verify-email + complete.
      if (
        isInitiateSignupResponse(result) &&
        (category === "edtech" || category === "offline_institution")
      ) {
        const aux = {
          googleContinuationToken: googleToken || null,
          planId: trialPlan.id,
          billingCycle: "monthly" as const,
        };
        try {
          sessionStorage.setItem(
            selfSignupAuxStorageKey(result.token),
            JSON.stringify(aux)
          );
        } catch {
          /* private / quota — URL still carries signup token */
        }
        router.replace(
          `/signup/verify?token=${encodeURIComponent(result.token)}&category=${encodeURIComponent(category)}`
        );
        return;
      }

      setStep("success");
      window.scrollTo(0, 0);
    } catch (err: unknown) {
      const error = err as Error & { status?: number; serverErrors?: Record<string, string[]> };
      if (error.status === 422) {
        const serverErrors = error.serverErrors ?? {};
        const fieldErrors: Record<string, string> = {};
        Object.entries(serverErrors).forEach(([field, msgs]) => {
          fieldErrors[field === "subdomain" ? "subdomain" : field] = msgs[0] ?? "Invalid";
        });
        if (Object.keys(fieldErrors).length > 0) {
          setErrors((prev) => ({ ...prev, ...fieldErrors }));
        } else {
          setGlobalError(error.message);
        }
      } else {
        setGlobalError(error.message ?? "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const tenantDomain = process.env.NEXT_PUBLIC_TENANT_DOMAIN ?? "educoreos.com";

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
              <span className={styles.screen3Email}>{prefillEmail}</span>.<br />
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

  return (
    <div className={styles.pageWrapper}>
      <header className={`${styles.header} ${styles.headerCenter}`}>
        <div className={styles.logo}>edveo</div>
      </header>
      <main className={styles.mainContent}>
        <div className={`${styles.screenContainer} ${styles.slideInRight}`}>
          <h1 className={styles.heading}>Almost there — name your workspace</h1>
          <p className={styles.subheading}>
            Signed in as <strong>{prefillEmail}</strong> via Google.
          </p>

          {loadError && (
            <div className={`${styles.globalError} ${styles.formContainer}`} role="alert">
              <AlertCircle size={16} />
              {loadError}
            </div>
          )}
          {globalError && (
            <div className={`${styles.globalError} ${styles.formContainer}`} role="alert">
              <AlertCircle size={16} />
              {globalError}
            </div>
          )}

          <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>

            {/* Workspace / Subdomain */}
            <div className={styles.formGroup}>
              <label htmlFor="subdomain" className={styles.label}>
                Your workspace name
              </label>
              <input
                id="subdomain"
                type="text"
                placeholder="e.g. Brilliance Academy"
                className={`${styles.input} ${errors.subdomain ? styles.inputError : ""}`}
                value={subdomain}
                onChange={(e) => {
                  setSubdomain(e.target.value);
                  if (errors.subdomain) setErrors((p) => { const n = { ...p }; delete n.subdomain; return n; });
                }}
                disabled={loading || isSubmitting}
                aria-invalid={!!errors.subdomain}
              />
              {errors.subdomain && (
                <span className={styles.errorText}>
                  <X size={12} style={{ display: "inline", marginRight: 4 }} />
                  {errors.subdomain}
                </span>
              )}
              {slug && !errors.subdomain && subdomainStatus === "checking" && (
                <div className={styles.subdomainChecking}>
                  <Loader2 size={11} className={styles.spinner} />
                  Checking availability…
                </div>
              )}
              {slug && !errors.subdomain && subdomainStatus === "available" && (
                <div className={styles.subdomainPreview}>
                  <span className={styles.subdomainAvailableBadge}>
                    <Check size={11} /> Available
                  </span>
                  Your platform will be live at{" "}
                  <span className={styles.subdomainSlug}>{slug}.{tenantDomain}</span>
                </div>
              )}
              {slug && !errors.subdomain && subdomainStatus === "idle" && slug.length >= 2 && (
                <div className={styles.subdomainPreview}>
                  Your platform will be live at{" "}
                  <span className={styles.subdomainSlug}>{slug}.{tenantDomain}</span>
                </div>
              )}
            </div>

            {/* Institution Type — hidden for edtech */}
            {category !== "edtech" && (
              <div className={styles.formGroup}>
                <label htmlFor="institution_type_id" className={styles.label}>
                  Institution category
                </label>
                {loading ? (
                  <div className={styles.loadingShimmer} />
                ) : (
                  <select
                    id="institution_type_id"
                    className={`${styles.select} ${errors.institution_type_id ? styles.inputError : ""}`}
                    value={institutionTypeId}
                    onChange={(e) => setInstitutionTypeId(e.target.value)}
                    disabled={isSubmitting || loading}
                  >
                    <option value="" disabled>Select your institution type…</option>
                    {institutionTypes.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                )}
                {errors.institution_type_id && (
                  <span className={styles.errorText}>{errors.institution_type_id}</span>
                )}
              </div>
            )}

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={
                isSubmitting ||
                loading ||
                subdomainStatus === "taken" ||
                continuationPhase !== "ready"
              }
            >
              {isSubmitting ? (
                <><Loader2 className={styles.spinner} size={20} /> Setting up…</>
              ) : (
                "Start my free trial →"
              )}
            </button>

            <p className={styles.footerText}>
              By continuing, you agree to Edveo&apos;s{" "}
              <Link href="/terms" className={styles.linkDark}>Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className={styles.linkDark}>Privacy Policy</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
