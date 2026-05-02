'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './intelligence-demo.module.css';
import { PromptChipRail } from './PromptChipRail';
import { DemoInputRow } from './DemoInputRow';
import { TypingIndicator } from './TypingIndicator';
import { DemoResponseRenderer } from './DemoResponseRenderer';
import { getDemoResponse } from '../api/getDemoResponse';
import type { DemoMessage, DemoShellState } from '../model/types';
import { motion, AnimatePresence } from 'framer-motion';

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

  const handleAsk = async (promptText: string) => {
    if (!promptText.trim()) return;

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
    }));
    
    setInputValue('');

    // Wait 1400ms for simulated AI processing
    await new Promise(resolve => setTimeout(resolve, 1400));

    // Get response
    const response = await getDemoResponse(promptText);

    const aiMsg: DemoMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '', // Custom content driven by responseData
      responseType: response.promptMatched as any,
      responseData: response.data,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, aiMsg],
      status: 'ready',
      activeChip: null,
    }));
  };

  const handleChipClick = (prompt: string) => {
    setState(prev => ({ ...prev, activeChip: prompt }));
    setInputValue(prompt);
    handleAsk(prompt);
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
        onAsk={handleAsk} 
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
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                  <DemoResponseRenderer message={msg} onAsk={handleAsk} />
                </motion.div>
              ))}
              {isThinking && (
                <motion.div
                  key="typing"
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
      </div>
    </>
  );
}
