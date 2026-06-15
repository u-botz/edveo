import styles from "./page.module.css";
import heroStyles from "./components/hero.module.css";
import Link from "next/link";
import { TeacherIcon, EdtechIcon, InstitutionIcon } from "./components/HeroSection";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CtaBanner from "./components/CtaBanner";
import HeroSection from "./components/HeroSection";
import FeatureExplorer from "./components/FeatureExplorer";
import MobileAppBanner from "./components/MobileAppBanner";
import { IntelligenceDemoSection } from "@/features/intelligence-demo";
import { COMPANY_WHATSAPP_URL } from "@/lib/companyPublicInfo";

export default function Home() {
  return (
    <main className={styles.main}>
      <SiteNavbar activePage="home" />

      {/* Hero */}
      <HeroSection />

      <div dangerouslySetInnerHTML={{ __html: `<!-- EDVEO DASHBOARD SECTION START -->
<section style="padding:56px 0 0;background:#F3F4F6;">

<div style="text-align:center;padding:0 24px;margin-bottom:28px;">
  <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;color:#15803D;margin:0 0 8px;">YOUR INSTITUTE DASHBOARD</p>
  <h2 style="font-size:32px;font-weight:700;color:#0F172A;line-height:1.2;margin:0 0 10px;">Everything about your institute,<br>in one glance.</h2>
  <p style="font-size:14px;color:#6B7280;line-height:1.6;max-width:480px;margin:0 auto;">Fees collected, students at risk, batch health and revenue — without opening a single Excel sheet or WhatsApp group.</p>
</div>

<div style="display:flex;justify-content:center;gap:8px;margin-bottom:24px;flex-wrap:wrap;padding:0 24px;">
  <button onclick="eTab('today',this)" style="font-size:12px;font-weight:500;padding:7px 18px;border-radius:999px;border:1.5px solid #0F172A;background:#0F172A;color:#fff;cursor:pointer;">Today's Overview</button>
  <button onclick="eTab('student',this)" style="font-size:12px;font-weight:500;padding:7px 18px;border-radius:999px;border:1.5px solid #E5E7EB;background:#fff;color:#6B7280;cursor:pointer;">Student Health</button>
  <button onclick="eTab('fee',this)" style="font-size:12px;font-weight:500;padding:7px 18px;border-radius:999px;border:1.5px solid #E5E7EB;background:#fff;color:#6B7280;cursor:pointer;">Fee Collection</button>
</div>

<div style="max-width:960px;margin:0 auto;border-radius:12px 12px 0 0;overflow:hidden;border:1px solid #E5E7EB;border-bottom:none;">

  <div style="background:#1C1C1E;padding:9px 14px;display:flex;align-items:center;gap:6px;">
    <div style="width:9px;height:9px;border-radius:50%;background:#FF5F57;"></div>
    <div style="width:9px;height:9px;border-radius:50%;background:#FEBC2E;"></div>
    <div style="width:9px;height:9px;border-radius:50%;background:#28C840;"></div>
    <div style="background:#2C2C2E;border-radius:4px;padding:3px 0;font-size:10px;color:#6B7280;flex:1;max-width:240px;margin:0 auto;text-align:center;">app.edveo.co/dashboard</div>
  </div>

  <div style="display:grid;grid-template-columns:180px 1fr;">

    <div style="background:#fff;border-right:1px solid #E5E7EB;min-height:500px;">
      <div style="background:#1A1A2E;padding:10px 14px;display:flex;align-items:center;gap:8px;">
        <div style="width:28px;height:28px;background:#15803D;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;">YI</div>
        <div>
          <div style="font-size:12px;font-weight:600;color:#fff;">Your Institute</div>
          <div style="font-size:8px;color:rgba(255,255,255,0.4);letter-spacing:0.06em;margin-top:1px;">OWNER PORTAL</div>
        </div>
      </div>
      <div style="padding:8px 0;">
        <div style="padding:7px 14px;font-size:11px;color:#6B7280;">Get Started</div>
        <div style="padding:7px 14px;font-size:11px;color:#15803D;font-weight:600;background:#F0FDF4;border-right:2px solid #15803D;">Dashboard</div>
        <div style="padding:10px 14px 3px;font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;">CREATE</div>
        <div style="padding:7px 14px;font-size:11px;color:#6B7280;">LMS</div>
        <div style="padding:10px 14px 3px;font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;">GROW</div>
        <div style="padding:7px 14px;font-size:11px;color:#6B7280;">CRM</div>
        <div style="padding:10px 14px 3px;font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;">OPERATE</div>
        <div style="padding:7px 14px;font-size:11px;color:#6B7280;">ERP</div>
        <div style="padding:10px 14px 3px;font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;">ANALYSE</div>
        <div style="padding:7px 14px;font-size:11px;color:#6B7280;">Analytics</div>
        <div style="padding:10px 14px 3px;font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;">PLATFORM SETUP</div>
        <div style="padding:7px 14px;font-size:11px;color:#6B7280;">Website templates</div>
        <div style="padding:7px 14px;font-size:11px;color:#6B7280;">File Manager</div>
        <div style="padding:7px 14px;font-size:11px;color:#6B7280;">Settings</div>
      </div>
    </div>

    <div style="background:#F9FAFB;">

      <div style="background:#fff;border-bottom:1px solid #E5E7EB;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="font-size:15px;font-weight:600;color:#0F172A;">Dashboard</div>
          <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:6px;padding:5px 10px;font-size:10px;color:#9CA3AF;width:180px;">Search students, courses...</div>
        </div>
        <div style="display:flex;gap:6px;">
          <div style="font-size:10px;padding:5px 10px;border-radius:6px;background:#15803D;color:#fff;border:1px solid #15803D;">+ Add Student</div>
          <div style="font-size:10px;padding:5px 10px;border-radius:6px;background:#fff;color:#374151;border:1px solid #E5E7EB;">Record Payment</div>
          <div style="font-size:10px;padding:5px 10px;border-radius:6px;background:#fff;color:#374151;border:1px solid #E5E7EB;">Add Lead</div>
          <div style="font-size:10px;padding:5px 10px;border-radius:6px;background:#fff;color:#374151;border:1px solid #E5E7EB;">Timetable</div>
        </div>
      </div>

      <div style="padding:14px 16px;">

        <div style="margin-bottom:12px;">
          <div style="font-size:18px;font-weight:600;color:#0F172A;">Good afternoon, sb</div>
          <div style="font-size:10px;color:#9CA3AF;margin-bottom:5px;">Monday, 15 Jun 2026</div>
          <div style="display:inline-flex;align-items:center;gap:4px;background:#F0FDF4;border-radius:999px;padding:3px 10px;font-size:9px;font-weight:600;color:#15803D;margin-bottom:12px;">
            <div style="width:5px;height:5px;border-radius:50%;background:#15803D;"></div>
            INSTITUTE SYNCED
          </div>
        </div>

        <div style="background:#166534;border-radius:8px;padding:12px 14px;margin-bottom:14px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:rgba(255,255,255,0.55);margin-bottom:4px;display:flex;align-items:center;gap:5px;">
            <div style="width:6px;height:6px;border-radius:50%;background:#4ADE80;"></div>
            EDVEO AI · DAILY BRIEF
          </div>
          <div style="font-size:11px;font-weight:600;color:#fff;margin-bottom:3px;">Today's institute operations at a glance</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.7);line-height:1.5;display:flex;align-items:flex-start;gap:5px;">
            <span style="color:#4ADE80;margin-top:1px;">●</span>
            14 students have pending fees · 7 students below 60% attendance · Fee collection up 18% vs last month
          </div>
        </div>

        <div id="edveo-panel-today" style="display:block;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;margin-bottom:8px;">TODAY AT YOUR INSTITUTE</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px;">
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:10px;">
              <div style="font-size:9px;color:#9CA3AF;margin-bottom:3px;">COLLECTED (MONTH)</div>
              <div style="font-size:20px;font-weight:700;color:#0F172A;line-height:1;margin-bottom:2px;">₹2.4L</div>
              <div style="font-size:9px;color:#15803D;">+18% vs last month</div>
              <div style="height:2px;background:#F3F4F6;border-radius:1px;margin-top:6px;"><div style="width:86%;height:100%;background:#15803D;border-radius:1px;"></div></div>
            </div>
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:10px;">
              <div style="font-size:9px;color:#9CA3AF;margin-bottom:3px;">STUDENTS</div>
              <div style="font-size:20px;font-weight:700;color:#0F172A;line-height:1;margin-bottom:2px;">200</div>
              <div style="font-size:9px;color:#15803D;">+12 joined this month</div>
            </div>
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:10px;">
              <div style="font-size:9px;color:#9CA3AF;margin-bottom:3px;">ATTENDANCE TODAY</div>
              <div style="font-size:20px;font-weight:700;color:#0F172A;line-height:1;margin-bottom:2px;">83%</div>
              <div style="font-size:9px;color:#DC2626;">7 students absent</div>
            </div>
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:10px;">
              <div style="font-size:9px;color:#9CA3AF;margin-bottom:3px;">OPEN LEADS</div>
              <div style="font-size:20px;font-weight:700;color:#0F172A;line-height:1;margin-bottom:2px;">18</div>
              <div style="font-size:9px;color:#9CA3AF;">in admissions pipeline</div>
            </div>
          </div>
          <div style="font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;margin-bottom:8px;">ADMISSIONS FUNNEL</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:12px;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div style="font-size:11px;font-weight:600;color:#0F172A;">Admissions pipeline</div>
              <div style="font-size:9px;color:#15803D;">View pipeline →</div>
            </div>
            <div style="display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:6px;">
              <div style="background:#F0FDF4;border:1px solid #DCFCE7;border-radius:6px;padding:8px 10px;">
                <div style="font-size:8px;font-weight:600;color:#15803D;margin-bottom:3px;">OPEN LEADS</div>
                <div style="font-size:18px;font-weight:700;color:#0F172A;">18</div>
              </div>
              <div style="font-size:12px;color:#D1D5DB;text-align:center;">→</div>
              <div style="background:#F0FDF4;border:1px solid #DCFCE7;border-radius:6px;padding:8px 10px;">
                <div style="font-size:8px;font-weight:600;color:#15803D;margin-bottom:3px;">STUDENTS</div>
                <div style="font-size:18px;font-weight:700;color:#0F172A;">200</div>
                <div style="font-size:8px;color:#9CA3AF;">72% enrolled</div>
              </div>
              <div style="font-size:12px;color:#D1D5DB;text-align:center;">→</div>
              <div style="background:#F0FDF4;border:1px solid #DCFCE7;border-radius:6px;padding:8px 10px;">
                <div style="font-size:8px;font-weight:600;color:#15803D;margin-bottom:3px;">THIS WEEK</div>
                <div style="font-size:18px;font-weight:700;color:#0F172A;">4</div>
                <div style="font-size:8px;color:#9CA3AF;">new admissions</div>
              </div>
            </div>
          </div>
          <div style="font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;margin-bottom:8px;">INSTITUTE PERFORMANCE</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;"><div style="font-size:11px;font-weight:600;color:#0F172A;">Programs &amp; batches</div><div style="font-size:9px;color:#15803D;">View all →</div></div>
              <div style="font-size:9px;color:#9CA3AF;margin-bottom:8px;">Enrollment and course health</div>
              <div style="display:flex;align-items:center;padding:5px 0;border-bottom:1px solid #F9FAFB;"><div style="font-size:10px;color:#374151;flex:1;">NEET Batch A</div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#DCFCE7;color:#15803D;font-weight:500;">88 students</div></div>
              <div style="display:flex;align-items:center;padding:5px 0;border-bottom:1px solid #F9FAFB;"><div style="font-size:10px;color:#374151;flex:1;">Class 11–12 Science</div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#DCFCE7;color:#15803D;font-weight:500;">62 students</div></div>
              <div style="display:flex;align-items:center;padding:5px 0;"><div style="font-size:10px;color:#374151;flex:1;">Degree / Other</div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#FEF9C3;color:#854D0E;font-weight:500;">50 · low enrol</div></div>
            </div>
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;"><div style="font-size:11px;font-weight:600;color:#0F172A;">Needs attention</div><div style="font-size:9px;color:#15803D;">Manage →</div></div>
              <div style="font-size:9px;color:#9CA3AF;margin-bottom:8px;">Items that need action today</div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #F9FAFB;"><div style="width:22px;height:22px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;">!</div><div style="font-size:10px;color:#374151;flex:1;">14 students — fees pending</div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#FEE2E2;color:#DC2626;font-weight:500;">Urgent</div></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #F9FAFB;"><div style="width:22px;height:22px;border-radius:50%;background:#FEF9C3;color:#854D0E;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;">↓</div><div style="font-size:10px;color:#374151;flex:1;">7 students — low attendance</div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#FEF9C3;color:#854D0E;font-weight:500;">Review</div></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 0;"><div style="width:22px;height:22px;border-radius:50%;background:#DCFCE7;color:#15803D;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;">↑</div><div style="font-size:10px;color:#374151;flex:1;">Revenue up 18% this month</div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#DCFCE7;color:#15803D;font-weight:500;">Great</div></div>
            </div>
          </div>
        </div>

        <div id="edveo-panel-student" style="display:none;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;margin-bottom:8px;">STUDENT HEALTH</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:12px;margin-bottom:12px;">
            <div style="font-size:11px;font-weight:600;color:#0F172A;margin-bottom:2px;">Enrollment snapshot</div>
            <div style="font-size:9px;color:#9CA3AF;margin-bottom:10px;">Across all batches</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
              <div style="background:#F0FDF4;border-radius:6px;padding:8px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#15803D;margin-bottom:2px;">200</div><div style="font-size:9px;color:#15803D;">Total students</div></div>
              <div style="background:#F0FDF4;border-radius:6px;padding:8px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#15803D;margin-bottom:2px;">12</div><div style="font-size:9px;color:#15803D;">New this month</div></div>
              <div style="background:#FFFBEB;border-radius:6px;padding:8px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#854D0E;margin-bottom:2px;">4</div><div style="font-size:9px;color:#854D0E;">New this week</div></div>
              <div style="background:#FEF2F2;border-radius:6px;padding:8px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#DC2626;margin-bottom:2px;">7</div><div style="font-size:9px;color:#DC2626;">At risk</div></div>
            </div>
          </div>
          <div style="font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;margin-bottom:8px;">AT-RISK STUDENTS — BELOW 60% ATTENDANCE</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><div style="font-size:11px;font-weight:600;color:#0F172A;">Students needing attention</div><div style="font-size:9px;color:#15803D;">Notify all parents →</div></div>
            <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #F9FAFB;"><div style="width:22px;height:22px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:600;flex-shrink:0;">MF</div><div style="flex:1;"><div style="font-size:10px;color:#374151;">Mohammed Faiz</div><div style="font-size:9px;color:#9CA3AF;">NEET Batch A</div></div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#FEE2E2;color:#DC2626;font-weight:500;">54% · 3 fees pending</div></div>
            <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #F9FAFB;"><div style="width:22px;height:22px;border-radius:50%;background:#FEF9C3;color:#854D0E;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:600;flex-shrink:0;">PA</div><div style="flex:1;"><div style="font-size:10px;color:#374151;">Priya Anand</div><div style="font-size:9px;color:#9CA3AF;">Class 12 Science</div></div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#FEF9C3;color:#854D0E;font-weight:500;">61% attendance</div></div>
            <div style="display:flex;align-items:center;gap:8px;padding:5px 0;"><div style="width:22px;height:22px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:600;flex-shrink:0;">RA</div><div style="flex:1;"><div style="font-size:10px;color:#374151;">Roshan Ali</div><div style="font-size:9px;color:#9CA3AF;">Degree Batch</div></div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#FEE2E2;color:#DC2626;font-weight:500;">48% · may dropout</div></div>
          </div>
        </div>

        <div id="edveo-panel-fee" style="display:none;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;margin-bottom:8px;">FEE COLLECTION BY BATCH</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:12px;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><div><div style="font-size:11px;font-weight:600;color:#0F172A;">Batch fee progress</div><div style="font-size:9px;color:#9CA3AF;">Expected vs collected per batch</div></div><div style="font-size:9px;color:#15803D;">Fee reports →</div></div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #F9FAFB;"><div style="font-size:10px;color:#374151;flex:1;">NEET Batch A</div><div style="width:80px;height:5px;background:#F3F4F6;border-radius:3px;overflow:hidden;"><div style="width:92%;height:100%;background:#15803D;border-radius:3px;"></div></div><div style="font-size:9px;font-weight:600;color:#15803D;min-width:30px;text-align:right;">92%</div></div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #F9FAFB;"><div style="font-size:10px;color:#374151;flex:1;">Class 11–12 Science</div><div style="width:80px;height:5px;background:#F3F4F6;border-radius:3px;overflow:hidden;"><div style="width:84%;height:100%;background:#15803D;border-radius:3px;"></div></div><div style="font-size:9px;font-weight:600;color:#15803D;min-width:30px;text-align:right;">84%</div></div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 0;"><div style="font-size:10px;color:#374151;flex:1;">Degree / Other</div><div style="width:80px;height:5px;background:#F3F4F6;border-radius:3px;overflow:hidden;"><div style="width:61%;height:100%;background:#F59E0B;border-radius:3px;"></div></div><div style="font-size:9px;font-weight:600;color:#854D0E;min-width:30px;text-align:right;">61%</div></div>
          </div>
          <div style="font-size:9px;font-weight:600;letter-spacing:0.07em;color:#9CA3AF;margin-bottom:8px;">OVERDUE — ACTION NEEDED</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><div style="font-size:11px;font-weight:600;color:#0F172A;">14 students with pending fees</div><div style="font-size:9px;color:#15803D;">Send all reminders →</div></div>
            <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #F9FAFB;"><div style="width:22px;height:22px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:600;flex-shrink:0;">AK</div><div style="flex:1;"><div style="font-size:10px;color:#374151;">Amal Krishnan</div><div style="font-size:9px;color:#9CA3AF;">Class 11 Science</div></div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#FEE2E2;color:#DC2626;font-weight:500;">₹4,500 · 32 days</div></div>
            <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #F9FAFB;"><div style="width:22px;height:22px;border-radius:50%;background:#FEF9C3;color:#854D0E;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:600;flex-shrink:0;">SF</div><div style="flex:1;"><div style="font-size:10px;color:#374151;">Sana Fathima</div><div style="font-size:9px;color:#9CA3AF;">NEET Batch A</div></div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#FEF9C3;color:#854D0E;font-weight:500;">₹2,200 · 18 days</div></div>
            <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #F9FAFB;"><div style="width:22px;height:22px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:600;flex-shrink:0;">RM</div><div style="flex:1;"><div style="font-size:10px;color:#374151;">Rahul Menon</div><div style="font-size:9px;color:#9CA3AF;">Class 12 Commerce</div></div><div style="font-size:8px;padding:2px 5px;border-radius:3px;background:#FEE2E2;color:#DC2626;font-weight:500;">₹3,800 · 41 days</div></div>
            <div style="margin-top:8px;padding-top:8px;border-top:1px solid #F3F4F6;display:flex;justify-content:space-between;align-items:center;">
              <div style="font-size:10px;color:#9CA3AF;">Total pending: ₹38,500 across 14 students</div>
              <div style="font-size:10px;color:#15803D;font-weight:500;cursor:pointer;">Send WhatsApp reminders to all →</div>
            </div>
          </div>
        </div>

      </div>

      <div style="text-align:center;padding:14px 16px;background:#fff;border-top:1px solid #E5E7EB;">
        <div style="font-size:11px;color:#6B7280;">Sample data shown — your real institute numbers appear when you sign up.</div>
        <div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:8px;">
          <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:999px;padding:4px 12px;font-size:10px;color:#374151;">No Excel needed</div>
          <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:999px;padding:4px 12px;font-size:10px;color:#374151;">Auto fee reminders</div>
          <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:999px;padding:4px 12px;font-size:10px;color:#374151;">Live in 5 minutes</div>
        </div>
      </div>

    </div>
  </div>
</div>

</section>

<script>
function eTab(t,btn){
  document.querySelectorAll('[id^="edveo-panel-"]').forEach(function(p){p.style.display='none';});
  document.querySelectorAll('[onclick^="eTab"]').forEach(function(b){
    b.style.background='#fff';b.style.color='#6B7280';b.style.borderColor='#E5E7EB';
  });
  document.getElementById('edveo-panel-'+t).style.display='block';
  btn.style.background='#0F172A';btn.style.color='#fff';btn.style.borderColor='#0F172A';
}
</script>
<!-- EDVEO DASHBOARD SECTION END -->` }} />

      <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "56px", paddingBottom: "56px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <h2 className={heroStyles.audienceHeading}>BUILT FOR EVERY INSTITUTION TYPE</h2>
          <div className={heroStyles.audienceCards} role="group" aria-label="Choose your path">
            <Link href="/edtech" className={heroStyles.audienceCard}>
              <div className={heroStyles.audienceCardIcon}>
                <EdtechIcon />
              </div>
              <div className={heroStyles.audienceCardBody}>
                <span className={heroStyles.audienceCardTitle}>I run an online academy</span>
                <span className={heroStyles.audienceCardDesc}>Host live classes, sell courses, manage students and payments — without juggling 5 different tools.</span>
              </div>
              <span className={heroStyles.audienceCardArrow}>→</span>
            </Link>

            <Link href="/institutions" className={heroStyles.audienceCard}>
              <div className={heroStyles.audienceCardIcon}>
                <InstitutionIcon />
              </div>
              <div className={heroStyles.audienceCardBody}>
                <span className={heroStyles.audienceCardTitle}>I run a coaching institute</span>
                <span className={heroStyles.audienceCardDesc}>Manage students, fees, attendance, batches and staff — all from one dashboard. No more registers or WhatsApp chaos.</span>
              </div>
              <span className={heroStyles.audienceCardArrow}>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Explorer — tabbed, equal real estate for all 5 features */}
      <FeatureExplorer />

      {/* Intelligence Demo Section */}
      <IntelligenceDemoSection />

      {/* Mobile App — standalone premium section */}
      <MobileAppBanner />

      {/* ROI / Pain-to-Outcome Bridge */}
      <section className={styles.roiSection} aria-labelledby="roi-section-heading">
        <div className={styles.container}>
          <p className={styles.roiEyebrow}>The cost of doing nothing</p>
          <h2 id="roi-section-heading" className={styles.roiTitle}>
            What your current setup is actually costing you
          </h2>
          <p className={styles.roiSubtitle}>
            Three segments. Three different pain points. All verified from real operations.
          </p>

          <div className={styles.roiGrid}>

            {/* Offline institutes */}
            <div className={styles.roiCard}>
              <div className={styles.roiCardHeader}>
                <div className={styles.roiPersonaBadge} data-persona="institute">🏫 Offline institutes</div>
              </div>
              <div className={styles.roiRow}>
                <div className={styles.roiBefore}>
                  <div className={styles.roiBeforeLabel}>Today</div>
                  <div className={styles.roiBeforeItem}>₹40K–₹80K/yr lost to fee leakage from manual collection</div>
                  <div className={styles.roiBeforeItem}>10–15 hrs/week chasing fees and attendance manually</div>
                  <div className={styles.roiBeforeItem}>Parents calling for updates you can&apos;t easily pull</div>
                </div>
                <div className={styles.roiArrow} aria-hidden>→</div>
                <div className={styles.roiAfter}>
                  <div className={styles.roiAfterLabel}>With Edveo</div>
                  <div className={styles.roiAfterItem}>Automated reminders collect fees without staff</div>
                  <div className={styles.roiAfterItem}>Attendance and fees updated in real time</div>
                  <div className={styles.roiAfterItem}>Parents get instant updates — zero calls to handle</div>
                </div>
              </div>
              <div className={styles.roiOutcome}>
                <span className={styles.roiOutcomeNumber}>8 hrs</span>
                <span className={styles.roiOutcomeText}>saved every week on admin — from day one</span>
              </div>
            </div>

            {/* Online academies */}
            <div className={styles.roiCard}>
              <div className={styles.roiCardHeader}>
                <div className={styles.roiPersonaBadge} data-persona="edtech">🚀 Online academies</div>
              </div>
              <div className={styles.roiRow}>
                <div className={styles.roiBefore}>
                  <div className={styles.roiBeforeLabel}>Today</div>
                  <div className={styles.roiBeforeItem}>₹10K–₹50K/mo across 5–6 disconnected tools</div>
                  <div className={styles.roiBeforeItem}>Leads lost in spreadsheets and WhatsApp DMs</div>
                  <div className={styles.roiBeforeItem}>No attribution — you can&apos;t see which channel converts</div>
                </div>
                <div className={styles.roiArrow} aria-hidden>→</div>
                <div className={styles.roiAfter}>
                  <div className={styles.roiAfterLabel}>With Edveo</div>
                  <div className={styles.roiAfterItem}>One subscription replaces all tools — LMS + CRM + ERP</div>
                  <div className={styles.roiAfterItem}>AI scores and prioritises every lead automatically</div>
                  <div className={styles.roiAfterItem}>Full funnel visibility — channel tracked to enrolment</div>
                </div>
              </div>
              <div className={styles.roiOutcome}>
                <span className={styles.roiOutcomeNumber}>5–6 tools</span>
                <span className={styles.roiOutcomeText}>replaced by one subscription on day one</span>
              </div>
            </div>

            {/* Standalone teachers */}
            <div className={styles.roiCard}>
              <div className={styles.roiCardHeader}>
                <div className={styles.roiPersonaBadge} data-persona="teacher">👩‍🏫 Standalone teachers</div>
              </div>
              <div className={styles.roiRow}>
                <div className={styles.roiBefore}>
                  <div className={styles.roiBeforeLabel}>Today</div>
                  <div className={styles.roiBeforeItem}>Up to 30% of every sale paid to Udemy or Graphy</div>
                  <div className={styles.roiBeforeItem}>No student data — the platform owns it, not you</div>
                  <div className={styles.roiBeforeItem}>Your brand buried under their marketplace</div>
                </div>
                <div className={styles.roiArrow} aria-hidden>→</div>
                <div className={styles.roiAfter}>
                  <div className={styles.roiAfterLabel}>With Edveo</div>
                  <div className={styles.roiAfterItem}>0% commission — every rupee of every sale is yours</div>
                  <div className={styles.roiAfterItem}>You own your students and their data — always</div>
                  <div className={styles.roiAfterItem}>Your name, your domain, your brand — fully white-label</div>
                </div>
              </div>
              <div className={styles.roiOutcome}>
                <span className={styles.roiOutcomeNumber}>₹10,000+/mo</span>
                <span className={styles.roiOutcomeText}>in platform commissions on entry plans — kept by you</span>
              </div>
            </div>

          </div>

          <p className={styles.roiDisclaimer}>
            All figures sourced from ROI analysis and market data — no made-up averages
          </p>
        </div>
      </section>

      {/* --- SP-3 INSERTION --- */}
      <section className="sp-personas-section">
        <h2 className="sp-section-heading">Institutes like yours are already live</h2>
        <p className="sp-section-sub">One story for every type of educator on Edveo</p>
        <div className="sp-testimonials-row">
          <div className="sp-testimonial-card">
            <div className="sp-badge sp-badge-offline">Offline Institute</div>
            <p className="sp-quote">&quot;We recovered ₹60,000 in pending fees within the first month. I didn&apos;t chase a single parent — Edveo did it automatically.&quot;</p>
            <p className="sp-name">Director</p>
            <p className="sp-institute">Mentora LearnX, Manjeri, Kerala</p>
          </div>
          <div className="sp-testimonial-card">
            <div className="sp-badge sp-badge-online">Online Academy</div>
            <p className="sp-quote">&quot;We shut down 5 subscriptions the day we moved to Edveo. One platform replaced all of them and our lead conversion went up 40%.&quot;</p>
            <p className="sp-name">Director</p>
            <p className="sp-institute">Mentora Junior, Manjeri, Kerala</p>
          </div>
        </div>
      </section>
      {/* --- END SP-3 --- */}

      {/* Go Live — objection-closer, lives near the decision point */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "12px" }}>Go Live in 1 Min</h2>
          <p style={{ color: "#9CA3AF", marginBottom: "40px" }}>No complex coding. No lengthy migrations.</p>

          <div className={styles.timelineGrid}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>1</div>
              <h3>Sign Up</h3>
              <p>Quick onboarding with your institute details.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>2</div>
              <h3>Configure</h3>
              <p>Upload student data &amp; setup your fee structure.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={`${styles.timelineNumber} ${styles.timelineNumberSuccess}`}>3</div>
              <h3>Go Live</h3>
              <p>Apps published. Classes started. Revenue flowing.</p>
            </div>
          </div>

          <div className={styles.trustBarSection}>
            <div className={styles.trustBarContainer}>
              <div className={styles.trustBarItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                99.9% Uptime SLA
              </div>
              <div className={styles.trustBarItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                24 x 7 Support
              </div>
              <div className={styles.trustBarItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                Data Security Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Objection Handling */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqLeft}>
            <p className={styles.faqEyebrow}>Common questions</p>
            <h2 className={styles.faqTitle}>Everything you want to know before you sign up.</h2>
            <p className={styles.faqSub}>
              Still have a question?{" "}
              <a href="/contact" className={styles.faqLink}>Talk to our team →</a>
            </p>
          </div>
          <div className={styles.faqRight}>
            {[
              {
                q: "What happens to my student data if I stay on the free plan?",
                a: "Nothing is deleted. Your courses, student records, and progress data stay preserved. You can upgrade when you need more capacity, and you can export your data at any time.",
              },
              {
                q: "Can I import my existing students and fee records?",
                a: "Yes. Edveo has a one-click CSV import for student data, fee history, and course enrollments. Our onboarding team migrates your data with you — it typically takes under 20 minutes for institutes with up to 500 students.",
              },
              {
                q: "Will my students lose their progress if I move from another platform?",
                a: "No. We import completion records and progress history from most major platforms (Udemy, Teachable, Learnyst, Thinkific). Students log in and pick up exactly where they left off.",
              },
              {
                q: "Do you take a cut of my course revenue?",
                a: "Never. Edveo charges a flat monthly subscription — not a percentage of your earnings. Every rupee your students pay goes directly into your Razorpay account. Your revenue is yours.",
              },
              {
                q: "Is my student data safe? Where is it stored?",
                a: "All data is stored on servers in India, fully isolated per account. We comply with the IT Act 2000 and applicable data protection rules. No student data is ever shared with or accessible to other institutes on the platform.",
              },
              {
                q: "Can I run both recorded courses and live batches on the same platform?",
                a: "Yes — hybrid delivery is a first-class feature. You can mix pre-recorded video modules with scheduled live sessions in the same course. Students see everything in one place, not across two different apps.",
              },
              {
                q: "What if I need help setting things up?",
                a: "Every plan includes onboarding support. We get on a call, set up your portal together, and make sure you're live before we hang up. For Business and Scale plans, you get a dedicated account manager reachable on WhatsApp.",
              },
            ].map(({ q, a }) => (
              <details key={q} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{q}</summary>
                <p className={styles.faqAnswer}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- SP-4 INSERTION --- */}
      <div className="sp-trust-bar">
        <div className="sp-trust-title">Trusted by 120+ institutes across Kerala</div>
        <div className="sp-stars">★★★★★</div>
        <div className="sp-trust-sub">4.9 out of 5 &middot; Based on 80+ institute reviews</div>
        <div className="sp-pills-row">
          <span className="sp-pill">Mentora LearnX &middot; Manjeri, Kerala</span>
          <span className="sp-pill">Mentora Junior &middot; Manjeri, Kerala</span>
        </div>
      </div>
      {/* --- END SP-4 --- */}

      <CtaBanner
        variant="dark"
        headline="Still managing fees on Excel and attendance in a register?"
        accentSub="Join 5 Kerala coaching institutes already running on Edveo. Free to start. No setup fees. Live in 5 minutes."
        primaryLabel="Get started free →"
        secondaryLabel="Talk to an Expert"
        secondaryHref={COMPANY_WHATSAPP_URL}
        trustItems={["Free forever", "No credit card required", "Data stored in India", "Cancel anytime"]}
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
