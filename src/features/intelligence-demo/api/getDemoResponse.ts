import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { getSimulatedResponse } from './simulated-responses';
import { getRealAiResponse } from './real-ai-response';
import type { DemoResponse } from '../model/types';

export async function getDemoResponse(prompt: string): Promise<DemoResponse> {
  if (FEATURE_FLAGS.INTELLIGENCE_DEMO_USE_REAL_AI) {
    return getRealAiResponse(prompt);
  }
  // We make it async to simulate network delay when fetching real AI
  // but the delay itself is handled by the UI layer to show typing indicator.
  return Promise.resolve(getSimulatedResponse(prompt));
}
