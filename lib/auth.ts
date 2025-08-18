// Simple authentication system for admin access
// In production, you should use a proper auth provider like NextAuth.js or Clerk

export interface User {
  id: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  name: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock admin users - in production, this should come from a database
const ADMIN_USERS = [
  {
    id: '1',
    email: 'admin@probitypartnersea.com',
    role: 'admin' as const,
    name: 'System Administrator',
    password: 'admin123' // In production, use proper password hashing
  },
  {
    id: '2',
    email: 'editor@probitypartnersea.com',
    role: 'editor' as const,
    name: 'Content Editor',
    password: 'editor123'
  }
]

export class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(email: string, password: string): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = ADMIN_USERS.find(u => u.email === email && u.password === password)
    
    if (user) {
      this.currentUser = user
      // Store in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('ppea_user', JSON.stringify(user))
      }
      return user
    }
    
    return null
  }

  async logout(): Promise<void> {
    this.currentUser = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ppea_user')
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser
    }

    // Try to restore from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ppea_user')
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored)
          return this.currentUser
        } catch (e) {
          localStorage.removeItem('ppea_user')
        }
      }
    }

    return null
  }

  async checkPermission(permission: 'create' | 'read' | 'update' | 'delete'): Promise<boolean> {
    const user = await this.getCurrentUser()
    
    if (!user) return false
    
    switch (permission) {
      case 'create':
      case 'update':
      case 'delete':
        return user.role === 'admin' || user.role === 'editor'
      case 'read':
        return true
      default:
        return false
    }
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin'
  }

  isEditor(): boolean {
    return this.currentUser?.role === 'editor' || this.currentUser?.role === 'admin'
  }
}

export const authService = AuthService.getInstance()
