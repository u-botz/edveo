"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  User,
  Building2,
  Layers,
  ChevronLeft,
  Loader2,
  Check,
  Mail,
  Info,
  AlertCircle,
  X,
} from "lucide-react";
import styles from "./page.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import {
  fetchPlansForCategory,
  fetchInstitutionTypesForCategory,
  checkSubdomainForCategory,
  submitSignup,
  buildGoogleSignupUrl,
  generateIdempotencyKey,
  isInitiateSignupResponse,
  selfSignupAuxStorageKey,
  type TenantCategory,
  type TrialPlan,
  type InstitutionType,
} from "@/lib/api/signupApi";
import { CONTACT_EMAIL } from "@/lib/contactEmail";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

// TenantCategory is imported from signupApi — do not re-declare

const CARDS = [
  {
    id: "standalone_teacher" as const,
    icon: User,
    title: "Solo Teacher / Tutor",
    desc: "I teach independently and manage my own students.",
  },
  {
    id: "offline_institution" as const,
    icon: Building2,
    title: "Coaching Institute or School",
    desc: "I run a physical or hybrid institute with staff and batches.",
  },
  {
    id: "edtech" as const,
    icon: Layers,
    title: "EdTech Company",
    desc: "I run an online education business with multiple instructors.",
  },
] as const;

type SubdomainStatus = "idle" | "checking" | "available" | "taken" | "error";

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function RegisterFlowClient() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState<"right" | "left">("right");

  // ── Screen 1 ──────────────────────────────────────────────────────────────
  const [category, setCategory] = useState<TenantCategory | null>(null);

  // ── API bootstrap data ────────────────────────────────────────────────────
  const [plans, setPlans] = useState<TrialPlan[]>([]);
  const [institutionTypes, setInstitutionTypes] = useState<InstitutionType[]>([]);
  const [bootstrapLoading, setBootstrapLoading] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);

  // ── Screen 2 form ─────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    full_name: "",
    institute_name: "",
    email: "",
    phone: "",
    institution_type_id: "",
    password: "",
    password_confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Subdomain state ───────────────────────────────────────────────────────
  const [slug, setSlug] = useState("");
  const [subdomainStatus, setSubdomainStatus] = useState<SubdomainStatus>("idle");
  const [subdomainSuggestions, setSubdomainSuggestions] = useState<string[]>([]);
  const slugDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subdomainCheckRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Screen 3 ──────────────────────────────────────────────────────────────
  const [submittedEmail, setSubmittedEmail] = useState("");

  // ── Idempotency key (generated once per page load) ─────────────────────────
  const idempotencyKeyRef = useRef<string>(generateIdempotencyKey());

  // OAuth error from backend redirect (F-10 / §5.7)
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  const OAUTH_ERROR_MESSAGES: Record<string, string> = {
    session_expired: "Your sign-in session expired. Please try again.",
    google_error: "Google sign-in failed. Please try again or use email.",
    unverified_email: "Your Google account email is not verified. Please verify it with Google first.",
    account_exists: "An account already exists with this email. Please log in instead.",
    provisioning_failed: "Account setup failed. Please try again or contact support.",
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Bootstrap: fetch plans + institution types on mount
  // ─────────────────────────────────────────────────────────────────────────



  // ─────────────────────────────────────────────────────────────────────────
  // Auto-select institution type when category + types are available
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!category || category === "edtech" || institutionTypes.length === 0) return;

    // Map category keywords to institution type names (case-insensitive contains)
    const keywords: Record<string, string[]> = {
      standalone_teacher: ["teacher", "tutor", "solo", "individual"],
      offline_institution: ["institute", "school", "coaching", "academy", "college"],
      edtech: ["online", "edtech", "tech", "platform", "company", "digital"],
    };

    const kws = keywords[category] ?? [];
    const matched = institutionTypes.find((t) =>
      kws.some((kw) => t.name.toLowerCase().includes(kw) || t.slug.toLowerCase().includes(kw))
    );

    if (matched) {
      setFormData((prev) => ({ ...prev, institution_type_id: String(matched.id) }));
    } else if (institutionTypes.length > 0) {
      // Fallback: first available
      setFormData((prev) => ({ ...prev, institution_type_id: String(institutionTypes[0].id) }));
    }
  }, [category, institutionTypes]);

  // ─────────────────────────────────────────────────────────────────────────
  // Slug generation (debounced 400ms) from institute_name
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (slugDebounceRef.current) clearTimeout(slugDebounceRef.current);

    slugDebounceRef.current = setTimeout(() => {
      if (formData.institute_name.trim()) {
        const generated = formData.institute_name
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 30)
          .replace(/-+$/, "");
        setSlug(generated);
      } else {
        setSlug("");
        setSubdomainStatus("idle");
      }
    }, 400);

    return () => {
      if (slugDebounceRef.current) clearTimeout(slugDebounceRef.current);
    };
  }, [formData.institute_name]);

  // ─────────────────────────────────────────────────────────────────────────
  // Subdomain availability check (debounced 600ms after slug updates)
  // ─────────────────────────────────────────────────────────────────────────

  const runSubdomainCheck = useCallback(async (s: string) => {
    if (!s || s.length < 2) {
      setSubdomainStatus("idle");
      return;
    }
    setSubdomainStatus("checking");
    try {
      const result = await checkSubdomainForCategory(category!, s);
      setSubdomainStatus(result.available ? "available" : "taken");
      setSubdomainSuggestions(result.suggestions ?? []);
      if (!result.available) {
        setErrors((prev) => ({
          ...prev,
          institute_name: `"${s}" is taken. Try: ${result.suggestions?.join(", ")}`,
        }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.institute_name;
          return next;
        });
      }
    } catch {
      setSubdomainStatus("error");
    }
  }, [category]);

  useEffect(() => {
    if (subdomainCheckRef.current) clearTimeout(subdomainCheckRef.current);
    if (!slug) return;

    subdomainCheckRef.current = setTimeout(() => {
      runSubdomainCheck(slug);
    }, 600);

    return () => {
      if (subdomainCheckRef.current) clearTimeout(subdomainCheckRef.current);
    };
  }, [slug, runSubdomainCheck]);

  // ─────────────────────────────────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────────────────────────────────

  const handleNextStep = async () => {
    if (!category) return;
    setDirection("right");
    setStep(2);
    window.scrollTo(0, 0);
    setBootstrapLoading(true);
    setBootstrapError(null);
    try {
      const fetchTasks: Promise<unknown>[] = [fetchPlansForCategory(category)];
      if (category !== "edtech") {
        fetchTasks.push(
          fetchInstitutionTypesForCategory(
            category as Exclude<TenantCategory, "edtech">
          )
        );
      }
      const results = await Promise.all(fetchTasks);
      setPlans(results[0] as TrialPlan[]);
      if (category !== "edtech") {
        setInstitutionTypes(results[1] as InstitutionType[]);
      } else {
        setInstitutionTypes([]);
      }
    } catch {
      setBootstrapError("Unable to load registration data. Please refresh and try again.");
    } finally {
      setBootstrapLoading(false);
    }
  };

  const handlePrevStep = () => {
    setDirection("left");
    setStep(1);
    setPlans([]);
    setInstitutionTypes([]);
    setBootstrapError(null);
    setFormData((prev) => ({ ...prev, password: "", password_confirm: "" }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.password;
      delete next.password_confirm;
      return next;
    });
    window.scrollTo(0, 0);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Form helpers
  // ─────────────────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (globalError) setGlobalError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.full_name.trim().length < 2) {
      newErrors.full_name = "Required — min 2 characters";
    }
    if (!slug || slug.length < 2) {
      newErrors.institute_name = "Required — min 2 characters";
    }
    if (subdomainStatus === "taken") {
      newErrors.institute_name = `This subdomain is taken. Try: ${subdomainSuggestions.join(", ")}`;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Must be a 10-digit Indian number";
    }
    if (category !== "edtech" && !formData.institution_type_id) {
      newErrors.institution_type_id = "Please select your institution type";
    }

    if (category === "edtech" || category === "offline_institution") {
      if (formData.password.length < 10) {
        newErrors.password = "Password must be at least 10 characters";
      }
      if (formData.password !== formData.password_confirm) {
        newErrors.password_confirm = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Submission
  // ─────────────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validateForm()) return;

    const trialPlan = plans.find((p) => p.is_trial) ?? plans[0];
    if (!trialPlan) {
      setGlobalError("No trial plan available. Please contact support.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitSignup(category!, {
        name: formData.full_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        subdomain: slug,
        ...(category !== "edtech" && formData.institution_type_id
          ? { institution_type_id: parseInt(formData.institution_type_id, 10) }
          : {}),
        plan_id: trialPlan.id,
        idempotency_key: idempotencyKeyRef.current,
        captcha_token: null, // CAPTCHA deferred for production
        website_url: "", // honeypot — always empty
        ...(category === "edtech" || category === "offline_institution"
          ? { password: formData.password }
          : {}),
      });

      if (
        isInitiateSignupResponse(result) &&
        (category === "edtech" || category === "offline_institution")
      ) {
        const aux = {
          googleContinuationToken: null as string | null,
          planId: trialPlan.id,
          billingCycle: "monthly" as const,
        };
        try {
          sessionStorage.setItem(
            selfSignupAuxStorageKey(result.token),
            JSON.stringify(aux)
          );
        } catch {
          /* ignore */
        }
        router.push(
          `/signup/verify?token=${encodeURIComponent(result.token)}&category=${encodeURIComponent(category)}`
        );
        return;
      }

      setSubmittedEmail(formData.email.trim().toLowerCase());
      setDirection("right");
      setStep(3);
      window.scrollTo(0, 0);
    } catch (err: unknown) {
      const error = err as Error & { status?: number; serverErrors?: Record<string, string[]> };
      if (error.status === 422) {
        // Subdomain conflict or validation error from backend
        const serverErrors = error.serverErrors ?? {};
        const fieldErrors: Record<string, string> = {};
        Object.entries(serverErrors).forEach(([field, msgs]) => {
          const key =
            field === "subdomain"
              ? "institute_name"
              : field === "password" || field === "password_confirm"
                ? field
                : field;
          fieldErrors[key] = msgs[0] ?? "Invalid value";
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

  // ─────────────────────────────────────────────────────────────────────────
  // Dynamic label / heading helpers
  // ─────────────────────────────────────────────────────────────────────────

  const getDynamicHeading = () => {
    switch (category) {
      case "standalone_teacher": return "Set up your teaching profile";
      case "offline_institution": return "Set up your institute";
      case "edtech": return "Set up your EdTech platform";
      default: return "Create your account";
    }
  };

  const getDynamicInstituteLabel = () => {
    switch (category) {
      case "standalone_teacher": return "Your teaching brand name";
      case "offline_institution": return "Institute name";
      case "edtech": return "Company / platform name";
      default: return "Institute name";
    }
  };

  const getDynamicInstitutePlaceholder = () => {
    switch (category) {
      case "standalone_teacher": return "e.g. Ravi Physics Classes";
      case "offline_institution": return "e.g. Brilliance Academy";
      case "edtech": return "e.g. SkillPath Learning";
      default: return "Institute name";
    }
  };

  const animationClass = direction === "right" ? styles.slideInRight : styles.slideInLeft;

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={`${styles.header} ${step !== 2 ? styles.headerCenter : ""}`}>
        {step === 2 && (
          <button onClick={handlePrevStep} className={styles.backButton} aria-label="Go back">
            <ChevronLeft size={24} />
          </button>
        )}
        <div className={styles.logo}>edveo</div>
      </header>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Progress Dots — only on steps 1 & 2 */}
        {step < 3 && (
          <div className={styles.progressIndicator} aria-hidden="true">
            <div className={`${styles.dot} ${step >= 1 ? styles.dotActive : ""}`} />
            <div className={`${styles.dot} ${step >= 2 ? styles.dotActive : ""}`} />
          </div>
        )}

        {/* ── Screen 1 — Category Selection ── */}
        {step === 1 && (
          <div className={`${styles.screenContainer} ${animationClass}`}>
            <h1 className={styles.heading}>How will you use Edveo?</h1>
            <p className={styles.subheading}>
              We&apos;ll set up your dashboard based on your answer.
            </p>

            {oauthError && OAUTH_ERROR_MESSAGES[oauthError] && (
              <div className={`${styles.globalError} ${styles.formContainer}`} role="alert">
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                {OAUTH_ERROR_MESSAGES[oauthError]}
              </div>
            )}

            <div className={styles.cardsGrid} role="radiogroup" aria-label="Select your user category">
              {CARDS.map((card) => {
                const Icon = card.icon;
                const isSelected = category === card.id;
                return (
                  <div
                    key={card.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`}
                    onClick={() => setCategory(card.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setCategory(card.id);
                      }
                    }}
                  >
                    {isSelected && <Check className={styles.cardCheck} size={20} />}
                    <Icon className={styles.cardIcon} size={28} />
                    <h2 className={styles.cardTitle}>{card.title}</h2>
                    <p className={styles.cardDesc}>{card.desc}</p>
                  </div>
                );
              })}
            </div>

            <button
              className={`${styles.primaryButton} ${styles.buttonDesktopCenter}`}
              disabled={!category}
              onClick={handleNextStep}
              aria-disabled={!category}
            >
              Continue
            </button>

            <p className={styles.footerText}>
              Already have an account?{" "}
              <Link href="/login" className={styles.linkGreen}>Log in</Link>
            </p>
          </div>
        )}

        {/* ── Screen 2 — Account Form ── */}
        {step === 2 && (
          <div className={`${styles.screenContainer} ${animationClass}`}>
            <h1 className={styles.heading}>{getDynamicHeading()}</h1>
            <p className={styles.subheading}>
              You&apos;re 30 seconds away from your free 14-day trial.
            </p>

            {/* Bootstrap error banner */}
            {bootstrapError && (
              <div className={`${styles.globalError} ${styles.formContainer}`} role="alert">
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                {bootstrapError}
              </div>
            )}

            {/* Global submission error */}
            {globalError && (
              <div className={`${styles.globalError} ${styles.formContainer}`} role="alert">
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                {globalError}
              </div>
            )}

            {/* ── Google Sign-up (TSO-3) ── */}
            <div className={styles.formContainer}>
              <a
                href={buildGoogleSignupUrl(category!)}
                className={styles.googleButton}
                aria-label="Continue with Google"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
                </svg>
                Continue with Google
              </a>

              <div className={styles.orDivider}>
                <span className={styles.orLine} />
                <span className={styles.orText}>or</span>
                <span className={styles.orLine} />
              </div>
            </div>

            <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div className={styles.formGroup}>
                <label htmlFor="full_name" className={styles.label}>Your full name</label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Ravi Kumar"
                  autoComplete="name"
                  className={`${styles.input} ${errors.full_name ? styles.inputError : ""}`}
                  value={formData.full_name}
                  onChange={handleChange}
                  aria-invalid={!!errors.full_name}
                  aria-describedby={errors.full_name ? "full_name_error" : undefined}
                />
                {errors.full_name && (
                  <span id="full_name_error" className={styles.errorText}>{errors.full_name}</span>
                )}
              </div>

              {/* Institute Name + Subdomain Preview */}
              <div className={styles.formGroup}>
                <label htmlFor="institute_name" className={styles.label}>
                  {getDynamicInstituteLabel()}
                </label>
                <input
                  id="institute_name"
                  name="institute_name"
                  type="text"
                  placeholder={getDynamicInstitutePlaceholder()}
                  className={`${styles.input} ${errors.institute_name ? styles.inputError : ""}`}
                  value={formData.institute_name}
                  onChange={handleChange}
                  aria-invalid={!!errors.institute_name}
                  aria-describedby={errors.institute_name ? "institute_name_error" : "subdomain_preview"}
                />
                {errors.institute_name && (
                  <span id="institute_name_error" className={styles.errorText}>
                    <X size={12} style={{ display: "inline", marginRight: 4 }} />
                    {errors.institute_name}
                  </span>
                )}
                {slug && !errors.institute_name && subdomainStatus === "checking" && (
                  <div className={styles.subdomainChecking}>
                    <Loader2 size={11} className={styles.spinner} />
                    Checking availability…
                  </div>
                )}
                {slug && !errors.institute_name && subdomainStatus === "available" && (
                  <div id="subdomain_preview" className={styles.subdomainPreview}>
                    <span className={styles.subdomainAvailableBadge}>
                      <Check size={11} /> Available
                    </span>
                    Your platform will be live at{" "}
                    <span className={styles.subdomainSlug}>
                      {slug}.{process.env.NEXT_PUBLIC_TENANT_DOMAIN ?? "educoreos.com"}
                    </span>
                  </div>
                )}
                {slug && !errors.institute_name && subdomainStatus === "idle" && slug.length >= 2 && (
                  <div id="subdomain_preview" className={styles.subdomainPreview}>
                    Your platform will be live at{" "}
                    <span className={styles.subdomainSlug}>
                      {slug}.{process.env.NEXT_PUBLIC_TENANT_DOMAIN ?? "educoreos.com"}
                    </span>
                  </div>
                )}
              </div>

              {/* Institution Type — hidden for edtech (F-04) */}
              {category !== "edtech" && (
                <div className={styles.formGroup}>
                  <label htmlFor="institution_type_id" className={styles.label}>
                    Institution category
                  </label>
                  {bootstrapLoading ? (
                    <div className={styles.loadingShimmer} />
                  ) : (
                    <select
                      id="institution_type_id"
                      name="institution_type_id"
                      className={`${styles.select} ${errors.institution_type_id ? styles.inputError : ""}`}
                      value={formData.institution_type_id}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.institution_type_id}
                      aria-describedby={errors.institution_type_id ? "inst_type_error" : undefined}
                    >
                      <option value="" disabled>Select your institution type…</option>
                      {institutionTypes.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  )}
                  {errors.institution_type_id && (
                    <span id="inst_type_error" className={styles.errorText}>
                      {errors.institution_type_id}
                    </span>
                  )}
                </div>
              )}

              {/* Work Email */}
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Work email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={CONTACT_EMAIL}
                  autoComplete="email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email_error" : undefined}
                />
                {errors.email && (
                  <span id="email_error" className={styles.errorText}>{errors.email}</span>
                )}
              </div>

              {/* Phone */}
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>WhatsApp number</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputPrefix}>🇮🇳 +91</span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="98765 43210"
                    maxLength={10}
                    autoComplete="tel"
                    className={`${styles.input} ${styles.inputWithPrefix} ${errors.phone ? styles.inputError : ""}`}
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({ ...prev, phone: val }));
                      if (errors.phone) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.phone;
                          return next;
                        });
                      }
                    }}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone_error" : "phone_helper"}
                  />
                </div>
                {errors.phone
                  ? <span id="phone_error" className={styles.errorText}>{errors.phone}</span>
                  : <span id="phone_helper" className={styles.helperText}>
                      We&apos;ll send your login details here. No spam.
                    </span>
                }
              </div>

              {(category === "edtech" || category === "offline_institution") ? (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Create password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      minLength={10}
                      className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                      value={formData.password}
                      onChange={handleChange}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password_error" : "password_helper"}
                    />
                    {errors.password ? (
                      <span id="password_error" className={styles.errorText}>{errors.password}</span>
                    ) : (
                      <span id="password_helper" className={styles.helperText}>
                        At least 10 characters. Used with your work email after you verify.
                      </span>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="password_confirm" className={styles.label}>Confirm password</label>
                    <input
                      id="password_confirm"
                      name="password_confirm"
                      type="password"
                      autoComplete="new-password"
                      className={`${styles.input} ${errors.password_confirm ? styles.inputError : ""}`}
                      value={formData.password_confirm}
                      onChange={handleChange}
                      aria-invalid={!!errors.password_confirm}
                      aria-describedby={errors.password_confirm ? "password_confirm_error" : undefined}
                    />
                    {errors.password_confirm && (
                      <span id="password_confirm_error" className={styles.errorText}>
                        {errors.password_confirm}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className={styles.credentialInfoBox}>
                  <Info size={16} className={styles.credentialInfoIcon} />
                  <span>
                    After verifying your email, we&apos;ll send your login credentials
                    to your email address. You can set a permanent password on first login.
                  </span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isSubmitting || bootstrapLoading || subdomainStatus === "taken"}
                aria-disabled={isSubmitting || bootstrapLoading || subdomainStatus === "taken"}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className={styles.spinner} size={20} />
                    Setting up your account…
                  </>
                ) : (
                  "Start my free trial →"
                )}
              </button>

              <p className={styles.footerText}>
                By continuing, you agree to Edveo&apos;s{" "}
                <Link href="/terms-of-service" className={styles.linkDark}>Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className={styles.linkDark}>Privacy Policy</Link>
              </p>
            </form>
          </div>
        )}

        {/* ── Screen 3 — Email Verification Pending ── */}
        {step === 3 && (
          <div className={styles.screen3Container}>
            <div className={styles.successIconWrap}>
              <Mail size={32} color="#1B6B3A" />
            </div>

            <h1 className={styles.screen3Heading}>Check your inbox</h1>
            <p className={styles.screen3Sub}>
              We&apos;ve sent a verification link to{" "}
              <span className={styles.screen3Email}>{submittedEmail}</span>.<br />
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
                  We&apos;ll email your login URL and temporary password.
                </li>
                <li className={styles.screen3StepItem}>
                  <span className={styles.screen3StepNum}>4</span>
                  Log in and go live. No credit card needed during trial.
                </li>
              </ol>
            </div>

            <p className={styles.screen3Note}>
              Didn&apos;t receive the email? Check spam or{" "}
              <button
                type="button"
                className={styles.linkGreen}
                style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}
                onClick={() => {
                  setStep(2);
                  setDirection("left");
                }}
              >
                go back and try again
              </button>.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
