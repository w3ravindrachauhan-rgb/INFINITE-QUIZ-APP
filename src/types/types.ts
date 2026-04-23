// Add this to your types or top of App.tsx
interface UserDetails {
  name: string;
  email: string;
  token?: string;
  role?: 'Developer' | 'HR' | 'Admin';
}

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export type { UserDetails };