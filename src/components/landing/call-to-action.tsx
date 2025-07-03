'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ArrowRight, BookOpen, Users } from 'lucide-react'

export function CallToAction() {
  const router = useRouter()

  return (
    <section className="py-20 bg-primary">
      <div className="container">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Join thousands of learners who are already advancing their careers with SkillBridge. 
            Start learning today and unlock your potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => router.push('/auth/register')}
              className="flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => router.push('/courses')}
              className="flex items-center space-x-2 bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              <BookOpen className="h-4 w-4" />
              <span>Browse Courses</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-primary-foreground/80">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}