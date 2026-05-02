import type { DemoResponse } from '../model/types';

const PROMPT_MAP: Record<string, string> = {
  'which students need my attention today?': 'AT_RISK_LIST',
  'how are my fees this month?':              'FEE_STATS',
  'send reminders to students who missed class today': 'DRAFT_ACTION',
  'send reminder':                            'DRAFT_ACTION',
  "generate questions on newton":             'QUESTION_LIST',
  "generate 5 questions":                     'QUESTION_LIST',
};

function matchPrompt(input: string): string {
  const normalised = input.toLowerCase().trim();
  for (const [key, type] of Object.entries(PROMPT_MAP)) {
    if (normalised.includes(key)) return type;
  }
  return 'FALLBACK';
}

export function getSimulatedResponse(prompt: string): DemoResponse {
  const type = matchPrompt(prompt);

  const responses: Record<string, DemoResponse['data']> = {
    AT_RISK_LIST: {
      type: 'AT_RISK_LIST',
      text: '3 students need your attention right now:',
      students: [
        { name: 'Ananya Joshi',    issue: 'Attendance 48% · Quiz avg 41%',  badge: 'At risk',      badgeColour: 'danger'  },
        { name: 'Rahul Mehta',     issue: 'Missed last 3 classes in Batch B', badge: 'Absent streak', badgeColour: 'warning' },
        { name: 'Mohammed Salim',  issue: 'Fee overdue 18 days',             badge: 'Fee alert',    badgeColour: 'warning' },
      ],
      followUp: 'Want me to draft a message to their parents?',
    },
    FEE_STATS: {
      type: 'FEE_STATS',
      text: 'Here\'s your fee snapshot for May 2026:',
      stats: [
        { label: 'Collected',    value: '₹4.8L', delta: '+12% vs Apr',    deltaType: 'positive' },
        { label: 'Pending dues', value: '₹1.4L', delta: '42 students',    deltaType: 'neutral'  },
        { label: 'Overdue 30d+', value: '18',    delta: 'Action needed',  deltaType: 'warning'  },
      ],
      followUp: 'Want me to send reminders to the 18 overdue students?',
    },
    DRAFT_ACTION: {
      type: 'DRAFT_ACTION',
      text: 'I found 4 students absent today across your batches. Here\'s the draft:',
      recipients: [
        { name: 'Priya Sharma', batch: 'Batch A — Physics JEE'       },
        { name: 'Arjun Nair',   batch: 'Batch B — Chemistry NEET'    },
        { name: 'Sneha Rajan',  batch: 'Batch A — Physics JEE'       },
        { name: 'Vikram Das',   batch: 'Batch C — Maths Board'       },
      ],
      messagePreview: 'Hi [Student Name], you missed class today. Please check the notes shared and reach out if you need help.',
      confirmedMessage: '4 reminders sent via WhatsApp. All students notified.',
    },
    QUESTION_LIST: {
      type: 'QUESTION_LIST',
      text: 'Here are 5 questions on Newton\'s Laws — Class 11, CBSE:',
      questions: [
        { text: 'A 5 kg box is pushed with 20 N force. What is its acceleration?',                  tag: 'Apply · Medium'   },
        { text: 'Explain why a passenger lurches forward when a bus brakes suddenly.',              tag: 'Understand · Easy' },
        { text: 'Two forces of 6N and 8N act at right angles. Find the resultant force.',          tag: 'Apply · Medium'   },
        { text: 'State Newton\'s Third Law and give two real-life examples.',                      tag: 'Remember · Easy'  },
        { text: 'A rocket ejects gas at 800 m/s. If gas mass flow is 2 kg/s, calculate the thrust.', tag: 'Analyse · Hard'  },
      ],
      followUp: 'Add these to your quiz? I can also adjust difficulty or generate more.',
    },
    FALLBACK: {
      type: 'FALLBACK',
      text: 'I can answer questions about your students, fees, attendance, batches, quiz performance, and curriculum. Try one of the suggested prompts to see me in action — or sign up for a free trial to ask me about your actual institute.',
      ctaText: 'Start your free trial →',
      ctaHref: '/signup',
    },
  };

  return {
    promptMatched: type === 'FALLBACK' ? null : type,
    data: responses[type] ?? responses['FALLBACK'],
  };
}
