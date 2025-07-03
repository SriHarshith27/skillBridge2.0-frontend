'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth'

export function Providers({ children }: { children: React.ReactNode }) {
  const { getCurrentUser, isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = localStorage.getItem('auth_token')
    if (token && !isAuthenticated) {
      getCurrentUser()
    }
  }, [getCurrentUser, isAuthenticated])

  return <>{children}</>
}