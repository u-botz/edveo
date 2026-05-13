/**
 * Pure filter helpers for the teacher onboarding wizard (v2 cascade).
 * No React imports — these are pure functions that components consume.
 */

import type {
  OnboardingFilterConfig,
  TeachingMode,
  SubjectOption,
  BoardOption,
} from "@/lib/api/signupApi";

/** Returns the student profile slugs available for a given teaching mode. */
export function getStudentProfiles(
  config: OnboardingFilterConfig,
  mode: TeachingMode
): string[] {
  return config.student_profiles_by_teaching_mode[mode] ?? [];
}

/** Human-readable label for a student profile slug. */
export function getStudentProfileLabel(
  config: OnboardingFilterConfig,
  profileSlug: string
): string {
  return config.student_profile_labels?.[profileSlug] ?? profileSlug;
}

/** Step 4 headline, banner, and options for the selected student profile. */
export function getStep4Config(
  config: OnboardingFilterConfig,
  profileSlug: string
): { headline: string; banner: string; options: BoardOption[] } {
  const raw = config.step4_config_by_student_profile?.[profileSlug];
  if (!raw || typeof raw !== "object") {
    return { headline: "", banner: "", options: [] };
  }
  const headline =
    typeof raw.headline === "string" ? raw.headline : "";
  const banner = typeof raw.banner === "string" ? raw.banner : "";
  const opts = raw.options;
  const options: BoardOption[] = Array.isArray(opts)
    ? opts.filter(
        (o): o is BoardOption =>
          !!o &&
          typeof o === "object" &&
          typeof (o as BoardOption).slug === "string" &&
          typeof (o as BoardOption).name === "string"
      )
    : [];

  return { headline, banner, options };
}

/**
 * Deduped union of Step 5 subjects across all selected Step 4 slugs (by subject slug).
 */
export function getStep5Subjects(
  config: OnboardingFilterConfig,
  step4Selections: string[]
): SubjectOption[] {
  const map = config.step5_subjects_by_step4_selection ?? {};
  const seen = new Set<string>();
  const result: SubjectOption[] = [];

  for (const sel of step4Selections) {
    const rows = map[sel];
    if (!Array.isArray(rows)) continue;
    for (const row of rows) {
      if (
        row &&
        typeof row.slug === "string" &&
        typeof row.name === "string" &&
        !seen.has(row.slug)
      ) {
        seen.add(row.slug);
        result.push({ slug: row.slug, name: row.name });
      }
    }
  }

  return result;
}

export function getStep4TeachingDomainsConfig(
  config: OnboardingFilterConfig,
  profileSlug: string
): { headline: string; banner: string; domains: BoardOption[] } {
  const raw = config.step4_teaching_domains_by_student_profile?.[profileSlug];
  if (!raw || typeof raw !== "object") {
    return { headline: "", banner: "", domains: [] };
  }
  const headline = typeof raw.headline === "string" ? raw.headline : "";
  const banner = typeof raw.banner === "string" ? raw.banner : "";
  const dom = raw.domains;
  const domains: BoardOption[] = Array.isArray(dom)
    ? dom.filter(
        (o): o is BoardOption =>
          !!o &&
          typeof o === "object" &&
          typeof (o as BoardOption).slug === "string" &&
          typeof (o as BoardOption).name === "string"
      )
    : [];

  return { headline, banner, domains };
}

export function getAggregatedSpecificExamOptions(
  config: OnboardingFilterConfig,
  selectedDomainSlugs: string[]
): BoardOption[] {
  const m = config.step4_specific_exams_by_domain ?? {};
  const seen = new Set<string>();
  const out: BoardOption[] = [];
  for (const d of selectedDomainSlugs) {
    const rows = m[d];
    if (!Array.isArray(rows)) {
      continue;
    }
    for (const row of rows) {
      if (
        row &&
        typeof row.slug === "string" &&
        typeof row.name === "string" &&
        !seen.has(row.slug)
      ) {
        seen.add(row.slug);
        out.push({ slug: row.slug, name: row.name });
      }
    }
  }

  return out;
}

export function getStep5SubjectsForTeachingSelection(
  config: OnboardingFilterConfig,
  domainSlugs: string[],
  specificExamSlugs: string[]
): SubjectOption[] {
  const childMap = config.domain_to_child_exam_slugs ?? {};
  const step5Domain = config.step5_subjects_by_teaching_domain ?? {};
  const step5Exam = config.step5_subjects_by_step4_selection ?? {};
  const specSet = new Set(specificExamSlugs);
  const seen = new Set<string>();
  const out: SubjectOption[] = [];
  const pushRows = (rows: SubjectOption[] | undefined) => {
    if (!Array.isArray(rows)) {
      return;
    }
    for (const row of rows) {
      if (
        row &&
        typeof row.slug === "string" &&
        typeof row.name === "string" &&
        !seen.has(row.slug)
      ) {
        seen.add(row.slug);
        out.push({ slug: row.slug, name: row.name });
      }
    }
  };
  for (const d of domainSlugs) {
    const children = (childMap[d] as string[] | undefined) ?? [d];
    const picked = children.filter((c) => specSet.has(c));
    if (picked.length > 0) {
      for (const c of picked) {
        pushRows(step5Exam[c]);
      }
    } else {
      pushRows(step5Domain[d]);
    }
  }

  return out;
}

/**
 * Client-side format check aligned with backend tenant slug rules (3–100 chars, lowercase, hyphen-separated).
 * Returns an error message or null if valid/empty.
 */
export function getSubdomainFormatError(raw: string): string | null {
  const t = raw.trim().toLowerCase();
  if (t === "") {
    return null;
  }
  if (t.length < 3) {
    return "Use at least 3 characters.";
  }
  if (t.length > 100) {
    return "Use at most 100 characters.";
  }
  if (t.startsWith("-") || t.endsWith("-")) {
    return "Cannot start or end with a hyphen.";
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t)) {
    return "Use only lowercase letters, numbers, and single hyphens between words.";
  }
  return null;
}
