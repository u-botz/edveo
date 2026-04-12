import styles from "./institutions.module.css";

export default function InstitutionsFooter() {
  return (
    <footer className={styles.instFooter}>
      <div className={styles.instFooterInner}>
        <div className={styles.instFooterBrand}>
          <span className={styles.instFooterMark} aria-hidden />
          <span className={styles.instFooterName}>Edveo</span>
        </div>
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
