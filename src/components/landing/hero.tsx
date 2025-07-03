'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ArrowRight, Play, Users, BookOpen, Award } from 'lucide-react'

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Learn, Grow, and{' '}
                <span className="text-primary">Excel</span> with SkillBridge
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Join thousands of learners in our comprehensive learning management system. 
                Access expert-led courses, interactive assignments, and personalized learning paths.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => router.push('/courses')}
                className="flex items-center space-x-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push('/register')}
                className="flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Get Started Free</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2 mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2 mx-auto">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2 mx-auto">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="Students learning together"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 animate-fadeIn">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Course Completed!</div>
                  <div className="text-xs text-muted-foreground">React Fundamentals</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-fadeIn">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Live Session</div>
                  <div className="text-xs text-muted-foreground">Starting in 5 min</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}