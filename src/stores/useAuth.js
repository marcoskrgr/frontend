import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      userData: null,

      setToken: (token) => set({ token }),
      setUserData: (userData) => set({ userData }),

      clearAuth: () =>
        set({
          token: null,
          userData: null,
        }),
    }),
    {
      name: 'auth-storage',
      // partialize: (state) => ({
      //   token: state.token
      // }),
    }
  )
)
