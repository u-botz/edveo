import styles from './MobileAppBanner.module.css';

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function PhoneMockup() {
  return (
    <div className={styles.phoneWrap} aria-hidden>
      {/* Phone frame */}
      <svg
        className={styles.phoneFrame}
        viewBox="0 0 160 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Phone body */}
        <rect x="4" y="4" width="152" height="312" rx="24" fill="#1a3355" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        {/* Screen bezel */}
        <rect x="10" y="16" width="140" height="288" rx="18" fill="#0f2744" />
        {/* Notch */}
        <rect x="55" y="16" width="50" height="14" rx="7" fill="#1a3355" />
        {/* Home indicator */}
        <rect x="60" y="296" width="40" height="4" rx="2" fill="rgba(255,255,255,0.2)" />

        {/* ── App splash screen content ── */}
        {/* Splash gradient bg */}
        <defs>
          <linearGradient id="splashGrad" x1="10" y1="30" x2="150" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D2D4E" />
            <stop offset="100%" stopColor="#0a3d2e" />
          </linearGradient>
        </defs>
        <rect x="10" y="30" width="140" height="274" rx="18" fill="url(#splashGrad)" />

        {/* Dot grid texture */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle
              key={`dot-${row}-${col}`}
              cx={28 + col * 20}
              cy={55 + row * 30}
              r="1"
              fill="rgba(255,255,255,0.04)"
            />
          ))
        )}

        {/* Logo box */}
        <rect x="60" y="80" width="40" height="40" rx="10" fill="rgba(46,170,110,0.2)" stroke="rgba(46,170,110,0.4)" strokeWidth="1.5" />
        {/* Logo "E" letter */}
        <text x="80" y="107" textAnchor="middle" fill="#4ade80" fontSize="20" fontWeight="800" fontFamily="system-ui">E</text>

        {/* App name */}
        <text x="80" y="140" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="system-ui">
          My Institute
        </text>
        <text x="80" y="155" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="system-ui">
          Powered by Edveo
        </text>

        {/* Divider */}
        <line x1="30" y1="175" x2="130" y2="175" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* Stats row */}
        <text x="42" y="196" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="system-ui">148</text>
        <text x="42" y="207" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="system-ui">Students</text>

        <line x1="80" y1="184" x2="80" y2="212" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        <text x="80" y="196" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="system-ui">12</text>
        <text x="80" y="207" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="system-ui">Batches</text>

        <line x1="118" y1="184" x2="118" y2="212" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        <text x="118" y="196" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="800" fontFamily="system-ui">98%</text>
        <text x="118" y="207" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="system-ui">Attendance</text>

        {/* Divider */}
        <line x1="30" y1="220" x2="130" y2="220" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* Live class pill */}
        <rect x="25" y="228" width="110" height="24" rx="6" fill="rgba(46,170,110,0.15)" stroke="rgba(46,170,110,0.3)" strokeWidth="1" />
        <circle cx="36" cy="240" r="3" fill="#4ade80" />
        <text x="46" y="244" fill="rgba(255,255,255,0.7)" fontSize="7.5" fontFamily="system-ui" fontWeight="600">LIVE: Physics — Batch A</text>

        {/* CTA button */}
        <rect x="30" y="262" width="100" height="26" rx="7" fill="#2EAA6E" />
        <text x="80" y="280" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="system-ui">Open Dashboard</text>

        {/* PlayStore badge hint */}
        <text x="80" y="298" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6.5" fontFamily="system-ui">Available on PlayStore &amp; AppStore</text>
      </svg>

      {/* Floating store badges */}
      <div className={styles.storeBadges}>
        <div className={styles.storeBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M3.18 23.76c.33.18.7.24 1.08.18l13.5-7.8-2.94-2.94L3.18 23.76zM20.82 10.5 17.1 8.28l-3.36 3.24 3.36 3.24 3.78-2.16c1.08-.6 1.08-2.04-.06-2.1zM1.44.24C1.2.48 1.08.84 1.08 1.32V22.68c0 .48.12.84.36 1.08l.06.06L13.02 12v-.24L1.5.18l-.06.06zM14.58 8.88l-13.5-7.8c-.36-.24-.78-.24-1.14-.06l12.6 12.6 1.98-1.98-.06-.06z"/></svg>
          PlayStore
        </div>
        <div className={styles.storeBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          AppStore
        </div>
      </div>
    </div>
  );
}

export default function MobileAppBanner() {
  return (
    <section className={styles.section} aria-label="White-label mobile app for institutes">
      {/* Background dot grid */}
      <div className={styles.bgDots} aria-hidden />

      <div className={styles.container}>
        {/* Left — Content */}
        <div className={styles.content}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowPill}>📱 White-label App</span>
          </div>

          <h2 className={styles.headline}>
            Your Institute.{' '}
            <span className={styles.headlineAccent}>Your App.</span>
          </h2>

          <p className={styles.sub}>
            We publish a fully branded mobile app under your institute's name on
            PlayStore and AppStore — your logo, your colours, your students.
            No coding required. No separate billing.
          </p>

          <ul className={styles.bullets}>
            {[
              'Your logo, colours, and institute name on the splash screen',
              'Students receive live class notifications and fee reminders',
              'Push notifications for new content, schedules, and results',
              'Live classes, attendance, and quizzes — all accessible in-app',
              'Published within 7 days of going live on Edveo',
            ].map((b) => (
              <li key={b} className={styles.bullet}>
                <CheckIcon />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className={styles.ctaRow}>
            <a href="#" className={styles.ctaPrimary}>
              See example apps
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <span className={styles.ctaNote}>Included in all plans — no extra charge</span>
          </div>
        </div>

        {/* Right — Phone Mockup */}
        <div className={styles.visual}>
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
