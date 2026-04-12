import Link from "next/link";
import styles from "./segmentNav.module.css";

type Segment = "teachers" | "institutions";

type Props = {
  active: Segment;
};

export default function SegmentNav({ active }: Props) {
  const isTeachers = active === "teachers";

  return (
    <div className={styles.rail} aria-label="Audience">
      <div className={styles.railInner}>
        {isTeachers ? (
          <>
            <div className={styles.tabActive}>
              <span className={styles.tabIcon} aria-hidden>
                E
              </span>
              <span>Teachers &amp; Online</span>
            </div>
            <Link href="/institutions" className={styles.segmentLink}>
              For Institutions
            </Link>
          </>
        ) : (
          <>
            <div className={styles.tabActive}>
              <span className={styles.tabIcon} aria-hidden>
                E
              </span>
              <span>For Institutions</span>
            </div>
            <Link href="/" className={styles.segmentLink}>
              Teachers &amp; Online
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
