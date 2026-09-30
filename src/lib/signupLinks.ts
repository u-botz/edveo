import type { TenantCategory } from "@/lib/api/signupApi";

/**
 * Self-signup entry points (ONBOARD-01). Every "Start free" button on the site goes through here,
 * so the address lives in one place.
 *
 * `for` only pre-selects the first step's card on /signup — the visitor still sees it and presses
 * Continue, and can pick another. An unknown value is ignored.
 */
export type SignupAudience = "teacher" | "institute" | "edtech";

const CATEGORY_FOR_AUDIENCE: Record<SignupAudience, TenantCategory> = {
  teacher: "standalone_teacher",
  institute: "offline_institution",
  edtech: "edtech",
};

export function signupHref(audience?: SignupAudience): string {
  return audience ? `/signup?for=${audience}` : "/signup";
}

export function categoryFromSignupParam(value: string | null): TenantCategory | null {
  // Own keys only: `in` would also accept "constructor" and friends.
  return value !== null && Object.prototype.hasOwnProperty.call(CATEGORY_FOR_AUDIENCE, value)
    ? CATEGORY_FOR_AUDIENCE[value as SignupAudience]
    : null;
}
