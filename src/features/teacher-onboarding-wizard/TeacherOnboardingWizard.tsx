"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Check,
  ChevronLeft,
  Loader2,
  Search,
  X,
  AlertCircle,
  BookOpen,
  Users,
  Award,
  Layers,
  GraduationCap,
} from "lucide-react";
import styles from "@/app/(auth)/register/page.module.css";
import {
  fetchOnboardingFilterConfig,
  fetchInstitutionTypesForCategory,
  fetchPlansForCategory,
  checkSubdomainForCategory,
  submitSignup,
  generateIdempotencyKey,
  type TeachingMode,
  type OnboardingFilterConfig,
  type InstitutionType,
  type TrialPlan,
  type SignupSubmitResult,
} from "@/lib/api/signupApi";
import {
  getStudentProfiles,
  getStudentProfileLabel,
  getBoards,
  getSubjects,
  shouldSkipBoardStep,
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

const STEP_HINTS: Record<WizardStep, string> = {
  1: "This becomes your unique URL — students will see this name everywhere.",
  2: "Tell us how you teach so we can set up the right tools for you.",
  3: "Who are your typical students? This helps us personalise your dashboard.",
  4: "Pick one or more boards / exams you teach for. You can add more later.",
  5: "Your primary subject — you can teach others too.",
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
  const [rawName, setRawName] = useState("");
  const [subdomainStatus, setSubdomainStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "error"
  >("idle");
  const [subdomainSuggestions, setSubdomainSuggestions] = useState<string[]>([]);

  const [teachingMode, setTeachingMode] = useState<TeachingMode | "">("");
  const [studentProfile, setStudentProfile] = useState("");
  const [selectedBoards, setSelectedBoards] = useState<string[]>([]);
  const [boardsApplicable, setBoardsApplicable] = useState(true);
  const [primarySubjectSlug, setPrimarySubjectSlug] = useState("");

  // ── Search ────────────────────────────────────────────────────────────────
  const [boardSearch, setBoardSearch] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");

  // ── Submission ────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const idempotencyKeyRef = useRef<string>(generateIdempotencyKey());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  // ── Slug generation from raw name ─────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (rawName.trim()) {
        const generated = rawName
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
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [rawName]);

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
    if (!slug) return;
    if (checkRef.current) clearTimeout(checkRef.current);
    checkRef.current = setTimeout(() => checkSub(slug), 600);
    return () => {
      if (checkRef.current) clearTimeout(checkRef.current);
    };
  }, [slug, checkSub]);

  // ── Cascade resets ────────────────────────────────────────────────────────
  const handleStudentProfileChange = (profile: string) => {
    setStudentProfile(profile);
    setSelectedBoards([]);
    setPrimarySubjectSlug("");
    setBoardSearch("");
    setSubjectSearch("");
  };

  const handleBoardToggle = (boardSlug: string) => {
    setSelectedBoards((prev) => {
      const next = prev.includes(boardSlug)
        ? prev.filter((b) => b !== boardSlug)
        : [...prev, boardSlug];
      return next;
    });
    setPrimarySubjectSlug(""); // reset subject on board change
    setSubjectSearch("");
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    setDirection("right");
    setStep((s) => {
      const next = s < 5 ? ((s + 1) as WizardStep) : s;
      // Auto-skip Step 4 when not applicable
      if (
        next === 4 &&
        config &&
        teachingMode !== "" &&
        shouldSkipBoardStep(config, teachingMode as TeachingMode)
      ) {
        setBoardsApplicable(false);
        setSelectedBoards([]);
        return 5;
      }
      if (next === 4) {
        setBoardsApplicable(true);
      }
      return next;
    });
    window.scrollTo(0, 0);
  }, [config, teachingMode]);

  const goBack = useCallback(() => {
    setDirection("left");
    setStep((s) => {
      const prev = s > 1 ? ((s - 1) as WizardStep) : s;
      // When going back from Step 5, skip Step 4 again if it was auto-skipped
      if (
        prev === 4 &&
        config &&
        teachingMode !== "" &&
        shouldSkipBoardStep(config, teachingMode as TeachingMode)
      ) {
        return 3;
      }
      return prev;
    });
    window.scrollTo(0, 0);
  }, [config, teachingMode]);

  // ── Validity ──────────────────────────────────────────────────────────────
  const step1Valid =
    slug.length >= 2 &&
    subdomainStatus !== "taken" &&
    subdomainStatus !== "checking";
  const step2Valid = teachingMode !== "";
  const step3Valid = studentProfile !== "";
  const step4Valid =
    !boardsApplicable ||
    (config !== null &&
      shouldSkipBoardStep(config, teachingMode as TeachingMode)) ||
    selectedBoards.length > 0;
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
    config && teachingMode !== ""
      ? getSubjects(
          config,
          selectedBoards,
          teachingMode as TeachingMode,
          boardsApplicable
        )
      : [];

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitError(null);
    const trialPlan = plans.find((p) => p.is_trial) ?? plans[0];
    if (!trialPlan) {
      setSubmitError("No trial plan available. Please contact support.");
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
        subdomain: slug,
        institution_type_id: institutionTypeId ? parseInt(institutionTypeId, 10) : null,
        plan_id: trialPlan.id,
        idempotency_key: idempotencyKeyRef.current,
        captcha_token: null,
        website_url: "",
        google_continuation_token: googleContinuationToken ?? null,
        // v2 wizard fields
        teaching_mode: teachingMode !== "" ? (teachingMode as TeachingMode) : undefined,
        student_profile: studentProfile !== "" ? studentProfile : undefined,
        exam_category_slugs: selectedBoards,
        primary_subject_slug: primarySubjectSlug !== "" ? primarySubjectSlug : undefined,
        // legacy compat: set subject_slug so paid checkout path still works
        subject_slug: primarySubjectSlug !== "" ? primarySubjectSlug : undefined,
      });

      onSuccess({
        submitResult: result,
        email,
        googleContinuationToken,
        trialPlanId: trialPlan.id,
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
  const boardOptions =
    studentProfile !== "" ? getBoards(config, studentProfile) : [];
  const filteredBoards = boardOptions.filter((b) =>
    b.name.toLowerCase().includes(boardSearch.toLowerCase())
  );
  const filteredSubjects = subjectOptions.filter((s) =>
    s.name.toLowerCase().includes(subjectSearch.toLowerCase())
  );
  const isStep4Skipped =
    teachingMode !== "" &&
    shouldSkipBoardStep(config, teachingMode as TeachingMode);

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
      <WizardProgressBar
        currentStep={step}
        isStep4Skipped={isStep4Skipped}
      />

      {/* Per-step hint */}
      <div className={styles.wizardHint}>
        <HintIcon step={step} />
        <span>{STEP_HINTS[step]}</span>
      </div>

      {/* Context chips row (from step 2 onward) */}
      {step >= 2 && (
        <OnboardingContextChips
          slug={slug}
          tenantDomain={tenantDomain}
          teachingMode={selectedMode?.label}
          studentProfile={
            studentProfile !== ""
              ? getStudentProfileLabel(config, studentProfile)
              : undefined
          }
          boards={
            selectedBoards.length > 0
              ? selectedBoards.map(
                  (b) => boardOptions.find((bo) => bo.slug === b)?.name ?? b
                )
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
            Name your page
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>
            Students will find you at{" "}
            <strong>{slug || "yourname"}.{tenantDomain}</strong>
          </p>
          <div className={styles.wizardFormContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="wiz_slug" className={styles.label}>
                Page name
              </label>
              <input
                id="wiz_slug"
                type="text"
                placeholder="e.g. Ravi Physics Classes"
                className={`${styles.input} ${subdomainStatus === "taken" ? styles.inputError : ""}`}
                value={rawName}
                onChange={(e) => {
                  setRawName(e.target.value);
                  setSubmitError(null);
                }}
                autoFocus
              />
              {/* Live URL preview */}
              {slug && (
                <div style={{ marginTop: 8, fontSize: 13 }}>
                  <span
                    style={{
                      background: "#f0fdf4",
                      color: "#16a34a",
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontFamily: "monospace",
                    }}
                  >
                    {slug}.{tenantDomain}
                  </span>
                </div>
              )}
              {slug && subdomainStatus === "checking" && (
                <div className={styles.subdomainChecking}>
                  <Loader2 size={11} className={styles.spinner} />
                  Checking availability…
                </div>
              )}
              {slug && subdomainStatus === "available" && (
                <div className={styles.subdomainPreview}>
                  <span className={styles.subdomainAvailableBadge}>
                    <Check size={11} /> Available
                  </span>
                </div>
              )}
              {slug && subdomainStatus === "taken" && (
                <div className={styles.subdomainTaken}>
                  <X size={11} />
                  Already taken.
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
          <div className={styles.chipGrid} style={{ maxHeight: "none" }}>
            {config.teaching_modes.map((m) => {
              const selected = m.value === teachingMode;
              return (
                <button
                  key={m.value}
                  type="button"
                  className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
                  onClick={() => {
                    setTeachingMode(m.value);
                    handleStudentProfileChange(""); // reset downstream
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
            Board or exam
          </h2>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
            Select all that apply — you can pick more than one.
          </p>
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
                const selected = selectedBoards.includes(b.slug);
                return (
                  <button
                    key={b.slug}
                    type="button"
                    className={`${styles.chip} ${selected ? styles.chipMultiSelected : ""}`}
                    onClick={() => handleBoardToggle(b.slug)}
                    aria-pressed={selected}
                  >
                    {selected && (
                      <Check className={styles.chipCheckIcon} size={13} />
                    )}
                    {b.name}
                    {selected && selectedBoards.length > 1 && (
                      <span
                        style={{
                          marginLeft: 4,
                          fontSize: 11,
                          opacity: 0.7,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
          {selectedBoards.length > 0 && (
            <p
              style={{
                fontSize: 12,
                color: "#6366f1",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {selectedBoards.length} selected
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
              disabled={selectedBoards.length === 0}
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
            Your primary subject
          </h2>
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
                "Start my free trial →"
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

function WizardProgressBar({
  currentStep,
  isStep4Skipped,
}: {
  currentStep: WizardStep;
  isStep4Skipped: boolean;
}) {
  return (
    <div className={styles.wizardProgress}>
      {([1, 2, 3, 4, 5] as WizardStep[]).map((s, i) => {
        const isDone = currentStep > s || (s === 4 && isStep4Skipped && currentStep >= 4);
        const isActive = currentStep === s;
        const isAutoCompleted = s === 4 && isStep4Skipped;
        return (
          <div
            key={s}
            style={{ display: "flex", alignItems: "center", flex: 1 }}
          >
            <div className={styles.wizardStep}>
              <div
                className={`${styles.wizardStepCircle} ${isActive ? styles.wizardStepCircleActive : ""} ${isDone ? styles.wizardStepCircleDone : ""}`}
                title={isAutoCompleted ? "Auto-skipped" : undefined}
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

function HintIcon({ step }: { step: WizardStep }) {
  const size = 14;
  if (step === 1) return <Layers size={size} style={{ flexShrink: 0 }} />;
  if (step === 2) return <BookOpen size={size} style={{ flexShrink: 0 }} />;
  if (step === 3) return <Users size={size} style={{ flexShrink: 0 }} />;
  if (step === 4) return <Award size={size} style={{ flexShrink: 0 }} />;
  return <GraduationCap size={size} style={{ flexShrink: 0 }} />;
}

function OnboardingContextChips({
  slug,
  tenantDomain,
  teachingMode,
  studentProfile,
  boards,
  currentStep,
}: {
  slug: string;
  tenantDomain: string;
  teachingMode?: string;
  studentProfile?: string;
  boards?: string[];
  currentStep: WizardStep;
}) {
  const chips: string[] = [];
  if (slug) chips.push(`${slug}.${tenantDomain}`);
  if (teachingMode && currentStep >= 3) chips.push(teachingMode);
  if (studentProfile && currentStep >= 4) chips.push(studentProfile);
  if (boards && boards.length > 0 && currentStep >= 5)
    chips.push(boards.join(", "));

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
