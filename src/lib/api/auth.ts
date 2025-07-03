import { apiClient } from './client'
import { AuthResponse, LoginCredentials, RegisterData, User } from '@/types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
      
      if (response.token) {
        apiClient.setAuthToken(response.token)
      }
      
      return response
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message)
      throw error
    }
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', userData)
      
      if (response.token) {
        apiClient.setAuthToken(response.token)
      }
      
      return response
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message)
      throw error
    }
  },

  async logout(): Promise<void> {
    // Clear token from storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      return await apiClient.get<User>('/auth/me')
    } catch (error: any) {
      console.error('Get current user error:', error.response?.data || error.message)
      throw error
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    return await apiClient.post<AuthResponse>('/auth/refresh')
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    })
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email })
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/reset-password', {
      token,
      newPassword,
    })
  },

  async verifyEmail(token: string): Promise<void> {
    await apiClient.post('/auth/verify-email', { token })
  },

  async resendVerificationEmail(): Promise<void> {
    await apiClient.post('/auth/resend-verification')
  },
}