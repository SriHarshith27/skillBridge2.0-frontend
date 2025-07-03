'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Star } from 'lucide-react'
import { Course } from '@/types'
import { courseService } from '@/lib/api/courses'
import { formatDuration } from '@/lib/utils'
import Link from 'next/link'

export function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        setError(null)
        setIsLoading(true)
        
        // Use mock data by default to avoid network errors during development
        const mockCourses: Course[] = [
          {
            id: '1',
            name: 'Complete Web Development Bootcamp',
            description: 'Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course',
            category: 'Web Development',
            duration: 40,
            mentorId: '1',
            enrollments: Array(1250).fill(null),
            mentor: { id: '1', username: 'Sarah Johnson', email: '', role: 'MENTOR', createdAt: '', updatedAt: '' },
            modules: [],
            assignments: [],
            createdAt: '',
            updatedAt: ''
          },
          {
            id: '2',
            name: 'Data Science with Python',
            description: 'Master data analysis, machine learning, and visualization with Python',
            category: 'Data Science',
            duration: 35,
            mentorId: '2',
            enrollments: Array(890).fill(null),
            mentor: { id: '2', username: 'Dr. Michael Chen', email: '', role: 'MENTOR', createdAt: '', updatedAt: '' },
            modules: [],
            assignments: [],
            createdAt: '',
            updatedAt: ''
          },
          {
            id: '3',
            name: 'UI/UX Design Fundamentals',
            description: 'Learn design principles, user research, and create stunning interfaces',
            category: 'Design',
            duration: 25,
            mentorId: '3',
            enrollments: Array(650).fill(null),
            mentor: { id: '3', username: 'Emma Rodriguez', email: '', role: 'MENTOR', createdAt: '', updatedAt: '' },
            modules: [],
            assignments: [],
            createdAt: '',
            updatedAt: ''
          },
          {
            id: '4',
            name: 'Mobile App Development with React Native',
            description: 'Build cross-platform mobile apps using React Native and JavaScript',
            category: 'Mobile Development',
            duration: 30,
            mentorId: '4',
            enrollments: Array(420).fill(null),
            mentor: { id: '4', username: 'Alex Thompson', email: '', role: 'MENTOR', createdAt: '', updatedAt: '' },
            modules: [],
            assignments: [],
            createdAt: '',
            updatedAt: ''
          },
          {
            id: '5',
            name: 'Digital Marketing Mastery',
            description: 'Learn SEO, social media marketing, and digital advertising strategies',
            category: 'Marketing',
            duration: 20,
            mentorId: '5',
            enrollments: Array(780).fill(null),
            mentor: { id: '5', username: 'Lisa Park', email: '', role: 'MENTOR', createdAt: '', updatedAt: '' },
            modules: [],
            assignments: [],
            createdAt: '',
            updatedAt: ''
          },
          {
            id: '6',
            name: 'Cloud Computing with AWS',
            description: 'Master Amazon Web Services and cloud infrastructure deployment',
            category: 'Cloud Computing',
            duration: 45,
            mentorId: '6',
            enrollments: Array(320).fill(null),
            mentor: { id: '6', username: 'David Kumar', email: '', role: 'MENTOR', createdAt: '', updatedAt: '' },
            modules: [],
            assignments: [],
            createdAt: '',
            updatedAt: ''
          }
        ]
        
        setCourses(mockCourses)
        
        // Try to fetch real data, but don't fail if it doesn't work
        try {
          const response = await courseService.getAllCourses({ limit: 6 })
          if (response && response.data && response.data.length > 0) {
            setCourses(response.data)
          }
        } catch (apiError: any) {
          console.warn('Using mock data - API error:', apiError.message)
          setError(apiError.message || 'Failed to load courses from API')
        }
      } catch (error: any) {
        console.error('Failed to fetch featured courses:', error)
        setError(error.message || 'Failed to load courses')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedCourses()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-xl text-muted-foreground">
              Discover our most popular and highly-rated courses
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and highly-rated courses taught by industry experts
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                Using demo data - {error}
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course) => (
            <Card key={course.id} className="card-hover group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`}
                  alt={course.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{course.category}</Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(course.duration * 60)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.enrollments?.length || 0} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    by {course.mentor?.username || 'Expert Instructor'}
                  </div>
                  <Link href={`/courses/${course.id}`}>
                    <Button size="sm">View Course</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/courses">
            <Button size="lg" variant="outline">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}