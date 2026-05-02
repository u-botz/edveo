import { useState } from 'react';
import styles from './intelligence-demo.module.css';

interface DemoInputRowProps {
  onAsk: (prompt: string) => void;
  disabled: boolean;
  value: string;
  onChange: (val: string) => void;
}

export function DemoInputRow({ onAsk, disabled, value, onChange }: DemoInputRowProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onAsk(value);
    }
  };

  return (
    <form className={styles.inputRow} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Ask your institute anything..."
        aria-label="Ask Edveo Intelligence a question"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      <button 
        type="submit" 
        className={styles.askButton} 
        disabled={disabled}
        aria-label="Submit question"
      >
        Ask →
      </button>
    </form>
  );
}
