import Link from "next/link";
import EdveoLogo from "../components/EdveoLogo";
import styles from "./institutions.module.css";

export default function InstitutionsFooter() {
  return (
    <footer className={styles.instFooter}>
      <div className={styles.instFooterInner}>
        <Link href="/" className={styles.instFooterBrandLink}>
          <EdveoLogo variant="footer" />
        </Link>
        <p className={styles.instFooterContact}>
          Questions?{" "}
          <a href="mailto:hello@edveo.com">hello@edveo.com</a>
          {" · "}
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </p>
      </div>
    </footer>
  );
}
