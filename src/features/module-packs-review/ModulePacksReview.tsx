"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import styles from "./ModulePacksReview.module.css";
import {
  fetchSignupModulePacks,
  type SignupModulePack,
  type SignupModulePacks,
  type TenantCategory,
} from "@/lib/api/signupApi";

/**
 * ONBOARD-01 signup review step: the packs a new institute starts with, suggested by its type.
 * Optional and collapsed by default — continuing without opening it applies exactly the same
 * starting set on the server, so a skipped review sends nothing.
 *
 * Renders nothing when the backend does not offer the step (feature off) or the preview fails:
 * signup must never depend on it.
 */

const GROUPS: { id: SignupModulePack["group"]; title: string }[] = [
  { id: "run_the_institute", title: "Run the institute" },
  { id: "teach_and_test", title: "Teach and test" },
  { id: "talk_to_people", title: "Talk to people" },
  { id: "intelligence", title: "Intelligence" },
];

/** One line per pack. Names and contents come from the backend; batch copy says "curriculum". */
const DESCRIPTIONS: Record<string, string> = {
  batches: "Group students into batches and attach a curriculum.",
  admissions: "Enquiries, follow-ups and your admissions pipeline.",
  fees: "Invoices, installments, concessions and credit notes.",
  student_attendance: "Class registers and who was absent.",
  staff_attendance: "Staff check-ins and working hours.",
  timetable: "Class schedules, rooms and teachers’ timetables.",
  staff_money: "Salaries, leave and day-to-day expenses.",
  campus: "Transport, assets and student placement.",
  study_material: "Curriculum, notes, videos and assignments.",
  course_store: "Sell courses and bundles online.",
  tests: "Quizzes, mock tests and results.",
  live: "Live classes, meetings and webinars.",
  mentoring: "Mentors and personal study plans.",
  parents: "Parent logins for their own children.",
  communication: "Notices, messages and forms.",
  whatsapp: "Messages on WhatsApp.",
  website: "Your public website and blog.",
  intelligence: "Ask Edveo and see who needs attention.",
};

type Props = {
  category: TenantCategory;
  planId: number | null;
  institutionTypeId: number | null;
  /** The owner's institute type in words, for "suggested for …". */
  typeLabel?: string | null;
  /** The packs switched off, or null while the owner has not changed anything. */
  onChange: (hiddenPacks: string[] | null) => void;
};

function closeOver(start: string, packs: SignupModulePack[], edge: "requires" | "required_by"): string[] {
  const byKey = new Map(packs.map((p) => [p.key, p]));
  const seen = new Set<string>();
  const queue = [start];
  while (queue.length > 0) {
    const key = queue.shift() as string;
    for (const next of byKey.get(key)?.[edge] ?? []) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return [...seen];
}

export default function ModulePacksReview({ category, planId, institutionTypeId, typeLabel, onChange }: Props) {
  const [data, setData] = useState<SignupModulePacks | null>(null);
  const [open, setOpen] = useState(false);
  /** Null = untouched: the starting set is the server's `default_on`. */
  const [chosen, setChosen] = useState<Set<string> | null>(null);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setChosen(null);
    setNote(null);
    onChange(null);
    if (planId === null) {
      return;
    }
    void fetchSignupModulePacks(category, planId, institutionTypeId).then((result) => {
      if (!cancelled) {
        setData(result);
      }
    });
    return () => {
      cancelled = true;
    };
    // onChange is a setter from the parent; re-running on its identity would reset the choice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, planId, institutionTypeId]);

  const packs = useMemo(() => data?.packs ?? [], [data]);
  const labelOf = (key: string) => packs.find((p) => p.key === key)?.label ?? key;
  const isOn = (pack: SignupModulePack) =>
    pack.state === "always_on" || (pack.state === "available" && (chosen ? chosen.has(pack.key) : pack.default_on));
  const onCount = packs.filter((p) => p.state !== "always_on" && isOn(p)).length;

  if (data === null || packs.length === 0) {
    return null;
  }

  const toggle = (pack: SignupModulePack, turnOn: boolean) => {
    const current = new Set(chosen ?? packs.filter((p) => p.state === "available" && p.default_on).map((p) => p.key));
    const alsoChanged = closeOver(pack.key, packs, turnOn ? "requires" : "required_by").filter((key) => {
      const other = packs.find((p) => p.key === key);
      return other !== undefined && other.state === "available" && current.has(key) !== turnOn;
    });

    for (const key of [pack.key, ...alsoChanged]) {
      if (turnOn) {
        current.add(key);
      } else {
        current.delete(key);
      }
    }

    setChosen(current);
    setNote(
      alsoChanged.length === 0
        ? null
        : turnOn
          ? `${alsoChanged.map(labelOf).join(", ")} switched on too — ${pack.label} needs it.`
          : `${alsoChanged.map(labelOf).join(", ")} switched off too — it needs ${pack.label}.`
    );
    onChange(packs.filter((p) => p.state === "available" && !current.has(p.key)).map((p) => p.key));
  };

  const summary = data.has_template
    ? `Your software starts with ${onCount} modules${typeLabel ? ` suggested for ${typeLabel.toLowerCase()}` : ""}.`
    : "Your software starts with everything in your plan.";

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <p className={styles.summary}>{summary}</p>
        <button
          type="button"
          className={styles.customise}
          aria-expanded={open}
          aria-controls="module-packs-review-list"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Done" : "Customise"}
          <ChevronDown size={16} className={open ? styles.chevronOpen : styles.chevron} aria-hidden />
        </button>
      </div>

      {open && (
        <div id="module-packs-review-list" className={styles.body}>
          {note && <p className={styles.note} role="status">{note}</p>}
          {GROUPS.map((group) => {
            const inGroup = packs.filter((p) => p.group === group.id);
            if (inGroup.length === 0) {
              return null;
            }
            return (
              <fieldset key={group.id} className={styles.group}>
                <legend className={styles.groupTitle}>{group.title}</legend>
                {inGroup.map((pack) => {
                  const on = isOn(pack);
                  const id = `module-pack-${pack.key}`;
                  return (
                    <div key={pack.key} className={styles.row}>
                      <label htmlFor={id} className={styles.rowText}>
                        <span className={styles.rowName}>
                          {pack.label}
                          {pack.suggested && pack.state === "available" && <span className={styles.badge}>Suggested</span>}
                        </span>
                        <span className={styles.rowDesc}>
                          {pack.state === "locked" ? "Not in the free plan" : DESCRIPTIONS[pack.key] ?? ""}
                        </span>
                      </label>
                      {pack.state === "available" ? (
                        <input
                          id={id}
                          type="checkbox"
                          role="switch"
                          className={styles.switch}
                          checked={on}
                          onChange={(e) => toggle(pack, e.target.checked)}
                        />
                      ) : (
                        <Lock size={16} className={styles.lock} aria-label="Not available" />
                      )}
                    </div>
                  );
                })}
              </fieldset>
            );
          })}
          <p className={styles.footer}>
            You can change this any time in Settings. Switching something off never deletes anything, and your price stays the same.
          </p>
        </div>
      )}
    </div>
  );
}
