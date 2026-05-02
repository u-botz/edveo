import styles from './intelligence-demo.module.css';

interface PromptChipRailProps {
  onChipClick: (prompt: string) => void;
  activeChip: string | null;
  disabled: boolean;
}

const PRESET_PROMPTS = [
  'Which students need my attention today?',
  'How are my fees this month?',
  'Send reminders to students who missed class today',
  "Generate questions on Newton's Laws for Class 11",
];

export function PromptChipRail({ onChipClick, activeChip, disabled }: PromptChipRailProps) {
  return (
    <div className={styles.promptRail}>
      {PRESET_PROMPTS.map((prompt) => {
        const isActive = activeChip === prompt;
        return (
          <button
            key={prompt}
            type="button"
            className={`${styles.promptChip} ${isActive ? styles.active : ''}`}
            onClick={(e) => {
              e.currentTarget.blur();
              onChipClick(prompt);
            }}
            disabled={disabled}
            aria-label={prompt}
          >
            {prompt}
          </button>
        );
      })}
    </div>
  );
}
