/**
 * Query param `?error=` values returned by the platform Google OAuth callback
 * when redirecting to the marketing site (`/signup`).
 */
export const SIGNUP_OAUTH_ERROR_MESSAGES: Record<string, string> = {
  account_exists:
    "An account already exists for this email. Please sign in from your workspace login page.",
  student_account_exists:
    "This Google account is registered as a student. Edveo is for instructors only — please log in from your instructor's website.",
  session_expired: "Your sign-in session expired. Please try again.",
  google_error: "Google sign-in failed. Please try again.",
  unverified_email: "Your Google account email is not verified.",
  provisioning_failed:
    "Account setup failed. Please try again or contact support.",
};

export function signupOAuthErrorMessage(code: string | null): string | null {
  if (!code) return null;
  return SIGNUP_OAUTH_ERROR_MESSAGES[code] ?? null;
}
