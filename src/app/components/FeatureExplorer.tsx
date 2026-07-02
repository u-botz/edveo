'use client';

import { useState } from 'react';
import styles from './FeatureExplorer.module.css';

/* ── Types ── */
interface Feature {
  id: string;
  label: string;
  icon: React.ReactNode;
  headline: string;
  sub: string;
  bullets: string[];
  mockup: React.ReactNode;
}

/* ── Icons ── */
function VideoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
function FeeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M7 10h4M7 14h10" />
    </svg>
  );
}
function AnalyticsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
    </svg>
  );
}
function CrmIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function TimetableIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

/* ── Mockup components ── */
function LiveClassMockup() {
  return (
    <div className={styles.mockupShell}>
      <div className={styles.mockupTopBar}>
        <span className={styles.mockupLiveBadge}>● LIVE NOW</span>
        <span className={styles.mockupTimer}>⏱ 42:17</span>
      </div>
      <div className={styles.mockupClassName}>NEET Chemistry — Organic Reactions</div>
      <div className={styles.mockupMeta}>
        <span>👥 84 students</span>
        <span className={styles.mockupMetaDot} />
        <span>🎙 Mic on</span>
        <span className={styles.mockupMetaDot} />
        <span>📋 Attendance logged</span>
      </div>
      <div className={styles.mockupProgressWrap}>
        <div className={styles.mockupProgressLabel}>Session progress</div>
        <div className={styles.mockupProgressTrack}>
          <div className={styles.mockupProgressBar} style={{ maxWidth: '62%' }} />
        </div>
        <div className={styles.mockupProgressPct}>62%</div>
      </div>
      <div className={styles.mockupDivider} />
      <div className={styles.mockupChatLabel}>Live Chat</div>
      <div className={styles.mockupChatItems}>
        <div className={styles.mockupChatLine}><span className={styles.mockupChatUser}>Priya S.</span> Sir can you repeat the SN2 step?</div>
        <div className={styles.mockupChatLine}><span className={styles.mockupChatUser}>Rohan M.</span> 🙋 Doubt on mechanism</div>
        <div className={styles.mockupChatLine}><span className={styles.mockupChatUser}>Ananya K.</span> Thank you! Clear now 👍</div>
      </div>
      <div className={styles.mockupActions}>
        <div className={styles.mockupActionBtn}>🖊 Whiteboard</div>
        <div className={styles.mockupActionBtn}>📹 Record</div>
        <div className={`${styles.mockupActionBtn} ${styles.mockupActionEnd}`}>End Class</div>
      </div>
    </div>
  );
}

function FeeManagementMockup() {
  return (
    <div className={styles.mockupShell}>
      <div className={styles.mockupSectionLabel}>Outstanding Dues — May 2025</div>
      <div className={styles.mockupFeeCards}>
        <div className={styles.mockupFeeRow}>
          <div className={styles.mockupFeeAvatar}>AS</div>
          <div className={styles.mockupFeeInfo}>
            <div className={styles.mockupFeeName}>Aditya Sharma</div>
            <div className={styles.mockupFeeClass}>Batch A · NEET</div>
          </div>
          <div className={styles.mockupFeeAmt}>₹4,500</div>
          <div className={`${styles.mockupFeeBadge} ${styles.mockupFeeDue}`}>Due</div>
        </div>
        <div className={styles.mockupFeeRow}>
          <div className={styles.mockupFeeAvatar}>PK</div>
          <div className={styles.mockupFeeInfo}>
            <div className={styles.mockupFeeName}>Priya Kulkarni</div>
            <div className={styles.mockupFeeClass}>Batch B · JEE</div>
          </div>
          <div className={styles.mockupFeeAmt}>₹6,000</div>
          <div className={`${styles.mockupFeeBadge} ${styles.mockupFeePaid}`}>Paid</div>
        </div>
        <div className={styles.mockupFeeRow}>
          <div className={styles.mockupFeeAvatar}>RM</div>
          <div className={styles.mockupFeeInfo}>
            <div className={styles.mockupFeeName}>Rohit Mehta</div>
            <div className={styles.mockupFeeClass}>Batch A · NEET</div>
          </div>
          <div className={styles.mockupFeeAmt}>₹4,500</div>
          <div className={`${styles.mockupFeeBadge} ${styles.mockupFeeOverdue}`}>Overdue</div>
        </div>
      </div>
      <div className={styles.mockupDivider} />
      <div className={styles.mockupInvoicePreview}>
        <div className={styles.mockupInvoiceHeader}>
          <span>Auto-Invoice Generated</span>
          <span className={styles.mockupInvoiceGst}>GST: 18%</span>
        </div>
        <div className={styles.mockupInvoiceLine}><span>Tuition Fee</span><span>₹3,814</span></div>
        <div className={styles.mockupInvoiceLine}><span>GST (18%)</span><span>₹686</span></div>
        <div className={`${styles.mockupInvoiceLine} ${styles.mockupInvoiceTotal}`}><span>Total</span><span>₹4,500</span></div>
      </div>
      <div className={styles.mockupFeeActions}>
        <div className={styles.mockupActionBtn}>📨 Send Reminder</div>
        <div className={`${styles.mockupActionBtn} ${styles.mockupActionPrimary}`}>Download Invoice</div>
      </div>
    </div>
  );
}

function AnalyticsMockup() {
  const bars = [
    { subject: 'Physics', score: 78, color: '#2EAA6E' },
    { subject: 'Chemistry', score: 64, color: '#2EAA6E' },
    { subject: 'Biology', score: 91, color: '#2EAA6E' },
    { subject: 'Maths', score: 55, color: '#f59e0b' },
    { subject: 'English', score: 82, color: '#2EAA6E' },
  ];
  return (
    <div className={styles.mockupShell}>
      <div className={styles.mockupSectionLabel}>Class Performance — May 2025</div>
      <div className={styles.mockupStatRow}>
        <div className={styles.mockupStat}>
          <div className={styles.mockupStatValue}>84</div>
          <div className={styles.mockupStatLabel}>Students</div>
        </div>
        <div className={styles.mockupStat}>
          <div className={styles.mockupStatValue}>72%</div>
          <div className={styles.mockupStatLabel}>Avg Score</div>
        </div>
        <div className={styles.mockupStat}>
          <div className={styles.mockupStatValue}>#3</div>
          <div className={styles.mockupStatLabel}>Batch Rank</div>
        </div>
      </div>
      <div className={styles.mockupDivider} />
      <div className={styles.mockupChartLabel}>Subject-wise Average</div>
      <div className={styles.mockupBarChart}>
        {bars.map((b) => (
          <div key={b.subject} className={styles.mockupBarGroup}>
            <div className={styles.mockupBarTrack}>
              <div className={styles.mockupBarFill} style={{ '--target-width': `${b.score}%`, background: b.color } as React.CSSProperties} />
            </div>
            <div className={styles.mockupBarMeta}>
              <span className={styles.mockupBarSubject}>{b.subject}</span>
              <span className={styles.mockupBarScore}>{b.score}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.mockupAtRisk}>
        <span className={styles.mockupAtRiskIcon}>⚠</span>
        <span>3 students at risk — AI flagged for follow-up</span>
      </div>
    </div>
  );
}

function CrmMockup() {
  const stages = [
    { label: 'New Leads', count: 24, color: '#6366f1' },
    { label: 'Contacted', count: 18, color: '#0369a1' },
    { label: 'Demo Done', count: 11, color: '#f59e0b' },
    { label: 'Enrolled', count: 7, color: '#2EAA6E' },
  ];
  return (
    <div className={styles.mockupShell}>
      <div className={styles.mockupSectionLabel}>Admission Pipeline — May 2025</div>
      <div className={styles.mockupFunnel}>
        {stages.map((s, i) => (
          <div key={s.label} className={styles.mockupFunnelStage}>
            <div className={styles.mockupFunnelBar} style={{ '--target-width': `${100 - i * 18}%`, background: s.color } as React.CSSProperties}>
              <span className={styles.mockupFunnelCount}>{s.count}</span>
            </div>
            <span className={styles.mockupFunnelLabel}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.mockupDivider} />
      <div className={styles.mockupSectionLabel}>Recent Leads</div>
      <div className={styles.mockupFeeCards}>
        <div className={styles.mockupFeeRow}>
          <div className={styles.mockupFeeAvatar}>NK</div>
          <div className={styles.mockupFeeInfo}>
            <div className={styles.mockupFeeName}>Neha Kapoor</div>
            <div className={styles.mockupFeeClass}>Interested in NEET Batch</div>
          </div>
          <div className={`${styles.mockupFeeBadge} ${styles.mockupFeeNew}`}>New</div>
        </div>
        <div className={styles.mockupFeeRow}>
          <div className={styles.mockupFeeAvatar}>SK</div>
          <div className={styles.mockupFeeInfo}>
            <div className={styles.mockupFeeName}>Saurabh Kumar</div>
            <div className={styles.mockupFeeClass}>JEE 2026 Inquiry</div>
          </div>
          <div className={`${styles.mockupFeeBadge} ${styles.mockupFeeDemo}`}>Demo</div>
        </div>
      </div>
      <div className={styles.mockupFeeActions}>
        <div className={`${styles.mockupActionBtn} ${styles.mockupActionPrimary}`}>📞 Call Now</div>
        <div className={styles.mockupActionBtn}>📩 Send WhatsApp</div>
      </div>
    </div>
  );
}

function TimetableMockup() {
  const slots = [
    { day: 'Mon', time: '9–11 AM', subject: 'Physics', batch: 'NEET A' },
    { day: 'Tue', time: '10–12 PM', subject: 'Chemistry', batch: 'JEE B' },
    { day: 'Wed', time: '9–11 AM', subject: 'Biology', batch: 'NEET A' },
    { day: 'Thu', time: '2–4 PM', subject: 'Maths', batch: 'JEE B' },
    { day: 'Fri', time: '9–11 AM', subject: 'Physics', batch: 'NEET B' },
  ];
  return (
    <div className={styles.mockupShell}>
      <div className={styles.mockupSectionLabel}>Weekly Timetable — Batch Overview</div>
      <div className={styles.mockupTimetable}>
        {slots.map((s) => (
          <div key={s.day + s.time} className={styles.mockupSlotRow}>
            <div className={styles.mockupSlotDay}>{s.day}</div>
            <div className={styles.mockupSlotInfo}>
              <div className={styles.mockupSlotTime}>{s.time}</div>
              <div className={styles.mockupSlotSubject}>{s.subject}</div>
            </div>
            <div className={styles.mockupSlotBatch}>{s.batch}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Feature data ── */
const FEATURES: Feature[] = [

  {
    id: 'fee-management',
    label: 'Fee Management',
    icon: <FeeIcon />,
    headline: 'Collect fees on autopilot. Zero manual follow-up.',
    sub: 'Automated GST invoices, smart reminders, and a full payment dashboard — all connected to Razorpay. No spreadsheets, no manual reconciliation.',
    bullets: [
      'Auto-generates GST-compliant invoices on every payment',
      'Sends reminders before, on, and after the due date',
      'Supports partial payments and installment plans',
      'Defaulter alerts before they cross 30 days',
      'Revenue dashboard updated in real time',
    ],
    mockup: <FeeManagementMockup />,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <AnalyticsIcon />,
    headline: 'Know which students need help before they tell you.',
    sub: 'Deep performance data across every student, batch, and subject — automatically compiled. No manual reports, no end-of-month scrambles.',
    bullets: [
      'Student rank analysis within batch and across institute',
      'Subject-wise performance trends over time',
      'Attendance correlation with performance scores',
      'At-risk student alerts with AI-generated intervention suggestions',
      'Exportable reports for parent-teacher meetings',
    ],
    mockup: <AnalyticsMockup />,
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: <CrmIcon />,
    headline: 'Turn every inquiry into an enrollment — systematically.',
    sub: 'A purpose-built CRM for coaching institutes. Track every lead from first WhatsApp message to first fee payment without losing a single prospect.',
    bullets: [
      'Capture leads from WhatsApp, website, and walk-ins',
      'Pipeline stages: Lead → Contacted → Demo → Enrolled',
      'AI scores and prioritises leads by conversion likelihood',
      'One-click WhatsApp follow-up from the dashboard',
      'Full attribution — know which channel brought each student',
    ],
    mockup: <CrmMockup />,
  },
  {
    id: 'timetable',
    label: 'Timetable',
    icon: <TimetableIcon />,
    headline: 'Conflict-free scheduling for every batch and teacher.',
    sub: 'Smart timetabling that prevents double-booking, notifies teachers automatically, and syncs to every student\'s app calendar.',
    bullets: [
      'Drag-and-drop schedule builder',
      'Auto-detects teacher and room conflicts before saving',
      'Pushes schedule changes to students\' app instantly',
      'Holiday and exam block support',
      'Substitute teacher assignment in one click',
    ],
    mockup: <TimetableMockup />,
  },
];

/* ── Main Component ── */
export default function FeatureExplorer() {
  const [activeId, setActiveId] = useState<string>(FEATURES[0].id);
  const active = FEATURES.find((f) => f.id === activeId)!;

  return (
    <section className={styles.section} aria-label="Feature Explorer">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>Platform Features</p>
          <h2 className={styles.title}>One Ecosystem. Every Feature.</h2>
          <p className={styles.subtitle}>
            Everything you need to run your institute — no external tools required.
          </p>
        </div>

        {/* Tab Strip */}
        <div className={styles.tabStrip} role="tablist" aria-label="Feature categories">
          {FEATURES.map((f) => (
            <button
              key={f.id}
              id={`tab-${f.id}`}
              role="tab"
              aria-selected={f.id === activeId}
              aria-controls={`panel-${f.id}`}
              className={`${styles.tab} ${f.id === activeId ? styles.tabActive : ''}`}
              onClick={() => setActiveId(f.id)}
            >
              <span className={styles.tabIcon}>{f.icon}</span>
              <span className={styles.tabLabel}>{f.label}</span>
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div
          key={activeId}
          id={`panel-${activeId}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeId}`}
          className={styles.panel}
        >
          {/* Left — Info */}
          <div className={styles.panelLeft}>
            <div className={styles.featureIconWrap}>
              {active.icon}
            </div>
            <h3 className={styles.featureHeadline}>{active.headline}</h3>
            <p className={styles.featureSub}>{active.sub}</p>
            <ul className={styles.featureBullets}>
              {active.bullets.map((b) => (
                <li key={b} className={styles.featureBullet}>
                  <svg className={styles.bulletCheck} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155EEF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a href="#" className={styles.featureCta}>
              See it in action
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right — Mockup */}
          <div className={styles.panelRight}>
            {active.mockup}
          </div>
        </div>
      </div>
    </section>
  );
}
