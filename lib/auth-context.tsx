"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    if (email === "admin@courtney.lk" && password === "admin123") {
      localStorage.setItem("adminToken", "dummy-token")
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("adminToken")
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

