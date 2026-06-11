"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Check, ChevronLeft, Loader2, X, AlertCircle } from "lucide-react";
import styles from "@/app/(auth)/register/page.module.css";
import {
  fetchInstitutionTypesForCategory,
  fetchPlansForCategory,
  checkSubdomainForCategory,
  submitSignup,
  generateIdempotencyKey,
  selfSignupAuxStorageKey,
  isInitiateSignupResponse,
  type InstitutionType,
  type TrialPlan,
  type SignupSubmitResult,
} from "@/lib/api/signupApi";
import { getSubdomainFormatError } from "@/features/teacher-onboarding-wizard/filterHelpers";

// ─── Types ────────────────────────────────────────────────────────────────────

type WizardStep = 1 | 2;
type OfflineSection = "exam_focused" | "non_exam";
type SubdomainStatus = "idle" | "checking" | "available" | "taken" | "error";

export interface OfflineWizardResult {
  submitResult: SignupSubmitResult;
  email: string;
  planId: number;
}

export interface OfflineInstitutionOnboardingWizardProps {
  prefillName: string;
  prefillEmail: string;
  googleContinuationToken: string;
  onSuccess: (result: OfflineWizardResult) => void;
}

const STEP_LABELS: Record<WizardStep, string> = {
  1: "Workspace",
  2: "Institute type",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function OfflineInstitutionOnboardingWizard({
  prefillName,
  prefillEmail,
  googleContinuationToken,
  onSuccess,
}: OfflineInstitutionOnboardingWizardProps) {
  const [step, setStep] = useState<WizardStep>(1);
  const [direction, setDirection] = useState<"right" | "left">("right");

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  const [institutionTypes, setInstitutionTypes] = useState<InstitutionType[]>([]);
  const [plans, setPlans] = useState<TrialPlan[]>([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [masterError, setMasterError] = useState<string | null>(null);

  // ── Step 1 state ──────────────────────────────────────────────────────────
  const [instituteName, setInstituteName] = useState("");
  const [phone, setPhone] = useState("");
  const [slug, setSlug] = useState("");
  const [subdomainStatus, setSubdomainStatus] = useState<SubdomainStatus>("idle");
  const [subdomainSuggestions, setSubdomainSuggestions] = useState<string[]>([]);
  const checkRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slugDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Step 2 state ──────────────────────────────────────────────────────────
  const [offlineSection, setOfflineSection] = useState<OfflineSection | null>(null);
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([]);
  const [primaryTypeId, setPrimaryTypeId] = useState<number | null>(null);

  // ── Submission ────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const idempotencyKeyRef = useRef<string>(generateIdempotencyKey());

  const tenantDomain = process.env.NEXT_PUBLIC_TENANT_DOMAIN ?? "educoreos.com";

  // ── Bootstrap data ────────────────────────────────────────────────────────
  useEffect(() => {
    setMasterLoading(true);
    Promise.all([
      fetchInstitutionTypesForCategory("offline_institution"),
      fetchPlansForCategory("offline_institution"),
    ])
      .then(([types, plansData]) => {
        setInstitutionTypes(types);
        setPlans(plansData);
      })
      .catch(() => setMasterError("Unable to load registration data. Please refresh."))
      .finally(() => setMasterLoading(false));
  }, []);

  // ── Auto-generate slug from institute name ─────────────────────────────────
  useEffect(() => {
    if (slugDebounceRef.current) clearTimeout(slugDebounceRef.current);
    slugDebounceRef.current = setTimeout(() => {
      if (instituteName.trim()) {
        const generated = instituteName
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
  }, [instituteName]);

  // ── Subdomain check ───────────────────────────────────────────────────────
  const slugFormatError = slug.trim() ? getSubdomainFormatError(slug) : null;
  const normalizedSlug = slug.trim().toLowerCase();

  const checkSub = useCallback(async (s: string) => {
    if (!s || s.length < 2) return;
    setSubdomainStatus("checking");
    try {
      const result = await checkSubdomainForCategory("offline_institution", s);
      setSubdomainStatus(result.available ? "available" : "taken");
      setSubdomainSuggestions(result.suggestions ?? []);
    } catch {
      setSubdomainStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!normalizedSlug || slugFormatError) {
      setSubdomainStatus("idle");
      return;
    }
    if (checkRef.current) clearTimeout(checkRef.current);
    checkRef.current = setTimeout(() => checkSub(normalizedSlug), 600);
    return () => {
      if (checkRef.current) clearTimeout(checkRef.current);
    };
  }, [normalizedSlug, slugFormatError, checkSub]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    setDirection("right");
    setStep(2);
    window.scrollTo(0, 0);
  }, []);

  const goBack = useCallback(() => {
    setDirection("left");
    setStep(1);
    window.scrollTo(0, 0);
  }, []);

  // ── Step 1 validation ─────────────────────────────────────────────────────
  const phoneValid = /^[0-9]{10}$/.test(phone);
  const step1Valid =
    instituteName.trim().length >= 2 &&
    normalizedSlug.length >= 2 &&
    !slugFormatError &&
    subdomainStatus === "available" &&
    phoneValid;

  const handleStep1Next = () => {
    const errors: Record<string, string> = {};
    if (instituteName.trim().length < 2) errors.instituteName = "Required — min 2 characters";
    if (!phoneValid) errors.phone = "Must be a 10-digit number";
    if (subdomainStatus === "taken")
      errors.instituteName = `Subdomain taken. Try: ${subdomainSuggestions.join(", ")}`;
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    goNext();
  };

  // ── Step 2: section change resets types ───────────────────────────────────
  const handleSectionChange = (section: OfflineSection) => {
    setOfflineSection(section);
    setSelectedTypeIds([]);
    setPrimaryTypeId(null);
  };

  const handleTypeToggle = (id: number) => {
    setSelectedTypeIds((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((x) => x !== id) : [...prev, id];
      if (primaryTypeId != null && !next.includes(primaryTypeId)) {
        setPrimaryTypeId(null);
      }
      return next;
    });
  };

  const step2Valid =
    offlineSection !== null &&
    selectedTypeIds.length >= 1 &&
    (selectedTypeIds.length <= 1 || primaryTypeId !== null);

  // ── Step 2 Next: submit directly (teaching areas collected post-onboarding) ──
  const handleStep2Next = async () => {
    if (!step2Valid) return;
    setSubmitError(null);
    await handleSubmit();
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitError(null);
    setIsSubmitting(true);

    const selectedPlan =
      plans.find((p) => p.self_serve_free_active) ??
      plans.find((p) => p.is_trial) ??
      plans.find((p) => p.price_monthly_cents === 0 && p.price_annual_cents === 0);

    if (!selectedPlan) {
      setSubmitError("No free trial plan available. Please contact support.");
      setIsSubmitting(false);
      return;
    }

    const resolvedPrimaryId = primaryTypeId ?? selectedTypeIds[0] ?? null;
    const secondaryIds =
      resolvedPrimaryId != null
        ? selectedTypeIds.filter((id) => id !== resolvedPrimaryId)
        : [];

    try {
      const result = await submitSignup("offline_institution", {
        name: prefillName,
        email: prefillEmail,
        phone: phone.trim(),
        subdomain: normalizedSlug,
        plan_id: selectedPlan.id,
        idempotency_key: idempotencyKeyRef.current,
        captcha_token: null,
        website_url: "",
        google_continuation_token: googleContinuationToken,
        ...(resolvedPrimaryId != null
          ? {
              primary_institution_type_id: resolvedPrimaryId,
              secondary_institution_type_ids: secondaryIds,
            }
          : {}),
      });

      onSuccess({ submitResult: result, email: prefillEmail, planId: selectedPlan.id });
    } catch (err: unknown) {
      const error = err as Error & { status?: number; serverErrors?: Record<string, string[]> };
      if (error.status === 422 && error.serverErrors) {
        const first = Object.values(error.serverErrors)[0]?.[0];
        setSubmitError(first ?? error.message);
      } else {
        setSubmitError(error.message ?? "Something went wrong. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  const animClass = direction === "right" ? styles.slideInRight : styles.slideInLeft;

  // ── Loading / error states ─────────────────────────────────────────────────
  if (masterLoading) {
    return (
      <div style={{ width: "100%", maxWidth: 440, margin: "0 auto" }}>
        <div className={styles.loadingShimmer} style={{ height: 40, marginBottom: 16 }} />
        <div className={styles.loadingShimmer} style={{ height: 40, marginBottom: 16 }} />
        <div className={styles.loadingShimmer} style={{ height: 40 }} />
      </div>
    );
  }

  if (masterError) {
    return (
      <div className={styles.globalError} role="alert" style={{ maxWidth: 440 }}>
        <AlertCircle size={16} />
        {masterError}
      </div>
    );
  }

  const filteredTypes = institutionTypes.filter((t) => t.section === offlineSection);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Progress bar */}
      <OfflineWizardProgressBar currentStep={step} />

      {/* Error banner */}
      {submitError && (
        <div
          className={styles.globalError}
          role="alert"
          style={{ maxWidth: 440, width: "100%", marginBottom: 16 }}
        >
          <AlertCircle size={16} />
          {submitError}
        </div>
      )}

      {/* ── Step 1: Workspace ────────────────────────────────────────────────── */}
      {step === 1 && (
        <div
          key="step1"
          className={`${styles.screenContainer} ${animClass}`}
          style={{ maxWidth: 440 }}
        >
          <h2 className={styles.heading} style={{ textAlign: "left", fontSize: 22 }}>
            Set up your institute
          </h2>
          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginBottom: 16,
              padding: "8px 12px",
              background: "rgba(99,102,241,0.06)",
              borderRadius: 8,
              border: "1px solid rgba(99,102,241,0.12)",
            }}
          >
            Signed in as <strong>{prefillEmail}</strong> via Google
          </div>

          <div className={styles.wizardFormContainer}>
            {/* Institute Name */}
            <div className={styles.formGroup}>
              <label htmlFor="off_institute_name" className={styles.label}>
                Institute name
              </label>
              <input
                id="off_institute_name"
                type="text"
                placeholder="e.g. Brilliance Academy"
                className={`${styles.input} ${fieldErrors.instituteName ? styles.inputError : ""}`}
                value={instituteName}
                onChange={(e) => {
                  setInstituteName(e.target.value);
                  setFieldErrors((p) => { const n = { ...p }; delete n.instituteName; return n; });
                  setSubmitError(null);
                }}
                autoFocus
                autoComplete="organization"
              />
              {normalizedSlug && (
                <div style={{ marginTop: 8, fontSize: 13 }}>
                  <span
                    style={{
                      background: "#f9fafb",
                      color: "#374151",
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontFamily: "ui-monospace, monospace",
                    }}
                  >
                    {normalizedSlug}.{tenantDomain}
                  </span>
                </div>
              )}
              {slugFormatError && (
                <div className={styles.subdomainTaken} style={{ marginTop: 6 }}>
                  <X size={11} /> {slugFormatError}
                </div>
              )}
              {normalizedSlug && !slugFormatError && subdomainStatus === "checking" && (
                <div className={styles.subdomainChecking}>
                  <Loader2 size={11} className={styles.spinner} />
                  Checking availability…
                </div>
              )}
              {normalizedSlug && !slugFormatError && subdomainStatus === "available" && (
                <div className={styles.subdomainPreview}>
                  <span className={styles.subdomainAvailableBadge}>
                    <Check size={11} /> Available
                  </span>
                </div>
              )}
              {normalizedSlug && !slugFormatError && subdomainStatus === "taken" && (
                <div className={styles.subdomainTaken}>
                  <X size={11} /> Already taken.
                  {subdomainSuggestions.length > 0 && ` Try: ${subdomainSuggestions.join(", ")}`}
                </div>
              )}
              {fieldErrors.instituteName && (
                <span className={styles.errorText}>{fieldErrors.instituteName}</span>
              )}
            </div>

            {/* Phone */}
            <div className={styles.formGroup}>
              <label htmlFor="off_phone" className={styles.label}>
                WhatsApp number
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputPrefix}>🇮🇳 +91</span>
                <input
                  id="off_phone"
                  type="tel"
                  placeholder="98765 43210"
                  maxLength={10}
                  autoComplete="tel"
                  className={`${styles.input} ${styles.inputWithPrefix} ${fieldErrors.phone ? styles.inputError : ""}`}
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPhone(val);
                    setFieldErrors((p) => { const n = { ...p }; delete n.phone; return n; });
                  }}
                />
              </div>
              {fieldErrors.phone ? (
                <span className={styles.errorText}>{fieldErrors.phone}</span>
              ) : (
                <span className={styles.helperText}>We&apos;ll send your login details here.</span>
              )}
            </div>
          </div>

          <div style={{ height: 24 }} />
          <button
            className={styles.primaryButton}
            style={{ maxWidth: 440 }}
            disabled={!step1Valid}
            onClick={handleStep1Next}
          >
            Continue
          </button>
        </div>
      )}

      {/* ── Step 2: Institute type ────────────────────────────────────────────── */}
      {step === 2 && (
        <div
          key="step2"
          className={`${styles.screenContainer} ${animClass}`}
          style={{ maxWidth: 440 }}
        >
          <h2 className={styles.heading} style={{ textAlign: "left", fontSize: 22, marginBottom: 4 }}>
            What kind of institute?
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>
            This sets up the right tools and content tags for you.
          </p>

          {/* Focus toggle — segmented control */}
          <div className={styles.formGroup} style={{ marginBottom: 20 }}>
            <label className={styles.label} style={{ marginBottom: 8 }}>Institute focus</label>
            <div
              style={{
                display: "flex",
                background: "#f3f4f6",
                borderRadius: 10,
                padding: 4,
                gap: 4,
              }}
            >
              {(["exam_focused", "non_exam"] as const).map((section) => {
                const active = offlineSection === section;
                return (
                  <button
                    key={section}
                    type="button"
                    onClick={() => handleSectionChange(section)}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: 7,
                      border: "none",
                      background: active ? "#fff" : "transparent",
                      color: active ? "#111827" : "#6b7280",
                      fontWeight: active ? 600 : 400,
                      fontSize: 14,
                      cursor: "pointer",
                      boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                      transition: "all 0.15s",
                    }}
                  >
                    {section === "exam_focused" ? "Exam-focused" : "Non-exam"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Institution types */}
          {offlineSection && (
            <div className={styles.formGroup}>
              <label className={styles.label} style={{ marginBottom: 8 }}>
                Institution types{" "}
                <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: 12 }}>select all that apply</span>
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {filteredTypes.map((t) => {
                  const checked = selectedTypeIds.includes(t.id);
                  return (
                    <label
                      key={t.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                        padding: "10px 14px",
                        borderRadius: 8,
                        border: checked ? "1.5px solid #2563eb" : "1px solid #e5e7eb",
                        background: checked ? "#eff6ff" : "#fff",
                        transition: "border-color 0.1s, background 0.1s",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleTypeToggle(t.id)}
                        style={{ accentColor: "#2563eb", width: 16, height: 16, flexShrink: 0 }}
                      />
                      <span style={{ fontSize: 14, color: checked ? "#1d4ed8" : "#374151", fontWeight: checked ? 500 : 400 }}>
                        {t.name}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Primary type picker (multi-select only) */}
              {selectedTypeIds.length > 1 && (
                <div
                  style={{
                    marginTop: 14,
                    padding: "12px 14px",
                    background: "#fafafa",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <label className={styles.label} style={{ marginBottom: 8 }}>
                    Primary type{" "}
                    <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: 12 }}>pick one</span>
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {selectedTypeIds.map((id) => {
                      const t = institutionTypes.find((x) => x.id === id);
                      if (!t) return null;
                      const isPrimary = primaryTypeId === id;
                      return (
                        <label
                          key={id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            cursor: "pointer",
                            padding: "7px 10px",
                            borderRadius: 6,
                            background: isPrimary ? "#eff6ff" : "transparent",
                            border: isPrimary ? "1px solid #bfdbfe" : "1px solid transparent",
                          }}
                        >
                          <input
                            type="radio"
                            name="off_primary"
                            checked={isPrimary}
                            onChange={() => setPrimaryTypeId(id)}
                            style={{ accentColor: "#2563eb", width: 15, height: 15, flexShrink: 0 }}
                          />
                          <span style={{ fontSize: 14, color: isPrimary ? "#1d4ed8" : "#374151" }}>{t.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{ height: 20 }} />
          <div className={styles.wizardNavRow}>
            <button type="button" className={styles.wizardNavBack} onClick={goBack}>
              <ChevronLeft size={16} /> Back
            </button>
            <button
              className={styles.primaryButton}
              disabled={!step2Valid || isSubmitting}
              onClick={handleStep2Next}
              style={{ flex: 1 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className={styles.spinner} size={18} />
                  Setting up…
                </>
              ) : (
                "Create my workspace →"
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── Progress bar sub-component ───────────────────────────────────────────────

function OfflineWizardProgressBar({ currentStep }: { currentStep: WizardStep }) {
  const steps: WizardStep[] = [1, 2];

  return (
    <div className={styles.wizardProgress}>
      {steps.map((s, i) => {
        const isDone = currentStep > s;
        const isActive = currentStep === s;
        return (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div className={styles.wizardStep}>
              <div
                className={`${styles.wizardStepCircle} ${isActive ? styles.wizardStepCircleActive : ""} ${isDone ? styles.wizardStepCircleDone : ""}`}
              >
                {isDone ? <Check size={13} /> : s}
              </div>
              <span
                className={`${styles.wizardStepLabel} ${isActive ? styles.wizardStepLabelActive : ""} ${isDone ? styles.wizardStepLabelDone : ""}`}
              >
                {STEP_LABELS[s]}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`${styles.wizardConnector} ${isDone ? styles.wizardConnectorDone : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

