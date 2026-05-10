"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Check,
  ChevronLeft,
  Loader2,
  Search,
  X,
  AlertCircle,
} from "lucide-react";
import styles from "@/app/(auth)/register/page.module.css";
import {
  fetchOnboardingFilterConfig,
  fetchInstitutionTypesForCategory,
  fetchPlansForCategory,
  pickStandaloneTeacherSelfServeSignupPlan,
  checkSubdomainForCategory,
  submitSignup,
  generateIdempotencyKey,
  type TeachingMode,
  type BoardOption,
  type OnboardingFilterConfig,
  type InstitutionType,
  type TrialPlan,
  type SignupSubmitResult,
} from "@/lib/api/signupApi";
import {
  getStudentProfiles,
  getStudentProfileLabel,
  getStep4Config,
  getStep5Subjects,
  getSubdomainFormatError,
} from "./filterHelpers";

// ─── Types ────────────────────────────────────────────────────────────────────

type WizardStep = 1 | 2 | 3 | 4 | 5;

export interface TeacherWizardResult {
  submitResult: SignupSubmitResult;
  email: string;
  googleContinuationToken?: string | null;
  trialPlanId?: number;
  category: "standalone_teacher";
}

export interface TeacherOnboardingWizardProps {
  prefillName: string;
  prefillEmail: string;
  googleContinuationToken?: string | null;
  onSuccess: (result: TeacherWizardResult) => void;
  /** Extra fields required by the direct-email path — omit for Google path */
  extraFields?: {
    fullName: string;
    email: string;
    phone: string;
  };
}

// ─── Step metadata ─────────────────────────────────────────────────────────────

const STEP_LABELS: Record<WizardStep, string> = {
  1: "Your Page",
  2: "Teaching Mode",
  3: "Students",
  4: "Board / Exam",
  5: "Subject",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TeacherOnboardingWizard({
  prefillName,
  prefillEmail,
  googleContinuationToken,
  onSuccess,
  extraFields,
}: TeacherOnboardingWizardProps) {
  const [step, setStep] = useState<WizardStep>(1);
  const [direction, setDirection] = useState<"right" | "left">("right");

  // ── Bootstrap data ────────────────────────────────────────────────────────
  const [config, setConfig] = useState<OnboardingFilterConfig | null>(null);
  const [institutionTypes, setInstitutionTypes] = useState<InstitutionType[]>([]);
  const [plans, setPlans] = useState<TrialPlan[]>([]);
  const [institutionTypeId, setInstitutionTypeId] = useState("");
  const [masterLoading, setMasterLoading] = useState(true);
  const [masterError, setMasterError] = useState<string | null>(null);

  // ── Wizard v2 state ───────────────────────────────────────────────────────
  const [slug, setSlug] = useState("");
  const [subdomainStatus, setSubdomainStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "error"
  >("idle");
  const [subdomainSuggestions, setSubdomainSuggestions] = useState<string[]>([]);

  const [teachingMode, setTeachingMode] = useState<TeachingMode | "">("");
  const [studentProfile, setStudentProfile] = useState("");
  /** Step 4 multi-select — stores `exam_category_slugs` for the API */
  const [step4Selections, setStep4Selections] = useState<string[]>([]);
  const [primarySubjectSlug, setPrimarySubjectSlug] = useState("");

  // ── Search ────────────────────────────────────────────────────────────────
  const [boardSearch, setBoardSearch] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");

  // ── Submission ────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const idempotencyKeyRef = useRef<string>(generateIdempotencyKey());
  const checkRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tenantDomain = process.env.NEXT_PUBLIC_TENANT_DOMAIN ?? "educoreos.com";

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  useEffect(() => {
    setMasterLoading(true);
    setMasterError(null);
    Promise.all([
      fetchOnboardingFilterConfig(),
      fetchInstitutionTypesForCategory("standalone_teacher"),
      fetchPlansForCategory("standalone_teacher"),
    ])
      .then(([cfg, instTypes, plansData]) => {
        setConfig(cfg);
        setInstitutionTypes(instTypes);
        setPlans(plansData);
        if (!pickStandaloneTeacherSelfServeSignupPlan(plansData)) {
          setMasterError(
            "Teacher signup is not available: your catalog has no self-serve free teacher plan and no active trial plan for this region. Ask your platform admin to enable the free teacher SKU (self-serve free flag on an active standalone-teacher plan)."
          );
        }
        // Auto-select first institution type (hidden from user)
        const matched = instTypes.find((t) =>
          ["teacher", "tutor", "solo", "individual"].some(
            (kw) =>
              t.name.toLowerCase().includes(kw) ||
              t.slug.toLowerCase().includes(kw)
          )
        );
        setInstitutionTypeId(
          String(matched?.id ?? instTypes[0]?.id ?? "")
        );
      })
      .catch(() =>
        setMasterError("Unable to load onboarding data. Please refresh.")
      )
      .finally(() => setMasterLoading(false));
  }, []);

  const slugFormatError = slug.trim() ? getSubdomainFormatError(slug) : null;
  const normalizedSlug = slug.trim().toLowerCase();

  // ── Subdomain availability check ──────────────────────────────────────────
  const checkSub = useCallback(async (s: string) => {
    if (!s || s.length < 2) return;
    setSubdomainStatus("checking");
    try {
      const result = await checkSubdomainForCategory("standalone_teacher", s);
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

  // ── Cascade resets ────────────────────────────────────────────────────────
  const handleTeachingModeChange = (mode: TeachingMode) => {
    setTeachingMode(mode);
    setStudentProfile("");
    setStep4Selections([]);
    setPrimarySubjectSlug("");
    setBoardSearch("");
    setSubjectSearch("");
  };

  const handleStudentProfileChange = (profile: string) => {
    setStudentProfile(profile);
    setStep4Selections([]);
    setPrimarySubjectSlug("");
    setBoardSearch("");
    setSubjectSearch("");
  };

  const handleStep4Toggle = (examSlug: string) => {
    setStep4Selections((prev) => {
      const next = prev.includes(examSlug)
        ? prev.filter((b) => b !== examSlug)
        : [...prev, examSlug];
      return next;
    });
    setPrimarySubjectSlug("");
    setSubjectSearch("");
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    setDirection("right");
    setStep((s) => {
      const next = s < 5 ? ((s + 1) as WizardStep) : s;
      return next;
    });
    window.scrollTo(0, 0);
  }, []);

  const goBack = useCallback(() => {
    setDirection("left");
    setStep((s) => {
      const prev = s > 1 ? ((s - 1) as WizardStep) : s;
      return prev;
    });
    window.scrollTo(0, 0);
  }, []);

  // ── Validity ──────────────────────────────────────────────────────────────
  const step1Valid =
    normalizedSlug.length >= 3 &&
    !slugFormatError &&
    subdomainStatus === "available";
  const step2Valid = teachingMode !== "";
  const step3Valid = studentProfile !== "";
  const step4Valid = step4Selections.length >= 1;
  const step5Valid = primarySubjectSlug !== "";

  const currentStepValid: Record<WizardStep, boolean> = {
    1: step1Valid,
    2: step2Valid,
    3: step3Valid,
    4: step4Valid,
    5: step5Valid,
  };

  // ── Subject list for Step 5 ───────────────────────────────────────────────
  const subjectOptions =
    config && step4Selections.length > 0
      ? getStep5Subjects(config, step4Selections)
      : [];

  const standaloneSignupPlan = useMemo(
    () => pickStandaloneTeacherSelfServeSignupPlan(plans),
    [plans]
  );

  const submitPrimaryCtaLabel = useMemo(() => {
    if (!standaloneSignupPlan) {
      return "Continue →";
    }
    if (standaloneSignupPlan.self_serve_free_active === true) {
      return "Create my workspace →";
    }
    if (standaloneSignupPlan.is_trial === true) {
      return "Create my workspace →";
    }
    return "Continue →";
  }, [standaloneSignupPlan]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitError(null);
    const selectedPlan = pickStandaloneTeacherSelfServeSignupPlan(plans);
    if (!selectedPlan) {
      setSubmitError(
        "No eligible signup plan is configured (need a self-serve free teacher plan or an active trial). Contact support."
      );
      return;
    }

    const name = extraFields?.fullName ?? prefillName;
    const email = extraFields?.email ?? prefillEmail;
    const phone = extraFields?.phone ?? "";

    setIsSubmitting(true);
    try {
      const result = await submitSignup("standalone_teacher", {
        name,
        email,
        phone,
        subdomain: normalizedSlug,
        institution_type_id: institutionTypeId ? parseInt(institutionTypeId, 10) : null,
        plan_id: selectedPlan.id,
        idempotency_key: idempotencyKeyRef.current,
        captcha_token: null,
        website_url: "",
        google_continuation_token: googleContinuationToken ?? null,
        // v2 wizard fields
        teaching_mode: teachingMode !== "" ? (teachingMode as TeachingMode) : undefined,
        student_profile: studentProfile !== "" ? studentProfile : undefined,
        exam_category_slugs: step4Selections,
        primary_subject_slug: primarySubjectSlug !== "" ? primarySubjectSlug : undefined,
        // legacy compat: set subject_slug so paid checkout path still works
        subject_slug: primarySubjectSlug !== "" ? primarySubjectSlug : undefined,
      });

      onSuccess({
        submitResult: result,
        email,
        googleContinuationToken,
        trialPlanId: selectedPlan.id,
        category: "standalone_teacher",
      });
    } catch (err: unknown) {
      const error = err as Error & {
        status?: number;
        serverErrors?: Record<string, string[]>;
      };
      if (error.status === 422 && error.serverErrors) {
        const first = Object.values(error.serverErrors)[0]?.[0];
        setSubmitError(first ?? error.message);
      } else if (error.status === 422 && typeof error.message === "string") {
        setSubmitError(error.message);
      } else {
        setSubmitError(error.message ?? "Something went wrong. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  const animClass =
    direction === "right" ? styles.slideInRight : styles.slideInLeft;

  // ── Render: loading / error ────────────────────────────────────────────────
  if (masterLoading) {
    return (
      <div style={{ width: "100%", maxWidth: 440, margin: "0 auto" }}>
        <div className={styles.loadingShimmer} style={{ height: 40, marginBottom: 16 }} />
        <div className={styles.loadingShimmer} style={{ height: 40, marginBottom: 16 }} />
        <div className={styles.loadingShimmer} style={{ height: 40 }} />
      </div>
    );
  }

  if (masterError || !config) {
    return (
      <div
        className={styles.globalError}
        role="alert"
        style={{ maxWidth: 440 }}
      >
        <AlertCircle size={16} />
        {masterError ?? "Failed to load wizard configuration."}
      </div>
    );
  }

  // ── Computed display helpers ───────────────────────────────────────────────
  const selectedMode = config.teaching_modes.find(
    (m) => m.value === teachingMode
  );
  const step4Config =
    studentProfile !== ""
      ? getStep4Config(config, studentProfile)
      : { headline: "", banner: "", options: [] as BoardOption[] };
  const filteredBoards = step4Config.options.filter((b) =>
    b.name.toLowerCase().includes(boardSearch.toLowerCase())
  );
  const filteredSubjects = subjectOptions.filter((s) =>
    s.name.toLowerCase().includes(subjectSearch.toLowerCase())
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Signed-in-as header (Google path only) */}
      {googleContinuationToken && prefillEmail && (
        <div
          style={{
            width: "100%",
            maxWidth: 440,
            marginBottom: 12,
            padding: "8px 14px",
            background: "rgba(99,102,241,0.07)",
            border: "1px solid rgba(99,102,241,0.18)",
            borderRadius: 8,
            fontSize: 13,
            color: "var(--color-text-secondary, #6b7280)",
          }}
        >
          Signed in as <strong>{prefillEmail}</strong> via Google
        </div>
      )}

      {/* Progress bar */}
      <WizardProgressBar currentStep={step} />

      {/* Context chips row (from step 2 onward) — Section 9 */}
      {step >= 2 && (
        <OnboardingContextChips
          slugPreview={
            normalizedSlug ? `${normalizedSlug}.${tenantDomain}` : undefined
          }
          teachingModeLabel={step >= 3 ? selectedMode?.label : undefined}
          studentProfileLabel={
            step >= 4 && studentProfile !== ""
              ? getStudentProfileLabel(config, studentProfile)
              : undefined
          }
          step4Summary={
            step >= 5 && step4Selections.length > 0
              ? {
                  firstLabel:
                    step4Config.options.find((o) => o.slug === step4Selections[0])
                      ?.name ?? step4Selections[0],
                  extraCount: Math.max(0, step4Selections.length - 1),
                }
              : undefined
          }
          currentStep={step}
        />
      )}

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

      {/* ── Step 1: Your Page ─────────────────────────────────────────────── */}
      {step === 1 && (
        <div
          key="step1"
          className={`${styles.screenContainer} ${animClass}`}
          style={{ maxWidth: 440 }}
        >
          <h2
            className={styles.heading}
            style={{ textAlign: "left", fontSize: 22 }}
          >
            Claim your Edveo page
          </h2>
          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginBottom: 16,
              padding: "10px 12px",
              background: "rgba(99,102,241,0.06)",
              borderRadius: 8,
              border: "1px solid rgba(99,102,241,0.12)",
            }}
          >
            This is your permanent link — share it with students and parents.
          </div>
          <div className={styles.wizardFormContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="wiz_slug" className={styles.label}>
                Your page address
              </label>
              <input
                id="wiz_slug"
                type="text"
                placeholder="e.g. ravi-physics, mathwithmeera"
                className={`${styles.input} ${subdomainStatus === "taken" || slugFormatError ? styles.inputError : ""}`}
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSubmitError(null);
                }}
                autoFocus
                autoComplete="off"
                spellCheck={false}
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
                <div className={styles.subdomainTaken} style={{ marginTop: 8 }}>
                  <X size={11} /> {slugFormatError}
                </div>
              )}
              {normalizedSlug &&
                !slugFormatError &&
                subdomainStatus === "checking" && (
                  <div className={styles.subdomainChecking}>
                    <Loader2 size={11} className={styles.spinner} />
                    Checking availability…
                  </div>
                )}
              {normalizedSlug &&
                !slugFormatError &&
                subdomainStatus === "available" && (
                  <div className={styles.subdomainPreview}>
                    <span className={styles.subdomainAvailableBadge}>
                      <Check size={11} /> Available
                    </span>
                  </div>
                )}
              {normalizedSlug &&
                !slugFormatError &&
                subdomainStatus === "taken" && (
                  <div className={styles.subdomainTaken}>
                    <X size={11} />
                    This address is already taken.
                    {subdomainSuggestions.length > 0 &&
                      ` Try: ${subdomainSuggestions.join(", ")}`}
                  </div>
                )}
            </div>
          </div>
          <div style={{ height: 24 }} />
          <button
            className={styles.primaryButton}
            style={{ maxWidth: 440 }}
            disabled={!step1Valid}
            onClick={goNext}
          >
            Continue
          </button>
        </div>
      )}

      {/* ── Step 2: Teaching Mode ────────────────────────────────────────── */}
      {step === 2 && (
        <div
          key="step2"
          className={`${styles.screenContainer} ${animClass}`}
          style={{ maxWidth: 440 }}
        >
          <h2
            className={styles.heading}
            style={{ textAlign: "left", fontSize: 22 }}
          >
            How do you teach?
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
            This helps us set up the right tools for you.
          </p>
          <div className={styles.chipGrid} style={{ maxHeight: "none" }}>
            {config.teaching_modes.map((m) => {
              const selected = m.value === teachingMode;
              return (
                <button
                  key={m.value}
                  type="button"
                  className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
                  onClick={() => {
                    handleTeachingModeChange(m.value);
                  }}
                  aria-pressed={selected}
                >
                  {m.icon && (
                    <span style={{ marginRight: 6 }}>{m.icon}</span>
                  )}
                  {selected && <Check className={styles.chipCheckIcon} size={13} />}
                  {m.label}
                </button>
              );
            })}
          </div>
          <div style={{ height: 24 }} />
          <div className={styles.wizardNavRow}>
            <button
              type="button"
              className={styles.wizardNavBack}
              onClick={goBack}
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              className={styles.primaryButton}
              disabled={!step2Valid}
              onClick={goNext}
              style={{ flex: 1 }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Students ─────────────────────────────────────────────── */}
      {step === 3 && (
        <div
          key="step3"
          className={`${styles.screenContainer} ${animClass}`}
          style={{ maxWidth: 440 }}
        >
          <h2
            className={styles.heading}
            style={{ textAlign: "left", fontSize: 22 }}
          >
            Who are your students?
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
            Pick what applies most — you can always teach multiple groups.
          </p>
          <div className={styles.chipGrid} style={{ maxHeight: "none" }}>
            {getStudentProfiles(
              config,
              teachingMode as TeachingMode
            ).map((profile) => {
              const selected = profile === studentProfile;
              const label = getStudentProfileLabel(config, profile);
              return (
                <button
                  key={profile}
                  type="button"
                  className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
                  onClick={() => handleStudentProfileChange(profile)}
                  aria-pressed={selected}
                >
                  {selected && (
                    <Check className={styles.chipCheckIcon} size={13} />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
          <div style={{ height: 24 }} />
          <div className={styles.wizardNavRow}>
            <button
              type="button"
              className={styles.wizardNavBack}
              onClick={goBack}
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              className={styles.primaryButton}
              disabled={!step3Valid}
              onClick={goNext}
              style={{ flex: 1 }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ── Step 4: Board / Exam (multi-select) ──────────────────────────── */}
      {step === 4 && (
        <div
          key="step4"
          className={`${styles.screenContainer} ${animClass}`}
          style={{ maxWidth: 440 }}
        >
          <h2
            className={styles.heading}
            style={{ textAlign: "left", fontSize: 22 }}
          >
            {step4Config.headline || "Board / Exam"}
          </h2>
          {step4Config.banner ? (
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
              {step4Config.banner}
            </p>
          ) : null}
          <div className={styles.chipSearchWrap}>
            <Search size={15} className={styles.chipSearchIcon} />
            <input
              type="search"
              className={styles.chipSearch}
              placeholder="Search board or exam…"
              value={boardSearch}
              onChange={(e) => setBoardSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className={styles.chipGrid}>
            {filteredBoards.length === 0 ? (
              <div className={styles.chipEmpty}>
                No results for &ldquo;{boardSearch}&rdquo;
              </div>
            ) : (
              filteredBoards.map((b) => {
                const selected = step4Selections.includes(b.slug);
                return (
                  <button
                    key={b.slug}
                    type="button"
                    className={`${styles.chip} ${selected ? styles.chipMultiSelected : ""}`}
                    onClick={() => handleStep4Toggle(b.slug)}
                    aria-pressed={selected}
                  >
                    {selected && (
                      <Check className={styles.chipCheckIcon} size={13} />
                    )}
                    {b.name}
                  </button>
                );
              })
            )}
          </div>
          {step4Selections.length > 0 && (
            <p
              style={{
                fontSize: 12,
                color: "#6366f1",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {step4Selections.length} selected
            </p>
          )}
          <div style={{ height: 24 }} />
          <div className={styles.wizardNavRow}>
            <button
              type="button"
              className={styles.wizardNavBack}
              onClick={goBack}
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              className={styles.primaryButton}
              disabled={step4Selections.length === 0}
              onClick={goNext}
              style={{ flex: 1 }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ── Step 5: Subject ──────────────────────────────────────────────── */}
      {step === 5 && (
        <div
          key="step5"
          className={`${styles.screenContainer} ${animClass}`}
          style={{ maxWidth: 440 }}
        >
          <h2
            className={styles.heading}
            style={{ textAlign: "left", fontSize: 22 }}
          >
            What do you primarily teach?
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
            Pick your main subject — you can add more from your dashboard.
          </p>
          <div className={styles.chipSearchWrap}>
            <Search size={15} className={styles.chipSearchIcon} />
            <input
              type="search"
              className={styles.chipSearch}
              placeholder="Search subject…"
              value={subjectSearch}
              onChange={(e) => setSubjectSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className={styles.chipGrid}>
            {filteredSubjects.length === 0 ? (
              <div className={styles.chipEmpty}>
                {subjectSearch
                  ? `No results for "${subjectSearch}"`
                  : "No subjects available for your selection."}
              </div>
            ) : (
              filteredSubjects.map((s) => {
                const selected = s.slug === primarySubjectSlug;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
                    onClick={() => {
                      setPrimarySubjectSlug(s.slug);
                      setSubjectSearch("");
                    }}
                    aria-pressed={selected}
                  >
                    {selected && (
                      <Check className={styles.chipCheckIcon} size={13} />
                    )}
                    {s.name}
                  </button>
                );
              })
            )}
          </div>
          <div style={{ height: 28 }} />
          <div className={styles.wizardNavRow}>
            <button
              type="button"
              className={styles.wizardNavBack}
              onClick={goBack}
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              className={styles.primaryButton}
              disabled={!step5Valid || isSubmitting || !currentStepValid[5]}
              onClick={handleSubmit}
              style={{ flex: 1 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className={styles.spinner} size={18} /> Setting up…
                </>
              ) : (
                submitPrimaryCtaLabel
              )}
            </button>
          </div>
          <p
            className={styles.footerText}
            style={{ maxWidth: 440, marginTop: 16 }}
          >
            By continuing, you agree to Edveo&apos;s{" "}
            <a href="/terms-of-service" className={styles.linkDark}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className={styles.linkDark}>
              Privacy Policy
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WizardProgressBar({ currentStep }: { currentStep: WizardStep }) {
  return (
    <div className={styles.wizardProgress}>
      {([1, 2, 3, 4, 5] as WizardStep[]).map((s, i) => {
        const isDone = currentStep > s;
        const isActive = currentStep === s;
        return (
          <div
            key={s}
            style={{ display: "flex", alignItems: "center", flex: 1 }}
          >
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
            {i < 4 && (
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

function OnboardingContextChips({
  slugPreview,
  teachingModeLabel,
  studentProfileLabel,
  step4Summary,
  currentStep,
}: {
  slugPreview?: string;
  teachingModeLabel?: string;
  studentProfileLabel?: string;
  step4Summary?: { firstLabel: string; extraCount: number };
  currentStep: WizardStep;
}) {
  const chips: string[] = [];
  if (slugPreview) chips.push(slugPreview);
  if (teachingModeLabel && currentStep >= 3) chips.push(teachingModeLabel);
  if (studentProfileLabel && currentStep >= 4) chips.push(studentProfileLabel);
  if (step4Summary && currentStep >= 5) {
    const extra =
      step4Summary.extraCount > 0
        ? ` +${step4Summary.extraCount} more`
        : "";
    chips.push(`${step4Summary.firstLabel}${extra}`);
  }

  if (chips.length === 0) return null;

  return (
    <div className={styles.contextChipsRow}>
      {chips.map((chip, idx) => (
        <span key={idx} className={styles.contextChip}>
          <Check size={10} style={{ marginRight: 3, flexShrink: 0 }} />
          {chip}
        </span>
      ))}
    </div>
  );
}
