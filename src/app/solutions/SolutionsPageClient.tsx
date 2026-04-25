"use client";

import Link from "next/link";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import styles from "./solutions.module.css";

/* ── Reusable tiny components ────────────────────────── */

function CheckIcon() {
  return (
    <span className={styles.featureCheck}>
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2 6l3 3 5-5" />
      </svg>
    </span>
  );
}

function AiTag({ text }: { text: string }) {
  return (
    <div className={styles.aiTag}>
      <span className={styles.aiTagStar}>✦</span>
      <span>{text}</span>
    </div>
  );
}

function MockupDots() {
  return (
    <div className={styles.mockupTopBar}>
      <span className={`${styles.dot} ${styles.dotRed}`} />
      <span className={`${styles.dot} ${styles.dotYellow}`} />
      <span className={`${styles.dot} ${styles.dotGreen}`} />
    </div>
  );
}

/* ── Mockup: Course Delivery ─────────────────────────── */
function CourseMockup() {
  return (
    <div className={styles.mockupCard}>
      <MockupDots />
      <div className={styles.mockupBody}>
        <div className={styles.courseHeader}>
          <span className={styles.courseTitle}>My Courses</span>
          <span className={styles.courseBadge}>LIVE</span>
        </div>
        {[
          { name: "NEET Physics 2026", students: "41 students", pct: 76 },
          { name: "JEE Chemistry", students: "28 students", pct: 54 },
          { name: "English Grammar Pro", students: "63 students", pct: 88 },
        ].map((c) => (
          <div key={c.name} className={styles.courseCard}>
            <div className={styles.courseCardRow}>
              <span className={styles.courseCardName}>{c.name}</span>
              <span className={styles.courseCardMeta}>{c.students}</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${c.pct}%` }} />
            </div>
            <div className={styles.courseCardRow}>
              <span className={styles.courseCardMeta}>Completion</span>
              <span className={styles.courseCardMeta} style={{ color: "#4ade80", fontWeight: 700 }}>{c.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mockup: Revenue ──────────────────────────────────── */
function RevenueMockup() {
  return (
    <div className={styles.mockupCard}>
      <MockupDots />
      <div className={styles.mockupBody}>
        <div className={styles.revenueStatRow}>
          <div className={styles.revenueStat}>
            <div className={styles.revenueStatLabel}>This Month</div>
            <div className={styles.revenueStatValue}>₹2.4L</div>
            <span className={styles.revenueCommission}>0% commission</span>
          </div>
          <div className={styles.revenueStat}>
            <div className={styles.revenueStatLabel}>Pending</div>
            <div className={styles.revenueStatValue}>₹18,200</div>
            <span className={styles.revenueCommission} style={{ background: "rgba(250,204,21,0.2)", color: "#facc15" }}>3 students</span>
          </div>
        </div>
        <div className={styles.revenueAlertRow}>
          <div className={`${styles.revenueAlert} ${styles.alertWarning}`}>
            ⚠️  Auto-reminder sent to 7 students — fee due in 3 days
          </div>
          <div className={`${styles.revenueAlert} ${styles.alertSuccess}`}>
            ✅  Razorpay connected · Payouts every Tuesday
          </div>
          <div className={`${styles.revenueAlert} ${styles.alertInfo}`}>
            🧾  GST invoice auto-generated for 4 payments today
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: CRM Kanban ───────────────────────────────── */
function CrmMockup() {
  return (
    <div className={styles.mockupCard}>
      <MockupDots />
      <div className={styles.mockupBody}>
        <div className={styles.crmKanban}>
          {([
            { title: "New Inquiry", count: "12", cards: ["Priya M.", "Rohan K.", "Sneha R."], ai: undefined },
            {
              title: "Follow-up",
              count: "8",
              cards: ["Amit S.", "Demo sent"],
              ai: "Rohan K. — High intent · Call today",
            },
            { title: "Demo Scheduled", count: "5", cards: ["Kavya", "Arjun"], ai: undefined },
            { title: "Enrolled", count: "23", cards: ["Ananya", "Devan", "Nair"], ai: undefined },
          ] as { title: string; count: string; cards: string[]; ai?: string }[]).map((col) => (
            <div key={col.title} className={styles.crmCol}>
              <div className={styles.crmColTitle}>
                {col.title}
                <span className={styles.crmColCount}>{col.count}</span>
              </div>
              {col.ai && <div className={`${styles.crmCard} ${styles.crmCardAi}`}>✦ {col.ai}</div>}
              {col.cards.map((c) => (
                <div key={c} className={styles.crmCard}>{c}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: Quiz ─────────────────────────────────────── */
function QuizMockup() {
  return (
    <div className={styles.mockupCard}>
      <MockupDots />
      <div className={styles.mockupBody}>
        <div className={styles.quizHeader}>
          <div className={styles.quizTitle}>NEET Biology Chapter 5</div>
          <div className={styles.quizMeta}>50 questions generated in 28 seconds ✦</div>
        </div>
        <div className={styles.quizDifficulty}>
          <div className={`${styles.diffTile} ${styles.diffEasy}`}>Easy<br />20%</div>
          <div className={`${styles.diffTile} ${styles.diffMedium}`}>Medium<br />50%</div>
          <div className={`${styles.diffTile} ${styles.diffHard}`}>Hard<br />30%</div>
        </div>
        <div className={styles.quizMeta} style={{ marginBottom: 10 }}>Student performance heatmap by topic</div>
        <div className={styles.quizHeatmap}>
          {["heatHigh", "heatMed", "heatTop", "heatLow", "heatHigh",
            "heatTop", "heatMed", "heatHigh", "heatMed", "heatLow",
            "heatLow", "heatTop", "heatHigh", "heatMed", "heatTop"].map((h, i) => (
            <div key={i} className={`${styles.heatTile} ${styles[h as keyof typeof styles]}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: Brand & Website ──────────────────────────── */
function BrandMockup() {
  return (
    <div className={styles.brandMockup}>
      <div className={styles.brandBrowserTop}>
        <span className={`${styles.brandBrowserDot}`} style={{ background: "#ff5f57" }} />
        <span className={`${styles.brandBrowserDot}`} style={{ background: "#ffbd2e" }} />
        <span className={`${styles.brandBrowserDot}`} style={{ background: "#28c840" }} />
        <div className={styles.brandAddrBar}>priyamenon.com</div>
      </div>
      <div className={styles.brandBody}>
        <div className={styles.brandNavbar}>
          <div className={styles.brandLogo}>Priya Menon Academy</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ fontSize: "0.72rem", color: "#6b7280" }}>Courses</div>
            <div style={{ fontSize: "0.72rem", color: "#6b7280" }}>About</div>
          </div>
          <div style={{ background: "#0D2D4E", color: "#fff", borderRadius: "6px", padding: "6px 14px", fontSize: "0.72rem", fontWeight: 700 }}>
            Enroll Now
          </div>
        </div>
        <div style={{ padding: "12px 24px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>1,240 students enrolled · ⭐ 4.9 rated</div>
        </div>
        <div className={styles.brandCoursegrid}>
          {[
            { title: "IELTS Master 2026", price: "₹4,999", color: "#dbeafe" },
            { title: "Spoken English", price: "₹2,499", color: "#fef3c7" },
          ].map((c) => (
            <div key={c.title} className={styles.brandCourse}>
              <div className={styles.brandCourseImg} style={{ background: c.color }} />
              <div className={styles.brandCourseTitle}>{c.title}</div>
              <div className={styles.brandCoursePrice}>{c.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: Attendance / Student Health ──────────────── */
function AttendanceMockup() {
  return (
    <div className={styles.mockupCard}>
      <MockupDots />
      <div className={styles.mockupBody}>
        <div className={styles.studentProfile}>
          <div className={styles.studentName}>Rahul Menon</div>
          <div className={styles.studentStats}>
            <div className={styles.studentStat}>
              <span className={styles.statLabel}>Attendance</span>
              <span className={`${styles.statValue} ${styles.statRed}`}>67%</span>
            </div>
            <div className={styles.studentStat}>
              <span className={styles.statLabel}>Quiz Avg</span>
              <span className={`${styles.statValue} ${styles.statRed}`}>54%</span>
            </div>
            <div className={styles.studentStat}>
              <span className={styles.statLabel}>Fee</span>
              <span className={`${styles.statValue} ${styles.statGreen}`}>Paid</span>
            </div>
          </div>
          <div className={styles.aiAlertBanner}>
            ⚠️ At risk of dropping — last login 8 days ago · Follow up today
          </div>
        </div>
        {[
          { name: "Ananya Pillai", att: "92%", quiz: "81%", color: "#4ade80" },
          { name: "Dev Krishnan", att: "78%", quiz: "73%", color: "#facc15" },
        ].map((s) => (
          <div key={s.name} className={styles.studentProfile} style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className={styles.studentName}>{s.name}</div>
            <div className={styles.studentStats}>
              <div className={styles.studentStat}>
                <span className={styles.statLabel}>Attendance</span>
                <span className={styles.statValue} style={{ color: s.color }}>{s.att}</span>
              </div>
              <div className={styles.studentStat}>
                <span className={styles.statLabel}>Quiz Avg</span>
                <span className={styles.statValue} style={{ color: s.color }}>{s.quiz}</span>
              </div>
              <div className={styles.studentStat}>
                <span className={styles.statLabel}>Fee</span>
                <span className={`${styles.statValue} ${styles.statGreen}`}>Paid</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mockup: Notifications ────────────────────────────── */
function NotificationMockup() {
  return (
    <div className={styles.mockupCard}>
      <MockupDots />
      <div className={styles.mockupBody}>
        {[
          {
            title: "Class Reminder",
            meta: "Sent to 41 students · 38 read",
            badge: "SENT",
          },
          {
            title: "Fee Reminder — Auto-sent",
            meta: "7 students notified · 4 paid within 2 hours",
            badge: "AUTO",
          },
          {
            title: "Result Published — NEET Biology",
            meta: "Scores visible · Parent alerts triggered",
            badge: "LIVE",
          },
          {
            title: "Tomorrow's Class - Scheduled",
            meta: "Reminder set for 7:30 AM · All batches",
            badge: "SCHED",
          },
        ].map((n) => (
          <div key={n.title} className={styles.notifCard}>
            <div className={styles.notifRow}>
              <div>
                <div className={styles.notifTitle}>{n.title}</div>
                <div className={styles.notifMeta}>{n.meta}</div>
              </div>
              <div className={styles.notifBadge}>{n.badge}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════ */
export default function SolutionsPageClient() {
  return (
    <div className={styles.page}>

      <SiteNavbar activePage="solutions" />

      {/* ═══════════════════════════════════════════════
          SECTION 1 — Page Hero
          ═══════════════════════════════════════════════ */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeStar}>✦</span>
            For every educator — teachers, edtech founders &amp; coaching institutes
          </div>
          <h1 className={styles.heroHeadline}>
            Everything You Need to Teach,{" "}
            <em>Sell</em>, and Grow.
            <br />In One Place.
          </h1>
          <p className={styles.heroSub}>
            Every tool a teacher or online academy needs — courses, payments, students, quizzes,
            branding, and AI — all live today. No add-ons. No commissions.
          </p>

          {/* CTA */}
          <div className={styles.heroCtas}>
            <Link href="/register" className={styles.heroCtaPrimary}>
              Start Free Trial →
            </Link>
            <Link href="/contact" className={styles.heroCtaSecondary}>
              Talk to an Expert
            </Link>
          </div>
          <p className={styles.heroMicro}>14-day free trial · No credit card required · Go live today</p>

          {/* Feature icon strip */}
          <div className={styles.heroFeatureStrip}>
            {[
              { icon: "🎓", label: "LMS", sub: "Courses & delivery" },
              { icon: "🏢", label: "ERP", sub: "Fees & operations" },
              { icon: "📋", label: "CRM", sub: "Leads & pipeline" },
              { icon: "✦", label: "AI", sub: "Built into everything" },
            ].map((f) => (
              <div key={f.label} className={styles.heroFeatureItem}>
                <span className={styles.heroFeatureIcon}>{f.icon}</span>
                <span className={styles.heroFeatureLabel}>{f.label}</span>
                <span className={styles.heroFeatureSub}>{f.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — Problem Bar
          ═══════════════════════════════════════════════ */}
      <section className={styles.problemSection}>
        <div className={styles.container}>
          <h2 className={styles.problemHeadline}>Sound Familiar?</h2>
          <div className={styles.problemGrid}>
            {[
              {
                emoji: "😤",
                text: "Sharing course videos on WhatsApp",
                consequence: "Students forward your content for free. You lose control the moment you hit send.",
              },
              {
                emoji: "💸",
                text: "Paying Teachable 30% commission",
                consequence: "You do all the teaching. They take ₹30,000 for every lakh you earn.",
              },
              {
                emoji: "📱",
                text: "Managing students in Excel sheets",
                consequence: "Students fall behind silently. You find out when they stop responding.",
              },
              {
                emoji: "⏰",
                text: "Building quizzes manually for hours",
                consequence: "Time you spend making question papers is time you can't spend teaching.",
              },
              {
                emoji: "🔗",
                text: "3 tools that don't talk to each other",
                consequence: "Your fee data, attendance, and course progress live in three separate places. Nothing connects.",
              },
              {
                emoji: "📉",
                text: "No idea which students are about to quit",
                consequence: "By the time you notice, they've already stopped paying. There's no early warning.",
              },
            ].map((p) => (
              <div key={p.text} className={styles.problemTile}>
                <span className={styles.problemEmoji}>{p.emoji}</span>
                <p className={styles.problemText}>{p.text}</p>
                <p className={styles.problemConsequence}>{p.consequence}</p>
              </div>
            ))}
          </div>
          <p className={styles.problemClose}>
            <strong>Edveo fixes every one of these.</strong>{" "}
            <a href="#solutions" className={styles.problemAnchor}>See how it works →</a>
          </p>
        </div>
      </section>

      {/* ── Jump nav — section anchors for returning visitors ── */}
      <nav className={styles.jumpNav} aria-label="Jump to section">
        <div className={styles.jumpNavInner}>
          <span className={styles.jumpNavLabel}>Jump to:</span>
          {[
            { href: "#sol-courses",     label: "Courses" },
            { href: "#sol-payments",    label: "Payments" },
            { href: "#sol-crm",         label: "CRM" },
            { href: "#sol-quizzes",     label: "Quizzes" },
            { href: "#sol-brand",       label: "Brand" },
            { href: "#sol-attendance",  label: "Attendance" },
            { href: "#sol-comms",       label: "Comms" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className={styles.jumpNavLink}>{label}</a>
          ))}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — Solution 1: Course Delivery
          ═══════════════════════════════════════════════ */}
      <section id="sol-courses" className={styles.solutionSection}>
        <div className={styles.container}>
          <div className={styles.solutionInner}>
            <div className={styles.solutionCopy}>
              <div className={styles.solutionProblemLabel}>
                THE PROBLEM: Courses scattered across Google Drive, YouTube, and WhatsApp
              </div>
              <h2 className={styles.solutionHeadline}>
                Deliver Professional Courses. From Your Own Platform.
              </h2>
              <p className={styles.solutionIntro}>
                Your students get a clean, branded portal — not a Google Drive link or a WhatsApp
                PDF. Every lesson, video, PDF, and quiz is organized in one place under your name
                and your domain.
              </p>
              <ul className={styles.solutionFeatureList}>
                {[
                  "Video lessons with progress tracking",
                  "PDF and document delivery — encrypted, no downloading",
                  "Drip scheduling — release content on your timeline",
                  "Course completion certificates — auto-generated",
                  "Live class integration — Zoom, Google Meet, Jitsi",
                ].map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
              <Link href="/register" className={styles.solutionCta}>Start Free Trial → your first course live in minutes</Link>
            </div>
            <CourseMockup />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — Solution 2: Payments & Revenue
          ═══════════════════════════════════════════════ */}
      <section id="sol-payments" className={styles.solutionSection}>
        <div className={styles.container}>
          <div className={`${styles.solutionInner} ${styles.reverse}`}>
            <div className={styles.solutionCopy}>
              <div className={styles.solutionProblemLabel}>
                THE PROBLEM: Chasing fees manually, losing money to platform commissions
              </div>
              <h2 className={styles.solutionHeadline}>
                Get Paid Automatically. Keep Every Rupee.
              </h2>
              <p className={styles.solutionIntro}>
                No more sending Razorpay links over WhatsApp and tracking who paid in a spreadsheet.
                Edveo handles the entire payment flow — collection, invoicing, reminders, and
                reconciliation.
              </p>
              <ul className={styles.solutionFeatureList}>
                {[
                  "Razorpay-integrated billing — 0% platform commission",
                  "Automated fee reminders via WhatsApp and SMS",
                  "Instalment plans and EMI support",
                  "GST invoices generated automatically",
                  "Revenue dashboard — see earnings in real time",
                ].map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
              <AiTag text="Edveo Intelligence predicts fee defaults 7 days before due date" />
            </div>
            <RevenueMockup />
          </div>
        </div>
      </section>

      {/* ── Testimonial: Fee leakage → Anand Kumar ── */}
      <div className={styles.inlineTestimonialSection}>
        <div className={styles.inlineTestimonial}>
          <blockquote>
            <p className={styles.inlineTestimonialQuote}>
              We were losing ₹40,000 every month — not because students didn&apos;t pay, but because we couldn&apos;t track who hadn&apos;t. Edveo&apos;s automated reminders recovered 94% of pending fees in the first billing cycle.
            </p>
            <div className={styles.inlineTestimonialAuthor}>
              <div className={styles.inlineTestimonialAvatar} data-initials="AK" />
              <div>
                <div className={styles.inlineTestimonialName}>Anand Kumar</div>
                <div className={styles.inlineTestimonialMeta}>Director, Apex IIT Coaching Centre · Patna (380 students)</div>
              </div>
            </div>
          </blockquote>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — Solution 3: Student CRM
          ═══════════════════════════════════════════════ */}
      <section id="sol-crm" className={styles.solutionSection}>
        <div className={styles.container}>
          <div className={styles.solutionInner}>
            <div className={styles.solutionCopy}>
              <div className={styles.solutionProblemLabel}>
                THE PROBLEM: Inquiries falling through WhatsApp, no follow-up system
              </div>
              <h2 className={styles.solutionHeadline}>
                Never Lose a Student Inquiry Again.
              </h2>
              <p className={styles.solutionIntro}>
                Every inquiry — Instagram DM, WhatsApp message, website form — captured in one
                pipeline. Assign follow-ups, track conversations, and convert leads to enrolled
                students automatically.
              </p>
              <ul className={styles.solutionFeatureList}>
                {[
                  "Lead pipeline with Kanban view",
                  "Source tracking — know which channel brings best students",
                  "One-click enrollment — lead becomes student profile instantly",
                  "Bulk WhatsApp messaging to student groups",
                  "Parent communication — automated attendance and result alerts",
                ].map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
              <AiTag text="Edveo Intelligence auto-scores every lead — know who to call first" />
            </div>
            <CrmMockup />
          </div>
        </div>
      </section>

      {/* ── Mid-page attention reset after 3 feature blocks ── */}
      <div className={styles.midBreak}>
        <p className={styles.midBreakEyebrow}>You&apos;ve seen 3 of 7 features</p>
        <h2 className={styles.midBreakHeadline}>Seen enough to know this is for you?</h2>
        <p className={styles.midBreakSub}>14-day free trial. Every feature unlocked. No credit card.</p>
        <Link href="/register" className={styles.midBreakBtn}>Start Free Trial →</Link>
        <p className={styles.midBreakSkip}>Or keep reading — 4 more features below.</p>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 6 — Solution 4: Quizzes & Assessments
          ═══════════════════════════════════════════════ */}
      <section id="sol-quizzes" className={styles.solutionSection}>
        <div className={styles.container}>
          <div className={`${styles.solutionInner} ${styles.reverse}`}>
            <div className={styles.solutionCopy}>
              <div className={styles.solutionProblemLabel}>
                THE PROBLEM: Building tests manually takes hours — and students memorize patterns
              </div>
              <h2 className={styles.solutionHeadline}>
                Generate a 50-Question Quiz in 30 Seconds.
              </h2>
              <p className={styles.solutionIntro}>
                Upload your chapter PDF or paste your syllabus. Edveo Intelligence generates a full
                question bank — MCQs, difficulty-tagged, syllabus-aligned — in seconds. Every test
                attempt gets different questions, so pattern memorization is impossible.
              </p>
              <ul className={styles.solutionFeatureList}>
                {[
                  "AI quiz generation from any PDF or syllabus",
                  "Proctored test mode — no tab switching, no cheating",
                  "Auto-grading with instant result delivery",
                  "Performance analytics per student per topic",
                  "Question bank management — reuse and remix questions",
                ].map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
              <AiTag text="Edveo Intelligence — infinite quiz variations, zero pattern memorization" />
            </div>
            <QuizMockup />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7 — Solution 5: Brand & Website
          ═══════════════════════════════════════════════ */}
      <section className={styles.solutionSection}>
        <div className={styles.container}>
          <div className={styles.solutionInner}>
            <div className={styles.solutionCopy}>
              <div className={styles.solutionProblemLabel}>
                THE PROBLEM: Selling from Instagram DMs — no professional presence, no credibility
              </div>
              <h2 className={styles.solutionHeadline}>
                Your Academy. Your Domain. Your Brand.
              </h2>
              <p className={styles.solutionIntro}>
                Stop sending students to a generic link. Edveo gives you a fully branded storefront
                — your name, your logo, your domain — that looks like a ₹50L custom-built website.
                No coding, no designer needed.
              </p>
              <ul className={styles.solutionFeatureList}>
                {[
                  "Custom domain — yourname.com or yourname.edveo.com",
                  "Branded course storefront with your logo and colors",
                  "Landing page builder — create enrollment pages in minutes",
                  "Blog and SEO tools — get found on Google",
                  "White-label — no \"Powered by Edveo\" on any customer-facing page",
                ].map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
            </div>
            <BrandMockup />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 8 — Solution 6: Attendance & Progress
          ═══════════════════════════════════════════════ */}
      <section className={styles.solutionSection}>
        <div className={styles.container}>
          <div className={`${styles.solutionInner} ${styles.reverse}`}>
            <div className={styles.solutionCopy}>
              <div className={styles.solutionProblemLabel}>
                THE PROBLEM: No visibility into which students are engaged and which are about to quit
              </div>
              <h2 className={styles.solutionHeadline}>
                Know Every Student. Before They Disappear.
              </h2>
              <p className={styles.solutionIntro}>
                Edveo tracks every student&apos;s attendance, assignment completion, quiz scores, and
                login activity — and surfaces the ones who need attention before they drop out or
                stop paying.
              </p>
              <ul className={styles.solutionFeatureList}>
                {[
                  "Digital attendance — one tap per session",
                  "Parent notifications — automatic alerts when student is absent",
                  "Student health score — attendance + assignments + quiz combined",
                  "At-risk detection — AI flags students showing drop signals",
                  "Progress reports — auto-generated, shareable with parents",
                ].map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
              <AiTag text="Edveo Intelligence detects at-risk students before they stop showing up" />
            </div>
            <AttendanceMockup />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 9 — Solution 7: Notifications
          ═══════════════════════════════════════════════ */}
      <section className={styles.solutionSection}>
        <div className={styles.container}>
          <div className={styles.solutionInner}>
            <div className={styles.solutionCopy}>
              <div className={styles.solutionProblemLabel}>
                THE PROBLEM: Important announcements lost in WhatsApp group chaos
              </div>
              <h2 className={styles.solutionHeadline}>
                Communicate Like a Professional Academy.
              </h2>
              <p className={styles.solutionIntro}>
                Replace WhatsApp broadcast lists with a proper communication system. Send
                announcements, class reminders, fee alerts, and result notifications — tracked,
                acknowledged, and logged.
              </p>
              <ul className={styles.solutionFeatureList}>
                {[
                  "In-app notifications with read receipts",
                  "Email + SMS + WhatsApp — all from one dashboard",
                  "Scheduled announcements — set it and forget it",
                  "Broadcast messaging to batch or course groups",
                  "Priority alerts — urgent notices that can't be missed",
                ].map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
            </div>
            <NotificationMockup />
          </div>
        </div>
      </section>

      {/* ── Testimonial: Full-platform switch → Priya Sharma ── */}
      <div className={styles.inlineTestimonialSection}>
        <div className={styles.inlineTestimonial}>
          <blockquote>
            <p className={styles.inlineTestimonialQuote}>
              We switched from Classplus after two years. The difference isn&apos;t just the pricing — it&apos;s that Edveo actually feels built for how Indian coaching institutes work. WhatsApp alerts, UPI splits, vernacular content. Our admin time dropped by 60%.
            </p>
            <div className={styles.inlineTestimonialAuthor}>
              <div className={styles.inlineTestimonialAvatar} data-initials="PS" />
              <div>
                <div className={styles.inlineTestimonialName}>Priya Sharma</div>
                <div className={styles.inlineTestimonialMeta}>Founder, Sharma Study Circle · Indore (620 students)</div>
              </div>
            </div>
          </blockquote>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 13 — Footer CTA
          ═══════════════════════════════════════════════ */}
      <section className={styles.footerCtaSection}>
        <div className={styles.container}>
          <h2 className={styles.footerCtaHeadline}>
            Every Tool. One Platform.{" "}
            <span>Start Today.</span>
          </h2>
          <p className={styles.footerCtaSub}>
            Your academy deserves better than a patchwork of 4 different tools.
          </p>
          <div className={styles.footerCtaButtons}>
            <Link href="/register" className={styles.footerBtnNavy} id="footer-cta-trial">
              Start Free Trial →
            </Link>
            <button className={styles.footerBtnGreen} id="footer-cta-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </button>
          </div>
          <div className={styles.trustLine}>
            <span>14-day free</span>
            <span>No credit card</span>
            <span>Cancel anytime</span>
            <span>Local support</span>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
