export type DemoResponseType =
  | 'AT_RISK_LIST'
  | 'FEE_STATS'
  | 'DRAFT_ACTION'
  | 'QUESTION_LIST'
  | 'FALLBACK';

export interface DemoMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  responseType?: DemoResponseType;
  responseData?: DemoResponseData;
  timestamp: number;
}

export interface AtRiskStudent {
  name: string;
  issue: string;
  badge: string;
  badgeColour: 'danger' | 'warning';
}

export interface AtRiskListData {
  type: 'AT_RISK_LIST';
  text: string;
  students: AtRiskStudent[];
  followUp: string;
}

export interface FeeStat {
  label: string;
  value: string;
  delta: string;
  deltaType: 'positive' | 'neutral' | 'warning';
}

export interface FeeStatsData {
  type: 'FEE_STATS';
  text: string;
  stats: FeeStat[];
  followUp: string;
}

export interface ActionRecipient {
  name: string;
  batch: string;
}

export interface DraftActionData {
  type: 'DRAFT_ACTION';
  text: string;
  recipients: ActionRecipient[];
  messagePreview: string;
  confirmedMessage: string;
}

export interface QuizQuestion {
  text: string;
  tag: string;
}

export interface QuestionListData {
  type: 'QUESTION_LIST';
  text: string;
  questions: QuizQuestion[];
  followUp: string;
}

export interface FallbackData {
  type: 'FALLBACK';
  text: string;
  ctaText: string;
  ctaHref: string;
}

export type DemoResponseData =
  | AtRiskListData
  | FeeStatsData
  | DraftActionData
  | QuestionListData
  | FallbackData;

export interface DemoResponse {
  promptMatched: string | null;
  data: DemoResponseData;
}

export interface DemoShellState {
  messages: DemoMessage[];
  status: 'ready' | 'thinking';
  activeChip: string | null;
}
