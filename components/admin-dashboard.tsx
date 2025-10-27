"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { UsersTable } from "./users-table"

export function AdminDashboard() {
  const router = useRouter()
  const { logout, adminId } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Logged in as: {adminId}</p>
          </div>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white rounded-2xl">
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white border border-border rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Registered Users</h2>
          <UsersTable />
        </div>
      </main>
    </div>
  )
}
