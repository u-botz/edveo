import type { Metadata } from "next";
import Link from "next/link";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — Edveo",
  description:
    "How Edveo collects, uses, and protects personal data for institutes, educators, and students on the platform.",
};

const LAST_UPDATED = "25 April 2026";
const CONTACT_EMAIL = "privacy@edveo.com";
const COMPANY_NAME = "Edveo Technologies Private Limited";
const COMPANY_ADDRESS = "India";

export default function PrivacyPage() {
  return (
    <>
      <SiteNavbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Legal</p>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.meta}>Last updated: {LAST_UPDATED}</p>
          </header>

          <div className={styles.body}>
            <p>
              {COMPANY_NAME} ("<strong>Edveo</strong>", "<strong>we</strong>", "<strong>us</strong>", or "<strong>our</strong>")
              operates the Edveo platform — a Software-as-a-Service (SaaS) product that provides
              learning management, ERP, and CRM capabilities to educational institutions and educators
              across India. This Privacy Policy explains how we collect, use, disclose, and safeguard
              personal information when you use our website, platform, mobile applications, and
              related services (collectively, the "<strong>Services</strong>").
            </p>
            <p>
              By accessing or using the Services, you agree to the terms of this Privacy Policy. If you
              do not agree, please do not use the Services.
            </p>

            <h2>1. Who This Policy Applies To</h2>
            <p>This policy covers three categories of data subjects:</p>
            <ul>
              <li><strong>Tenant Administrators</strong> — institute owners, principals, and admins who create and manage an Edveo tenant account.</li>
              <li><strong>Educators &amp; Staff</strong> — teachers, instructors, and support staff added to a tenant.</li>
              <li><strong>Students &amp; Parents</strong> — learners enrolled through a tenant, and parents or guardians who access progress data.</li>
            </ul>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <ul>
              <li>Account registration details: name, email address, phone number, institute name.</li>
              <li>Profile information: designation, profile photo (optional).</li>
              <li>Payment details: billing address, GST number. Card and UPI credentials are processed directly by Razorpay and are never stored on Edveo servers.</li>
              <li>Content you upload: course materials, assessments, student records, fee data, attendance records, timetables.</li>
              <li>Communications: support tickets, feedback, emails sent to us.</li>
            </ul>
            <h3>2.2 Information Collected Automatically</h3>
            <ul>
              <li>Usage data: pages visited, features used, session duration, clicks, and navigation paths.</li>
              <li>Device &amp; technical data: IP address, browser type, operating system, device identifiers.</li>
              <li>Log data: server logs, error reports, API call records.</li>
              <li>Cookies and similar tracking technologies (see Section 7).</li>
            </ul>
            <h3>2.3 Information from Third Parties</h3>
            <ul>
              <li>Payment confirmation data from Razorpay (transaction IDs, payment status).</li>
              <li>Google OAuth data if you sign in with Google (name, email, profile picture).</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To provide, operate, and maintain the Services.</li>
              <li>To process payments and send invoices.</li>
              <li>To communicate with you about your account, updates, and support requests.</li>
              <li>To send service-related notifications (fee reminders, attendance alerts) on behalf of your institution.</li>
              <li>To improve the platform through analytics and usage research.</li>
              <li>To comply with applicable Indian laws and regulations, including the Information Technology Act, 2000 and rules thereunder.</li>
              <li>To detect and prevent fraud, abuse, and security incidents.</li>
            </ul>

            <h2>4. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal data. We share data only in the following circumstances:</p>
            <ul>
              <li><strong>Service providers:</strong> Cloud hosting (infrastructure), payment processing (Razorpay), email/SMS delivery, and analytics tools — each bound by data processing agreements.</li>
              <li><strong>Within a tenant:</strong> Tenant Administrators can access data for users within their own tenant. Cross-tenant access is technically prevented.</li>
              <li><strong>Legal obligations:</strong> When required by Indian courts, regulators, or law enforcement with valid legal process.</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or asset sale, personal data may transfer to the successor entity. You will be notified.</li>
            </ul>
            <p>We do <strong>not</strong> share student personal data with advertisers or data brokers under any circumstances.</p>

            <h2>5. Data Storage and Security</h2>
            <p>
              All data is stored on servers located within India. We implement industry-standard
              technical and organisational security measures including:
            </p>
            <ul>
              <li>TLS 1.2+ encryption in transit.</li>
              <li>AES-256 encryption at rest for sensitive fields (API keys, payment credentials).</li>
              <li>Role-based access controls with principle of least privilege.</li>
              <li>Regular security audits and vulnerability assessments.</li>
              <li>Multi-tenant data isolation — each tenant's data is logically separated.</li>
            </ul>
            <p>
              No method of transmission or storage is 100% secure. If we become aware of a data breach
              that affects your personal information, we will notify you in accordance with applicable law.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain personal data for as long as your account is active or as needed to provide the
              Services. After account termination:
            </p>
            <ul>
              <li>Active tenant data is retained for 30 days to allow recovery.</li>
              <li>After 30 days, data is permanently deleted from production systems within 90 days.</li>
              <li>Backup copies may persist for up to 180 days before deletion.</li>
              <li>Financial records are retained for 7 years as required by Indian tax law.</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>We use the following categories of cookies:</p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for authentication and basic platform functionality. Cannot be disabled.</li>
              <li><strong>Analytics cookies:</strong> Help us understand how users interact with the platform (e.g., page views, feature usage). You can opt out.</li>
              <li><strong>Preference cookies:</strong> Remember your settings such as language and display preferences.</li>
            </ul>
            <p>You can manage cookie preferences through your browser settings. Disabling essential cookies will affect platform functionality.</p>

            <h2>8. Your Rights</h2>
            <p>Under applicable Indian law and as a matter of our policy, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal retention obligations.</li>
              <li><strong>Portability:</strong> Request an export of your data in a machine-readable format.</li>
              <li><strong>Objection:</strong> Object to certain processing activities.</li>
            </ul>
            <p>To exercise these rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond within 30 days.</p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Edveo is a B2B platform used by educational institutions. Student data (including minors)
              is processed by Edveo on behalf of and under the instruction of the Tenant Administrator
              (the institution). Institutions are responsible for obtaining appropriate consent from
              parents or guardians for minor students in accordance with applicable law. Edveo does not
              independently collect data directly from minors.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be communicated
              via email to account holders and/or a notice on the platform at least 14 days before
              taking effect. Continued use of the Services after the effective date constitutes acceptance.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              For privacy-related queries, concerns, or to exercise your rights, contact our Privacy Team:
            </p>
            <address className={styles.address}>
              <strong>{COMPANY_NAME}</strong><br />
              {COMPANY_ADDRESS}<br />
              Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </address>
            <p>
              For general support, visit our <Link href="/contact">Contact page</Link>.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
