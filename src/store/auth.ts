import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'
import { authService } from '@/lib/api/auth'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (username: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  getCurrentUser: () => Promise<void>
  clearError: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await authService.login({ username, password })
          
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
            isAuthenticated: false,
            user: null,
          })
          throw error
        }
      },

      register: async (userData: any) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await authService.register(userData)
          
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Registration failed',
            isLoading: false,
            isAuthenticated: false,
            user: null,
          })
          throw error
        }
      },

      logout: () => {
        authService.logout()
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        })
      },

      getCurrentUser: async () => {
        try {
          set({ isLoading: true })
          
          const user = await authService.getCurrentUser()
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.response?.data?.message || 'Failed to get user',
          })
        }
      },

      clearError: () => set({ error: null }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)