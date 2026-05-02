'use client';

import styles from './intelligence-demo.module.css';

function IconReports() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

function IconDrafts() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h10" />
    </svg>
  );
}

function IconStudents() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const CAPABILITIES = [
  {
    title: 'Generates reports',
    body: 'Fee summaries, attendance logs, and progress reports — on demand',
    Icon: IconReports,
  },
  {
    title: 'Drafts communications',
    body: 'Parent notices, reminder messages, and announcements — written instantly',
    Icon: IconDrafts,
  },
  {
    title: 'Flags at-risk students',
    body: 'Attendance drops, fee delays, and quiz patterns — surfaced before they escalate',
    Icon: IconStudents,
  },
] as const;

export function IntelligenceCapabilityCards() {
  return (
    <div className={styles.capabilityCards} role="list">
      {CAPABILITIES.map(({ title, body, Icon }, index) => (
        <div key={title} className={styles.capabilityCard} role="listitem" data-capability-index={index}>
          <div className={styles.capabilityIconWrap}>
            <Icon />
          </div>
          <h3 className={styles.capabilityTitle}>{title}</h3>
          <p className={styles.capabilityBody}>{body}</p>
        </div>
      ))}
    </div>
  );
}
