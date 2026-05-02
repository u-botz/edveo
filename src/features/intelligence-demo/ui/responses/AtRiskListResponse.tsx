'use client';

import { motion } from 'framer-motion';
import type { AtRiskListData } from '../../model/types';
import styles from '../intelligence-demo.module.css';

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 420, damping: 30 },
  },
};

export function AtRiskListResponse({ data, onAsk }: { data: AtRiskListData, onAsk: (prompt: string) => void }) {
  return (
    <>
      <div>{data.text}</div>
      <motion.div
        className={styles.atRiskCardList}
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {data.students.map((student) => (
          <motion.div key={student.name} variants={rowVariants} className={styles.listCard}>
            <div>
              <div className={styles.recipientName}>{student.name}</div>
              <div className={styles.recipientDetail}>{student.issue}</div>
            </div>
            <span className={`${styles.badge} ${student.badgeColour === 'danger' ? styles.badgeDanger : styles.badgeWarning}`}>
              {student.badge}
            </span>
          </motion.div>
        ))}
      </motion.div>
      <button type="button" className={styles.followUpPill} onClick={() => onAsk(data.followUp)}>
        {data.followUp}
      </button>
    </>
  );
}
