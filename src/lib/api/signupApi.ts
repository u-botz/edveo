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
}

export interface TrialSignupResponse {
  message: string;
  status: "pending_verification";
  meta: { enumeration_safe: boolean };
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
  const res = await fetch(`${prefix}/institution-types`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
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
): Promise<TrialSignupResponse> {
  const prefix = CATEGORY_PREFIX[category];
  const res = await fetch(`${prefix}/initiate`, {
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

  return json as TrialSignupResponse;
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
