import styles from "./solutions.module.css";

/*
  Product mockups for the solutions page. All light surfaces on a shared frame,
  built in markup rather than as images. Figures are representative, not live.
*/

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.mockFrame} aria-hidden="true">
      <div className={styles.mockBar}>
        <span className={styles.mockDots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.mockTitle}>{title}</span>
      </div>
      <div className={styles.mockBody}>{children}</div>
    </div>
  );
}

/* ── Courses ── */
export function CourseMockup() {
  const courses = [
    { name: "NEET Physics 2026", students: "41 students", pct: 76 },
    { name: "JEE Chemistry", students: "28 students", pct: 54 },
    { name: "English Grammar Pro", students: "63 students", pct: 88 },
  ];

  return (
    <Frame title="app.edveo.in / courses">
      <div className={styles.mockRow}>
        <span className={styles.mockH}>My courses</span>
        <span className={`${styles.pill} ${styles.pillGood}`}>3 LIVE</span>
      </div>
      {courses.map((c) => (
        <div key={c.name} className={styles.mockCard}>
          <div className={styles.mockRow}>
            <span className={styles.mockH}>{c.name}</span>
            <span className={styles.mockMeta}>{c.students}</span>
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${c.pct}%` }} />
          </div>
          <div className={styles.mockRow}>
            <span className={styles.mockMeta}>Completion</span>
            <span className={`${styles.pill} ${styles.pillInfo}`}>{c.pct}%</span>
          </div>
        </div>
      ))}
    </Frame>
  );
}

/* ── Revenue ── */
export function RevenueMockup() {
  const alerts = [
    { tone: "#B7791F", text: "Auto-reminder sent to 7 students — fee due in 3 days" },
    { tone: "#0F9D63", text: "Razorpay connected · Payouts every Tuesday" },
    { tone: "#0B5CFF", text: "GST invoice generated for 4 payments today" },
  ];

  return (
    <Frame title="app.edveo.in / revenue">
      <div className={styles.statPair}>
        <div className={styles.statBox}>
          <span className={styles.statBoxLabel}>This month</span>
          <span className={styles.statBoxValue}>₹2.4L</span>
          <span className={`${styles.pill} ${styles.pillGood}`}>0% commission</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statBoxLabel}>Pending</span>
          <span className={styles.statBoxValue}>₹18,200</span>
          <span className={`${styles.pill} ${styles.pillWarn}`}>3 students</span>
        </div>
      </div>
      {alerts.map((a) => (
        <div key={a.text} className={styles.alertRow}>
          <span className={styles.alertDot} style={{ background: a.tone }} />
          {a.text}
        </div>
      ))}
    </Frame>
  );
}

/* ── CRM pipeline ── */
export function CrmMockup() {
  const cols: { title: string; count: string; cards: string[]; ai?: string }[] = [
    { title: "New", count: "12", cards: ["Priya M.", "Rohan K.", "Sneha R."] },
    { title: "Follow-up", count: "8", cards: ["Amit S."], ai: "Rohan K. — high intent · call today" },
    { title: "Demo", count: "5", cards: ["Kavya", "Arjun"] },
    { title: "Enrolled", count: "23", cards: ["Ananya", "Devan", "Nair"] },
  ];

  return (
    <Frame title="app.edveo.in / pipeline">
      <div className={styles.kanban}>
        {cols.map((col) => (
          <div key={col.title} className={styles.kanCol}>
            <div className={styles.kanColTitle}>
              {col.title}
              <span className={styles.kanCount}>{col.count}</span>
            </div>
            {col.ai && <div className={`${styles.kanCard} ${styles.kanCardAi}`}>{col.ai}</div>}
            {col.cards.map((c) => (
              <div key={c} className={styles.kanCard}>
                {c}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ── Quizzes ── */
export function QuizMockup() {
  const heat = [
    "heatHigh", "heatMed", "heatTop", "heatLow", "heatHigh",
    "heatTop", "heatMed", "heatHigh", "heatMed", "heatLow",
    "heatLow", "heatTop", "heatHigh", "heatMed", "heatTop",
  ] as const;

  return (
    <Frame title="app.edveo.in / tests">
      <div className={styles.mockRow}>
        <span className={styles.mockH}>NEET Biology · Chapter 5</span>
        <span className={`${styles.pill} ${styles.pillInfo}`}>50 Qs in 28s</span>
      </div>
      <div className={styles.diffRow}>
        <div className={`${styles.diffTile} ${styles.diffEasy}`}>
          Easy
          <br />
          20%
        </div>
        <div className={`${styles.diffTile} ${styles.diffMed}`}>
          Medium
          <br />
          50%
        </div>
        <div className={`${styles.diffTile} ${styles.diffHard}`}>
          Hard
          <br />
          30%
        </div>
      </div>
      <span className={styles.mockMeta}>Performance by topic</span>
      <div className={styles.heatmap}>
        {heat.map((h, i) => (
          <div key={i} className={`${styles.heatTile} ${styles[h]}`} />
        ))}
      </div>
    </Frame>
  );
}

/* ── Branded website ── */
export function SiteMockup() {
  const courses = [
    { title: "IELTS Master 2026", price: "₹4,999", tint: "#DCE8FF" },
    { title: "Spoken English", price: "₹2,499", tint: "#FDF4E3" },
  ];

  return (
    <Frame title="priyamenon.com">
      <div className={styles.siteNav}>
        <span className={styles.siteLogo}>Priya Menon Academy</span>
        <span className={styles.siteLinks}>
          <span>Courses</span>
          <span>About</span>
        </span>
        <span className={styles.siteCta}>Enrol now</span>
      </div>
      <span className={styles.mockMeta}>1,240 students enrolled · rated 4.9</span>
      <div className={styles.courseGrid}>
        {courses.map((c) => (
          <div key={c.title} className={styles.mockCard}>
            <div className={styles.courseThumb} style={{ background: c.tint }} />
            <span className={styles.mockH}>{c.title}</span>
            <span className={styles.coursePrice}>{c.price}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ── Attendance / student health ── */
export function AttendanceMockup() {
  const others = [
    { name: "Ananya Pillai", att: "92%", quiz: "81%", tone: styles.statOk },
    { name: "Dev Krishnan", att: "78%", quiz: "73%", tone: styles.statWarn },
  ];

  return (
    <Frame title="app.edveo.in / students">
      <div className={styles.studentCard}>
        <span className={styles.mockH}>Rahul Menon</span>
        <div className={styles.studentStats}>
          <span className={styles.studentStat}>
            <span className={styles.statLabel}>Attendance</span>
            <span className={`${styles.statValue} ${styles.statBad}`}>67%</span>
          </span>
          <span className={styles.studentStat}>
            <span className={styles.statLabel}>Quiz avg</span>
            <span className={`${styles.statValue} ${styles.statBad}`}>54%</span>
          </span>
          <span className={styles.studentStat}>
            <span className={styles.statLabel}>Fee</span>
            <span className={`${styles.statValue} ${styles.statOk}`}>Paid</span>
          </span>
        </div>
        <div className={styles.riskBanner}>
          At risk of dropping — last login 8 days ago · follow up today
        </div>
      </div>

      {others.map((s) => (
        <div key={s.name} className={styles.studentCard}>
          <span className={styles.mockH}>{s.name}</span>
          <div className={styles.studentStats}>
            <span className={styles.studentStat}>
              <span className={styles.statLabel}>Attendance</span>
              <span className={`${styles.statValue} ${s.tone}`}>{s.att}</span>
            </span>
            <span className={styles.studentStat}>
              <span className={styles.statLabel}>Quiz avg</span>
              <span className={`${styles.statValue} ${s.tone}`}>{s.quiz}</span>
            </span>
            <span className={styles.studentStat}>
              <span className={styles.statLabel}>Fee</span>
              <span className={`${styles.statValue} ${styles.statOk}`}>Paid</span>
            </span>
          </div>
        </div>
      ))}
    </Frame>
  );
}

/* ── Notifications ── */
export function NotificationMockup() {
  const notes = [
    { title: "Class reminder", meta: "Sent to 41 students · 38 read", badge: "SENT", tone: styles.pillGood },
    { title: "Fee reminder — auto-sent", meta: "7 students notified · 4 paid within 2 hours", badge: "AUTO", tone: styles.pillInfo },
    { title: "Result published — NEET Biology", meta: "Scores visible · parent alerts triggered", badge: "LIVE", tone: styles.pillGood },
    { title: "Tomorrow's class", meta: "Reminder set for 7:30 AM · all batches", badge: "SCHED", tone: styles.pillWarn },
  ];

  return (
    <Frame title="app.edveo.in / messages">
      {notes.map((n) => (
        <div key={n.title} className={styles.mockCard}>
          <div className={styles.mockRow}>
            <span>
              <span className={styles.mockH}>{n.title}</span>
              <br />
              <span className={styles.mockMeta}>{n.meta}</span>
            </span>
            <span className={`${styles.pill} ${n.tone}`}>{n.badge}</span>
          </div>
        </div>
      ))}
    </Frame>
  );
}
