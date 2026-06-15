import styles from './intelligence-demo.module.css';

interface PromptChipRailProps {
  onChipClick: (prompt: string) => void;
  activeChip: string | null;
  disabled: boolean;
}

const PRESET_PROMPTS = [
  "Who hasn't paid fees this month?",
  "Which batch has the lowest attendance?",
  "Send a reminder to all Class 11 parents",
  "How many new students joined this month?",
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
