'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCourseStore } from '@/store/course';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  Users, 
  Star, 
  PlayCircle, 
  FileText, 
  Award,
  BookOpen,
  Loader2
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { selectedCourse, isLoading, fetchCourseById, enrollInCourse } = useCourseStore();
  const { toast } = useToast();
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCourseById(Number(params.id));
    }
  }, [params.id, fetchCourseById]);

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to enroll in courses.",
        variant: "destructive",
      });
      router.push('/auth/login');
      return;
    }

    if (!selectedCourse) return;

    setIsEnrolling(true);
    try {
      await enrollInCourse(selectedCourse.id);
      toast({
        title: "Enrollment successful",
        description: "You have successfully enrolled in this course!",
      });
      router.push('/dashboard/courses');
    } catch (error: any) {
      toast({
        title: "Enrollment failed",
        description: error.message || "Failed to enroll in course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course not found</h1>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/courses')}>
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                {selectedCourse.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{selectedCourse.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {selectedCourse.description}
              </p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{selectedCourse.duration} hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>156 students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>4.8 (124 reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedCourse.mentor?.avatar} />
                  <AvatarFallback>
                    {selectedCourse.mentor?.username ? getInitials(selectedCourse.mentor.username) : 'M'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedCourse.mentor?.username}</h3>
                  <p className="text-sm text-muted-foreground">Course Instructor</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <Award className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>Master the fundamentals of {selectedCourse.category}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Award className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>Build real-world projects from scratch</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Award className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>Get hands-on experience with industry tools</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Award className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>Prepare for professional certification</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Basic computer skills</li>
                      <li>• No prior experience required</li>
                      <li>• Willingness to learn and practice</li>
                      <li>• Access to a computer with internet connection</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Modules</CardTitle>
                    <CardDescription>
                      {selectedCourse.modules?.length || 0} modules • {selectedCourse.duration} hours total
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedCourse.modules?.map((module, index) => (
                        <div key={module.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{module.title}</h4>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <PlayCircle className="h-4 w-4" />
                            <span>15 min</span>
                          </div>
                        </div>
                      )) || (
                        <p className="text-muted-foreground">No modules available yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Assignments</CardTitle>
                    <CardDescription>
                      {selectedCourse.assignments?.length || 0} assignments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedCourse.assignments?.map((assignment, index) => (
                        <div key={assignment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1">
                            <h4 className="font-medium">{assignment.title}</h4>
                            <p className="text-sm text-muted-foreground">{assignment.description}</p>
                          </div>
                          <Badge variant="outline">Assignment {index + 1}</Badge>
                        </div>
                      )) || (
                        <p className="text-muted-foreground">No assignments available yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <CardDescription>See what other students are saying</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Mock reviews */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">John Smith</h4>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">
                              Excellent course! The instructor explains concepts clearly and the hands-on projects really help solidify the learning.
                            </p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">Mary Johnson</h4>
                              <div className="flex">
                                {[...Array(4)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <Star className="h-4 w-4 text-gray-300" />
                              </div>
                            </div>
                            <p className="text-muted-foreground">
                              Great content and well-structured. Would recommend to anyone looking to learn {selectedCourse.category}.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-2">Free</div>
                  <p className="text-muted-foreground">Full access to all content</p>
                </div>
                
                <Button 
                  onClick={handleEnroll} 
                  className="w-full mb-4"
                  disabled={isEnrolling}
                >
                  {isEnrolling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    'Enroll Now'
                  )}
                </Button>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Community access</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students enrolled</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course duration</span>
                  <span className="font-medium">{selectedCourse.duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skill level</span>
                  <span className="font-medium">Beginner</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language</span>
                  <span className="font-medium">English</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}