import { Course } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Users, Star } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
  showEnrollButton?: boolean;
  showProgress?: boolean;
  progress?: number;
}

export function CourseCard({ 
  course, 
  showEnrollButton = true, 
  showProgress = false, 
  progress = 0 
}: CourseCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="mb-2">
            {course.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">4.8</span>
          </div>
        </div>
        <CardTitle className="line-clamp-2">{course.name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {course.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration} hours</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>156 students</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={course.mentor?.avatar} />
              <AvatarFallback>
                {course.mentor?.username ? getInitials(course.mentor.username) : 'M'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{course.mentor?.username}</p>
              <p className="text-xs text-muted-foreground">Instructor</p>
            </div>
          </div>

          {showProgress && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <Button asChild className="w-full">
            <Link href={`/courses/${course.id}`}>
              View Details
            </Link>
          </Button>
          
          {showEnrollButton && (
            <Button variant="outline" className="w-full">
              Enroll Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}