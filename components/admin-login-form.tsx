"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { adminLogin } from "@/utils/api"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AdminLoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [adminId, setAdminId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!adminId || !password) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      const response = await adminLogin(adminId, password)

      // Store token and admin info
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token)
      }

      login(adminId)
      toast.success("Login successful")
      router.push("/admin/dashboard")
    } catch (error) {
      toast.error("Invalid admin credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="adminId">Admin ID</Label>
        <Input
          id="adminId"
          type="text"
          placeholder="Enter admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          className="rounded-2xl"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-2xl"
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-2 font-semibold"
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}
