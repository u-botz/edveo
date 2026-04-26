import type { Metadata } from "next";
import Link from "next/link";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import styles from "../legal/legal.module.css";
import { CONTACT_EMAIL } from "@/lib/contactEmail";

export const metadata: Metadata = {
  title: "Terms of Service — Edveo",
  description:
    "Terms governing use of the Edveo platform, including acceptable use, billing, termination, and liability.",
};

const LAST_UPDATED = "26 April 2026";
const COMPANY_NAME = "Ubotz Technologies Private Limited";

export default function TermsOfServicePage() {
  return (
    <>
      <SiteNavbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Legal</p>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.meta}>Last updated: {LAST_UPDATED}</p>
          </header>

          <div className={styles.body}>
            <p>
              These Terms of Service (&quot;Terms&quot;) are a binding agreement between you and{" "}
              {COMPANY_NAME} (&quot;Ubotz&quot;, &quot;we&quot;, &quot;us&quot;) for use of the Edveo
              software, websites, and related services (the &quot;Services&quot;).
            </p>
            <p>
              By creating an account, clicking acceptance where offered, or using the Services, you
              agree to these Terms. If you accept on behalf of an organisation, you represent that
              you have authority to bind that organisation.
            </p>

            <h2>1. What Edveo is and who may use it</h2>
            <p>
              Edveo is a cloud-based learning and institute-management platform. It is intended for
              educational organisations, educators, and their authorised students or end users, as
              invited or administered by a subscribing organisation.
            </p>
            <p>You may use the Services only if:</p>
            <ul>
              <li>
                You can form a binding contract under the laws that apply to you (for organisation
                accounts, the person registering must be authorised to do so).
              </li>
              <li>You comply with these Terms and all applicable laws.</li>
              <li>You do not use the Services in a jurisdiction where such use is prohibited.</li>
            </ul>
            <p>
              Features, limits, and availability may depend on your plan. We may refuse service to
              anyone for legitimate business or legal reasons.
            </p>

            <h2>2. Acceptable use policy</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Violate any law or third-party rights.</li>
              <li>
                Upload, transmit, or store unlawful, harmful, fraudulent, defamatory, or infringing
                content.
              </li>
              <li>
                Attempt to probe, scan, or breach security, or access data or accounts you are not
                authorised to use.
              </li>
              <li>
                Reverse engineer, decompile, or circumvent technical limits of the Services, except
                where applicable law forbids this restriction.
              </li>
              <li>
                Use the Services to send spam or unsolicited bulk communications outside what the
                product reasonably allows for your role.
              </li>
              <li>
                Interfere with the integrity or performance of the Services or other
                customers&apos; use.
              </li>
              <li>
                Resell or sublicense access to the Services without Edveo&apos;s written consent.
              </li>
            </ul>
            <p>
              We may investigate suspected violations and cooperate with law enforcement. We may
              remove content or suspend access where we reasonably believe these rules are broken.
            </p>

            <h2>3. Payment and refund terms</h2>
            <p>
              Paid plans are billed according to the prices and cycle shown at checkout or in your
              order. You authorise us and our payment processors to charge applicable fees using your
              chosen payment method.
            </p>
            <p>
              <strong>Fees</strong> are due as stated on your invoice or subscription screen. Late
              or failed payment may result in suspension of access after notice where we are able to
              provide it.
            </p>
            <p>
              <strong>Refunds</strong> — unless a different refund policy is expressly stated at
              purchase or required by applicable law, fees are generally non-refundable once the
              billing period has started. If you believe you were charged in error, contact support
              promptly; we will review good-faith billing disputes.
            </p>
            <p>
              Taxes, if any, are your responsibility unless we state otherwise. Currency and
              inclusive/exclusive tax display follow what is shown at purchase.
            </p>

            <h2>4. Account termination</h2>
            <p>
              <strong>By you.</strong> You may stop using the Services and, where the product
              allows, cancel your subscription or close your account according to in-product
              controls or by contacting support.
            </p>
            <p>
              <strong>By Edveo.</strong> We may suspend or terminate access if you materially breach
              these Terms, if we must do so to comply with law, or if we discontinue the Services
              (with reasonable notice where practicable). For non-payment, we may suspend after
              notice as described in your agreement or order.
            </p>
            <p>
              Upon termination, your right to use the Services ends. Sections that by their nature
              should survive (including intellectual property, disclaimers, and limitation of
              liability) will survive.
            </p>

            <h2>5. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by applicable law, the Services are provided &quot;as
              is&quot; and &quot;as available&quot; without warranties of any kind, whether express
              or implied, including implied warranties of merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>
            <p>
              To the fullest extent permitted by applicable law, Edveo and its affiliates,
              directors, employees, and suppliers will not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or for loss of profits, data, goodwill,
              or business opportunities, arising out of or related to these Terms or the Services,
              even if advised of the possibility of such damages.
            </p>
            <p>
              To the fullest extent permitted by applicable law, Edveo&apos;s aggregate liability
              for claims arising out of or related to these Terms or the Services will not exceed
              the greater of (a) the amount you paid Edveo for the Services in the three months
              before the event giving rise to the claim, or (b) one hundred Indian rupees, if you
              had no fees paid in that period.
            </p>
            <p>
              Some jurisdictions do not allow certain limitations; in those cases, our liability is
              limited to the maximum permitted by law.
            </p>

            <h2>6. Privacy</h2>
            <p>
              Our processing of personal data is described in the{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>, which is incorporated by reference.
            </p>

            <h2>7. Changes</h2>
            <p>
              We may update these Terms. We will post the revised version and update the &quot;Last
              updated&quot; date. Where changes are material, we will provide additional notice as
              required by law or as we reasonably deem appropriate. Continued use after the effective
              date may constitute acceptance.
            </p>

            <h2>8. Contact</h2>
            <p>For legal questions about these Terms:</p>
            <address className={styles.address}>
              <strong>{COMPANY_NAME}</strong>
              <br />
              Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </address>
            <p>
              For general support, visit our <Link href="/contact">Contact</Link> page.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
