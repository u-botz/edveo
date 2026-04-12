import InstitutionsFooter from "./InstitutionsFooter";
import InstitutionsNav from "./InstitutionsNav";
import InstitutionsSalesContent from "./InstitutionsSalesContent";
import styles from "./institutions.module.css";

export default function InstitutionsPage() {
  return (
    <main className={styles.salesMain}>
      <InstitutionsNav />
      <InstitutionsSalesContent />
      <InstitutionsFooter />
    </main>
  );
}
