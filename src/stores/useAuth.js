import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isPhoneConfirmed: false,
      temporaryToken: null,

      setToken: (token) => set({ token }),
      setIsPhoneConfirmed: (value) => set({ isPhoneConfirmed: value }),
      setTemporaryToken: (tempToken) => set({ temporaryToken: tempToken }),

      clearAuth: () =>
        set({
          token: null,
          isPhoneConfirmed: false,
          temporaryToken: null,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        isPhoneConfirmed: state.isPhoneConfirmed
      }),
    }
  )
)
