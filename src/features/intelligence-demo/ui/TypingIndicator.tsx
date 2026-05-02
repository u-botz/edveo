import styles from './intelligence-demo.module.css';
import { motion } from 'framer-motion';

export function TypingIndicator() {
  const dotVariants = {
    initial: { opacity: 0.2 },
    animate: { opacity: 1 },
  };

  const transition = {
    duration: 0.6,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut' as const,
  };

  return (
    <div className={styles.typingIndicator} aria-live="polite" aria-label="Intelligence is thinking">
      <motion.div
        className={styles.typingDot}
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0 }}
      />
      <motion.div
        className={styles.typingDot}
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0.2 }}
      />
      <motion.div
        className={styles.typingDot}
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0.4 }}
      />
    </div>
  );
}
