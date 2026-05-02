export const FEATURE_FLAGS = {
  INTELLIGENCE_DEMO_USE_REAL_AI: process.env.NEXT_PUBLIC_INTELLIGENCE_DEMO_REAL_AI === 'true',
} as const;
