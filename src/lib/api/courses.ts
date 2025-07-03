import { apiClient } from './client'
import { 
  Course, 
  CreateCourseData, 
  CreateModuleData, 
  CreateAssignmentData,
  Module,
  Assignment,
  CourseFilters,
  PaginatedResponse,
  ApiResponse
} from '@/types'

export const courseService = {
  // Public course endpoints
  async getAllCourses(filters?: CourseFilters): Promise<PaginatedResponse<Course>> {
    return await apiClient.get<PaginatedResponse<Course>>('/courses', filters)
  },

  async getCourseById(id: string): Promise<Course> {
    return await apiClient.get<Course>(`/courses/${id}`)
  },

  async getCoursesByCategory(category: string): Promise<Course[]> {
    const response = await apiClient.get<PaginatedResponse<Course>>('/courses', { category })
    return response.data
  },

  async searchCourses(query: string): Promise<Course[]> {
    const response = await apiClient.get<PaginatedResponse<Course>>('/courses', { search: query })
    return response.data
  },

  // User course endpoints
  async enrollInCourse(courseId: string): Promise<ApiResponse<any>> {
    return await apiClient.post<ApiResponse<any>>(`/courses/${courseId}/enroll`)
  },

  async getEnrolledCourses(): Promise<Course[]> {
    return await apiClient.get<Course[]>('/courses/enrolled')
  },

  async getCourseProgress(courseId: string): Promise<any> {
    return await apiClient.get(`/courses/${courseId}/progress`)
  },

  async markModuleComplete(moduleId: string): Promise<void> {
    await apiClient.post(`/courses/modules/${moduleId}/complete`)
  },

  // Mentor course endpoints
  async createCourse(courseData: CreateCourseData): Promise<Course> {
    return await apiClient.post<Course>('/courses', courseData)
  },

  async updateCourse(courseId: string, courseData: Partial<CreateCourseData>): Promise<Course> {
    return await apiClient.put<Course>(`/courses/${courseId}`, courseData)
  },

  async deleteCourse(courseId: string): Promise<void> {
    await apiClient.delete(`/courses/${courseId}`)
  },

  async getMentorCourses(): Promise<Course[]> {
    return await apiClient.get<Course[]>('/courses/mentor')
  },

  // Module management
  async addModule(courseId: string, moduleData: CreateModuleData): Promise<Module> {
    const formData = new FormData()
    formData.append('title', moduleData.title)
    formData.append('description', moduleData.description)
    formData.append('duration', moduleData.duration.toString())
    formData.append('order', moduleData.order.toString())
    formData.append('videoFile', moduleData.videoFile)

    return await apiClient.post<Module>(`/courses/${courseId}/modules`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  async updateModule(moduleId: string, moduleData: Partial<CreateModuleData>): Promise<Module> {
    return await apiClient.put<Module>(`/courses/modules/${moduleId}`, moduleData)
  },

  async deleteModule(moduleId: string): Promise<void> {
    await apiClient.delete(`/courses/modules/${moduleId}`)
  },

  async reorderModules(courseId: string, moduleIds: string[]): Promise<void> {
    await apiClient.post(`/courses/${courseId}/modules/reorder`, { moduleIds })
  },

  // Assignment management
  async addAssignment(courseId: string, assignmentData: CreateAssignmentData): Promise<Assignment> {
    const formData = new FormData()
    formData.append('title', assignmentData.title)
    formData.append('description', assignmentData.description)
    formData.append('dueDate', assignmentData.dueDate)
    
    if (assignmentData.file) {
      formData.append('file', assignmentData.file)
    }

    return await apiClient.post<Assignment>(`/courses/${courseId}/assignments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  async updateAssignment(assignmentId: string, assignmentData: Partial<CreateAssignmentData>): Promise<Assignment> {
    return await apiClient.put<Assignment>(`/courses/assignments/${assignmentId}`, assignmentData)
  },

  async deleteAssignment(assignmentId: string): Promise<void> {
    await apiClient.delete(`/courses/assignments/${assignmentId}`)
  },

  async getAssignmentSubmissions(assignmentId: string): Promise<any[]> {
    return await apiClient.get<any[]>(`/courses/assignments/${assignmentId}/submissions`)
  },

  async submitAssignment(assignmentId: string, file: File): Promise<any> {
    const formData = new FormData()
    formData.append('file', file)

    return await apiClient.post(`/courses/assignments/${assignmentId}/submit`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  async gradeAssignment(assignmentId: string, submissionId: string, grade: number, feedback?: string): Promise<void> {
    await apiClient.post(`/courses/assignments/${assignmentId}/grade`, {
      submissionId,
      grade,
      feedback,
    })
  },

  // Course statistics
  async getCourseStats(courseId: string): Promise<any> {
    return await apiClient.get(`/courses/${courseId}/stats`)
  },

  async getMentorStats(): Promise<any> {
    return await apiClient.get('/courses/mentor/stats')
  },
}