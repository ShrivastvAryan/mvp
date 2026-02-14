// store/store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAuthSlice, AuthSlice } from "./auth.slice";

export type StoreState = AuthSlice;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: "app-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
