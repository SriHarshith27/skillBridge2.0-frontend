export interface User {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'MENTOR' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  mentorId: string;
  mentor?: User;
  modules: Module[];
  assignments: Assignment[];
  enrollments: Enrollment[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  dueDate: string;
  courseId: string;
  submissions: AssignmentSubmission[];
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  user?: User;
  fileUrl: string;
  grade?: number;
  feedback?: string;
  submittedAt: string;
  gradedAt?: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  user?: User;
  course?: Course;
  enrolledAt: string;
  progress: number;
  completed: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: 'USER' | 'MENTOR';
}

export interface CreateCourseData {
  name: string;
  description: string;
  category: string;
  duration: number;
}

export interface CreateModuleData {
  title: string;
  description: string;
  videoFile: File;
  duration: number;
  order: number;
}

export interface CreateAssignmentData {
  title: string;
  description: string;
  dueDate: string;
  file?: File;
}

export interface GradeAssignmentData {
  grade: number;
  feedback?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FileUploadResponse {
  url: string;
  publicId: string;
}

export interface DashboardStats {
  totalUsers?: number;
  totalCourses?: number;
  totalEnrollments?: number;
  totalRevenue?: number;
  recentActivity?: Activity[];
}

export interface Activity {
  id: string;
  type: 'enrollment' | 'course_created' | 'assignment_submitted' | 'user_registered';
  description: string;
  userId: string;
  user?: User;
  createdAt: string;
}

export interface CourseFilters {
  category?: string;
  search?: string;
  mentorId?: string;
  page?: number;
  limit?: number;
}

export interface UserFilters {
  role?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  courseUpdates: boolean;
  assignmentReminders: boolean;
}

export interface UserProfile extends User {
  bio?: string;
  avatar?: string;
  notificationSettings: NotificationSettings;
  enrolledCourses?: Course[];
  createdCourses?: Course[];
}

export interface CourseProgress {
  courseId: string;
  completedModules: string[];
  totalModules: number;
  completedAssignments: string[];
  totalAssignments: number;
  overallProgress: number;
}

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isFullscreen: boolean;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}