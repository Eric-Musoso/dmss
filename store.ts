import { create } from 'zustand';

interface AppState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  user: { name: string; role: string } | null;
}

export const useStore = create<AppState>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  user: { name: 'Admin User', role: 'Architect' },
}));