"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Check,
  ChevronLeft,
  Loader2,
  Search,
  X,
  BookOpen,
  GraduationCap,
  Award,
  Layers,
  AlertCircle,
} from "lucide-react";
import styles from "@/app/(auth)/register/page.module.css";
import {
  fetchTeacherExamCategories,
  fetchTeacherSubjects,
  fetchTeacherGradeLevels,
  fetchInstitutionTypesForCategory,
  checkSubdomainForCategory,
  fetchPlansForCategory,
  submitSignup,
  generateIdempotencyKey,
  isInitiateSignupResponse,
  selfSignupAuxStorageKey,
  type TeachingExamCategory,
  type TeachingSubject,
  type TeachingGradeLevel,
  type InstitutionType,
  type TrialPlan,
  type SignupSubmitResult,
} from "@/lib/api/signupApi";

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
  /** Extra fields required by the direct-email path (full name, email, phone) — omit for Google path */
  extraFields?: {
    fullName: string;
    email: string;
    phone: string;
  };
}

// ─── Step metadata ─────────────────────────────────────────────────────────────

const STEP_LABELS: Record<WizardStep, string> = {
  1: "Workspace",
  2: "Category",
  3: "Board",
  4: "Subject",
  5: "Grade",
};

const STEP_HINTS: Record<WizardStep, string> = {
  1: "This becomes your unique URL — students will see this name everywhere.",
  2: "We'll set up your dashboard based on how you teach.",
  3: "We'll pre-configure your question bank tags to match this board.",
  4: "Pick the primary subject you teach. You can add more later.",
  5: "This helps us recommend the right templates and quiz difficulty levels.",
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

  // ── Master data ───────────────────────────────────────────────────────────
  const [examCategories, setExamCategories] = useState<TeachingExamCategory[]>([]);
  const [subjects, setSubjects] = useState<TeachingSubject[]>([]);
  const [gradeLevels, setGradeLevels] = useState<TeachingGradeLevel[]>([]);
  const [institutionTypes, setInstitutionTypes] = useState<InstitutionType[]>([]);
  const [plans, setPlans] = useState<TrialPlan[]>([]);
  const [masterLoading, setMasterLoading] = useState(true);
  const [masterError, setMasterError] = useState<string | null>(null);

  // ── Selections ────────────────────────────────────────────────────────────
  const [subdomain, setSubdomain] = useState("");
  const [slug, setSlug] = useState("");
  const [subdomainStatus, setSubdomainStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "error"
  >("idle");
  const [subdomainSuggestions, setSubdomainSuggestions] = useState<string[]>([]);
  const [institutionTypeId, setInstitutionTypeId] = useState("");
  const [examCategorySlug, setExamCategorySlug] = useState("");
  const [subjectSlug, setSubjectSlug] = useState("");
  const [gradeLevelSlug, setGradeLevelSlug] = useState("");

  // ── Search filters ────────────────────────────────────────────────────────
  const [examSearch, setExamSearch] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");

  // ── Submission ────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const idempotencyKeyRef = useRef<string>(generateIdempotencyKey());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const checkRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tenantDomain = process.env.NEXT_PUBLIC_TENANT_DOMAIN ?? "educoreos.com";

  // ── Bootstrap master data ─────────────────────────────────────────────────
  useEffect(() => {
    setMasterLoading(true);
    setMasterError(null);
    Promise.all([
      fetchTeacherExamCategories(),
      fetchTeacherSubjects(),
      fetchTeacherGradeLevels(),
      fetchInstitutionTypesForCategory("standalone_teacher"),
      fetchPlansForCategory("standalone_teacher"),
    ])
      .then(([exams, subs, grades, instTypes, plansData]) => {
        setExamCategories(exams);
        setSubjects(subs);
        setGradeLevels(grades);
        setInstitutionTypes(instTypes);
        setPlans(plansData);
        // Auto-select institution type for standalone_teacher
        const matched = instTypes.find((t) =>
          ["teacher", "tutor", "solo", "individual"].some(
            (kw) => t.name.toLowerCase().includes(kw) || t.slug.toLowerCase().includes(kw)
          )
        );
        if (matched) {
          setInstitutionTypeId(String(matched.id));
        } else if (instTypes.length > 0) {
          setInstitutionTypeId(String(instTypes[0].id));
        }
      })
      .catch(() => setMasterError("Unable to load onboarding data. Please refresh."))
      .finally(() => setMasterLoading(false));
  }, []);

  // ── Slug generation ───────────────────────────────────────────────────────
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

  // ── Subdomain check ───────────────────────────────────────────────────────
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
    return () => { if (checkRef.current) clearTimeout(checkRef.current); };
  }, [slug, checkSub]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = () => {
    setDirection("right");
    setStep((s) => (s < 5 ? (s + 1) as WizardStep : s));
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setDirection("left");
    setStep((s) => (s > 1 ? (s - 1) as WizardStep : s));
    window.scrollTo(0, 0);
  };

  // ── Step 1 validity ───────────────────────────────────────────────────────
  const step1Valid = slug.length >= 2 && subdomainStatus !== "taken" && subdomainStatus !== "checking";
  // ── Step 2 validity ───────────────────────────────────────────────────────
  const step2Valid = institutionTypeId !== "";
  // ── Step 3 validity ───────────────────────────────────────────────────────
  const step3Valid = examCategorySlug !== "";
  // ── Step 4 validity ───────────────────────────────────────────────────────
  const step4Valid = subjectSlug !== "";
  // ── Step 5 validity ───────────────────────────────────────────────────────
  const step5Valid = gradeLevelSlug !== "";

  const currentStepValid: Record<WizardStep, boolean> = {
    1: step1Valid,
    2: step2Valid,
    3: step3Valid,
    4: step4Valid,
    5: step5Valid,
  };

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
        institution_type_id: parseInt(institutionTypeId, 10),
        exam_category_slug: examCategorySlug,
        subject_slug: subjectSlug,
        grade_level_slug: gradeLevelSlug,
        plan_id: trialPlan.id,
        idempotency_key: idempotencyKeyRef.current,
        captcha_token: null,
        website_url: "",
        google_continuation_token: googleContinuationToken ?? null,
      });

      onSuccess({
        submitResult: result,
        email,
        googleContinuationToken,
        trialPlanId: trialPlan.id,
        category: "standalone_teacher",
      });
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

  // ── Filtered chip data ────────────────────────────────────────────────────
  const filteredExams = examCategories.filter((e) =>
    e.name.toLowerCase().includes(examSearch.toLowerCase())
  );
  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(subjectSearch.toLowerCase())
  );

  const animClass = direction === "right" ? styles.slideInRight : styles.slideInLeft;

  if (masterLoading) {
    return (
      <div style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>
        <div className={styles.loadingShimmer} style={{ height: 40, marginBottom: 16 }} />
        <div className={styles.loadingShimmer} style={{ height: 40, marginBottom: 16 }} />
        <div className={styles.loadingShimmer} style={{ height: 40 }} />
      </div>
    );
  }

  if (masterError) {
    return (
      <div className={styles.globalError} role="alert" style={{ maxWidth: 400 }}>
        <AlertCircle size={16} />
        {masterError}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Progress bar */}
      <WizardProgressBar currentStep={step} />

      {/* Per-step hint */}
      <div className={styles.wizardHint}>
        <HintIcon step={step} />
        <span>{STEP_HINTS[step]}</span>
      </div>

      {/* Selections summary (steps 3-5 show what was chosen) */}
      {step >= 3 && (
        <div className={styles.wizardSelectionSummary}>
          {slug && (
            <span className={styles.wizardSelectionBadge}>
              <Check size={10} />
              {slug}.{tenantDomain}
            </span>
          )}
          {institutionTypeId && institutionTypes.find((t) => String(t.id) === institutionTypeId) && (
            <span className={styles.wizardSelectionBadge}>
              <Check size={10} />
              {institutionTypes.find((t) => String(t.id) === institutionTypeId)!.name}
            </span>
          )}
          {step >= 4 && examCategorySlug && (
            <span className={styles.wizardSelectionBadge}>
              <Check size={10} />
              {examCategories.find((e) => e.slug === examCategorySlug)?.name ?? examCategorySlug}
            </span>
          )}
          {step >= 5 && subjectSlug && (
            <span className={styles.wizardSelectionBadge}>
              <Check size={10} />
              {subjects.find((s) => s.slug === subjectSlug)?.name ?? subjectSlug}
            </span>
          )}
        </div>
      )}

      {/* Error banner */}
      {submitError && (
        <div className={styles.globalError} role="alert" style={{ maxWidth: 400, width: "100%", marginBottom: 16 }}>
          <AlertCircle size={16} />
          {submitError}
        </div>
      )}

      {/* ── Step 1: Workspace name ─────────────────────────────────────────── */}
      {step === 1 && (
        <div key="step1" className={`${styles.screenContainer} ${animClass}`} style={{ maxWidth: 400 }}>
          <h2 className={styles.heading} style={{ textAlign: "left", fontSize: 22 }}>
            Name your workspace
          </h2>
          <div className={styles.wizardFormContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="wiz_subdomain" className={styles.label}>
                Workspace name
              </label>
              <input
                id="wiz_subdomain"
                type="text"
                placeholder="e.g. Ravi Physics Classes"
                className={`${styles.input} ${subdomainStatus === "taken" ? styles.inputError : ""}`}
                value={subdomain}
                onChange={(e) => {
                  setSubdomain(e.target.value);
                  setSubmitError(null);
                }}
                autoFocus
              />
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
                  <span className={styles.subdomainSlug}>{slug}.{tenantDomain}</span>
                </div>
              )}
              {slug && subdomainStatus === "taken" && (
                <div className={styles.subdomainTaken}>
                  <X size={11} />
                  Already taken.{subdomainSuggestions.length > 0 && ` Try: ${subdomainSuggestions.join(", ")}`}
                </div>
              )}
              {slug && subdomainStatus === "idle" && slug.length >= 2 && (
                <div className={styles.subdomainPreview}>
                  <span className={styles.subdomainSlug}>{slug}.{tenantDomain}</span>
                </div>
              )}
            </div>
          </div>
          <div style={{ height: 24 }} />
          <button
            className={`${styles.primaryButton}`}
            style={{ maxWidth: 400 }}
            disabled={!step1Valid}
            onClick={goNext}
          >
            Continue
          </button>
        </div>
      )}

      {/* ── Step 2: Institution category ──────────────────────────────────── */}
      {step === 2 && (
        <div key="step2" className={`${styles.screenContainer} ${animClass}`} style={{ maxWidth: 400 }}>
          <h2 className={styles.heading} style={{ textAlign: "left", fontSize: 22 }}>
            How do you teach?
          </h2>
          <div className={styles.chipGrid} style={{ maxHeight: "none" }}>
            {institutionTypes.map((t) => {
              const selected = String(t.id) === institutionTypeId;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
                  onClick={() => setInstitutionTypeId(String(t.id))}
                  aria-pressed={selected}
                >
                  {selected && <Check className={styles.chipCheckIcon} size={13} />}
                  {t.name}
                </button>
              );
            })}
          </div>
          <div style={{ height: 24 }} />
          <div className={styles.wizardNavRow}>
            <button type="button" className={styles.wizardNavBack} onClick={goBack}>
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

      {/* ── Step 3: Exam board ─────────────────────────────────────────────── */}
      {step === 3 && (
        <div key="step3" className={`${styles.screenContainer} ${animClass}`} style={{ maxWidth: 400 }}>
          <h2 className={styles.heading} style={{ textAlign: "left", fontSize: 22 }}>
            Which board or exam?
          </h2>
          <div className={styles.chipSearchWrap}>
            <Search size={15} className={styles.chipSearchIcon} />
            <input
              type="search"
              className={styles.chipSearch}
              placeholder="Search board or exam…"
              value={examSearch}
              onChange={(e) => setExamSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className={styles.chipGrid}>
            {filteredExams.length === 0 ? (
              <div className={styles.chipEmpty}>No results for &ldquo;{examSearch}&rdquo;</div>
            ) : (
              filteredExams.map((e) => {
                const selected = e.slug === examCategorySlug;
                return (
                  <button
                    key={e.slug}
                    type="button"
                    className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
                    onClick={() => { setExamCategorySlug(e.slug); setExamSearch(""); }}
                    aria-pressed={selected}
                  >
                    {selected && <Check className={styles.chipCheckIcon} size={13} />}
                    {e.name}
                  </button>
                );
              })
            )}
          </div>
          <div style={{ height: 24 }} />
          <div className={styles.wizardNavRow}>
            <button type="button" className={styles.wizardNavBack} onClick={goBack}>
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

      {/* ── Step 4: Subject ────────────────────────────────────────────────── */}
      {step === 4 && (
        <div key="step4" className={`${styles.screenContainer} ${animClass}`} style={{ maxWidth: 400 }}>
          <h2 className={styles.heading} style={{ textAlign: "left", fontSize: 22 }}>
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
              <div className={styles.chipEmpty}>No results for &ldquo;{subjectSearch}&rdquo;</div>
            ) : (
              filteredSubjects.map((s) => {
                const selected = s.slug === subjectSlug;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
                    onClick={() => { setSubjectSlug(s.slug); setSubjectSearch(""); }}
                    aria-pressed={selected}
                  >
                    {selected && <Check className={styles.chipCheckIcon} size={13} />}
                    {s.name}
                  </button>
                );
              })
            )}
          </div>
          <div style={{ height: 24 }} />
          <div className={styles.wizardNavRow}>
            <button type="button" className={styles.wizardNavBack} onClick={goBack}>
              <ChevronLeft size={16} /> Back
            </button>
            <button
              className={styles.primaryButton}
              disabled={!step4Valid}
              onClick={goNext}
              style={{ flex: 1 }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ── Step 5: Grade level ────────────────────────────────────────────── */}
      {step === 5 && (
        <div key="step5" className={`${styles.screenContainer} ${animClass}`} style={{ maxWidth: 400 }}>
          <h2 className={styles.heading} style={{ textAlign: "left", fontSize: 22 }}>
            Who are your students?
          </h2>
          <div className={styles.chipGrid} style={{ maxHeight: "none" }}>
            {gradeLevels.map((g) => {
              const selected = g.slug === gradeLevelSlug;
              return (
                <button
                  key={g.slug}
                  type="button"
                  className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
                  onClick={() => setGradeLevelSlug(g.slug)}
                  aria-pressed={selected}
                >
                  {selected && <Check className={styles.chipCheckIcon} size={13} />}
                  {g.name}
                </button>
              );
            })}
          </div>
          <div style={{ height: 28 }} />
          <div className={styles.wizardNavRow}>
            <button type="button" className={styles.wizardNavBack} onClick={goBack}>
              <ChevronLeft size={16} /> Back
            </button>
            <button
              className={styles.primaryButton}
              disabled={!step5Valid || isSubmitting || !currentStepValid[5]}
              onClick={handleSubmit}
              style={{ flex: 1 }}
            >
              {isSubmitting ? (
                <><Loader2 className={styles.spinner} size={18} /> Setting up…</>
              ) : (
                "Start my free trial →"
              )}
            </button>
          </div>
          <p className={styles.footerText} style={{ maxWidth: 400 }}>
            By continuing, you agree to Edveo&apos;s{" "}
            <a href="/terms-of-service" className={styles.linkDark}>Terms of Service</a>{" "}
            and{" "}
            <a href="/privacy-policy" className={styles.linkDark}>Privacy Policy</a>
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
            {i < 4 && (
              <div className={`${styles.wizardConnector} ${isDone ? styles.wizardConnectorDone : ""}`} />
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
  if (step === 3) return <Award size={size} style={{ flexShrink: 0 }} />;
  if (step === 4) return <BookOpen size={size} style={{ flexShrink: 0 }} />;
  return <GraduationCap size={size} style={{ flexShrink: 0 }} />;
}
