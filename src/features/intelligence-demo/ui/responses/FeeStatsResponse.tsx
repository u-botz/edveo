import type { FeeStatsData } from '../../model/types';
import styles from '../intelligence-demo.module.css';

export function FeeStatsResponse({ data, onAsk }: { data: FeeStatsData, onAsk: (prompt: string) => void }) {
  return (
    <>
      <div>{data.text}</div>
      <div className={styles.statsGrid}>
        {data.stats.map((stat, idx) => {
          let deltaClass = styles.deltaNeutral;
          if (stat.deltaType === 'positive') deltaClass = styles.deltaPositive;
          if (stat.deltaType === 'warning') deltaClass = styles.deltaWarning;
          
          return (
            <div key={idx} className={styles.statCard}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={`${styles.statDelta} ${deltaClass}`}>{stat.delta}</span>
            </div>
          );
        })}
      </div>
      <button type="button" className={styles.followUpPill} onClick={() => onAsk(data.followUp)}>
        {data.followUp}
      </button>
    </>
  );
}
