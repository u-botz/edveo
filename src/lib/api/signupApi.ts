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
  trial_duration_days: number | null;
  features: Record<string, unknown>;
  modules: string[];
}

export interface InstitutionType {
  id: number;
  name: string;
  slug: string;
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
  plan_id: number;
  idempotency_key: string;
  captcha_token: string | null;
  website_url: string; // honeypot — always empty
  google_continuation_token?: string | null; // TSO-3 OAuth path
  /** Required for edtech / offline `initiate` when `google_continuation_token` is absent (backend min 10). */
  password?: string;
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
 * Fetch institution types for a category.
 * ONLY call for standalone_teacher and offline_institution.
 * edtech has no institution types — do not call this for edtech.
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
