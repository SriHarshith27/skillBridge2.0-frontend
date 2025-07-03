import { apiClient } from './client'
import { User, Course, UserFilters, PaginatedResponse, DashboardStats } from '@/types'

export const adminService = {
  // User management
  async getAllUsers(filters?: UserFilters): Promise<PaginatedResponse<User>> {
    return await apiClient.get<PaginatedResponse<User>>('/admin/users', filters)
  },

  async getUserById(id: string): Promise<User> {
    return await apiClient.get<User>(`/admin/users/${id}`)
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/admin/users/${id}`)
  },

  async updateUserRole(id: string, role: string): Promise<User> {
    return await apiClient.patch<User>(`/admin/users/${id}/role`, { role })
  },

  async activateUser(id: string): Promise<User> {
    return await apiClient.patch<User>(`/admin/users/${id}/activate`)
  },

  async deactivateUser(id: string): Promise<User> {
    return await apiClient.patch<User>(`/admin/users/${id}/deactivate`)
  },

  // Course management
  async getAllCoursesAdmin(): Promise<Course[]> {
    return await apiClient.get<Course[]>('/admin/courses')
  },

  async deleteCourseAdmin(id: string): Promise<void> {
    await apiClient.delete(`/admin/courses/${id}`)
  },

  async approveCourse(id: string): Promise<Course> {
    return await apiClient.patch<Course>(`/admin/courses/${id}/approve`)
  },

  async rejectCourse(id: string, reason: string): Promise<Course> {
    return await apiClient.patch<Course>(`/admin/courses/${id}/reject`, { reason })
  },

  // Dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    return await apiClient.get<DashboardStats>('/admin/dashboard/stats')
  },

  async getUserRegistrationStats(period: string = '30d'): Promise<any> {
    return await apiClient.get(`/admin/stats/user-registrations`, { period })
  },

  async getCourseCreationStats(period: string = '30d'): Promise<any> {
    return await apiClient.get(`/admin/stats/course-creations`, { period })
  },

  async getEnrollmentStats(period: string = '30d'): Promise<any> {
    return await apiClient.get(`/admin/stats/enrollments`, { period })
  },

  // System management
  async getSystemHealth(): Promise<any> {
    return await apiClient.get('/admin/system/health')
  },

  async getSystemLogs(limit: number = 100): Promise<any[]> {
    return await apiClient.get('/admin/system/logs', { limit })
  },

  async clearSystemLogs(): Promise<void> {
    await apiClient.delete('/admin/system/logs')
  },

  async backupDatabase(): Promise<any> {
    return await apiClient.post('/admin/system/backup')
  },

  async getBackupHistory(): Promise<any[]> {
    return await apiClient.get('/admin/system/backups')
  },

  // Content moderation
  async getReportedContent(): Promise<any[]> {
    return await apiClient.get('/admin/moderation/reports')
  },

  async resolveReport(reportId: string, action: string): Promise<void> {
    await apiClient.post(`/admin/moderation/reports/${reportId}/resolve`, { action })
  },

  // Analytics
  async getAnalytics(type: string, period: string = '30d'): Promise<any> {
    return await apiClient.get('/admin/analytics', { type, period })
  },

  async exportAnalytics(type: string, period: string = '30d', format: string = 'csv'): Promise<void> {
    await apiClient.downloadFile(`/admin/analytics/export?type=${type}&period=${period}&format=${format}`, `analytics-${type}-${period}.${format}`)
  },
}