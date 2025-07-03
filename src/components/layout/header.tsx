'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'
import { Menu, X, BookOpen, User, LogOut, Settings, LayoutDashboard as Dashboard } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getDashboardLink = () => {
    if (!user) return '/login'
    
    switch (user.role) {
      case 'ADMIN':
        return '/admin'
      case 'MENTOR':
        return '/mentor'
      case 'USER':
        return '/student'
      default:
        return '/login'
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">SkillBridge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/courses" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Courses
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(getDashboardLink())}
                className="flex items-center space-x-2"
              >
                <Dashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => router.push('/register')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/courses" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-muted-foreground mb-2">
                    Welcome, {user?.username}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      router.push(getDashboardLink())
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Dashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      router.push('/login')
                      setIsMenuOpen(false)
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      router.push('/register')
                      setIsMenuOpen(false)
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}