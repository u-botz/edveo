import { useState } from 'react';
import type { DraftActionData } from '../model/types';
import styles from './intelligence-demo.module.css';

export function ActionConfirmationCard({ data }: { data: DraftActionData }) {
  const [confirmed, setConfirmed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(data.messagePreview);

  if (confirmed) {
    return (
      <div className={styles.confirmedBanner}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
        <span>{data.confirmedMessage}</span>
      </div>
    );
  }

  return (
    <div className={styles.actionCard}>
      <div className={styles.actionCardHeader}>
        Draft action — {data.recipients.length} recipients
      </div>
      <div className={styles.actionCardBody}>
        {data.recipients.map((recipient, i) => (
          <div key={i} className={styles.recipientRow}>
            <span className={styles.recipientName}>{recipient.name}</span>
            <span className={styles.recipientDetail}>{recipient.batch}</span>
          </div>
        ))}
        {isEditing ? (
          <textarea 
            className={styles.messageEditArea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
        ) : (
          <div className={styles.messagePreview}>
            "{message}"
          </div>
        )}
      </div>
      <div className={styles.actionCardFooter}>
        <button 
          className={styles.btnConfirm} 
          onClick={() => setConfirmed(true)}
          aria-label={`Confirm and send ${data.recipients.length} reminders`}
        >
          Confirm & Send
        </button>
        <button className={styles.btnEdit} type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save draft' : 'Edit message'}
        </button>
      </div>
    </div>
  );
}
