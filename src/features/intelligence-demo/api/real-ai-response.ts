import type { DemoResponse } from '../model/types';

// STUB — not implemented in INTEL-DEMO-01
// This file exists only to make the feature flag swap path clear.
// Do not implement. Do not call. Do not delete.

export async function getRealAiResponse(_prompt: string): Promise<DemoResponse> {
  throw new Error('Real AI demo not yet implemented. Set INTELLIGENCE_DEMO_USE_REAL_AI=false.');
}
