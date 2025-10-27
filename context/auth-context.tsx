"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAdminLoggedIn: boolean
  adminId: string | null
  login: (adminId: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminId, setAdminId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if admin is already logged in on mount
  useEffect(() => {
    const storedAdminId = localStorage.getItem("adminId")
    const token = localStorage.getItem("adminToken")
    if (storedAdminId && token) {
      setAdminId(storedAdminId)
      setIsAdminLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  const login = (id: string) => {
    setAdminId(id)
    setIsAdminLoggedIn(true)
    localStorage.setItem("adminId", id)
  }

  const logout = () => {
    setAdminId(null)
    setIsAdminLoggedIn(false)
    localStorage.removeItem("adminId")
    localStorage.removeItem("adminToken")
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <AuthContext.Provider value={{ isAdminLoggedIn, adminId, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
