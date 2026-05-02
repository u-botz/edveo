"use client";

import React, { useState, useEffect } from "react";
import styles from "./dashboardPreview.module.css";

// ── Mini Sparkline ─────────────────────────────────────────────────────────────
function Sparkline({ data, color = "#2EAA6E", up = true }: { data: number[]; color?: string; up?: boolean }) {
  const w = 72, h = 32;
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
      <polyline points={pts} stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Sidebar items data ─────────────────────────────────────────────────────────
const sidebarGroups = [
  {
    label: null,
    items: [{ icon: "🚀", label: "Get Started" }],
  },
  {
    label: null,
    items: [{ icon: "⊞", label: "Dashboard", active: true }],
  },
  {
    label: "CREATE",
    items: [
      { icon: "📋", label: "Batches" },
      { icon: "📚", label: "Courses" },
    ],
  },
  {
    label: "ENGAGE",
    items: [
      { icon: "🧩", label: "Quizzes" },
      { icon: "📝", label: "Assignments" },
      { icon: "🎥", label: "Live sessions" },
    ],
  },
  {
    label: "GROW",
    items: [
      { icon: "🌐", label: "Website templates" },
      { icon: "✍️", label: "Blog" },
    ],
  },
  {
    label: "OPERATE",
    items: [
      { icon: "➕", label: "Enroll Student" },
      { icon: "👥", label: "Students" },
      { icon: "💳", label: "Student fees" },
      { icon: "🔄", label: "Installments" },
      { icon: "📁", label: "File Manager" },
    ],
  },
  {
    label: "ANALYSE",
    items: [
      { icon: "📊", label: "Course Report" },
      { icon: "📈", label: "Student Analytics" },
      { icon: "💰", label: "Revenue Report" },
    ],
  },
  {
    label: "PLATFORM SETUP",
    items: [{ icon: "⚙️", label: "Settings" }],
  },
];

const revenueCards = [
  {
    label: "Collected (May)",
    value: "₹4.8L",
    sub: "+12% vs Apr",
    positive: true,
    sparkData: [20, 35, 28, 45, 38, 55, 48, 62, 55, 70, 65, 80],
    color: "#2EAA6E",
  },
  {
    label: "Pending Dues",
    value: "₹1.4L",
    sub: "42 students overdue",
    positive: false,
    sparkData: [40, 35, 42, 28, 35, 30, 28, 32, 25, 30, 28, 26],
    color: "#F59E0B",
  },
  {
    label: "Overdue Payments",
    value: "18",
    sub: "All installment fees on track",
    positive: false,
    sparkData: [5, 8, 6, 12, 10, 15, 12, 8, 10, 7, 9, 18],
    color: "#EF4444",
  },
  {
    label: "New Enrollments",
    value: "38",
    sub: "+23% this month",
    positive: true,
    sparkData: [10, 14, 12, 18, 15, 22, 19, 26, 23, 30, 27, 38],
    color: "#2EAA6E",
  },
];

const coursePerformance = [
  { name: "Physics — JEE Mains", students: 46, completion: 78, quiz: 82 },
  { name: "Chemistry — NEET Prep", students: 38, completion: 65, quiz: 71 },
  { name: "Mathematics — Board", students: 31, completion: 52, quiz: 68 },
];

const studentsPerf = [
  { name: "Priya Sharma", completion: 94, quiz: 88, status: "green" },
  { name: "Rahul Mehta", completion: 72, quiz: 65, status: "yellow" },
  { name: "Ananya Joshi", completion: 48, quiz: 41, status: "red" },
];

const todaySchedule = [
  { time: "09:00 AM", subject: "Physics", batch: "JEE Mains A", live: true },
  { time: "11:30 AM", subject: "Chemistry", batch: "NEET Batch B", live: false },
  { time: "02:00 PM", subject: "Maths", batch: "Board Prep 12th", live: false },
];

const reviews = [
  { name: "Ananya K.", rating: 5, text: "Best structured course I've taken! The AI quizzes are really helpful.", course: "JEE Chemistry" },
  { name: "Rahul M.", rating: 4, text: "Great content. Would love more live sessions.", course: "Physics — Board" },
];

export default function DashboardPreview() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [tick, setTick] = useState(0);
  const [enrollCount, setEnrollCount] = useState(38);

  useEffect(() => {
    const t = setInterval(() => {
      setTick(x => x + 1);
      if (Math.random() > 0.85) setEnrollCount(c => c + 1);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={styles.previewWrap}>
      <div className={styles.chrome}>

        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <aside className={styles.sidebar}>
          {/* Brand identity */}
          <div className={styles.sidebarBrand}>
            <div className={styles.brandAvatar}>S</div>
            <div className={styles.brandInfo}>
              <span className={styles.brandName}>Sayanth P</span>
              <span className={styles.brandSub}>MY STUDIO</span>
            </div>
            <span className={styles.brandChevron}>›</span>
          </div>

          {/* Nav */}
          <nav className={styles.sidebarNav}>
            {sidebarGroups.map((group, gi) => (
              <div key={gi} className={styles.navGroup}>
                {group.label && (
                  <div className={styles.navGroupLabel}>{group.label}</div>
                )}
                {group.items.map(item => (
                  <button
                    key={item.label}
                    className={`${styles.navItem} ${(item as { active?: boolean }).active || activeNav === item.label ? styles.navItemActive : ""}`}
                    onClick={() => setActiveNav(item.label)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className={styles.sidebarFooter}>
            <div className={styles.footerBadge}>E</div>
            <div className={styles.footerText}>
              <span className={styles.footerPowered}>POWERED BY</span>
              <span className={styles.footerEdveo}>EDVEO</span>
            </div>
          </div>
        </aside>

        {/* ── Main area ────────────────────────────────────────────── */}
        <div className={styles.mainArea}>

          {/* Top bar */}
          <div className={styles.topBar}>
            <div className={styles.topBarTitle}>Dashboard</div>
            <div className={styles.topBarSearch}>
              <span className={styles.searchIcon}>🔍</span>
              <span className={styles.searchPlaceholder}>Search students, classes, assignments…</span>
              <span className={styles.searchCount}>10K</span>
            </div>
            <div className={styles.topBarRight}>
              <span className={styles.syncBadge}>● Last synced: moments ago</span>
              <span className={styles.topBarIcon}>✉️</span>
              <div className={styles.notifWrap}>
                <span className={styles.topBarIcon}>🔔</span>
                <span className={styles.notifDot}>29</span>
              </div>
              <span className={styles.topBarIcon}>⚙️</span>
              <div className={styles.userChip}>
                <div className={styles.userAvatar}>SP</div>
                <span className={styles.userName}>Sayanth P ▾</span>
                <span className={styles.onlineDot} />
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className={styles.content}>

            {/* Greeting row */}
            <div className={styles.greetingRow}>
              <div>
                <h1 className={styles.greeting}>Good afternoon, Sayanth 👋</h1>
                <p className={styles.greetingDate}>Saturday, 2 May 2026</p>
              </div>
              <div className={styles.quickActions}>
                <button className={styles.qaBtn}>+ Create quiz</button>
                <button className={styles.qaBtn}>+ Create assignment</button>
                <button className={styles.qaBtn} style={{ background: "#2EAA6E", color: "#fff" }}>🎥 Schedule a live session</button>
              </div>
            </div>

            {/* AI Banner */}
            <div className={styles.aiBanner}>
              <div className={styles.aiBannerLeft}>
                <span className={styles.aiTag}>🤖 AI TIP</span>
                <div>
                  <p className={styles.aiBannerTitle}>Personalised progress updates keep students accountable.</p>
                  <p className={styles.aiBannerSub}>Use the student analytics page to identify who is slipping and send a direct message — a single nudge often gets a student back on track.</p>
                  <button className={styles.aiBannerBtn}>View student analytics</button>
                </div>
              </div>
              <div className={styles.aiBannerRight}>STUDENT ENGAGEMENT</div>
            </div>

            {/* Revenue Snapshot */}
            <div className={styles.sectionRow}>
              <span className={styles.sectionLabel}>REVENUE SNAPSHOT</span>
              <span className={styles.sectionLink}>View full report →</span>
            </div>
            <div className={styles.revenueGrid}>
              {revenueCards.map((card, i) => (
                <div key={i} className={styles.revenueCard}>
                  <div className={styles.revenueCardLabel}>{card.label}</div>
                  <div className={styles.revenueCardValue}>{i === 3 ? enrollCount : card.value}</div>
                  <div className={styles.revenueCardBottom}>
                    <span className={styles.revenueCardSub} style={{ color: card.positive ? "#2EAA6E" : card.color }}>
                      {card.sub}
                    </span>
                    <Sparkline data={i === 3 ? [...card.sparkData.slice(0, -1), enrollCount] : card.sparkData} color={card.color} up={card.positive} />
                  </div>
                </div>
              ))}
            </div>

            {/* Course + Student Performance */}
            <div className={styles.perfGrid}>
              <div className={styles.perfCard}>
                <div className={styles.perfCardHeader}>
                  <div>
                    <div className={styles.perfCardTitle}>Course Performance</div>
                    <div className={styles.perfCardSub}>Chapter-by-chapter · student progress</div>
                  </div>
                  <span className={styles.sectionLink}>All courses ›</span>
                </div>
                <div className={styles.perfTable}>
                  <div className={styles.perfTableHead}>
                    <span>Course</span><span>Students</span><span>Completion</span><span>Quiz avg</span>
                  </div>
                  {coursePerformance.map(row => (
                    <div key={row.name} className={styles.perfTableRow}>
                      <span className={styles.perfCourseName}>{row.name}</span>
                      <span>{row.students}</span>
                      <span>
                        <div className={styles.miniProgress}>
                          <div style={{ width: `${row.completion}%`, background: row.completion > 70 ? "#2EAA6E" : row.completion > 50 ? "#F59E0B" : "#EF4444" }} />
                        </div>
                        <span className={styles.miniPct}>{row.completion}%</span>
                      </span>
                      <span style={{ fontWeight: 700, color: row.quiz > 75 ? "#2EAA6E" : "#F59E0B" }}>{row.quiz}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.perfCard}>
                <div className={styles.perfCardHeader}>
                  <div>
                    <div className={styles.perfCardTitle}>Students Performance</div>
                    <div className={styles.perfCardSub}>Student-by-student · completion &amp; quiz scores</div>
                  </div>
                  <span className={styles.sectionLink}>All students ›</span>
                </div>
                <div className={styles.perfTable}>
                  <div className={styles.perfTableHead}>
                    <span>Student</span><span>Completion</span><span>Quiz</span><span>Status</span>
                  </div>
                  {studentsPerf.map(s => (
                    <div key={s.name} className={styles.perfTableRow}>
                      <span className={styles.perfCourseName}>{s.name}</span>
                      <span>{s.completion}%</span>
                      <span>{s.quiz}%</span>
                      <span>
                        <span className={styles.statusDot} style={{ background: s.status === "green" ? "#2EAA6E" : s.status === "yellow" ? "#F59E0B" : "#EF4444" }} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Schedule + Reviews */}
            <div className={styles.perfGrid}>
              <div className={styles.perfCard}>
                <div className={styles.perfCardHeader}>
                  <div className={styles.perfCardTitle}>Today&apos;s Schedule</div>
                  <span className={styles.sectionLink}>Full calendar →</span>
                </div>
                <div className={styles.scheduleList}>
                  {todaySchedule.map(cls => (
                    <div key={cls.time} className={styles.scheduleRow}>
                      <span className={styles.scheduleTime}>{cls.time}</span>
                      <div className={styles.scheduleInfo}>
                        <span className={styles.scheduleSubject}>{cls.subject}</span>
                        <span className={styles.scheduleBatch}>{cls.batch}</span>
                      </div>
                      {cls.live && <span className={styles.liveBadge}>● LIVE</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.perfCard}>
                <div className={styles.perfCardHeader}>
                  <div>
                    <div className={styles.perfCardTitle}>Course Reviews</div>
                    <div className={styles.perfCardSub}>Latest student feedback</div>
                  </div>
                  <span className={styles.sectionLink}>View all →</span>
                </div>
                <div className={styles.reviewsList}>
                  {reviews.map(r => (
                    <div key={r.name} className={styles.reviewRow}>
                      <div className={styles.reviewTop}>
                        <span className={styles.reviewName}>{r.name}</span>
                        <span className={styles.reviewCourse}>{r.course}</span>
                        <span className={styles.reviewStars}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                      </div>
                      <p className={styles.reviewText}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Live indicator */}
      <div className={styles.livePill} key={tick}>
        <span className={styles.livePillDot} /> Live preview
      </div>
    </div>
  );
}
