import type { AtRiskListData } from '../../model/types';
import styles from '../intelligence-demo.module.css';

export function AtRiskListResponse({ data, onAsk }: { data: AtRiskListData, onAsk: (prompt: string) => void }) {
  return (
    <>
      <div>{data.text}</div>
      <div>
        {data.students.map((student, idx) => (
          <div key={idx} className={styles.listCard}>
            <div>
              <div className={styles.recipientName}>{student.name}</div>
              <div className={styles.recipientDetail}>{student.issue}</div>
            </div>
            <span className={`${styles.badge} ${student.badgeColour === 'danger' ? styles.badgeDanger : styles.badgeWarning}`}>
              {student.badge}
            </span>
          </div>
        ))}
      </div>
      <button type="button" className={styles.followUpPill} onClick={() => onAsk(data.followUp)}>
        {data.followUp}
      </button>
    </>
  );
}
