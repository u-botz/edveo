'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './intelligence-demo.module.css';
import { PromptChipRail } from './PromptChipRail';
import { DemoInputRow } from './DemoInputRow';
import { TypingIndicator } from './TypingIndicator';
import { DemoResponseRenderer } from './DemoResponseRenderer';
import { getDemoResponse } from '../api/getDemoResponse';
import { SHOWCASE_AT_RISK_PROMPT } from '../api/simulated-responses';
import type { DemoMessage, DemoResponseType, DemoShellState } from '../model/types';
import { motion, AnimatePresence } from 'framer-motion';
import { IntelligenceCapabilityCards } from './IntelligenceCapabilityCards';

export function IntelligenceDemoShell() {
  const [state, setState] = useState<DemoShellState>({
    messages: [
      {
        id: 'initial',
        role: 'assistant',
        content: 'Good afternoon. I have access to your full institute — students, fees, batches, quizzes, and attendance. What do you need?',
        timestamp: Date.now(),
      }
    ],
    status: 'ready',
    activeChip: null,
  });

  const [inputValue, setInputValue] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    if (!messagesAreaRef.current || !scrollContainerRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    });
    
    resizeObserver.observe(messagesAreaRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);

  const handleAsk = useCallback(async (promptText: string, options?: { isAutoShowcase?: boolean }) => {
    if (!promptText.trim()) return;
    if (!options?.isAutoShowcase) {
      userInteractedRef.current = true;
    }

    // Add user message
    const userMsg: DemoMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: promptText,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      status: 'thinking',
      ...(options?.isAutoShowcase ? { activeChip: SHOWCASE_AT_RISK_PROMPT } : {}),
    }));
    
    if (!options?.isAutoShowcase) {
      setInputValue('');
    }

    // Wait 1400ms for simulated AI processing
    await new Promise(resolve => setTimeout(resolve, 1400));

    // Get response
    const response = await getDemoResponse(promptText);

    const aiMsg: DemoMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '', // Custom content driven by responseData
      responseType: (response.promptMatched ?? undefined) as DemoResponseType | undefined,
      responseData: response.data,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, aiMsg],
      status: 'ready',
      activeChip: null,
    }));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      if (cancelled || userInteractedRef.current) return;
      await handleAsk(SHOWCASE_AT_RISK_PROMPT, { isAutoShowcase: true });
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [handleAsk]);

  const handleChipClick = (prompt: string) => {
    setState(prev => ({ ...prev, activeChip: prompt }));
    setInputValue(prompt);
    void handleAsk(prompt);
  };

  const isThinking = state.status === 'thinking';

  return (
    <>
      <PromptChipRail 
        onChipClick={handleChipClick} 
        activeChip={state.activeChip} 
        disabled={isThinking} 
      />
      
      <DemoInputRow 
        onAsk={(q) => void handleAsk(q)} 
        disabled={isThinking} 
        value={inputValue}
        onChange={setInputValue}
      />

      <div className={styles.shellContainer} style={{ marginTop: '24px' }}>
        <div className={styles.shellHeader}>
          <div className={styles.headerDot} />
          <span className={styles.headerTitle}>Edveo Intelligence™</span>
          <span className={`${styles.headerStatus} ${isThinking ? styles.thinking : ''}`}>
            {isThinking ? 'Reading your data...' : 'Ready'}
          </span>
        </div>
        
        <div className={styles.shellBody} ref={scrollContainerRef}>
          <div className={styles.messagesArea} aria-live="polite" ref={messagesAreaRef}>
            <AnimatePresence initial={false}>
              {state.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`${styles.messageRow} ${msg.role === 'user' ? styles.messageRowUser : styles.messageRowAi}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DemoResponseRenderer message={msg} onAsk={(q) => void handleAsk(q)} />
                </motion.div>
              ))}
              {isThinking && (
                <motion.div
                  key="typing"
                  className={`${styles.messageRow} ${styles.messageRowAi}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.2 }}
                >
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        <IntelligenceCapabilityCards />
      </div>
    </>
  );
}
