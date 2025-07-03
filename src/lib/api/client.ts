import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import Cookies from 'js-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000, // 30 seconds
      withCredentials: true, // Changed to true to allow cookies to be sent
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        
        // Remove CORS headers from client side - these should be set by the server
        // Client-side CORS headers don't work and can cause issues
        
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError) => {
        // Handle CORS errors
        if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
          console.error('Network Error: Make sure your backend allows cross-origin requests from:', window.location.origin)
        }
        
        if (error.response?.status === 401) {
          this.removeAuthToken()
          // Only redirect if we're in the browser and not already on login page
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
            window.location.href = '/auth/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return Cookies.get('auth_token') || localStorage.getItem('auth_token')
    }
    return null
  }

  private removeAuthToken(): void {
    if (typeof window !== 'undefined') {
      Cookies.remove('auth_token')
      localStorage.removeItem('auth_token')
    }
  }

  public setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      Cookies.set('auth_token', token, { expires: 7, secure: false, sameSite: 'lax' })
      localStorage.setItem('auth_token', token)
    }
  }

  // Generic HTTP methods with better error handling
  async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response = await this.client.get(url, { params })
      return response.data
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to the server. Please check if the backend is running.')
      }
      throw error
    }
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    try {
      const response = await this.client.post(url, data, config)
      return response.data
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to the server. Please check if the backend is running.')
      }
      throw error
    }
  }

  async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.put(url, data)
      return response.data
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to the server. Please check if the backend is running.')
      }
      throw error
    }
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.patch(url, data)
      return response.data
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to the server. Please check if the backend is running.')
      }
      throw error
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.client.delete(url)
      return response.data
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to the server. Please check if the backend is running.')
      }
      throw error
    }
  }

  // File upload method
  async uploadFile<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: any) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    }

    try {
      const response = await this.client.post(url, formData, config)
      return response.data
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to the server. Please check if the backend is running.')
      }
      throw error
    }
  }

  // Multiple file upload method
  async uploadFiles<T>(url: string, files: File[], onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: any) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    }

    try {
      const response = await this.client.post(url, formData, config)
      return response.data
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to the server. Please check if the backend is running.')
      }
      throw error
    }
  }

  // Download file method
  async downloadFile(url: string, filename: string): Promise<void> {
    try {
      const response = await this.client.get(url, {
        responseType: 'blob',
      })

      const blob = new Blob([response.data])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to the server. Please check if the backend is running.')
      }
      throw error
    }
  }
}

export const apiClient = new ApiClient()