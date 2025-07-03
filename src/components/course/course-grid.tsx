import { Course } from '@/types';
import { CourseCard } from './course-card';

interface CourseGridProps {
  courses: Course[];
  showEnrollButton?: boolean;
  showProgress?: boolean;
  isLoading?: boolean;
}

export function CourseGrid({ 
  courses, 
  showEnrollButton = true, 
  showProgress = false,
  isLoading = false 
}: CourseGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64"></div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No courses found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          showEnrollButton={showEnrollButton}
          showProgress={showProgress}
          progress={Math.floor(Math.random() * 100)} // Mock progress
        />
      ))}
    </div>
  );
}