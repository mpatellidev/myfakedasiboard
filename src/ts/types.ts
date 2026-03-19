// ===== TYPES — DaSIboard =====
// Interfaces e tipos compartilhados entre todos os módulos

export interface Theme {
  key: string;
  label: string;
  dark: boolean;
}

export interface Event {
  date: string;
  title: string;
  type: string;
  description?: string;
  entidade?: string;
  turmas?: string[];
  link?: string;
}

export interface ScheduleCourse {
  course: string;
  day: string;
  time: string;
  professor?: string;
  room?: string;
  code?: string;
  tipo?: string;
  extra?: string[];
  // campos alternativos do JSON
  dia?: string;
  inicio?: string;
  fim?: string;
  codigo?: string;
  semester?: string | number;
}

export interface Semester {
  id: string;
  label: string;
  turmas: string[];
}

export interface ScheduleData {
  semesters: Semester[];
  turmas: Record<string, { label: string; periodo?: string }>;
  schedule: Record<string, ScheduleCourse[]>;
}

export interface NewsletterItem {
  id: number;
  date: string;
  title: string;
  summary: string;
  content: string;
}

export interface Quote {
  text: string;
  author: string;
  source?: string;
}

export interface EntidadeMeta {
  cor: string;
  emoji: string;
  nome: string;
}

export interface KanbanTask {
  id: string;
  text: string;
  col: string;
  created: number;
  dueDate?: string;
  priority?: string;
  label?: string;
}

export interface GPASubject {
  id: string;
  name: string;
  grade?: number;
  credits: number;
  semester?: number;
}

export interface Absence {
  id: string;
  subject: string;
  date: string;
  count: number;
  maxAllowed: number;
}

export interface AuthResult {
  success: boolean;
  user?: import('firebase/auth').User;
  error?: string;
}
