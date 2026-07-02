"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";
import { AlertTriangle, TrendingUp, Sparkles, Brain, ChevronDown } from "lucide-react";
import styles from "./agentShowcase.module.css";

/* ============================================================
   Data — copy/amounts are swappable without touching animation
   ============================================================ */

type AgentAct = {
  id: "admission" | "fees" | "analytics";
  index: "01" | "02" | "03";
  title: string;
  subtitle: string;
};

const ACT_MS = 7000;

const ACTS: AgentAct[] = [
  { id: "admission", index: "01", title: "Admission agent", subtitle: "Enquiry → admission" },
  { id: "fees", index: "02", title: "Fee agent", subtitle: "Collected every month" },
  { id: "analytics", index: "03", title: "Analytics agent", subtitle: "Who needs attention" },
];

const student = { name: "Aiswarya", batch: "NEET batch" };
const feePerMonth = 4500;
const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
const risk = { name: "Rahul K.", reason: "Attendance + scores falling · flagged 2 weeks early." };

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

type StatusFn = (text: string, working: boolean) => void;

/* Small scheduler used inside each act. Runs on mount, cleans up on unmount.
   Visual transitions are handled by Framer / CSS; this only advances state. */
function useActScheduler() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const anims = useRef<AnimationPlaybackControls[]>([]);
  const at = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);
  const track = useCallback((c: AnimationPlaybackControls) => {
    anims.current.push(c);
    return c;
  }, []);
  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      anims.current.forEach((a) => a.stop());
      anims.current = [];
    };
  }, []);
  return { at, track };
}

/* ============================================================
   Act 1 — Admission agent (CRM pipeline)
   Card moves between columns via Framer `layout` so it follows
   the columns wherever they reflow (row on desktop, 2×2 on phone).
   ============================================================ */

const COLS = [
  { name: "Enquiry", count: 8 },
  { name: "Contacted", count: 5 },
  { name: "Interested", count: 3 },
  { name: "Admitted", count: 12 },
];
const TAGS = [
  { label: "New enquiry", bg: "#F1F4FA", color: "#64748B" },
  { label: "Contacted", bg: "#EAF1FE", color: "#155EEF" },
  { label: "Interested", bg: "#FAEEDA", color: "#854F0B" },
  { label: "Admitted", bg: "#E7F3EC", color: "#0F9D58" },
];

/* Roster flowing through the pipeline. Aiswarya is the narrated protagonist;
   the rest move on their own to make the pipeline feel alive. */
const LEADS: { id: string; name: string; sub: string; primary?: boolean }[] = [
  { id: "aiswarya", name: "Aiswarya", sub: "NEET batch", primary: true },
  { id: "rahul", name: "Rahul M.", sub: "JEE batch" },
  { id: "sneha", name: "Sneha K.", sub: "NEET batch" },
  { id: "meera", name: "Meera V.", sub: "JEE batch" },
  { id: "arjun", name: "Arjun P.", sub: "Foundation" },
  { id: "karthik", name: "Karthik R.", sub: "NEET batch" },
  { id: "nikhil", name: "Nikhil T.", sub: "NEET batch" },
  { id: "divya", name: "Divya S.", sub: "JEE batch" },
];

const INITIAL_POS: Record<string, number> = {
  aiswarya: -1, rahul: 1, sneha: 0, meera: 1, arjun: 2, karthik: 0, nikhil: 3, divya: 3,
};

// { t, id, col } — staggered movements across the 7s act.
const MOVES: { t: number; id: string; col: number }[] = [
  { t: 750, id: "aiswarya", col: 0 },
  { t: 2000, id: "aiswarya", col: 1 },
  { t: 2600, id: "rahul", col: 2 },
  { t: 3000, id: "sneha", col: 1 },
  { t: 3400, id: "arjun", col: 3 },
  { t: 3600, id: "aiswarya", col: 2 },
  { t: 4200, id: "meera", col: 2 },
  { t: 5000, id: "karthik", col: 1 },
  { t: 5200, id: "aiswarya", col: 3 },
];

const AISWARYA_LINES: Record<number, { text: string; working: boolean }> = {
  0: { text: "Aiswarya arrived via your WhatsApp form.", working: true },
  1: { text: "Admission agent reached out — shared fees & timings.", working: true },
  2: { text: "She booked a demo class. Interested.", working: true },
  3: { text: "Admission confirmed — converted in 3 days, hands-free.", working: false },
};

const FINAL_POS: Record<string, number> = (() => {
  const p = { ...INITIAL_POS };
  MOVES.forEach((m) => (p[m.id] = m.col));
  return p;
})();

function ActAdmission({ onStatus, reduce }: { onStatus: StatusFn; reduce: boolean }) {
  const { at } = useActScheduler();
  const [pos, setPos] = useState<Record<string, number>>(INITIAL_POS);
  const moved = useRef(false);

  useEffect(() => {
    if (reduce) {
      moved.current = true;
      setPos(FINAL_POS);
      onStatus(AISWARYA_LINES[3].text, AISWARYA_LINES[3].working);
      return;
    }
    MOVES.forEach((m) => {
      at(() => {
        if (m.id === "aiswarya" && m.col > 0) moved.current = true;
        setPos((p) => ({ ...p, [m.id]: m.col }));
        if (m.id === "aiswarya") {
          const line = AISWARYA_LINES[m.col];
          onStatus(line.text, line.working);
        }
      }, m.t);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCol = pos.aiswarya;

  return (
    <div className={styles.pipeline}>
      {COLS.map((c, i) => {
        const here = LEADS.filter((l) => pos[l.id] === i);
        return (
          <motion.div
            key={c.name}
            className={`${styles.col} ${activeCol === i ? styles.colActive : ""}`}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, delay: (100 + i * 90) / 1000, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.colHead}>
              <span>{c.name}</span>
              <span className={styles.cnt}>{c.count}</span>
            </div>

            <div className={styles.colStack}>
              {here.map((l) =>
                l.primary ? (
                  <motion.div
                    key={l.id}
                    layoutId={l.id}
                    layout
                    className={styles.hcard}
                    initial={reduce || moved.current ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { layout: { duration: 0.7, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.4 }, scale: { duration: 0.4 } }
                    }
                  >
                    <div className={`${styles.hin} ${styles.hinPrimary}`}>
                      <div className={styles.cardRow}>
                        <div className={styles.avatar}>A</div>
                        <div>
                          <div className={styles.cardName}>{l.name}</div>
                          <div className={styles.cardBatch}>{l.sub}</div>
                        </div>
                      </div>
                      <div className={styles.tag} style={{ background: TAGS[i].bg, color: TAGS[i].color }}>
                        {TAGS[i].label}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={l.id}
                    layoutId={l.id}
                    layout
                    initial={false}
                    className={styles.leadCard}
                    transition={reduce ? { duration: 0 } : { layout: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
                  >
                    <div className={styles.leadAvatar}>{l.name.charAt(0)}</div>
                    <div style={{ minWidth: 0 }}>
                      <div className={styles.leadName}>{l.name}</div>
                      <div className={styles.leadSub}>{l.sub}</div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ============================================================
   Act 2 — Fee agent (recurring collection)
   ============================================================ */

/* Ambient live-collections feed — other students paying alongside Aiswarya. */
type FeedItem = { id: string; name: string; t: number; reminder?: boolean; method?: string; amount?: number };
const FEED: FeedItem[] = [
  { id: "rahul", name: "Rahul M.", method: "UPI", amount: 4500, t: 900 },
  { id: "sneha", name: "Sneha K.", reminder: true, t: 1700 },
  { id: "meera", name: "Meera V.", method: "Razorpay", amount: 6000, t: 2600 },
  { id: "arjun", name: "Arjun P.", method: "UPI", amount: 4500, t: 3600 },
  { id: "divya", name: "Divya S.", method: "Card", amount: 5500, t: 4700 },
];

const TERM_STUDENTS = 42;
const START_PAID = 34;
const END_PAID = START_PAID + FEED.filter((f) => !f.reminder).length; // 34 + 4 = 38
const START_TOTAL = 144000;
const END_TOTAL = 171000;

function ActFees({ onStatus, reduce }: { onStatus: StatusFn; reduce: boolean }) {
  const { at, track } = useActScheduler();
  const [activeChip, setActiveChip] = useState(-1);
  const [paidUpto, setPaidUpto] = useState(0);
  const [total, setTotal] = useState(START_TOTAL);
  const [studentsPaid, setStudentsPaid] = useState(START_PAID);
  const [feedShown, setFeedShown] = useState(0);
  const [miniStatus, setMiniStatus] = useState("Enrolled");

  useEffect(() => {
    if (reduce) {
      setPaidUpto(months.length);
      setTotal(END_TOTAL);
      setStudentsPaid(END_PAID);
      setFeedShown(FEED.length);
      setMiniStatus("Fees up to date");
      onStatus("Every month, on time — zero chasing, zero spreadsheets.", false);
      return;
    }
    // Institute total ticks up across the act (monospace counter).
    track(animate(START_TOTAL, END_TOTAL, { duration: 5, delay: 0.6, ease: "easeOut", onUpdate: (v) => setTotal(Math.round(v)) }));
    // Ambient feed rows arrive; each real payment bumps the students-paid gauge.
    FEED.forEach((f, i) => {
      at(() => {
        setFeedShown((n) => Math.max(n, i + 1));
        if (!f.reminder) setStudentsPaid((p) => p + 1);
      }, f.t);
    });
    // Aiswarya's own monthly installments — the narrated hero timeline.
    const base = 1300;
    const step = 830;
    at(() => onStatus("A new term begins — fees due every month.", true), 600);
    months.forEach((m, i) => {
      at(() => {
        setActiveChip(i);
        onStatus(`${m} — gentle reminder sent on WhatsApp.`, true);
      }, base + i * step);
      at(() => {
        setActiveChip(-1);
        setPaidUpto(i + 1);
        onStatus(`${m} — ${inr(feePerMonth)} collected via Razorpay.`, true);
      }, base + i * step + 430);
    });
    at(() => {
      setMiniStatus("Fees up to date");
      onStatus("Every month, on time — zero chasing, zero spreadsheets.", false);
    }, base + months.length * step + 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = Math.round((studentsPaid / TERM_STUDENTS) * 100);

  return (
    <div className={styles.feeWrap}>
      {/* Institute collections dashboard */}
      <div className={styles.feeDash}>
        <div className={styles.dashMain}>
          <div>
            <div className={styles.metricLabel}>Collected this term</div>
            <div className={styles.metricNum}>{inr(total)}</div>
          </div>
          <div className={styles.trendChip}>
            <TrendingUp size={13} strokeWidth={2.6} />
            18% vs last term
          </div>
        </div>
        <div className={styles.dashBarRow}>
          <span className={styles.dashBarLabel}>Students paid</span>
          <div className={styles.dashTrack}>
            <motion.div
              className={styles.dashFill}
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
          <span className={styles.dashBarVal}>
            {studentsPaid}/{TERM_STUDENTS}
          </span>
        </div>
      </div>

      <div className={styles.feeBody}>
        {/* Hero — Aiswarya's monthly installments */}
        <div className={styles.feeHeroCol}>
          <div className={`${styles.stumini} ${styles.stuminiHero}`}>
            <div className={styles.avatar}>A</div>
            <div>
              <div className={styles.cardName}>{student.name}</div>
              <div className={styles.miniStatus}>{miniStatus}</div>
            </div>
          </div>
          <div className={styles.monthGrid}>
            {months.map((m, i) => {
              const paid = i < paidUpto;
              return (
                <motion.div
                  key={m}
                  className={`${styles.mchip} ${activeChip === i ? styles.mchipActive : ""} ${paid ? styles.mchipPaid : ""}`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.4, delay: (150 + i * 80) / 1000 }}
                >
                  <div className={styles.mn}>{m}</div>
                  <div className={styles.ms}>
                    {paid ? (
                      <>
                        {"✓"}
                        <br />
                        Paid
                      </>
                    ) : (
                      <>
                        Due
                        <br />
                        {inr(feePerMonth)}
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Ambient live collections feed */}
        <div className={styles.feeFeedCol}>
          <div className={styles.feedHead}>
            <span className={`${styles.workDot} ${reduce ? "" : styles.workDotPulse}`} />
            Live collections
          </div>
          <div className={styles.feedList}>
            {FEED.map((f, i) =>
              i < feedShown ? (
                <motion.div
                  key={f.id}
                  className={styles.feedRow}
                  initial={reduce ? false : { opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className={styles.leadAvatar}>{f.name.charAt(0)}</div>
                  <div className={styles.feedName}>{f.name}</div>
                  {f.reminder ? (
                    <span className={styles.feedReminder}>reminder sent…</span>
                  ) : (
                    <>
                      <span className={styles.feedMeta}>{f.method}</span>
                      <span className={styles.feedAmount}>{inr(f.amount!)}</span>
                      <span className={styles.feedCheck}>✓</span>
                    </>
                  )}
                </motion.div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Act 3 — Analytics agent (Student Intelligence)
   Mirrors the real product (/admin/student-intelligence):
   metric rings → Exam→Subject→Chapter→Topic drill-down that
   FINDS the weak topic live → AI-written insight + risk radar.
   ============================================================ */

type MasteryLevel = "mastered" | "proficient" | "developing" | "weak";

const LEVELS: Record<MasteryLevel, { label: string; fill: string; bg: string; text: string }> = {
  mastered: { label: "Mastered", fill: "#0F9D58", bg: "#E7F3EC", text: "#0F9D58" },
  proficient: { label: "Proficient", fill: "#2E90FA", bg: "#EAF1FE", text: "#155EEF" },
  developing: { label: "Developing", fill: "#EF9F27", bg: "#FAEEDA", text: "#854F0B" },
  weak: { label: "Weak", fill: "#E24B4A", bg: "#FCEBEB", text: "#A32D2D" },
};

const INTEL_SUBJECTS: { name: string; pct: number; level: MasteryLevel; expandable?: boolean }[] = [
  { name: "Biology", pct: 88, level: "mastered" },
  { name: "Physics", pct: 74, level: "proficient" },
  { name: "Chemistry", pct: 46, level: "developing", expandable: true },
];
const INTEL_CHAPTERS: { name: string; pct: number; level: MasteryLevel; expandable?: boolean }[] = [
  { name: "Organic Chemistry", pct: 41, level: "developing", expandable: true },
  { name: "Inorganic Chemistry", pct: 62, level: "proficient" },
];
const INTEL_TOPICS: { name: string; pct: number; level: MasteryLevel; correct: string; flagged?: boolean }[] = [
  { name: "SN2 Reactions", pct: 34, level: "weak", correct: "12/35", flagged: true },
  { name: "Nomenclature", pct: 71, level: "proficient", correct: "24/34" },
];
const AI_NARRATION =
  "Aiswarya is strong in Biology, but her last 3 quizzes show a growing gap in Organic Chemistry. A revision session on SN2 Reactions before Unit Test 2 should close it.";
const AI_CHIPS: { label: string; level: MasteryLevel }[] = [
  { label: "SN2 Reactions", level: "weak" },
  { label: "Chemical Bonding", level: "developing" },
];

/* Small score ring, like the real product's MetricRingCard */
function Ring({ pct, color, display, delay, reduce }: { pct: number; color: string; display?: string; delay: number; reduce: boolean }) {
  const [v, setV] = useState(reduce ? pct : 0);
  useEffect(() => {
    if (reduce) return;
    const c = animate(0, pct, { duration: 1, delay, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const size = 46;
  const sw = 4.5;
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className={styles.ringBox}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E9EEF6" strokeWidth={sw} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={String(circ)}
          strokeDashoffset={String(circ - (Math.min(100, v) / 100) * circ)}
        />
      </svg>
      <span className={styles.ringVal} style={{ color }}>
        {display ?? `${v}%`}
      </span>
    </div>
  );
}

function TreeRow({
  name,
  pct,
  level,
  indent,
  correct,
  expandable,
  open,
  state,
  delay,
  reduce,
}: {
  name: string;
  pct: number;
  level: MasteryLevel;
  indent: 0 | 1 | 2;
  correct?: string;
  expandable?: boolean;
  open?: boolean;
  state?: "scan" | "hit";
  delay: number;
  reduce: boolean;
}) {
  const cfg = LEVELS[level];
  const indentClass = indent === 1 ? styles.treeIndent1 : indent === 2 ? styles.treeIndent2 : "";
  const stateClass = state === "scan" ? styles.treeRowScan : state === "hit" ? styles.treeRowHit : "";
  return (
    <motion.div
      className={`${styles.treeRow} ${indentClass} ${stateClass}`}
      initial={reduce ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.35, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {expandable ? (
        <ChevronDown
          size={12}
          strokeWidth={2.5}
          className={styles.treeChevron}
          style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
        />
      ) : (
        <span className={styles.treeDot} style={{ background: cfg.fill }} />
      )}
      <span className={styles.treeName}>{name}</span>
      {correct && <span className={styles.treeCorrect}>{correct} correct</span>}
      <div className={styles.treeTrack}>
        <motion.div
          className={styles.treeFill}
          style={{ background: cfg.fill }}
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={reduce ? { duration: 0 } : { duration: 0.7, delay: delay + 0.15, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <span className={styles.treePct}>{pct}%</span>
      <span className={styles.treePill} style={{ background: cfg.bg, color: cfg.text }}>
        {cfg.label}
      </span>
    </motion.div>
  );
}

function ActAnalytics({ onStatus, reduce }: { onStatus: StatusFn; reduce: boolean }) {
  const { at } = useActScheduler();
  const [chapOpen, setChapOpen] = useState(reduce);
  const [topicsOpen, setTopicsOpen] = useState(reduce);
  const [flag, setFlag] = useState<"idle" | "scan" | "hit">(reduce ? "hit" : "idle");
  const [aiIn, setAiIn] = useState(reduce);
  const [riskIn, setRiskIn] = useState(reduce);

  useEffect(() => {
    if (reduce) {
      onStatus("Every student, understood to the exact topic — automatically.", false);
      return;
    }
    at(() => onStatus("Analysing Aiswarya — every quiz, every topic, every class…", true), 500);
    at(() => setChapOpen(true), 2200);
    at(() => onStatus("Drilling into Chemistry — chapter by chapter…", true), 2400);
    at(() => setTopicsOpen(true), 3000);
    at(() => setFlag("scan"), 3600);
    at(() => {
      setFlag("hit");
      onStatus("Found it — SN2 Reactions. 34% mastery, 12/35 correct.", true);
    }, 3950);
    at(() => setAiIn(true), 4500);
    at(() => setRiskIn(true), 5100);
    at(() => onStatus("Every student, understood to the exact topic — automatically.", false), 5600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expandTransition = reduce ? { duration: 0 } : { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div className={styles.intelWrap}>
      {/* Profile strip with metric rings — mirrors the real student page */}
      <motion.div
        className={styles.intelProfile}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.45, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={styles.cardRow} style={{ marginBottom: 0 }}>
          <div className={styles.avatar}>A</div>
          <div>
            <div className={styles.cardName}>{student.name}</div>
            <div className={styles.cardBatch}>{student.batch} · analysed just now</div>
          </div>
        </div>
        <div className={styles.ringsRow}>
          <div className={styles.ringStat}>
            <Ring pct={76} color="#155EEF" delay={0.4} reduce={reduce} />
            <div>
              <div className={styles.ringTitle}>Readiness</div>
              <div className={styles.ringSub} style={{ color: "#155EEF" }}>Unit Test 2</div>
            </div>
          </div>
          <div className={styles.ringStat}>
            <Ring pct={68} color="#2E90FA" delay={0.55} reduce={reduce} />
            <div>
              <div className={styles.ringTitle}>Mastery</div>
              <div className={styles.ringSub} style={{ color: "#0F9D58" }}>↑ 6% this week</div>
            </div>
          </div>
          <div className={styles.ringStat}>
            <Ring pct={88} display="✓" color="#0F9D58" delay={0.7} reduce={reduce} />
            <div>
              <div className={styles.ringTitle}>Risk level</div>
              <div className={styles.ringSub} style={{ color: "#0F9D58" }}>On Track</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className={styles.intelBody}>
        {/* Knowledge proficiency — the live drill-down */}
        <motion.div
          className={styles.treeCard}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.45, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className={styles.treeHead}>
            <Brain size={13} strokeWidth={2.4} />
            Knowledge proficiency
            <span className={styles.treeHeadChip}>NEET</span>
          </div>
          {INTEL_SUBJECTS.map((s, i) => (
            <div key={s.name}>
              <TreeRow {...s} indent={0} open={chapOpen} delay={0.8 + i * 0.15} reduce={reduce} />
              {s.expandable && chapOpen && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={expandTransition}
                  style={{ overflow: "hidden" }}
                >
                  {INTEL_CHAPTERS.map((c, j) => (
                    <div key={c.name}>
                      <TreeRow {...c} indent={1} open={topicsOpen} delay={reduce ? 0 : 0.05 + j * 0.12} reduce={reduce} />
                      {c.expandable && topicsOpen && (
                        <motion.div
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          transition={expandTransition}
                          style={{ overflow: "hidden" }}
                        >
                          {INTEL_TOPICS.map((t, k) => (
                            <TreeRow
                              key={t.name}
                              {...t}
                              indent={2}
                              state={t.flagged ? (flag === "idle" ? undefined : flag) : undefined}
                              delay={reduce ? 0 : 0.05 + k * 0.12}
                              reduce={reduce}
                            />
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        <div className={styles.intelSide}>
          {/* AI-written insight — the product's narration card */}
          <motion.div
            className={styles.aiCard}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: aiIn ? 1 : 0, y: aiIn ? 0 : 10 }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className={styles.aiHead}>
              <Sparkles size={13} strokeWidth={2.4} />
              AI insight
              <span className={styles.aiPill}>Auto-generated</span>
            </div>
            <p className={styles.aiText}>{AI_NARRATION}</p>
            <div className={styles.aiChips}>
              {AI_CHIPS.map((c) => (
                <span
                  key={c.label}
                  className={styles.aiChip}
                  style={{ background: LEVELS[c.level].bg, color: LEVELS[c.level].text, borderColor: LEVELS[c.level].bg }}
                >
                  <span className={styles.aiChipDot} style={{ background: LEVELS[c.level].fill }} />
                  {c.label}
                </span>
              ))}
            </div>
            <div className={styles.aiAction}>Draft WhatsApp to parent →</div>
          </motion.div>

          {/* Risk radar — the at-risk early warning */}
          <motion.div
            className={styles.riskCard}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: riskIn ? 1 : 0, y: riskIn ? 0 : 10 }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className={styles.insIcon} style={{ background: "#FCEBEB", color: "#A32D2D" }}>
              <AlertTriangle size={15} strokeWidth={2.4} />
            </div>
            <div className={styles.insMain}>
              <div className={styles.insTitle}>{risk.name} — drop-out risk</div>
              <div className={styles.insBody}>{risk.reason}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Stage — fluid container; each act reflows on its own
   ============================================================ */

function Stage({ idx, onStatus, reduce }: { idx: number; onStatus: StatusFn; reduce: boolean }) {
  return (
    <div
      className={styles.stageWrap}
      role="img"
      aria-label={`How Edveo works, step ${idx + 1} of 3: ${ACTS[idx].title}`}
    >
      <div className={styles.stage}>
        <div key={idx}>
          {idx === 0 && <ActAdmission onStatus={onStatus} reduce={reduce} />}
          {idx === 1 && <ActFees onStatus={onStatus} reduce={reduce} />}
          {idx === 2 && <ActAnalytics onStatus={onStatus} reduce={reduce} />}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Root
   ============================================================ */

export default function AgentShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const reduce = useReducedMotion() ?? false;

  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState<{ text: string; working: boolean }>({
    text: "Aiswarya arrived via your WhatsApp form.",
    working: true,
  });

  const onStatus = useCallback<StatusFn>((text, working) => setStatus({ text, working }), []);

  // Auto-advance only while visible and motion is allowed. Re-runs on idx
  // change so a manual tab click gets a fresh full duration.
  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % ACTS.length), ACT_MS);
    return () => clearInterval(t);
  }, [inView, reduce, idx]);

  return (
    <section className={styles.section} ref={sectionRef} aria-label="How Edveo runs your institute">
      <div className={styles.showcase}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>How Edveo runs your institute</p>
          <h2 className={styles.h2}>One student. From first enquiry to top of the class.</h2>
          <p className={styles.sub}>
            Three AI agents on one connected platform — carrying every student, so you can focus on
            teaching.
          </p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Agent steps">
          {ACTS.map((act, i) => {
            const on = i === idx;
            return (
              <button
                key={act.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`${styles.tab} ${on ? styles.tabOn : ""}`}
                onClick={() => setIdx(i)}
              >
                <span className={styles.tnum}>{act.index}</span>
                <span className={styles.tbody}>
                  <span className={styles.ttl}>{act.title}</span>
                  <span className={styles.tsub}>{act.subtitle}</span>
                </span>
                <span className={styles.tprog}>
                  {on &&
                    (reduce ? (
                      <span className={styles.tpf} style={{ width: "100%" }} />
                    ) : inView ? (
                      <motion.span
                        key={idx}
                        className={styles.tpf}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: ACT_MS / 1000, ease: "linear" }}
                      />
                    ) : (
                      <span className={styles.tpf} style={{ width: 0 }} />
                    ))}
                </span>
              </button>
            );
          })}
        </div>

        {inView ? (
          <Stage idx={idx} onStatus={onStatus} reduce={reduce} />
        ) : (
          <div className={styles.stageWrap} aria-hidden>
            <div className={styles.stage} />
          </div>
        )}

        <div className={styles.statusWrap}>
          <div className={styles.status}>
            <span
              className={`${styles.workDot} ${status.working && !reduce ? styles.workDotPulse : ""}`}
            />
            <span className={styles.statusTxt} aria-live="polite">
              {status.text}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
