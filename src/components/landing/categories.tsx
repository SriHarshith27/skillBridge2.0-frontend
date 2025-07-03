'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Code, 
  Palette, 
  TrendingUp, 
  Megaphone, 
  Database, 
  Smartphone,
  Camera,
  Music
} from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    title: 'Programming',
    description: 'Learn coding languages and software development',
    icon: Code,
    courseCount: 120,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Design',
    description: 'Master UI/UX design and creative tools',
    icon: Palette,
    courseCount: 85,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Business',
    description: 'Develop business and entrepreneurship skills',
    icon: TrendingUp,
    courseCount: 95,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Marketing',
    description: 'Learn digital marketing and growth strategies',
    icon: Megaphone,
    courseCount: 70,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Data Science',
    description: 'Explore data analysis and machine learning',
    icon: Database,
    courseCount: 60,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    title: 'Mobile Development',
    description: 'Build mobile apps for iOS and Android',
    icon: Smartphone,
    courseCount: 45,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    title: 'Photography',
    description: 'Master photography and photo editing',
    icon: Camera,
    courseCount: 35,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    title: 'Music',
    description: 'Learn music production and instruments',
    icon: Music,
    courseCount: 40,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
]

export function Categories() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover courses across various fields and find the perfect learning path for your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Card key={category.title} className="card-hover group cursor-pointer">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${category.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {category.courseCount} courses available
                </p>
                <Link href={`/courses?category=${category.title.toLowerCase()}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Explore Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/courses">
            <Button size="lg" variant="outline">
              View All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}