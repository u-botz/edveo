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
import { COMPANY_WHATSAPP_URL, COMPANY_WHATSAPP_CTA_URL } from "@/lib/companyPublicInfo";

export default function Home() {
  return (
    <main className={styles.main}>
      <SiteNavbar activePage="home" />

      {/* Hero */}
      <HeroSection />

      {/* Trust bar — honest early-stage signals, no fake logos */}
      <div className={styles.trustStrip}>
        <div className={styles.trustStripInner}>
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Data stays in your region</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M7 10h4M7 14h10" strokeLinecap="round"/></svg>
            <span>Payments via Razorpay</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
            <span>Free forever, no card needed</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            <span>Go live in under 1 minute</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="7" width="11" height="10" rx="1.5"/><rect x="11" y="5" width="11" height="10" rx="1.5"/></svg>
            <span>Multiple payment gateways</span>
          </div>
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: `<!-- EDVEO DASHBOARD SECTION START -->
<style>
  @media (max-width: 992px) {
    .mob-hide { display: none !important; }
    .mob-col-1 { grid-template-columns: 1fr !important; }
    .mob-col-2 { grid-template-columns: 1fr 1fr !important; }
    .mob-auto-height { aspect-ratio: auto !important; height: auto !important; }
    .mob-pad { padding: 16px !important; }
    .mob-stack { flex-direction: column !important; align-items: stretch !important; }
    .mob-arrow { writing-mode: horizontal-tb !important; transform: rotate(90deg); margin: 8px 0; }
    .mob-text-center { text-align: center !important; }
  }
</style>
<section class="mob-hide" style="padding:80px 0 80px;background:#F9FAFB;">

<div style="text-align:center;padding:0 24px;margin-bottom:40px;">
  <p style="font-size:13px;font-weight:700;letter-spacing:0.1em;color:#15803D;margin:0 0 12px;text-transform:uppercase;">Your Institute Dashboard</p>
  <h2 style="font-size:40px;font-weight:800;color:#0F172A;line-height:1.15;margin:0 0 16px;letter-spacing:-0.02em;">Everything about your institute,<br>in one glance.</h2>
  <p style="font-size:16px;color:#6B7280;line-height:1.6;max-width:540px;margin:0 auto;">Fees collected, students at risk, batch health and revenue — without opening a single Excel sheet or WhatsApp group.</p>
</div>

<div style="display:flex;justify-content:center;gap:12px;margin-bottom:32px;flex-wrap:wrap;padding:0 24px;">
  <button onclick="eTab('today',this)" style="font-size:14px;font-weight:600;padding:10px 24px;border-radius:999px;border:1.5px solid #0F172A;background:#0F172A;color:#fff;cursor:pointer;transition:all 0.2s;">Today's Overview</button>
  <button onclick="eTab('student',this)" style="font-size:14px;font-weight:600;padding:10px 24px;border-radius:999px;border:1.5px solid #E5E7EB;background:#fff;color:#6B7280;cursor:pointer;transition:all 0.2s;">Student Health</button>
  <button onclick="eTab('fee',this)" style="font-size:14px;font-weight:600;padding:10px 24px;border-radius:999px;border:1.5px solid #E5E7EB;background:#fff;color:#6B7280;cursor:pointer;transition:all 0.2s;">Fee Collection</button>
</div>

<div class="mob-auto-height" style="max-width:1200px;margin:0 auto;border-radius:16px;overflow:hidden;border:1px solid #E5E7EB;box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05);background:#fff;aspect-ratio:16/10;position:relative;">

  <div style="background:#fff;border-bottom:1px solid #E5E7EB;padding:12px 20px;display:flex;align-items:center;gap:8px;">
    <div style="width:12px;height:12px;border-radius:50%;background:#FF5F57;border:1px solid #E0443E;"></div>
    <div style="width:12px;height:12px;border-radius:50%;background:#FEBC2E;border:1px solid #D8A027;"></div>
    <div style="width:12px;height:12px;border-radius:50%;background:#28C840;border:1px solid #1DAE33;"></div>
    <div style="background:#F1F5F9;border-radius:6px;padding:4px 0;font-size:12px;color:#64748B;flex:1;max-width:320px;margin:0 auto;text-align:center;font-weight:500;border:1px solid #E2E8F0;">app.edveo.co/dashboard</div>
  </div>

  <div class="mob-col-1 mob-auto-height" style="display:grid;grid-template-columns:240px 1fr;height:calc(100% - 40px);">

    <div class="mob-hide edveo-scroll" style="background:#fff;border-right:1px solid #E5E7EB;height:100%;overflow-y:auto;overflow-x:hidden;border-bottom-left-radius:16px;">
      <div style="background:#fff;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #E5E7EB;height:64px;box-sizing:border-box;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:32px;height:32px;background:#15803D;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
          </div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#0F172A;line-height:1.2;">Your Institute</div>
            <div style="font-size:10px;color:#15803D;letter-spacing:0.05em;margin-top:2px;font-weight:700;">FACULTY PORTAL</div>
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="cursor:pointer;"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
      </div>
      <div style="padding:16px 0;">
        <div style="padding:10px 20px;font-size:13px;color:#6B7280;font-weight:500;">Get Started</div>
        <div style="padding:10px 20px;font-size:13px;color:#15803D;font-weight:700;background:#F0FDF4;border-right:3px solid #15803D;">Dashboard</div>
        <div style="padding:20px 20px 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;">CREATE</div>
        <div style="padding:10px 20px;font-size:13px;color:#6B7280;font-weight:500;">LMS</div>
        <div style="padding:20px 20px 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;">GROW</div>
        <div style="padding:10px 20px;font-size:13px;color:#6B7280;font-weight:500;">CRM</div>
        <div style="padding:20px 20px 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;">OPERATE</div>
        <div style="padding:10px 20px;font-size:13px;color:#6B7280;font-weight:500;">ERP</div>
        <div style="padding:20px 20px 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;">ANALYSE</div>
        <div style="padding:10px 20px;font-size:13px;color:#6B7280;font-weight:500;">Analytics</div>
        <div style="padding:20px 20px 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;">PLATFORM SETUP</div>
        <div style="padding:10px 20px;font-size:13px;color:#6B7280;font-weight:500;">Website templates</div>
        <div style="padding:10px 20px;font-size:13px;color:#6B7280;font-weight:500;">File Manager</div>
        <div style="padding:10px 20px;font-size:13px;color:#6B7280;font-weight:500;">Settings</div>
      </div>
    </div>

    <div class="edveo-scroll" style="background:#FAFAFA;height:100%;overflow-y:auto;overflow-x:hidden;border-bottom-right-radius:16px;">

      <div style="background:#fff;border-bottom:1px solid #E5E7EB;padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between;box-sizing:border-box;">
        <div style="display:flex;align-items:center;gap:24px;">
          <div style="font-size:16px;font-weight:800;color:#0F172A;">Dashboard</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:8px 14px;font-size:13px;color:#9CA3AF;width:280px;display:flex;align-items:center;gap:8px;">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
             Search students, courses, quizzes...
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="width:32px;height:32px;background:#6366F1;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style="cursor:pointer;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <div style="position:relative;cursor:pointer;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <div style="position:absolute;top:-6px;right:-6px;background:#EF4444;color:#fff;font-size:10px;font-weight:700;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;">2</div>
          </div>
          <div style="width:1px;height:24px;background:#E5E7EB;"></div>
          <div style="width:32px;height:32px;background:#E0E7FF;color:#4F46E5;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;cursor:pointer;">ss</div>
        </div>
      </div>

      <div style="padding:24px 32px;">

        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
          <div>
            <div style="font-size:24px;font-weight:700;color:#0F172A;letter-spacing:-0.01em;">Good morning, Sayooj</div>
            <div style="font-size:13px;color:#6B7280;margin-bottom:8px;font-weight:500;">Monday, 15 Jun 2026</div>
            <div style="display:inline-flex;align-items:center;gap:6px;background:#F0FDF4;border-radius:999px;padding:4px 12px;font-size:11px;font-weight:700;color:#15803D;letter-spacing:0.04em;">
              <div style="width:6px;height:6px;border-radius:50%;background:#15803D;"></div>
              INSTITUTE SYNCED
            </div>
          </div>
          <div style="display:flex;gap:10px;">
            <div style="font-size:13px;font-weight:600;padding:8px 16px;border-radius:8px;background:#15803D;color:#fff;border:1px solid #15803D;box-shadow:0 1px 2px rgba(0,0,0,0.05);cursor:pointer;">+ Add Student</div>
            <div style="font-size:13px;font-weight:600;padding:8px 16px;border-radius:8px;background:#fff;color:#374151;border:1px solid #E5E7EB;box-shadow:0 1px 2px rgba(0,0,0,0.05);cursor:pointer;">Record Payment</div>
            <div style="font-size:13px;font-weight:600;padding:8px 16px;border-radius:8px;background:#fff;color:#374151;border:1px solid #E5E7EB;box-shadow:0 1px 2px rgba(0,0,0,0.05);cursor:pointer;">Add Lead</div>
            <div style="font-size:13px;font-weight:600;padding:8px 16px;border-radius:8px;background:#fff;color:#374151;border:1px solid #E5E7EB;box-shadow:0 1px 2px rgba(0,0,0,0.05);cursor:pointer;">Timetable</div>
          </div>
        </div>

        <div style="background:linear-gradient(135deg, #166534 0%, #14532d 100%);border-radius:12px;padding:20px 24px;margin-bottom:24px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:rgba(255,255,255,0.7);margin-bottom:8px;display:flex;align-items:center;gap:6px;">
            <div style="width:8px;height:8px;border-radius:50%;background:#4ADE80;box-shadow:0 0 0 2px rgba(74,222,128,0.2);"></div>
            EDVEO AI · DAILY BRIEF
          </div>
          <div style="font-size:16px;font-weight:700;color:#fff;margin-bottom:6px;">Today's institute operations at a glance</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.85);line-height:1.6;display:flex;align-items:flex-start;gap:8px;">
            <span style="color:#4ADE80;margin-top:2px;">●</span>
            14 students have pending fees · 7 students below 60% attendance · Fee collection up 18% vs last month
          </div>
        </div>

        <div id="edveo-panel-today" style="display:block;animation: fadeIn 0.3s ease-in-out;">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;margin-bottom:12px;">TODAY AT YOUR INSTITUTE</div>
          <div class="mob-col-2" style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:16px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
              <div style="font-size:11px;font-weight:600;color:#6B7280;margin-bottom:6px;">COLLECTED (MONTH)</div>
              <div style="font-size:28px;font-weight:800;color:#0F172A;line-height:1;margin-bottom:6px;letter-spacing:-0.02em;">₹2.4L</div>
              <div style="font-size:12px;font-weight:500;color:#15803D;display:flex;align-items:center;gap:4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg> +18% vs last month</div>
              <div style="height:4px;background:#F3F4F6;border-radius:2px;margin-top:10px;"><div style="width:86%;height:100%;background:#15803D;border-radius:2px;"></div></div>
            </div>
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:16px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
              <div style="font-size:11px;font-weight:600;color:#6B7280;margin-bottom:6px;">STUDENTS</div>
              <div style="font-size:28px;font-weight:800;color:#0F172A;line-height:1;margin-bottom:6px;letter-spacing:-0.02em;">200</div>
              <div style="font-size:12px;font-weight:500;color:#15803D;display:flex;align-items:center;gap:4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> 12 joined this month</div>
            </div>
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:16px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
              <div style="font-size:11px;font-weight:600;color:#6B7280;margin-bottom:6px;">ATTENDANCE TODAY</div>
              <div style="font-size:28px;font-weight:800;color:#0F172A;line-height:1;margin-bottom:6px;letter-spacing:-0.02em;">83%</div>
              <div style="font-size:12px;font-weight:500;color:#DC2626;">7 students absent</div>
            </div>
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:16px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
              <div style="font-size:11px;font-weight:600;color:#6B7280;margin-bottom:6px;">OPEN LEADS</div>
              <div style="font-size:28px;font-weight:800;color:#0F172A;line-height:1;margin-bottom:6px;letter-spacing:-0.02em;">18</div>
              <div style="font-size:12px;font-weight:500;color:#6B7280;">in admissions pipeline</div>
            </div>
          </div>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;margin-bottom:12px;">ADMISSIONS FUNNEL</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:24px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
              <div style="font-size:14px;font-weight:700;color:#0F172A;">Admissions pipeline</div>
              <div style="font-size:12px;font-weight:600;color:#15803D;cursor:pointer;">View pipeline &rarr;</div>
            </div>
            <div style="display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:12px;">
              <div style="background:#F0FDF4;border:1px solid #DCFCE7;border-radius:8px;padding:12px 16px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.05em;color:#15803D;margin-bottom:4px;">OPEN LEADS</div>
                <div style="font-size:24px;font-weight:800;color:#0F172A;letter-spacing:-0.02em;">18</div>
              </div>
              <div style="font-size:16px;color:#D1D5DB;text-align:center;">&rarr;</div>
              <div style="background:#F0FDF4;border:1px solid #DCFCE7;border-radius:8px;padding:12px 16px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.05em;color:#15803D;margin-bottom:4px;">STUDENTS</div>
                <div style="font-size:24px;font-weight:800;color:#0F172A;letter-spacing:-0.02em;">200</div>
                <div style="font-size:11px;font-weight:500;color:#6B7280;margin-top:2px;">72% enrolled</div>
              </div>
              <div style="font-size:16px;color:#D1D5DB;text-align:center;">&rarr;</div>
              <div style="background:#F0FDF4;border:1px solid #DCFCE7;border-radius:8px;padding:12px 16px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.05em;color:#15803D;margin-bottom:4px;">THIS WEEK</div>
                <div style="font-size:24px;font-weight:800;color:#0F172A;letter-spacing:-0.02em;">4</div>
                <div style="font-size:11px;font-weight:500;color:#6B7280;margin-top:2px;">new admissions</div>
              </div>
            </div>
          </div>
          
          <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;margin-bottom:12px;">INSTITUTE PERFORMANCE</div>
          <div class="mob-col-1" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:20px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <div style="font-size:14px;font-weight:700;color:#0F172A;">Programs &amp; batches</div>
                <div style="font-size:12px;font-weight:600;color:#15803D;cursor:pointer;">View all &rarr;</div>
              </div>
              <div style="font-size:12px;color:#6B7280;margin-bottom:16px;font-weight:500;">Enrollment and course health</div>
              <div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #F3F4F6;"><div style="font-size:13px;font-weight:500;color:#374151;flex:1;">NEET Batch A</div><div style="font-size:11px;padding:4px 8px;border-radius:4px;background:#DCFCE7;color:#15803D;font-weight:600;">88 students</div></div>
              <div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #F3F4F6;"><div style="font-size:13px;font-weight:500;color:#374151;flex:1;">Class 11–12 Science</div><div style="font-size:11px;padding:4px 8px;border-radius:4px;background:#DCFCE7;color:#15803D;font-weight:600;">62 students</div></div>
              <div style="display:flex;align-items:center;padding:10px 0;"><div style="font-size:13px;font-weight:500;color:#374151;flex:1;">Degree / Other</div><div style="font-size:11px;padding:4px 8px;border-radius:4px;background:#FEF9C3;color:#854D0E;font-weight:600;">50 · low enrol</div></div>
            </div>
            
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:20px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <div style="font-size:14px;font-weight:700;color:#0F172A;">Needs attention</div>
                <div style="font-size:12px;font-weight:600;color:#15803D;cursor:pointer;">Manage &rarr;</div>
              </div>
              <div style="font-size:12px;color:#6B7280;margin-bottom:16px;font-weight:500;">Items that need action today</div>
              <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #F3F4F6;"><div style="width:28px;height:28px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;">!</div><div style="font-size:13px;font-weight:500;color:#374151;flex:1;">14 students — fees pending</div><div style="font-size:11px;padding:4px 8px;border-radius:4px;background:#FEE2E2;color:#DC2626;font-weight:600;">Urgent</div></div>
              <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #F3F4F6;"><div style="width:28px;height:28px;border-radius:50%;background:#FEF9C3;color:#854D0E;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;">&darr;</div><div style="font-size:13px;font-weight:500;color:#374151;flex:1;">7 students — low attendance</div><div style="font-size:11px;padding:4px 8px;border-radius:4px;background:#FEF9C3;color:#854D0E;font-weight:600;">Review</div></div>
              <div style="display:flex;align-items:center;gap:12px;padding:10px 0;"><div style="width:28px;height:28px;border-radius:50%;background:#DCFCE7;color:#15803D;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;">&uarr;</div><div style="font-size:13px;font-weight:500;color:#374151;flex:1;">Revenue up 18% this month</div><div style="font-size:11px;padding:4px 8px;border-radius:4px;background:#DCFCE7;color:#15803D;font-weight:600;">Great</div></div>
            </div>
          </div>
        </div>

        <div id="edveo-panel-student" style="display:none;animation: fadeIn 0.3s ease-in-out;">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;margin-bottom:12px;">STUDENT HEALTH</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:24px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
            <div style="font-size:14px;font-weight:700;color:#0F172A;margin-bottom:4px;">Enrollment snapshot</div>
            <div style="font-size:12px;color:#6B7280;margin-bottom:16px;font-weight:500;">Across all batches</div>
            <div class="mob-col-2" style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
              <div style="background:#F0FDF4;border:1px solid #DCFCE7;border-radius:8px;padding:16px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#15803D;margin-bottom:4px;letter-spacing:-0.02em;">200</div><div style="font-size:12px;font-weight:600;color:#15803D;">Total students</div></div>
              <div style="background:#F0FDF4;border:1px solid #DCFCE7;border-radius:8px;padding:16px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#15803D;margin-bottom:4px;letter-spacing:-0.02em;">12</div><div style="font-size:12px;font-weight:600;color:#15803D;">New this month</div></div>
              <div style="background:#FFFBEB;border:1px solid #FEF08A;border-radius:8px;padding:16px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#854D0E;margin-bottom:4px;letter-spacing:-0.02em;">4</div><div style="font-size:12px;font-weight:600;color:#854D0E;">New this week</div></div>
              <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:16px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#DC2626;margin-bottom:4px;letter-spacing:-0.02em;">7</div><div style="font-size:12px;font-weight:600;color:#DC2626;">At risk</div></div>
            </div>
          </div>
          
          <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;margin-bottom:12px;">AT-RISK STUDENTS — BELOW 60% ATTENDANCE</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:20px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;"><div style="font-size:14px;font-weight:700;color:#0F172A;">Students needing attention</div><div style="font-size:12px;font-weight:600;color:#15803D;cursor:pointer;">Notify all parents &rarr;</div></div>
            <div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid #F3F4F6;"><div style="width:36px;height:36px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">MF</div><div style="flex:1;"><div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:2px;">Mohammed Faiz</div><div style="font-size:12px;color:#6B7280;font-weight:500;">NEET Batch A</div></div><div style="font-size:11px;padding:6px 10px;border-radius:6px;background:#FEE2E2;color:#DC2626;font-weight:600;">54% · 3 fees pending</div></div>
            <div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid #F3F4F6;"><div style="width:36px;height:36px;border-radius:50%;background:#FEF9C3;color:#854D0E;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">PA</div><div style="flex:1;"><div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:2px;">Priya Anand</div><div style="font-size:12px;color:#6B7280;font-weight:500;">Class 12 Science</div></div><div style="font-size:11px;padding:6px 10px;border-radius:6px;background:#FEF9C3;color:#854D0E;font-weight:600;">61% attendance</div></div>
            <div style="display:flex;align-items:center;gap:16px;padding:12px 0;"><div style="width:36px;height:36px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">RA</div><div style="flex:1;"><div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:2px;">Roshan Ali</div><div style="font-size:12px;color:#6B7280;font-weight:500;">Degree Batch</div></div><div style="font-size:11px;padding:6px 10px;border-radius:6px;background:#FEE2E2;color:#DC2626;font-weight:600;">48% · may dropout</div></div>
          </div>
        </div>

        <div id="edveo-panel-fee" style="display:none;animation: fadeIn 0.3s ease-in-out;">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;margin-bottom:12px;">FEE COLLECTION BY BATCH</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:24px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;"><div><div style="font-size:14px;font-weight:700;color:#0F172A;margin-bottom:4px;">Batch fee progress</div><div style="font-size:12px;color:#6B7280;font-weight:500;">Expected vs collected per batch</div></div><div style="font-size:12px;font-weight:600;color:#15803D;cursor:pointer;">Fee reports &rarr;</div></div>
            
            <div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid #F3F4F6;">
               <div style="font-size:13px;font-weight:600;color:#374151;width:180px;">NEET Batch A</div>
               <div style="flex:1;height:8px;background:#F3F4F6;border-radius:4px;overflow:hidden;"><div style="width:92%;height:100%;background:#15803D;border-radius:4px;"></div></div>
               <div style="font-size:13px;font-weight:700;color:#15803D;min-width:40px;text-align:right;">92%</div>
            </div>
            
            <div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid #F3F4F6;">
               <div style="font-size:13px;font-weight:600;color:#374151;width:180px;">Class 11–12 Science</div>
               <div style="flex:1;height:8px;background:#F3F4F6;border-radius:4px;overflow:hidden;"><div style="width:84%;height:100%;background:#15803D;border-radius:4px;"></div></div>
               <div style="font-size:13px;font-weight:700;color:#15803D;min-width:40px;text-align:right;">84%</div>
            </div>
            
            <div style="display:flex;align-items:center;gap:16px;padding:12px 0;">
               <div style="font-size:13px;font-weight:600;color:#374151;width:180px;">Degree / Other</div>
               <div style="flex:1;height:8px;background:#F3F4F6;border-radius:4px;overflow:hidden;"><div style="width:61%;height:100%;background:#F59E0B;border-radius:4px;"></div></div>
               <div style="font-size:13px;font-weight:700;color:#854D0E;min-width:40px;text-align:right;">61%</div>
            </div>
          </div>
          
          <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#9CA3AF;margin-bottom:12px;">OVERDUE — ACTION NEEDED</div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:20px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;"><div style="font-size:14px;font-weight:700;color:#0F172A;">14 students with pending fees</div><div style="font-size:12px;font-weight:600;color:#15803D;cursor:pointer;">Send all reminders &rarr;</div></div>
            
            <div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid #F3F4F6;"><div style="width:36px;height:36px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">AK</div><div style="flex:1;"><div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:2px;">Amal Krishnan</div><div style="font-size:12px;color:#6B7280;font-weight:500;">Class 11 Science</div></div><div style="font-size:11px;padding:6px 10px;border-radius:6px;background:#FEE2E2;color:#DC2626;font-weight:600;">₹4,500 · 32 days</div></div>
            
            <div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid #F3F4F6;"><div style="width:36px;height:36px;border-radius:50%;background:#FEF9C3;color:#854D0E;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">SF</div><div style="flex:1;"><div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:2px;">Sana Fathima</div><div style="font-size:12px;color:#6B7280;font-weight:500;">NEET Batch A</div></div><div style="font-size:11px;padding:6px 10px;border-radius:6px;background:#FEF9C3;color:#854D0E;font-weight:600;">₹2,200 · 18 days</div></div>
            
            <div style="display:flex;align-items:center;gap:16px;padding:12px 0;"><div style="width:36px;height:36px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">RM</div><div style="flex:1;"><div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:2px;">Rahul Menon</div><div style="font-size:12px;color:#6B7280;font-weight:500;">Class 12 Commerce</div></div><div style="font-size:11px;padding:6px 10px;border-radius:6px;background:#FEE2E2;color:#DC2626;font-weight:600;">₹3,800 · 41 days</div></div>
            
            <div style="margin-top:16px;padding-top:16px;border-top:1px solid #F3F4F6;display:flex;justify-content:space-between;align-items:center;">
              <div style="font-size:13px;color:#6B7280;font-weight:500;">Total pending: ₹38,500 across 14 students</div>
              <div style="font-size:13px;color:#15803D;font-weight:600;cursor:pointer;">Send WhatsApp reminders to all &rarr;</div>
            </div>
          </div>
        </div>

      </div>

      <div style="text-align:center;padding:24px 32px;background:#fff;border-top:1px solid #E5E7EB;">
        <div style="font-size:13px;color:#6B7280;font-weight:500;">Sample data shown — your real institute numbers appear when you sign up.</div>
        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:12px;">
          <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:999px;padding:6px 16px;font-size:12px;font-weight:600;color:#374151;">No Excel needed</div>
          <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:999px;padding:6px 16px;font-size:12px;font-weight:600;color:#374151;">Auto fee reminders</div>
          <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:999px;padding:6px 16px;font-size:12px;font-weight:600;color:#374151;">Live in 5 minutes</div>
        </div>
      </div>

    </div>
  </div>
</div>
<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .edveo-scroll {
    scrollbar-width: thin;
    scrollbar-color: #CBD5E1 transparent;
    overscroll-behavior: contain;
    scroll-behavior: smooth;
  }
  .edveo-scroll::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .edveo-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .edveo-scroll::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 10px;
  }
  .edveo-scroll::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }
</style>
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

      <div dangerouslySetInnerHTML={{ __html: `<!-- GO ONLINE SECTION START -->
<style>
  @media (max-width: 992px) {
    .go-online-pad { padding: 0 16px !important; }
    .go-online-title { font-size: 24px !important; line-height: 1.3 !important; }
    .go-online-mid-banner { padding: 12px 16px !important; min-height: auto !important; }
    .go-online-stack-row { flex-direction: row !important; gap: 8px !important; }
    .go-online-text-horiz { writing-mode: horizontal-tb !important; transform: none !important; }
    .go-online-card-pad { padding: 24px 16px !important; }
  }
</style>
<section style="background:#fff;padding:64px 0 0;">
<div class="go-online-pad" style="max-width:1200px;margin:0 auto;padding:0 40px;">

  <div style="text-align:center;margin-bottom:56px;max-width:800px;margin-left:auto;margin-right:auto;">
    <p style="font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;margin:0 0 12px;">TAKE YOUR INSTITUTE ONLINE</p>
    <h2 class="go-online-title" style="font-size:32px;font-weight:800;letter-spacing:-0.02em;color:#0F172A;line-height:1.2;margin:0 0 12px;max-width:700px;margin-left:auto;margin-right:auto;">Your institute deserves better than WhatsApp groups and Google Drive links.</h2>
    <p style="font-size:16px;color:#6B7280;line-height:1.6;margin:0;">Give your students a proper learning environment — video lessons, live classes, exams, and progress tracking — all under your institute's own name and brand.</p>
  </div>

  <div class="mob-col-1" style="display:grid;grid-template-columns:1fr auto 1fr;border-radius:12px;overflow:hidden;border:1px solid #E5E7EB;margin-bottom:56px;margin-left:0;margin-right:0;">

    <div style="background:#FEF2F2;padding:32px 28px;">
      <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;color:#DC2626;margin-bottom:16px;">HOW MOST INSTITUTES DO IT TODAY</div>
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;">
        <span style="font-size:24px;flex-shrink:0;margin-top:1px;">😩</span>
        <div><div style="font-size:14px;color:#7F1D1D;line-height:1.5;">Record a class, upload to YouTube, share the link on WhatsApp</div><div style="font-size:12px;color:#DC2626;font-weight:500;margin-top:2px;">Anyone with the link can watch. No control. No tracking.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;">
        <span style="font-size:24px;flex-shrink:0;margin-top:1px;">😩</span>
        <div><div style="font-size:14px;color:#7F1D1D;line-height:1.5;">Store PDFs and notes on Google Drive, share folder links</div><div style="font-size:12px;color:#DC2626;font-weight:500;margin-top:2px;">Folders get messy. Students can't find anything.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;">
        <span style="font-size:24px;flex-shrink:0;margin-top:1px;">😩</span>
        <div><div style="font-size:14px;color:#7F1D1D;line-height:1.5;">Send exam papers on WhatsApp, collect answers via photos</div><div style="font-size:12px;color:#DC2626;font-weight:500;margin-top:2px;">Marking takes days. No auto-scoring. Results compiled manually.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:10px;">
        <span style="font-size:24px;flex-shrink:0;margin-top:1px;">😩</span>
        <div><div style="font-size:14px;color:#7F1D1D;line-height:1.5;">No idea which student is struggling in which topic</div><div style="font-size:12px;color:#DC2626;font-weight:500;margin-top:2px;">You find out only when exam results are bad — too late.</div></div>
      </div>
    </div>

    <div class="go-online-mid-banner" style="background:#0F172A;display:flex;align-items:center;justify-content:center;min-width:52px;padding:0 18px;">
      <div class="go-online-stack-row" style="display:flex;flex-direction:column;align-items:center;gap:6px;">
        <div class="go-online-text-horiz" style="font-size:10px;font-weight:700;letter-spacing:0.1em;color:rgba(255,255,255,0.4);writing-mode:vertical-rl;">SWITCH TO EDVEO</div>
        <div style="font-size:22px;color:#4ADE80;display:flex;align-items:center;">→</div>
      </div>
    </div>

    <div style="background:#F0FDF4;padding:32px 28px;">
      <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;color:#15803D;margin-bottom:16px;">WITH EDVEO — YOUR OWN PLATFORM</div>
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;">
        <span style="font-size:24px;flex-shrink:0;margin-top:1px;">✅</span>
        <div><div style="font-size:14px;color:#14532D;line-height:1.5;font-weight:500;">Upload recorded lessons — students watch inside your branded portal or app</div><div style="font-size:12px;color:#15803D;margin-top:2px;">Private. Organised by subject and topic. Trackable.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;">
        <span style="font-size:24px;flex-shrink:0;margin-top:1px;">✅</span>
        <div><div style="font-size:14px;color:#14532D;line-height:1.5;font-weight:500;">Take live classes inside Edveo — attendance marked automatically</div><div style="font-size:12px;color:#15803D;margin-top:2px;">No Zoom links on WhatsApp. Students join from their portal or app.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;">
        <span style="font-size:24px;flex-shrink:0;margin-top:1px;">✅</span>
        <div><div style="font-size:14px;color:#14532D;line-height:1.5;font-weight:500;">Create and assign online exams — auto-scored, results instant</div><div style="font-size:12px;color:#15803D;margin-top:2px;">Students take the test. Edveo marks it. You see the results.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:10px;">
        <span style="font-size:24px;flex-shrink:0;margin-top:1px;">✅</span>
        <div><div style="font-size:14px;color:#14532D;line-height:1.5;font-weight:500;">See exactly which student is weak in which topic — before exams</div><div style="font-size:12px;color:#15803D;margin-top:2px;">Topic-level mastery for every student. Intervene early.</div></div>
      </div>
    </div>

  </div>

  <div class="mob-col-1" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:56px;max-width:100%;">
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#F0FDF4;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0F172A;margin-bottom:5px;">Recorded Video Lessons</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Upload and organise lessons by subject, chapter, and topic. Students watch on demand from their portal or mobile app.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: YouTube + Google Drive links on WhatsApp</div>
    </div>
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#F0FDF4;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0F172A;margin-bottom:5px;">Live Classes</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Host live sessions directly inside Edveo. Attendance is marked automatically when students join.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: Zoom links shared on WhatsApp groups</div>
    </div>
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#F0FDF4;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0F172A;margin-bottom:5px;">Online Exams & Quizzes</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Create tests, assign to batches, auto-score answers. Results available instantly — no manual marking.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: WhatsApp paper photos, manual marking</div>
    </div>
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#F0FDF4;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0F172A;margin-bottom:5px;">Assignments</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Assign homework digitally. Students submit inside the app. You review, grade, and give feedback — all in one place.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: PDF assignments on WhatsApp</div>
    </div>
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#F0FDF4;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0F172A;margin-bottom:5px;">Branded Student App</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Your students download an app with your institute's name and logo. Not Edveo's name — yours.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: Generic WhatsApp groups</div>
    </div>
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#F0FDF4;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0F172A;margin-bottom:5px;">Your Own Website</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Get a professional website at your own domain. Take admissions online. Be found on Google.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: No online presence at all</div>
    </div>
  </div>

  <div class="go-online-card-pad" style="background:#0F172A;border-radius:12px;padding:40px;max-width:100%;margin:0 0 40px;">
    <div class="mob-col-1" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start;">
      <div>
        <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:#4ADE80;margin-bottom:8px;">STUDENT MASTERY TRACKING</div>
        <div style="font-size:24px;font-weight:700;color:#fff;line-height:1.3;margin-bottom:10px;">Know exactly which student is struggling — and in which topic — before the exam.</div>
        <div style="font-size:15px;color:rgba(255,255,255,0.7);line-height:1.6;margin-bottom:16px;">No more surprises on result day. Edveo tracks every student's performance at the topic level — so you can intervene while there's still time to help them.</div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <div style="font-size:14px;color:rgba(255,255,255,0.8);display:flex;align-items:center;gap:6px;"><span style="color:#4ADE80;">✓</span> Topic-level weakness detection</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.8);display:flex;align-items:center;gap:6px;"><span style="color:#4ADE80;">✓</span> Per-student progress across all subjects</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.8);display:flex;align-items:center;gap:6px;"><span style="color:#4ADE80;">✓</span> Automatically flags who needs extra attention</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.8);display:flex;align-items:center;gap:6px;"><span style="color:#4ADE80;">✓</span> Parents see their child's progress in real time</div>
        </div>
      </div>
      <div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:24px;border:1px solid rgba(255,255,255,0.08);">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:40px;height:40px;border-radius:50%;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;">AK</div>
          <div><div style="font-size:15px;font-weight:600;color:#fff;">Amal Krishnan</div><div style="font-size:12px;color:rgba(255,255,255,0.5);">NEET Batch A · Class 11</div></div>
        </div>
        <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:rgba(255,255,255,0.4);margin-bottom:10px;">SUBJECT MASTERY</div>
        <div style="display:flex;flex-direction:column;gap:7px;">
          <div style="display:flex;align-items:center;gap:8px;"><div style="font-size:13px;color:rgba(255,255,255,0.7);width:140px;flex-shrink:0;">Physics — Optics</div><div style="flex:1;height:8px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;"><div style="width:82%;height:100%;background:#4ADE80;border-radius:4px;"></div></div><div style="font-size:12px;font-weight:700;color:#4ADE80;min-width:36px;text-align:right;">82%</div></div>
          <div style="display:flex;align-items:center;gap:8px;"><div style="font-size:13px;color:rgba(255,255,255,0.7);width:140px;flex-shrink:0;">Chemistry — Org.</div><div style="flex:1;height:8px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;"><div style="width:61%;height:100%;background:#FBBF24;border-radius:4px;"></div></div><div style="font-size:12px;font-weight:700;color:#FBBF24;min-width:36px;text-align:right;">61%</div></div>
          <div style="display:flex;align-items:center;gap:8px;"><div style="font-size:13px;color:rgba(255,255,255,0.7);width:140px;flex-shrink:0;">Biology — Genetics</div><div style="flex:1;height:8px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;"><div style="width:38%;height:100%;background:#F87171;border-radius:4px;"></div></div><div style="font-size:12px;font-weight:700;color:#F87171;min-width:36px;text-align:right;">38% ⚠</div></div>
          <div style="display:flex;align-items:center;gap:8px;"><div style="font-size:13px;color:rgba(255,255,255,0.7);width:140px;flex-shrink:0;">Physics — Mechanics</div><div style="flex:1;height:8px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;"><div style="width:74%;height:100%;background:#4ADE80;border-radius:4px;"></div></div><div style="font-size:12px;font-weight:700;color:#4ADE80;min-width:36px;text-align:right;">74%</div></div>
          <div style="display:flex;align-items:center;gap:8px;"><div style="font-size:13px;color:rgba(255,255,255,0.7);width:140px;flex-shrink:0;">Chemistry — Inorg.</div><div style="flex:1;height:8px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;"><div style="width:45%;height:100%;background:#F87171;border-radius:4px;"></div></div><div style="font-size:12px;font-weight:700;color:#F87171;min-width:36px;text-align:right;">45% ⚠</div></div>
        </div>
        <div style="margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.08);">
          <div style="font-size:13px;color:#F87171;font-weight:600;">⚠ Needs attention in Biology — Genetics and Inorganic Chemistry</div>
        </div>
      </div>
    </div>
  </div>

  <div class="mob-col-1 mob-text-center mob-pad" style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:0;padding:32px 36px;max-width:100%;margin:40px 0 0;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;">
    <div>
      <div style="font-size:20px;font-weight:700;color:#0F172A;margin-bottom:5px;">Your institute. Your brand. Your domain.</div>
      <div style="font-size:15px;color:#6B7280;line-height:1.6;">Students access everything through your own branded portal and mobile app — not a generic Edveo link. You look like a professional institute from day one.</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
      <div style="background:#fff;border:1px solid #E5E7EB;border-radius:6px;padding:8px 16px;font-size:14px;color:#374151;font-family:monospace;white-space:nowrap;">🌐 <span style="color:#15803D;font-weight:600;">yourinstitute.com</span></div>
      <div style="background:#fff;border:1px solid #E5E7EB;border-radius:6px;padding:8px 16px;font-size:14px;color:#374151;font-family:monospace;white-space:nowrap;">🌐 <span style="color:#15803D;font-weight:600;">yourinstitute</span>.edveo.co</div>
      <div style="font-size:12px;color:#9CA3AF;text-align:right;">Both options available</div>
    </div>
  </div>

</div>
</section>
<!-- GO ONLINE SECTION END -->` }} />




      {/* Feature Explorer — tabbed, equal real estate for all 5 features */}
      <FeatureExplorer />

      <div dangerouslySetInnerHTML={{ __html: `<!-- EDVEO AI FEATURE SECTION START -->
<section style="background:#F9FAFB;padding:56px 0;border-top:1px solid #E5E7EB;">
  <div style="max-width:1200px;margin:0 auto;padding:0 40px;">

    <div style="text-align:center;margin-bottom:40px;">
      <div style="display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #E5E7EB;border-radius:999px;padding:5px 14px;font-size:11px;color:#374151;margin-bottom:16px;">
        <div style="width:6px;height:6px;border-radius:50%;background:#15803D;"></div>
        Edveo Intelligence™
      </div>
      <h2 style="font-size:32px;font-weight:700;color:#0F172A;line-height:1.2;margin:0 0 10px;">Your institute runs on autopilot.<br>Edveo Intelligence™ makes it happen.</h2>
      <p style="font-size:14px;color:#6B7280;max-width:480px;margin:0 auto;line-height:1.6;">Not a chatbot. Not a gimmick. A built-in AI that watches your institute data and acts — so you don't have to.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;">

      <div style="background:#fff;border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;">
        <div style="width:36px;height:36px;background:#F0FDF4;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div style="font-size:13px;font-weight:600;color:#0F172A;margin-bottom:6px;">Sends fee reminders automatically</div>
        <div style="font-size:12px;color:#6B7280;line-height:1.5;margin-bottom:10px;">Edveo detects overdue fees and sends WhatsApp reminders to parents — without you lifting a finger.</div>
        <div style="font-size:11px;color:#15803D;font-weight:500;">✓ Zero manual follow-up. Ever.</div>
      </div>

      <div style="background:#fff;border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;">
        <div style="width:36px;height:36px;background:#F0FDF4;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div style="font-size:13px;font-weight:600;color:#0F172A;margin-bottom:6px;">Flags at-risk students early</div>
        <div style="font-size:12px;color:#6B7280;line-height:1.5;margin-bottom:10px;">When a student's attendance drops or quiz scores fall, Edveo alerts you immediately — before they drop out.</div>
        <div style="font-size:11px;color:#15803D;font-weight:500;">✓ Catch problems before they become losses.</div>
      </div>

      <div style="background:#fff;border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;">
        <div style="width:36px;height:36px;background:#F0FDF4;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        </div>
        <div style="font-size:13px;font-weight:600;color:#0F172A;margin-bottom:6px;">Tells you which batch needs attention</div>
        <div style="font-size:12px;color:#6B7280;line-height:1.5;margin-bottom:10px;">Every morning, Edveo gives you a daily brief — fees pending, attendance dips, and what needs your attention today.</div>
        <div style="font-size:11px;color:#15803D;font-weight:500;">✓ Your institute summarised in 10 seconds.</div>
      </div>

    </div>

    <div style="background:#0F172A;border-radius:12px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#4ADE80;flex-shrink:0;"></div>
        <div style="font-size:13px;color:#fff;font-weight:500;">Edveo Intelligence™ is built in — always on, no setup needed.</div>
      </div>
      <div style="font-size:12px;color:rgba(255,255,255,0.45);white-space:nowrap;flex-shrink:0;">Included in all plans · No extra charge</div>
    </div>

  </div>
</section>
<!-- EDVEO AI FEATURE SECTION END -->` }} />

      {/* Mobile App — standalone premium section */}
      <MobileAppBanner />

      <div dangerouslySetInnerHTML={{ __html: `<!-- COST SECTION START -->
<section style="background:#F9FAFB;padding:64px 32px;">

  <div style="text-align:center;margin-bottom:48px;">
    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;color:#DC2626;margin-bottom:12px;">THE COST OF DOING NOTHING</div>
    <h2 style="font-size:32px;font-weight:700;color:#0F172A;line-height:1.2;margin-bottom:12px;">A typical day running your institute<br>without Edveo</h2>
    <p style="font-size:14px;color:#6B7280;max-width:480px;margin:0 auto;line-height:1.6;">If any of these sound familiar, you're spending more time managing admin than teaching — and losing money doing it.</p>
  </div>

  <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;margin-bottom:16px;max-width:900px;margin-left:auto;margin-right:auto;">

    <div style="background:#0F172A;padding:12px 20px;display:flex;align-items:center;gap:8px;">
      <div style="font-size:12px;font-weight:600;color:#fff;">📅 Monday morning — before Edveo</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-left:auto;">Happens every single week</div>
    </div>

    <div style="padding:0;">

      <div style="display:grid;grid-template-columns:1fr 40px 1fr;align-items:center;padding:20px 20px;border-bottom:1px solid #F3F4F6;gap:0;">
        <div style="padding-right:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#DC2626;margin-bottom:6px;">THE PROBLEM</div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#7F1D1D;line-height:1.5;font-style:italic;">"I have to message every parent individually to remind them about fees. Some ignore me for weeks. I never know who has paid until my staff checks the register manually."</div>
          </div>
          <div style="font-size:11px;color:#DC2626;font-weight:500;">⏱ 3–4 hrs/week lost chasing fees</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:28px;height:28px;border-radius:50%;background:#F0FDF4;border:1px solid #DCFCE7;display:flex;align-items:center;justify-content:center;font-size:12px;color:#15803D;flex-shrink:0;">→</div>
        </div>
        <div style="padding-left:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#15803D;margin-bottom:6px;">WITH EDVEO</div>
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#14532D;line-height:1.5;">Edveo sends automatic fee reminders on WhatsApp. You see exactly who has paid, who hasn't, and how much is pending — in real time. Zero manual follow-up.</div>
          </div>
          <div style="font-size:11px;color:#15803D;font-weight:500;">✓ ₹40K–₹80K recovered per year</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 40px 1fr;align-items:center;padding:20px 20px;border-bottom:1px solid #F3F4F6;gap:0;">
        <div style="padding-right:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#DC2626;margin-bottom:6px;">THE PROBLEM</div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#7F1D1D;line-height:1.5;font-style:italic;">"A student stopped coming 3 weeks ago. I found out only when their parent called asking why results were low. By then it was too late to help them."</div>
          </div>
          <div style="font-size:11px;color:#DC2626;font-weight:500;">⏱ Dropouts you never see coming</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:28px;height:28px;border-radius:50%;background:#F0FDF4;border:1px solid #DCFCE7;display:flex;align-items:center;justify-content:center;font-size:12px;color:#15803D;flex-shrink:0;">→</div>
        </div>
        <div style="padding-left:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#15803D;margin-bottom:6px;">WITH EDVEO</div>
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#14532D;line-height:1.5;">Edveo flags students with dropping attendance before they disappear. You get an alert when a student misses 3 classes in a row — while there's still time to intervene.</div>
          </div>
          <div style="font-size:11px;color:#15803D;font-weight:500;">✓ Catch at-risk students early</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 40px 1fr;align-items:center;padding:20px 20px;border-bottom:1px solid #F3F4F6;gap:0;">
        <div style="padding-right:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#DC2626;margin-bottom:6px;">THE PROBLEM</div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#7F1D1D;line-height:1.5;font-style:italic;">"My attendance is in one register, fees in an Excel sheet, timetable on a whiteboard, and student contacts in WhatsApp. I need to open 4 things just to answer one parent's question."</div>
          </div>
          <div style="font-size:11px;color:#DC2626;font-weight:500;">⏱ 8–10 hrs/week on admin alone</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:28px;height:28px;border-radius:50%;background:#F0FDF4;border:1px solid #DCFCE7;display:flex;align-items:center;justify-content:center;font-size:12px;color:#15803D;flex-shrink:0;">→</div>
        </div>
        <div style="padding-left:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#15803D;margin-bottom:6px;">WITH EDVEO</div>
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#14532D;line-height:1.5;">Everything is in one dashboard — attendance, fees, timetable, student profiles, parent contacts. Answer any question in 10 seconds without leaving your phone.</div>
          </div>
          <div style="font-size:11px;color:#15803D;font-weight:500;">✓ One tab. Everything. Always.</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 40px 1fr;align-items:center;padding:20px 20px;gap:0;">
        <div style="padding-right:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#DC2626;margin-bottom:6px;">THE PROBLEM</div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#7F1D1D;line-height:1.5;font-style:italic;">"I don't actually know if my institute is growing or shrinking. I have no monthly revenue number, no enrollment trend, nothing. I'm running blind."</div>
          </div>
          <div style="font-size:11px;color:#DC2626;font-weight:500;">⏱ No visibility = no control</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:28px;height:28px;border-radius:50%;background:#F0FDF4;border:1px solid #DCFCE7;display:flex;align-items:center;justify-content:center;font-size:12px;color:#15803D;flex-shrink:0;">→</div>
        </div>
        <div style="padding-left:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#15803D;margin-bottom:6px;">WITH EDVEO</div>
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#14532D;line-height:1.5;">Your institute health score updates daily — revenue, retention, enrollment trends, batch performance. You know exactly how your institute is doing at any moment.</div>
          </div>
          <div style="font-size:11px;color:#15803D;font-weight:500;">✓ Full clarity. Every day.</div>
        </div>
      </div>

    </div>
  </div>

  <div style="background:#0F172A;border-radius:12px;padding:24px 28px;display:grid;grid-template-columns:repeat(3,1fr);gap:0;max-width:900px;margin:0 auto 32px;">
    <div style="text-align:center;padding:0 16px;border-right:1px solid rgba(255,255,255,0.08);">
      <div style="font-size:28px;font-weight:700;color:#4ADE80;margin-bottom:4px;">8 hrs</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.55);line-height:1.4;">saved every week<br>on admin — from day one</div>
    </div>
    <div style="text-align:center;padding:0 16px;border-right:1px solid rgba(255,255,255,0.08);">
      <div style="font-size:28px;font-weight:700;color:#4ADE80;margin-bottom:4px;">₹40K+</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.55);line-height:1.4;">in fee leakage recovered<br>per year on average</div>
    </div>
    <div style="text-align:center;padding:0 16px;">
      <div style="font-size:28px;font-weight:700;color:#4ADE80;margin-bottom:4px;">0</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.55);line-height:1.4;">manual WhatsApp reminders<br>sent by you ever again</div>
    </div>
  </div>

  <div style="text-align:center;">
    <div style="font-size:13px;color:#6B7280;margin-bottom:14px;">Still running on WhatsApp and Excel? It's costing you more than you think.</div>
    <a href="https://wa.me/919895656279?text=Hi%2C+I%27m+interested+in+Edveo+for+my+institute" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#15803D;color:#fff;font-size:13px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">See how Edveo fixes this →</a>
  </div>

</section>
<!-- COST SECTION END -->` }} />



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

      <CtaBanner
        variant="dark"
        headline="Still managing fees on Excel and attendance in a register?"
        accentSub="Join 5 Kerala coaching institutes already running on Edveo. Free to start. No setup fees. Live in 5 minutes."
        primaryLabel="Get a free demo →"
        secondaryLabel="Talk to an Expert"
        secondaryHref={COMPANY_WHATSAPP_URL}
        trustItems={["Free forever", "No credit card required", "Data stored in India", "Cancel anytime"]}
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
