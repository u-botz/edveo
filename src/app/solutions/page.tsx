import type { Metadata } from "next";
import Link from "next/link";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CtaBanner from "../components/CtaBanner";
import HeroBackdrop from "../components/home/HeroBackdrop";
import { COMPANY_WHATSAPP_CTA_URL, COMPANY_WHATSAPP_URL } from "@/lib/companyPublicInfo";
import shell from "../components/home/home.module.css";
import styles from "./solutions.module.css";
import {
  CourseMockup,
  RevenueMockup,
  CrmMockup,
  QuizMockup,
  SiteMockup,
  AttendanceMockup,
  NotificationMockup,
} from "./mockups";

export const metadata: Metadata = {
  title: "Solutions — Edveo | Courses, Payments, CRM & AI for Teachers",
  description:
    "Every tool a teacher or online academy needs — courses, payments, students, quizzes, branding, and AI — all live today. No add-ons. No commissions.",
};

/* ── Icons ─────────────────────────────────────────── */
const path = (d: string, size = 20) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const SparkIcon = () =>
  path("M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5 10.1 10.9 5.5 9l4.6-1.4z", 14);

function CheckIcon() {
  return (
    <span className={styles.featureCheck}>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2 6l3 3 5-5" />
      </svg>
    </span>
  );
}

function AiNote({ text }: { text: string }) {
  return (
    <div className={styles.aiTag}>
      <span className={styles.aiTagIcon}>
        <SparkIcon />
      </span>
      <span>{text}</span>
    </div>
  );
}

/* ── Content ───────────────────────────────────────── */

const CAPABILITIES = [
  { label: "LMS", sub: "Courses & delivery", d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" },
  { label: "ERP", sub: "Fees & operations", d: "M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" },
  { label: "CRM", sub: "Leads & pipeline", d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .1M19 8v6M22 11h-6" },
  { label: "AI", sub: "Built into everything", d: "M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5 10.1 10.9 5.5 9l4.6-1.4z" },
];

const PROBLEMS = [
  {
    text: "Sharing course videos on WhatsApp",
    consequence: "Students forward your content for free. You lose control the moment you hit send.",
    d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  },
  {
    text: "Paying a platform 30% commission",
    consequence: "You do all the teaching. They take ₹30,000 for every lakh you earn.",
    d: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    text: "Managing students in Excel sheets",
    consequence: "Students fall behind silently. You find out when they stop responding.",
    d: "M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18",
  },
  {
    text: "Building quizzes manually for hours",
    consequence: "Time you spend making question papers is time you cannot spend teaching.",
    d: "M12 6v6l4 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z",
  },
  {
    text: "Three tools that do not talk to each other",
    consequence: "Fee data, attendance and course progress live in three separate places. Nothing connects.",
    d: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  },
  {
    text: "No idea which students are about to quit",
    consequence: "By the time you notice, they have already stopped paying. There is no early warning.",
    d: "M3 3v18h18M7 13l4 4 3-5 5 6",
  },
];

const JUMP = [
  { href: "#sol-courses", label: "Courses" },
  { href: "#sol-payments", label: "Payments" },
  { href: "#sol-crm", label: "CRM" },
  { href: "#sol-quizzes", label: "Quizzes" },
  { href: "#sol-brand", label: "Brand" },
  { href: "#sol-attendance", label: "Attendance" },
  { href: "#sol-comms", label: "Comms" },
];

type Solution = {
  id: string;
  ground: string;
  reverse?: boolean;
  problem: string;
  title: string;
  intro: string;
  features: string[];
  cta?: string;
  ai?: string;
  mockup: React.ReactNode;
};

const SOLUTIONS: Solution[] = [
  {
    id: "sol-courses",
    ground: shell.groundWhite,
    problem: "The problem: courses scattered across Drive, YouTube and WhatsApp",
    title: "Deliver professional courses from your own platform",
    intro:
      "Your students get a clean, branded portal — not a Drive link or a WhatsApp PDF. Every lesson, video, document and quiz sits in one place, under your name and your domain.",
    features: [
      "Video lessons with progress tracking",
      "PDF and document delivery — encrypted, no downloading",
      "Drip scheduling — release content on your timeline",
      "Course completion certificates, generated automatically",
      "Live class integration — Zoom, Google Meet, Jitsi",
    ],
    cta: "Get your first course live",
    mockup: <CourseMockup />,
  },
  {
    id: "sol-payments",
    ground: shell.groundFaint,
    reverse: true,
    problem: "The problem: chasing fees by hand, losing money to commissions",
    title: "Get paid automatically. Keep every rupee.",
    intro:
      "No more sending payment links over WhatsApp and tracking who paid in a spreadsheet. Edveo handles the whole flow — collection, invoicing, reminders and reconciliation.",
    features: [
      "Razorpay-integrated billing — 0% platform commission",
      "Automated fee reminders over WhatsApp and SMS",
      "Instalment plans and EMI support",
      "GST invoices generated automatically",
      "Revenue dashboard — earnings in real time",
    ],
    ai: "Edveo Intelligence flags likely fee defaults 7 days before the due date.",
    mockup: <RevenueMockup />,
  },
  {
    id: "sol-crm",
    ground: shell.groundWhite,
    problem: "The problem: enquiries lost between WhatsApp, calls and notebooks",
    title: "Turn enquiries into admissions, not missed calls",
    intro:
      "Every enquiry lands in a pipeline with an owner and a next step. You can see who is warm, who has gone quiet, and who to call first.",
    features: [
      "Visual pipeline from first enquiry to enrolled",
      "Follow-up reminders assigned to real people",
      "Source tracking — know which channels actually convert",
      "Bulk WhatsApp follow-ups from any stage",
      "Admission intent captured before the seat is confirmed",
    ],
    ai: "Intent scoring ranks today's callbacks so the hottest leads are never left waiting.",
    mockup: <CrmMockup />,
  },
  {
    id: "sol-quizzes",
    ground: shell.groundFaint,
    reverse: true,
    problem: "The problem: hours lost building question papers by hand",
    title: "Tests that write themselves, and mark themselves",
    intro:
      "Generate a full question paper from a chapter, an image of a textbook page, or your own bank — then let the results come back scored and analysed.",
    features: [
      "Question generation from chapters, notes or images",
      "Difficulty mix you control — easy, medium, hard",
      "Auto-grading with instant student feedback",
      "Topic-level heatmaps showing exactly what the batch missed",
      "Reattempt and flag-for-review built in",
    ],
    cta: "See it build a paper",
    mockup: <QuizMockup />,
  },
  {
    id: "sol-brand",
    ground: shell.groundWhite,
    problem: "The problem: your academy looks like everyone else's",
    title: "Your brand, your domain, your students",
    intro:
      "A public website and student portal carrying your name and colours — not a marketplace listing where you compete with the teacher next door.",
    features: [
      "Your own custom domain",
      "White-labelled student portal — no Edveo branding",
      "Course storefront with online enrolment",
      "Your logo and brand colours across every touchpoint",
      "Affiliate and referral programme built in",
    ],
    cta: "See a live academy site",
    mockup: <SiteMockup />,
  },
  {
    id: "sol-attendance",
    ground: shell.groundFaint,
    reverse: true,
    problem: "The problem: nobody notices a student slipping until they leave",
    title: "Spot the student who is drifting, weeks earlier",
    intro:
      "Attendance, test scores and fee status sit on one record — so a pattern across all three surfaces as a warning instead of hiding in three systems.",
    features: [
      "Attendance for students and staff in one place",
      "Per-student health across attendance, scores and fees",
      "Parent visibility, without a phone call",
      "Early-warning flags on drop-off risk",
      "Batch-level trends, not just individual rows",
    ],
    ai: "Risk scoring combines absences, falling scores and login gaps into one flag.",
    mockup: <AttendanceMockup />,
  },
  {
    id: "sol-comms",
    ground: shell.groundWhite,
    problem: "The problem: announcements lost in a group of 300",
    title: "Reach parents where they actually read",
    intro:
      "Fee due, absent today, results published — sent over WhatsApp automatically, with delivery you can actually see.",
    features: [
      "WhatsApp notifications for fees, absence and results",
      "Scheduled class reminders across batches",
      "Parent alerts triggered by real events, not manual sends",
      "Read receipts and delivery reporting",
      "Templates in the language your parents use",
    ],
    cta: "Talk through your setup",
    mockup: <NotificationMockup />,
  },
];

export default function SolutionsPage() {
  return (
    <main>
      <SiteNavbar activePage="solutions" />

      {/* Dark page hero — also what keeps the transparent navbar legible up top */}
      <section className={styles.pageHero} data-hero>
        <div className={styles.pageHeroBg}>
          <HeroBackdrop />
        </div>
        <div className={styles.pageHeroInner}>
          <span className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            For teachers, online academies and coaching institutes
          </span>
          <h1 className={styles.heroTitle}>
            Everything you need to teach, sell and grow.{" "}
            <span className={styles.heroAccent}>In one place</span>
          </h1>
          <p className={styles.heroSub}>
            Courses, payments, students, quizzes, branding and AI — all live today.
            No add-ons, no commissions.
          </p>
          <div className={styles.heroCtas}>
            <a href={COMPANY_WHATSAPP_CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              Get a free demo
            </a>
            <Link href="/contact" className={styles.btnGhost}>
              Talk to an expert
            </Link>
          </div>
          <p className={styles.heroMicro}>Free to start · No credit card required · Go live today</p>

          <div className={styles.capStrip}>
            {CAPABILITIES.map((c) => (
              <div key={c.label} className={styles.capTile}>
                <span className={styles.capIcon}>{path(c.d, 19)}</span>
                <span className={styles.capLabel}>{c.label}</span>
                <span className={styles.capSub}>{c.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className={`${shell.section} ${shell.groundFaint2}`}>
        <div className={shell.container}>
          <div className={shell.heading}>
            <span className={shell.eyebrow}>Sound familiar</span>
            <h2 className={shell.title}>The six things that quietly cost you money</h2>
            <p className={shell.subtitle}>
              None of these feel urgent on any given day. Together they are the reason
              running an institute takes more admin than teaching.
            </p>
          </div>

          <ul className={styles.problemGrid}>
            {PROBLEMS.map((p) => (
              <li key={p.text} className={styles.problemTile}>
                <span className={styles.problemIcon}>{path(p.d, 20)}</span>
                <p className={styles.problemText}>{p.text}</p>
                <p className={styles.problemConsequence}>{p.consequence}</p>
              </li>
            ))}
          </ul>

          <p className={styles.problemClose}>
            <strong>Edveo fixes every one of these.</strong>{" "}
            <a href="#sol-courses" className={styles.problemAnchor}>See how →</a>
          </p>
        </div>
      </section>

      {/* Jump nav */}
      <nav className={styles.jumpNav} aria-label="Jump to section">
        <div className={styles.jumpNavInner}>
          <span className={styles.jumpLabel}>Jump to</span>
          {JUMP.map((j) => (
            <a key={j.href} href={j.href} className={styles.jumpLink}>
              {j.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Solution blocks */}
      {SOLUTIONS.map((s, i) => (
        <div key={s.id}>
          <section id={s.id} className={`${shell.section} ${s.ground}`}>
            <div className={shell.container}>
              <div className={`${styles.solutionRow} ${s.reverse ? styles.solutionRowReverse : ""}`}>
                <div className={styles.solutionCopy}>
                  <span className={styles.problemLabel}>{s.problem}</span>
                  <h2 className={styles.solutionTitle}>{s.title}</h2>
                  <p className={styles.solutionIntro}>{s.intro}</p>
                  <ul className={styles.featureList}>
                    {s.features.map((f) => (
                      <li key={f}>
                        <CheckIcon />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {s.ai && <AiNote text={s.ai} />}
                  {s.cta && (
                    <a
                      href={COMPANY_WHATSAPP_CTA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.solutionCta}
                    >
                      {s.cta} →
                    </a>
                  )}
                </div>
                {s.mockup}
              </div>
            </div>
          </section>

          {/* Mid-page reset, once the reader has seen three blocks */}
          {i === 2 && (
            <section className={`${shell.section} ${shell.groundTint}`}>
              <div className={shell.container}>
                <div className={styles.midBreak}>
                  <h2 className={styles.midBreakTitle}>Seen enough to know this is for you?</h2>
                  <a
                    href={COMPANY_WHATSAPP_CTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPrimary}
                  >
                    Get a free demo
                  </a>
                </div>
              </div>
            </section>
          )}
        </div>
      ))}

      <CtaBanner
        headline="Every tool. One platform. Start today."
        accentSub="Your academy deserves better than a patchwork of four different tools."
        primaryLabel="Get a free demo →"
        secondaryLabel="Chat on WhatsApp"
        secondaryHref={COMPANY_WHATSAPP_URL}
        trustItems={["Free to start", "No credit card required", "Cancel anytime", "Local support"]}
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
