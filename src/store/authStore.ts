// stores/authStore.ts
import { create } from "zustand";

interface AuthState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any | null;
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAuth: (data: any) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({

  user: null,

  session: null,

  isAuthenticated: false,

  setAuth: (data) =>
    set({
      user: data.user,
      session: data.session,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      session: null,
      isAuthenticated: false,
    }),
    
}));