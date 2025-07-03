'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Developer',
    company: 'Tech Corp',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    content: 'SkillBridge transformed my career. The courses are well-structured and the instructors are top-notch. I landed my dream job after completing the Full Stack Development program.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'UX Designer',
    company: 'Design Studio',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'The design courses here are incredible. I learned practical skills that I use every day in my work. The community support is also amazing.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Data Scientist',
    company: 'Analytics Inc',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'As someone transitioning into data science, SkillBridge provided exactly what I needed. The hands-on projects and real-world applications made all the difference.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Marketing Manager',
    company: 'Growth Agency',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'The marketing courses helped me understand digital strategies that actually work. My campaigns have seen a 300% improvement since taking these courses.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Business Analyst',
    company: 'Consulting Firm',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    content: 'The business courses are comprehensive and practical. I gained skills that immediately improved my performance at work and opened new career opportunities.',
    rating: 5,
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Mobile Developer',
    company: 'App Solutions',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    content: 'Learning mobile development through SkillBridge was the best decision I made. The courses are up-to-date with the latest technologies and best practices.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful learners who have transformed their careers with SkillBridge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-semibold">4.9/5</span>
            <span>from over 10,000 reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}