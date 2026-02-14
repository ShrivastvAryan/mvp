// store/auth.slice.ts
import { StateCreator } from "zustand";

export type UserRole = "buyer" | "seller" | null;

export interface AuthSlice {
  isAuthenticated: boolean;
  role: UserRole;
  email: string | null;

  hasHydrated: boolean;

  login: (data: { email: string; role: UserRole }) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;

  setHasHydrated: (state: boolean) => void;
  hydrate: () => void;
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [],
  [],
  AuthSlice
> = (set, get) => ({
  isAuthenticated: false,
  role: null,
  email: null,

  hasHydrated: false,

  login: ({ email, role }) =>
    set({
      isAuthenticated: true,
      email,
      role,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      email: null,
      role: null,
    }),

  setRole: (role) => set({ role }),

  setHasHydrated: (state) => set({ hasHydrated: state }),

  hydrate: () => {
    const state = get();
    set({
      isAuthenticated: state.isAuthenticated,
      role: state.role,
      email: state.email,
    });
  },
});
