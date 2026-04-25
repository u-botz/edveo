import InstitutionsNav from "./InstitutionsNav";
import InstitutionsSalesContent from "./InstitutionsSalesContent";
import SiteFooter from "../components/SiteFooter";
import styles from "../teacher/audience.module.css";

export default function InstitutionsPage() {
  return (
    <main className={styles.salesMain}>
      <InstitutionsNav />
      <InstitutionsSalesContent />
      <SiteFooter />
    </main>
  );
}
