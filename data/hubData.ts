
export type Status = 'planned' | 'in-progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';
export type ProductID = 'flow360' | 'indika';
export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  role: UserRole;
}

export const USERS = [
  { username: "rodrigo", password: import.meta.env.VITE_PASS_RODRIGO || 'rodrigo2026', role: "admin" as UserRole },
  { username: "danilo", password: import.meta.env.VITE_PASS_DANILO || 'danilo2026', role: "user" as UserRole }
];

export interface Feature {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  product: ProductID;
}

export interface SharedModule {
  id: string;
  name: string;
  description: string;
  products: ProductID[];
  status: Status;
}

export interface ChangelogEntry {
  date: string;
  items: {
    product: ProductID | 'global';
    text: string;
  }[];
}

export const features: Feature[] = [
  // Flow360 Features
  {
    id: 'f1',
    title: 'WhatsApp Cloud API Integration',
    description: 'Direct integration with Meta Cloud API for high-scale messaging.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
  },
  {
    id: 'f2',
    title: 'Queue System',
    description: 'Agent capacity management and automatic assignment logic.',
    status: 'in-progress',
    priority: 'high',
    product: 'flow360',
  },
  {
    id: 'f3',
    title: 'Tags System',
    description: 'Dynamic tagging for conversation classification and reporting.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
  },
  {
    id: 'f4',
    title: 'Advanced Contact Search',
    description: 'Search by custom fields, tags, and conversation history.',
    status: 'in-progress',
    priority: 'medium',
    product: 'flow360',
  },
  {
    id: 'f5',
    title: '24-hour Window Tracking',
    description: 'Real-time countdown and alerts for WhatsApp conversation windows.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
  },
  {
    id: 'f6',
    title: 'AI Copilot (Suggested Replies)',
    description: 'LLM-powered message suggestions based on context and knowledge base.',
    status: 'in-progress',
    priority: 'high',
    product: 'flow360',
  },
  {
    id: 'f7',
    title: 'AI Intent Analysis',
    description: 'Automatic classification of customer intents for routing.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
  },
  {
    id: 'f8',
    title: 'Avatar Generation with AI',
    description: 'Generate professional agent avatars based on brand guidelines.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
  },
  
  // Indika Features
  {
    id: 'i1',
    title: 'Points System',
    description: 'Core logic for earning and spending points across activities.',
    status: 'done',
    priority: 'high',
    product: 'indika',
  },
  {
    id: 'i2',
    title: 'Missions & Campaigns',
    description: 'Create time-limited challenges for agent engagement.',
    status: 'in-progress',
    priority: 'high',
    product: 'indika',
  },
  {
    id: 'i3',
    title: 'Gamification Leaderboards',
    description: 'Real-time ranking of performance with visual badges.',
    status: 'planned',
    priority: 'medium',
    product: 'indika',
  },
  {
    id: 'i4',
    title: 'Rewards Marketplace',
    description: 'Integrated system for agents to redeem points for prizes.',
    status: 'planned',
    priority: 'medium',
    product: 'indika',
  },
];

export const sharedModules: SharedModule[] = [
  {
    id: 'sm1',
    name: 'AI Engine',
    description: 'Centralized LLM gateway and embedding service for Flow360 and Indika analytics.',
    products: ['flow360', 'indika'],
    status: 'in-progress',
  },
  {
    id: 'sm2',
    name: 'Messaging Engine',
    description: 'Multi-channel message delivery system (WhatsApp, SMS, Web).',
    products: ['flow360'],
    status: 'done',
  },
  {
    id: 'sm3',
    name: 'User & Auth System',
    description: 'Shared identity provider with RBAC for all products.',
    products: ['flow360', 'indika'],
    status: 'done',
  },
  {
    id: 'sm4',
    name: 'Campaign Engine',
    description: 'Orchestrator for automated workflows and mass actions.',
    products: ['flow360', 'indika'],
    status: 'planned',
  },
];

export const changelog: ChangelogEntry[] = [
  {
    date: '2026-05-01',
    items: [
      { product: 'flow360', text: 'Tags system fully implemented and tested.' },
      { product: 'flow360', text: 'AI Copilot development phase started.' },
      { product: 'indika', text: 'Points system core logic improved for faster calculation.' },
    ],
  },
  {
    date: '2026-04-20',
    items: [
      { product: 'global', text: 'Infrastructure migration to high-availability cluster complete.' },
      { product: 'flow360', text: 'WhatsApp 24h window tracking service launched.' },
    ],
  },
  {
    date: '2026-04-10',
    items: [
      { product: 'indika', text: 'Initial rewards logic prototype approved.' },
    ],
  },
];
