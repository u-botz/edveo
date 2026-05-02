import type { QuestionListData } from '../../model/types';
import styles from '../intelligence-demo.module.css';

export function QuestionListResponse({ data, onAsk }: { data: QuestionListData, onAsk: (prompt: string) => void }) {
  return (
    <>
      <div>{data.text}</div>
      <div>
        {data.questions.map((q, idx) => (
          <div key={idx} className={styles.questionCard}>
            <div className={styles.questionText}>
              <strong>{idx + 1}.</strong> {q.text}
            </div>
            <div className={styles.questionTag}>{q.tag}</div>
          </div>
        ))}
      </div>
      <button type="button" className={styles.followUpPill} onClick={() => onAsk(data.followUp)}>
        {data.followUp}
      </button>
    </>
  );
}
