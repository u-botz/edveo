import type { DemoMessage } from '../model/types';
import styles from './intelligence-demo.module.css';
import { AtRiskListResponse } from './responses/AtRiskListResponse';
import { FeeStatsResponse } from './responses/FeeStatsResponse';
import { DraftActionResponse } from './responses/DraftActionResponse';
import { QuestionListResponse } from './responses/QuestionListResponse';
import Link from 'next/link';

export function DemoResponseRenderer({ message, onAsk }: { message: DemoMessage, onAsk: (prompt: string) => void }) {
  if (message.role === 'user') {
    return (
      <div className={`${styles.messageBubble} ${styles.messageUser}`}>
        {message.content}
      </div>
    );
  }

  // AI message
  const data = message.responseData;
  
  if (!data) {
    // Should theoretically always have data if it's the AI in this demo, but fallback:
    return (
      <div className={`${styles.messageBubble} ${styles.messageAi}`}>
        {message.content}
      </div>
    );
  }

  let CustomResponse = null;

  switch (data.type) {
    case 'AT_RISK_LIST':
      CustomResponse = <AtRiskListResponse data={data} onAsk={onAsk} />;
      break;
    case 'FEE_STATS':
      CustomResponse = <FeeStatsResponse data={data} onAsk={onAsk} />;
      break;
    case 'DRAFT_ACTION':
      CustomResponse = <DraftActionResponse data={data} />;
      break;
    case 'QUESTION_LIST':
      CustomResponse = <QuestionListResponse data={data} onAsk={onAsk} />;
      break;
    case 'FALLBACK':
      CustomResponse = (
        <>
          <div>{data.text}</div>
          <Link href={data.ctaHref} style={{ color: 'var(--intel-emerald)', fontWeight: 500, display: 'inline-block', marginTop: '12px' }}>
            {data.ctaText}
          </Link>
        </>
      );
      break;
  }

  return (
    <div className={`${styles.messageBubble} ${styles.messageAi}`}>
      {CustomResponse}
    </div>
  );
}
