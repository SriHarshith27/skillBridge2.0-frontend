import { create } from 'zustand'
import { Course, Module, Assignment, CourseFilters } from '@/types'
import { courseService } from '@/lib/api/courses'

interface CourseState {
  courses: Course[]
  currentCourse: Course | null
  enrolledCourses: Course[]
  mentorCourses: Course[]
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchCourses: (filters?: CourseFilters) => Promise<void>
  fetchCourseById: (id: string) => Promise<void>
  fetchEnrolledCourses: () => Promise<void>
  fetchMentorCourses: () => Promise<void>
  enrollInCourse: (courseId: string) => Promise<void>
  createCourse: (courseData: any) => Promise<Course>
  updateCourse: (courseId: string, courseData: any) => Promise<void>
  deleteCourse: (courseId: string) => Promise<void>
  addModule: (courseId: string, moduleData: any) => Promise<void>
  updateModule: (moduleId: string, moduleData: any) => Promise<void>
  deleteModule: (moduleId: string) => Promise<void>
  addAssignment: (courseId: string, assignmentData: any) => Promise<void>
  updateAssignment: (assignmentId: string, assignmentData: any) => Promise<void>
  deleteAssignment: (assignmentId: string) => Promise<void>
  clearError: () => void
  setLoading: (loading: boolean) => void
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  currentCourse: null,
  enrolledCourses: [],
  mentorCourses: [],
  isLoading: false,
  error: null,

  fetchCourses: async (filters?: CourseFilters) => {
    try {
      set({ isLoading: true, error: null })
      
      const response = await courseService.getAllCourses(filters)
      
      set({
        courses: response.data,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch courses',
        isLoading: false,
      })
    }
  },

  fetchCourseById: async (id: string) => {
    try {
      set({ isLoading: true, error: null })
      
      const course = await courseService.getCourseById(id)
      
      set({
        currentCourse: course,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch course',
        isLoading: false,
      })
    }
  },

  fetchEnrolledCourses: async () => {
    try {
      set({ isLoading: true, error: null })
      
      const courses = await courseService.getEnrolledCourses()
      
      set({
        enrolledCourses: courses,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch enrolled courses',
        isLoading: false,
      })
    }
  },

  fetchMentorCourses: async () => {
    try {
      set({ isLoading: true, error: null })
      
      const courses = await courseService.getMentorCourses()
      
      set({
        mentorCourses: courses,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch mentor courses',
        isLoading: false,
      })
    }
  },

  enrollInCourse: async (courseId: string) => {
    try {
      set({ isLoading: true, error: null })
      
      await courseService.enrollInCourse(courseId)
      
      // Refresh enrolled courses
      await get().fetchEnrolledCourses()
      
      set({ isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to enroll in course',
        isLoading: false,
      })
      throw error
    }
  },

  createCourse: async (courseData: any) => {
    try {
      set({ isLoading: true, error: null })
      
      const course = await courseService.createCourse(courseData)
      
      // Add to mentor courses
      set((state) => ({
        mentorCourses: [...state.mentorCourses, course],
        isLoading: false,
      }))
      
      return course
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create course',
        isLoading: false,
      })
      throw error
    }
  },

  updateCourse: async (courseId: string, courseData: any) => {
    try {
      set({ isLoading: true, error: null })
      
      const updatedCourse = await courseService.updateCourse(courseId, courseData)
      
      // Update in mentor courses
      set((state) => ({
        mentorCourses: state.mentorCourses.map(course =>
          course.id === courseId ? updatedCourse : course
        ),
        currentCourse: state.currentCourse?.id === courseId ? updatedCourse : state.currentCourse,
        isLoading: false,
      }))
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update course',
        isLoading: false,
      })
      throw error
    }
  },

  deleteCourse: async (courseId: string) => {
    try {
      set({ isLoading: true, error: null })
      
      await courseService.deleteCourse(courseId)
      
      // Remove from mentor courses
      set((state) => ({
        mentorCourses: state.mentorCourses.filter(course => course.id !== courseId),
        courses: state.courses.filter(course => course.id !== courseId),
        currentCourse: state.currentCourse?.id === courseId ? null : state.currentCourse,
        isLoading: false,
      }))
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to delete course',
        isLoading: false,
      })
      throw error
    }
  },

  addModule: async (courseId: string, moduleData: any) => {
    try {
      set({ isLoading: true, error: null })
      
      const module = await courseService.addModule(courseId, moduleData)
      
      // Update current course if it matches
      set((state) => {
        if (state.currentCourse?.id === courseId) {
          return {
            currentCourse: {
              ...state.currentCourse,
              modules: [...state.currentCourse.modules, module],
            },
            isLoading: false,
          }
        }
        return { isLoading: false }
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to add module',
        isLoading: false,
      })
      throw error
    }
  },

  updateModule: async (moduleId: string, moduleData: any) => {
    try {
      set({ isLoading: true, error: null })
      
      const updatedModule = await courseService.updateModule(moduleId, moduleData)
      
      // Update in current course
      set((state) => {
        if (state.currentCourse) {
          return {
            currentCourse: {
              ...state.currentCourse,
              modules: state.currentCourse.modules.map(module =>
                module.id === moduleId ? updatedModule : module
              ),
            },
            isLoading: false,
          }
        }
        return { isLoading: false }
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update module',
        isLoading: false,
      })
      throw error
    }
  },

  deleteModule: async (moduleId: string) => {
    try {
      set({ isLoading: true, error: null })
      
      await courseService.deleteModule(moduleId)
      
      // Remove from current course
      set((state) => {
        if (state.currentCourse) {
          return {
            currentCourse: {
              ...state.currentCourse,
              modules: state.currentCourse.modules.filter(module => module.id !== moduleId),
            },
            isLoading: false,
          }
        }
        return { isLoading: false }
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to delete module',
        isLoading: false,
      })
      throw error
    }
  },

  addAssignment: async (courseId: string, assignmentData: any) => {
    try {
      set({ isLoading: true, error: null })
      
      const assignment = await courseService.addAssignment(courseId, assignmentData)
      
      // Update current course if it matches
      set((state) => {
        if (state.currentCourse?.id === courseId) {
          return {
            currentCourse: {
              ...state.currentCourse,
              assignments: [...state.currentCourse.assignments, assignment],
            },
            isLoading: false,
          }
        }
        return { isLoading: false }
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to add assignment',
        isLoading: false,
      })
      throw error
    }
  },

  updateAssignment: async (assignmentId: string, assignmentData: any) => {
    try {
      set({ isLoading: true, error: null })
      
      const updatedAssignment = await courseService.updateAssignment(assignmentId, assignmentData)
      
      // Update in current course
      set((state) => {
        if (state.currentCourse) {
          return {
            currentCourse: {
              ...state.currentCourse,
              assignments: state.currentCourse.assignments.map(assignment =>
                assignment.id === assignmentId ? updatedAssignment : assignment
              ),
            },
            isLoading: false,
          }
        }
        return { isLoading: false }
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update assignment',
        isLoading: false,
      })
      throw error
    }
  },

  deleteAssignment: async (assignmentId: string) => {
    try {
      set({ isLoading: true, error: null })
      
      await courseService.deleteAssignment(assignmentId)
      
      // Remove from current course
      set((state) => {
        if (state.currentCourse) {
          return {
            currentCourse: {
              ...state.currentCourse,
              assignments: state.currentCourse.assignments.filter(assignment => assignment.id !== assignmentId),
            },
            isLoading: false,
          }
        }
        return { isLoading: false }
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to delete assignment',
        isLoading: false,
      })
      throw error
    }
  },

  clearError: () => set({ error: null }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}))