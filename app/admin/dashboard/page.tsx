"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function DashboardPage() {
  const router = useRouter()
  const { isAdminLoggedIn } = useAuth()

  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.push("/admin/login")
    }
  }, [isAdminLoggedIn, router])

  if (!isAdminLoggedIn) {
    return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>
  }

  return <AdminDashboard />
}
