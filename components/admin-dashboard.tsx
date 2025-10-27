"use client"

import Link from "next/link"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">DB</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Danubreed</span>
            </Link>
            <div className="hidden md:block w-px h-8 bg-gray-300"></div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Logged in as: {adminId}</p>
            </div>
          </div>
          <Button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Registered Users</h2>
              <p className="text-gray-600">Manage and view all registered community members</p>
            </div>
          </div>
          <UsersTable />
        </div>
      </main>
    </div>
  )
}
