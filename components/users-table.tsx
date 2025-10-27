"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { getUsers, getUsersByUnit, updateMembership } from "@/utils/api"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

interface User {
  _id: string
  firstName: string
  surname: string
  phone: string
  gender: string
  parentsNumber: string
  schoolStatus: string
  servingUnit: string
  membershipStatus: boolean
  createdAt: string
}

const SERVING_UNITS = [
  "Ushering",
  "Choir",
  "Free spirit media",
  "Sound",
  "Greeters",
  "Integrative",
  "Maintenance",
  "Beauty and Aesthetics",
]

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUnit, setSelectedUnit] = useState<string>("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      let response
      if (selectedUnit) {
        response = await getUsersByUnit(selectedUnit)
      } else {
        response = await getUsers()
      }
      setUsers(response.data.users || response.data)
    } catch (error) {
      toast.error("Failed to load users")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [selectedUnit])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadUsers()
    setIsRefreshing(false)
    toast.success("Users refreshed")
  }

  const handleToggleMembership = async (userId: string, currentStatus: boolean) => {
    try {
      await updateMembership(userId, !currentStatus)
      setUsers(users.map((user) => (user._id === userId ? { ...user, membershipStatus: !currentStatus } : user)))
      toast.success("Membership updated")
    } catch (error) {
      toast.error("Failed to update membership")
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading users...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 w-full md:w-auto">
          <label className="block text-sm font-medium mb-2">Filter by Serving Unit</label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-2xl bg-background text-foreground"
          >
            <option value="">All Units</option>
            {SERVING_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl w-full md:w-auto"
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="overflow-x-auto border border-border rounded-2xl">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">First Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Surname</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Gender</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Parent's Number</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">School Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Serving Unit</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Membership</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">{user.firstName}</td>
                  <td className="px-4 py-3 text-sm">{user.surname}</td>
                  <td className="px-4 py-3 text-sm">{user.phone}</td>
                  <td className="px-4 py-3 text-sm">{user.gender}</td>
                  <td className="px-4 py-3 text-sm">{user.parentsNumber}</td>
                  <td className="px-4 py-3 text-sm capitalize">{user.schoolStatus}</td>
                  <td className="px-4 py-3 text-sm">{user.servingUnit}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => handleToggleMembership(user._id, user.membershipStatus)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        user.membershipStatus
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {user.membershipStatus ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm">{formatDate(user.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-muted-foreground">
        Total users: <span className="font-semibold">{users.length}</span>
      </div>
    </div>
  )
}
