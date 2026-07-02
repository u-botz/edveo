import styles from './MobileAppBanner.module.css';

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5AA9FB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function MobileAppBanner() {
  return (
    <section className={styles.section} aria-label="White-label mobile app for institutes">
      <div className={styles.bgDots} aria-hidden />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowPill}>📱 White-label App</span>
          </div>

          <h2 className={styles.headline}>
            Your Institute.{' '}
            <span className={styles.headlineAccent}>Your App.</span>
          </h2>

          <p className={styles.sub}>
            We publish a fully branded mobile app under your institute&apos;s name on
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

        <div className={styles.visual}>
          <img
            src="/mobile-app-dashboard.png"
            alt="Edveo mobile app dashboard showing revenue, students, AI briefing, and today's schedule"
            className={styles.phoneImage}
            width={390}
            height={844}
            decoding="async"
          />
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
      </div>
    </section>
  );
}
