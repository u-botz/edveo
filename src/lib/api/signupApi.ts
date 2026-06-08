/**
 * Unified Self-Onboarding API Client (TSO-1 / TSO-2 / TSO-3)
 * Routes to the correct backend endpoint based on tenant category.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─── Category → API prefix mapping ────────────────────────────────────────────

export type TenantCategory =
  | "standalone_teacher"
  | "offline_institution"
  | "edtech";

const CATEGORY_PREFIX: Record<TenantCategory, string> = {
  standalone_teacher: `${BASE_URL}/api/public/teacher-signup`,
  offline_institution: `${BASE_URL}/api/public/offline-institution-signup`,
  edtech: `${BASE_URL}/api/public/edtech-signup`,
};

// ─── Google OAuth continuation (Redis peek — S-1, no PII in redirect URL) ─────

export type GoogleSignupContinuationCategory = TenantCategory;

export interface GoogleSignupContinuationPayload {
  name: string;
  email: string;
  category: GoogleSignupContinuationCategory;
}

/**
 * GET /api/public/signup/continuation/{token} — peeks Redis payload for pre-fill (does not consume).
 */
export async function fetchGoogleSignupContinuation(
  token: string
): Promise<GoogleSignupContinuationPayload> {
  const trimmed = token.trim();
  const res = await fetch(
    `${BASE_URL}/api/public/signup/continuation/${encodeURIComponent(trimmed)}`,
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  if (res.status === 404) {
    const err = new Error("Session expired") as Error & { status: number };
    err.status = 404;
    throw err;
  }
  if (!res.ok) {
    let msg = "Failed to load signup session";
    try {
      const j = (await res.json()) as { message?: string };
      if (typeof j.message === "string") msg = j.message;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  const json = (await res.json()) as { data?: Partial<GoogleSignupContinuationPayload> };
  const d = json.data;
  const cat = d?.category;
  if (
    !d ||
    typeof d.name !== "string" ||
    typeof d.email !== "string" ||
    typeof cat !== "string"
  ) {
    throw new Error("Invalid signup session response");
  }
  if (
    cat !== "standalone_teacher" &&
    cat !== "offline_institution" &&
    cat !== "edtech"
  ) {
    throw new Error("Invalid signup session response");
  }
  return { name: d.name, email: d.email, category: cat };
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TrialPlan {
  id: number;
  code: string;
  name: string;
  price_monthly_cents: number;
  price_annual_cents: number;
  is_trial: boolean;
  /** Catalog flag: standalone-teacher self-serve free forever (ACTIVE subscription, no trial). */
  self_serve_free_active?: boolean;
  trial_duration_days: number | null;
  features: Record<string, unknown>;
  modules: string[];
}

/**
 * Plan allowed for POST /api/public/teacher-signup/trial (email-verify path).
 * Do not fall back to `plans[0]`: the catalog lists paid SKUs first by sort_order,
 * which the backend rejects ("Invalid plan selected").
 */
export function pickStandaloneTeacherSelfServeSignupPlan(
  plans: TrialPlan[]
): TrialPlan | null {
  const free = plans.find((p) => p.self_serve_free_active === true);
  if (free) {
    return free;
  }
  const trial = plans.find((p) => p.is_trial === true);
  return trial ?? null;
}

export interface InstitutionType {
  id: number;
  name: string;
  slug: string;
  /** EdTech API may return `system_code` instead of `slug`. */
  system_code?: string;
  code?: string;
  section?: "exam_focused" | "non_exam" | null;
}

export interface OfflineTeachingDomain {
  code: string;
  label: string;
}

export interface TeachingExamCategory {
  id: number;
  name: string;
  slug: string;
}

export interface TeachingSubject {
  id: number;
  name: string;
  slug: string;
}

export interface TeachingGradeLevel {
  id: number;
  name: string;
  slug: string;
}

// ─── Onboarding Wizard v2 types ───────────────────────────────────────────────

export type TeachingMode =
  | "independent_tutor"
  | "school_teacher"
  | "skill_trainer";

export interface TeachingModeOption {
  value: TeachingMode;
  label: string;
  icon?: string;
}

export interface SubjectOption {
  slug: string;
  name: string;
}

export interface BoardOption {
  slug: string;
  name: string;
}

/** Wizard v2 cascade — returned by GET …/onboarding-config (standalone_teacher_v2). */
export interface OnboardingFilterConfig {
  teaching_modes: TeachingModeOption[];
  student_profiles_by_teaching_mode: Record<TeachingMode, string[]>;
  student_profile_labels?: Record<string, string>;
  step4_config_by_student_profile: Record<
    string,
    { headline: string; banner: string; options: BoardOption[] }
  >;
  step4_teaching_domains_by_student_profile?: Record<
    string,
    { headline: string; banner: string; domains: BoardOption[] }
  >;
  step4_specific_exams_by_domain?: Record<string, BoardOption[]>;
  step5_subjects_by_step4_selection: Record<string, SubjectOption[]>;
  step5_subjects_by_teaching_domain?: Record<string, SubjectOption[]>;
  domain_to_child_exam_slugs?: Record<string, string[]>;
  module_entitlements_by_teaching_mode?: Record<
    string,
    Array<{ module_code: string; type: string }>
  >;
}

/** Runtime guard — fails loudly if the API still serves legacy v1 config. */
export function parseStandaloneTeacherOnboardingConfig(
  data: unknown
): OnboardingFilterConfig {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid onboarding configuration");
  }
  const o = data as Record<string, unknown>;
  if (
    typeof o.step5_subjects_by_step4_selection !== "object" ||
    o.step5_subjects_by_step4_selection === null
  ) {
    throw new Error(
      "Onboarding configuration is outdated or invalid (expected wizard v2 shape)."
    );
  }
  const hasLegacyStep4 =
    typeof o.step4_config_by_student_profile === "object" &&
    o.step4_config_by_student_profile !== null;
  const hasDomainStep4 =
    typeof o.step4_teaching_domains_by_student_profile === "object" &&
    o.step4_teaching_domains_by_student_profile !== null;
  if (!hasLegacyStep4 && !hasDomainStep4) {
    throw new Error(
      "Onboarding configuration is outdated or invalid (expected step4 teaching domains or legacy step4 config)."
    );
  }
  return data as OnboardingFilterConfig;
}

export interface SubdomainCheckResult {
  available: boolean;
  slug: string;
  suggestions?: string[];
}

export interface TrialSignupPayload {
  name: string;
  email: string;
  phone: string;
  subdomain: string;
  institution_type_id?: number | null; // omitted for edtech
  /** Legacy single-slug (kept for paid-checkout backward compat) */
  exam_category_slug?: string;
  /** Legacy single-slug (kept for paid-checkout backward compat) */
  subject_slug?: string;
  /** Legacy single-slug */
  grade_level_slug?: string;
  plan_id: number;
  idempotency_key: string;
  captcha_token: string | null;
  website_url: string; // honeypot — always empty
  google_continuation_token?: string | null; // TSO-3 OAuth path
  /** Required for edtech / offline `initiate` when `google_continuation_token` is absent (backend min 10). */
  password?: string;
  // ─── Wizard v2 fields ──────────────────────────────────────────────────────
  teaching_mode?: TeachingMode;
  student_profile?: string;
  /** Wizard v3 — teaching domain slugs (required for new wizard). */
  teaching_domains?: string[];
  /** Optional atomic exams under selected domains. */
  specific_exams?: string[];
  /** Legacy flat boards / exams (optional when teaching_domains is sent). */
  exam_category_slugs?: string[];
  /** Wizard v2 Step 5 — multi-select subject slugs. */
  primary_subject_slugs?: string[];
  /** Alias for subject_slug / first subject (legacy). */
  primary_subject_slug?: string;
  /** Offline institute v2.1 — primary type id (required for offline initiate). */
  primary_institution_type_id?: number;
  secondary_institution_type_ids?: number[];
  teaching_domain_codes?: string[];
}

/** Teacher trial endpoint — enumeration-safe, no session token in body. */
export interface TrialSignupResponse {
  message: string;
  status: "pending_verification";
  meta: { enumeration_safe: boolean };
}

/** Edtech / offline `initiate` — session key for verify-email + complete. */
export interface InitiateSignupResponse {
  token: string;
  message: string;
}

export type SignupSubmitResult = TrialSignupResponse | InitiateSignupResponse;

export function isInitiateSignupResponse(
  r: SignupSubmitResult
): r is InitiateSignupResponse {
  return typeof (r as InitiateSignupResponse).token === "string";
}

/** sessionStorage key: `${prefix}${signupToken}` — holds plan + Google continuation for complete(). */
export const SELF_SIGNUP_AUX_STORAGE_PREFIX = "edveo.self_signup.aux:";

export type SelfSignupAuxPayload = {
  googleContinuationToken: string | null;
  planId: number;
  billingCycle: "monthly" | "annual";
};

export function selfSignupAuxStorageKey(signupToken: string): string {
  return `${SELF_SIGNUP_AUX_STORAGE_PREFIX}${signupToken}`;
}

export type InstitutionEmailVerifyCategory = "edtech" | "offline_institution";

/**
 * POST …/verify-email — moves signup to email_verified.
 */
export async function verifyInstitutionSignupEmail(
  category: InstitutionEmailVerifyCategory,
  signupToken: string,
  emailVerificationCode: string
): Promise<{ token: string; status: string }> {
  const prefix = CATEGORY_PREFIX[category];
  const res = await fetch(`${prefix}/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      token: signupToken,
      email_verification_code: emailVerificationCode,
    }),
  });
  const json = (await res.json()) as { token?: string; status?: string; message?: string };
  if (!res.ok) {
    throw new Error(json?.message ?? "Verification failed");
  }
  if (!json.token || !json.status) {
    throw new Error("Unexpected verification response");
  }
  return { token: json.token, status: json.status };
}

export type CompleteSignupProvisionedResponse = {
  status: "provisioned";
  dashboard_url: string;
};

export type CompleteSignupPendingPaymentResponse = {
  status: "pending_payment";
  razorpay_order_id: string;
  amount_paise: number;
  key_id: string;
  currency: string;
};

/**
 * POST …/complete — provisions tenant (trial) or returns Razorpay order (paid).
 */
export async function completeInstitutionSignup(
  category: InstitutionEmailVerifyCategory,
  body: {
    token: string;
    plan_id: number;
    billing_cycle: "monthly" | "annual";
    google_continuation_token?: string | null;
  }
): Promise<CompleteSignupProvisionedResponse | CompleteSignupPendingPaymentResponse> {
  const prefix = CATEGORY_PREFIX[category];
  const res = await fetch(`${prefix}/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    throw new Error(
      typeof json.message === "string"
        ? json.message
        : "Could not complete signup"
    );
  }
  if (json.status === "provisioned" && typeof json.dashboard_url === "string") {
    return {
      status: "provisioned",
      dashboard_url: json.dashboard_url,
    };
  }
  if (
    json.status === "pending_payment" &&
    typeof json.razorpay_order_id === "string"
  ) {
    return {
      status: "pending_payment",
      razorpay_order_id: json.razorpay_order_id,
      amount_paise: Number(json.amount_paise),
      key_id: String(json.key_id ?? ""),
      currency: String(json.currency ?? ""),
    };
  }
  throw new Error("Unexpected complete response");
}

export interface ApiValidationError extends Error {
  status: 422;
  serverErrors?: Record<string, string[]>;
}

// ─── API Calls ────────────────────────────────────────────────────────────────

/**
 * Fetch trial plans for a specific category.
 * Must be called AFTER the user selects their category.
 */
export async function fetchPlansForCategory(
  category: TenantCategory,
  country = "IN"
): Promise<TrialPlan[]> {
  const prefix = CATEGORY_PREFIX[category];
  const res = await fetch(
    `${prefix}/plans?country=${encodeURIComponent(country)}`,
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load plans");
  const json = await res.json();
  return (json.data ?? []) as TrialPlan[];
}

/**
 * Fetch institution types for standalone_teacher or offline_institution.
 */
export async function fetchInstitutionTypesForCategory(
  category: Exclude<TenantCategory, "edtech">
): Promise<InstitutionType[]> {
  const prefix = CATEGORY_PREFIX[category];
  const res = await fetch(
    `${prefix}/institution-types?category=${encodeURIComponent(category)}`,
    {
      headers: { Accept: "application/json" },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to load institution types");
  const json = await res.json();
  return (json.data ?? []) as InstitutionType[];
}

/** EdTech institution types with exam_focused / non_exam section. */
export async function fetchEdtechInstitutionTypes(): Promise<InstitutionType[]> {
  const res = await fetch(`${CATEGORY_PREFIX.edtech}/institution-types`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load EdTech institution types");
  const json = await res.json();
  const rows = (json.data ?? []) as Array<Record<string, unknown>>;
  return rows.map((row) => {
    const code =
      (typeof row.system_code === "string" && row.system_code) ||
      (typeof row.code === "string" && row.code) ||
      (typeof row.slug === "string" && row.slug) ||
      "";
    return {
      id: Number(row.id),
      name: String(row.name ?? ""),
      slug: code,
      system_code: code,
      code,
      section:
        row.section === "exam_focused" || row.section === "non_exam"
          ? row.section
          : null,
    };
  });
}

/** Teaching domains for an exam-focused EdTech institution type. */
export async function fetchEdtechTeachingDomains(
  typeId: number
): Promise<OfflineTeachingDomain[]> {
  const res = await fetch(
    `${CATEGORY_PREFIX.edtech}/teaching-domains?type_id=${encodeURIComponent(String(typeId))}`,
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load teaching domains");
  const json = await res.json();
  return (json.data ?? []) as OfflineTeachingDomain[];
}

/**
 * Merged teaching domains for selected offline institute type codes (exam-focused only).
 */
export async function fetchOfflineTeachingDomains(
  typeSlugs: string[]
): Promise<OfflineTeachingDomain[]> {
  if (typeSlugs.length === 0) return [];
  const prefix = CATEGORY_PREFIX.offline_institution;
  const qs = new URLSearchParams();
  for (const s of typeSlugs) {
    qs.append("type_slugs[]", s);
  }
  const res = await fetch(`${prefix}/teaching-domains?${qs.toString()}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load teaching domains");
  const json = await res.json();
  return (json.data ?? []) as OfflineTeachingDomain[];
}

/**
 * Fetch the onboarding filter config (cascade map for wizard v2 steps 2–5).
 * Cached for 1 h on the server; no-store on the client so changes propagate promptly.
 */
export async function fetchOnboardingFilterConfig(): Promise<OnboardingFilterConfig> {
  const res = await fetch(
    `${CATEGORY_PREFIX.standalone_teacher}/onboarding-config`,
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load onboarding configuration");
  const json = (await res.json()) as { data?: unknown };
  if (!json.data) throw new Error("Empty onboarding configuration");
  return parseStandaloneTeacherOnboardingConfig(json.data);
}

/**
 * Fetch active exam categories (boards / competitive exams) for the teacher onboarding wizard.
 */
export async function fetchTeacherExamCategories(): Promise<TeachingExamCategory[]> {
  const res = await fetch(
    `${CATEGORY_PREFIX.standalone_teacher}/exam-categories`,
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load exam categories");
  const json = await res.json();
  return (json.data ?? []) as TeachingExamCategory[];
}

/**
 * Fetch active subjects for the teacher onboarding wizard.
 */
export async function fetchTeacherSubjects(): Promise<TeachingSubject[]> {
  const res = await fetch(
    `${CATEGORY_PREFIX.standalone_teacher}/subjects`,
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load subjects");
  const json = await res.json();
  return (json.data ?? []) as TeachingSubject[];
}

/**
 * Fetch active grade levels for the teacher onboarding wizard.
 */
export async function fetchTeacherGradeLevels(): Promise<TeachingGradeLevel[]> {
  const res = await fetch(
    `${CATEGORY_PREFIX.standalone_teacher}/grade-levels`,
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load grade levels");
  const json = await res.json();
  return (json.data ?? []) as TeachingGradeLevel[];
}

/**
 * Check subdomain availability against the category-specific endpoint.
 * Debounce calls on the caller side.
 */
export async function checkSubdomainForCategory(
  category: TenantCategory,
  slug: string
): Promise<SubdomainCheckResult> {
  const prefix = CATEGORY_PREFIX[category];
  const res = await fetch(
    `${prefix}/check-subdomain?slug=${encodeURIComponent(slug)}`,
    { headers: { Accept: "application/json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to check subdomain");
  return res.json() as Promise<SubdomainCheckResult>;
}

/**
 * Submit the trial signup form.
 * On success, the backend sends a verification email — tenant is NOT provisioned yet.
 * Throws on network error.
 * For email-already-exists the backend returns 200 (enumeration-safe).
 */
export async function submitSignup(
  category: TenantCategory,
  payload: TrialSignupPayload
): Promise<SignupSubmitResult> {
  const prefix = CATEGORY_PREFIX[category];
  const CATEGORY_SUBMIT_ENDPOINT: Record<TenantCategory, string> = {
    standalone_teacher: "trial",
    offline_institution: "initiate",
    edtech: "initiate",
  };

  const endpoint = CATEGORY_SUBMIT_ENDPOINT[category];
  const res = await fetch(`${prefix}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (res.status === 422) {
    const message: string =
      json?.message ?? json?.errors?.subdomain?.[0] ?? "Validation error";
    const err = new Error(message) as ApiValidationError;
    (err as ApiValidationError & { status: 422 }).status = 422;
    (err as ApiValidationError & { serverErrors: unknown }).serverErrors = json?.errors;
    throw err;
  }

  if (!res.ok) {
    throw new Error(json?.message ?? "Registration failed. Please try again.");
  }

  return json as SignupSubmitResult;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function generateIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Build the Google OAuth redirect URL for signup.
 * The browser navigates to this URL — it is NOT a fetch call.
 */
export function buildGoogleSignupUrl(category: TenantCategory): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const params = new URLSearchParams({
    action: "signup",
    category,
  });
  return `${apiUrl}/api/auth/google/redirect?${params.toString()}`;
}

/** POST /api/auth/teacher/verify-email — trial teacher link from email (id + HMAC token). */
export interface TeacherEmailVerifySuccess {
  message: string;
  status: string;
  data: {
    already_verified: boolean;
    provisioned: boolean;
    subdomain: string;
    login_url: string;
  };
}

export async function verifyTeacherSignupEmailLink(
  id: number,
  token: string
): Promise<TeacherEmailVerifySuccess> {
  const res = await fetch(`${BASE_URL}/api/auth/teacher/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ id, token }),
  });
  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    const msg = extractTeacherVerifyErrorMessage(json, res.status);
    const err = new Error(msg) as Error & { status: number; code?: string };
    err.status = res.status;
    const errObj = json.error;
    if (
      errObj &&
      typeof errObj === "object" &&
      "code" in errObj &&
      typeof (errObj as { code: unknown }).code === "string"
    ) {
      err.code = (errObj as { code: string }).code;
    }
    throw err;
  }
  const data = json.data;
  if (
    !data ||
    typeof data !== "object" ||
    typeof (data as { login_url?: unknown }).login_url !== "string" ||
    typeof (data as { subdomain?: unknown }).subdomain !== "string"
  ) {
    throw new Error("Unexpected verification response");
  }
  return json as unknown as TeacherEmailVerifySuccess;
}

function extractTeacherVerifyErrorMessage(
  json: Record<string, unknown>,
  status: number
): string {
  if (typeof json.message === "string" && json.message !== "") {
    return json.message;
  }
  const err = json.error;
  if (err && typeof err === "object" && "message" in err) {
    const m = (err as { message?: unknown }).message;
    if (typeof m === "string" && m !== "") return m;
  }
  if (status === 410) {
    return "This verification link has expired or is no longer valid.";
  }
  if (status === 404) {
    return "This verification link is invalid.";
  }
  return "Verification failed. Please request a new link from the signup page.";
}
