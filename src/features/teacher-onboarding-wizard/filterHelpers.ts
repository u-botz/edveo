/**
 * Pure filter helpers for the teacher onboarding wizard (v2).
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

/** Returns the boards available for a given student profile. */
export function getBoards(
  config: OnboardingFilterConfig,
  studentProfile: string
): BoardOption[] {
  return config.boards_by_student_profile[studentProfile] ?? [];
}

/**
 * Returns the subjects available for a given set of selected boards, or
 * for a teaching path (when boards are not applicable).
 *
 * When `boardsApplicable` is false (Step 4 skipped), subjects come entirely
 * from `subjects_by_teaching_path[mode]`.
 *
 * When `boardsApplicable` is true, subjects come from the union of
 * `subjects_by_board[board]` for each selected board — de-duplicated by slug.
 */
export function getSubjects(
  config: OnboardingFilterConfig,
  selectedBoards: string[],
  mode: TeachingMode,
  boardsApplicable: boolean
): SubjectOption[] {
  if (!boardsApplicable || selectedBoards.length === 0) {
    // Use the teaching-path subject list
    const pathSubjects = config.subjects_by_teaching_path[mode] ?? [];
    if (pathSubjects.length > 0) return pathSubjects;
    // Fallback: union of all subjects from all boards for this mode
  }

  // Deduplicated union across all selected boards
  const seen = new Set<string>();
  const result: SubjectOption[] = [];

  for (const board of selectedBoards) {
    const subjects = config.subjects_by_board[board] ?? [];
    for (const s of subjects) {
      if (!seen.has(s.slug)) {
        seen.add(s.slug);
        result.push(s);
      }
    }
  }

  return result;
}

/** Returns true when the wizard should skip Step 4 (Board / Exam) for this mode. */
export function shouldSkipBoardStep(
  config: OnboardingFilterConfig,
  mode: TeachingMode
): boolean {
  return config.step4_skip_modes.includes(mode);
}
