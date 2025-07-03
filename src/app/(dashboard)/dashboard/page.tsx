'use client';

import { useAuthStore } from '@/store/auth';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  PlayCircle,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.username}. Here's what's happening on your platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value="2,847"
          description="Active learners and mentors"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Courses"
          value="156"
          description="Published courses"
          icon={BookOpen}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Enrollments"
          value="12,543"
          description="Course enrollments"
          icon={TrendingUp}
          trend={{ value: 23, isPositive: true }}
        />
        <StatsCard
          title="Completion Rate"
          value="78%"
          description="Average course completion"
          icon={Award}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New course published</p>
                  <p className="text-xs text-muted-foreground">React Advanced Patterns by John Doe</p>
                </div>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">User registered</p>
                  <p className="text-xs text-muted-foreground">jane.smith@example.com</p>
                </div>
                <span className="text-xs text-muted-foreground">4h ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Course completed</p>
                  <p className="text-xs text-muted-foreground">JavaScript Fundamentals</p>
                </div>
                <span className="text-xs text-muted-foreground">6h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/dashboard/users">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Review Courses
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/analytics">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMentorDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.username}. Ready to inspire and teach?
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="My Courses"
          value="8"
          description="Published courses"
          icon={BookOpen}
        />
        <StatsCard
          title="Total Students"
          value="342"
          description="Enrolled across all courses"
          icon={Users}
        />
        <StatsCard
          title="Pending Reviews"
          value="23"
          description="Assignments to grade"
          icon={FileText}
        />
        <StatsCard
          title="Avg. Rating"
          value="4.8"
          description="Course rating"
          icon={Award}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Your top performing courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>React Fundamentals</span>
                  <span>156 students</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>JavaScript Advanced</span>
                  <span>98 students</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Node.js Backend</span>
                  <span>88 students</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your teaching content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/dashboard/courses/create">
                <BookOpen className="mr-2 h-4 w-4" />
                Create New Course
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/assignments">
                <FileText className="mr-2 h-4 w-4" />
                Review Assignments
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/students">
                <Users className="mr-2 h-4 w-4" />
                View Students
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUserDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Learning Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.username}. Continue your learning journey!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Enrolled Courses"
          value="12"
          description="Active enrollments"
          icon={BookOpen}
        />
        <StatsCard
          title="Completed"
          value="8"
          description="Courses finished"
          icon={CheckCircle}
        />
        <StatsCard
          title="In Progress"
          value="4"
          description="Currently learning"
          icon={Clock}
        />
        <StatsCard
          title="Certificates"
          value="6"
          description="Earned certificates"
          icon={Award}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <PlayCircle className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <h4 className="font-medium">React Fundamentals</h4>
                  <p className="text-sm text-muted-foreground">Module 3: State Management</p>
                  <Progress value={65} className="h-2 mt-2" />
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <PlayCircle className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <h4 className="font-medium">JavaScript Advanced</h4>
                  <p className="text-sm text-muted-foreground">Module 2: Async Programming</p>
                  <Progress value={30} className="h-2 mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Award className="h-8 w-8 text-yellow-600" />
                <div>
                  <h4 className="font-medium">Course Completed</h4>
                  <p className="text-sm text-muted-foreground">HTML & CSS Basics</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Award className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-medium">Perfect Score</h4>
                  <p className="text-sm text-muted-foreground">JavaScript Quiz</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Award className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="font-medium">Streak Master</h4>
                  <p className="text-sm text-muted-foreground">7 days learning streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (user?.role) {
      case 'ADMIN':
        return renderAdminDashboard();
      case 'MENTOR':
        return renderMentorDashboard();
      case 'USER':
      default:
        return renderUserDashboard();
    }
  };

  return (
    <div className="space-y-6">
      {renderDashboard()}
    </div>
  );
}