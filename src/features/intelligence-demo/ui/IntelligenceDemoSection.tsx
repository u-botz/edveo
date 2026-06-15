'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import styles from './intelligence-demo.module.css';
import { IntelligenceDemoShell } from './IntelligenceDemoShell';

export function IntelligenceDemoSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5
      }
    },
  };
  
  const shellVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
        delay: 0.45
      }
    },
  };

  return (
    <section 
      ref={ref} 
      className={styles.sectionWrapper} 
      aria-label="Edveo Intelligence™ interactive demo"
    >
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}>
          <span className={styles.eyebrowPill}>Edveo Intelligence™</span>
        </motion.div>
        
        <motion.h2 variants={itemVariants} className={styles.headline}>
          Your institute's data, always at your fingertips.
        </motion.h2>
        
        <motion.p variants={itemVariants} className={styles.subheadline}>
          Ask Edveo anything about your institute — fees, attendance, students, batches. It reads your live data and answers in plain language, no dashboard digging needed.
        </motion.p>
        
        <motion.div variants={shellVariants} style={{ width: '100%' }}>
          <IntelligenceDemoShell />
        </motion.div>
      </motion.div>
    </section>
  );
}
