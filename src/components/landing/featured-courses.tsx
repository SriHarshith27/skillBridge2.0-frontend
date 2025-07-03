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

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response = await courseService.getAllCourses({ limit: 6 })
        setCourses(response.data)
      } catch (error) {
        console.error('Failed to fetch featured courses:', error)
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