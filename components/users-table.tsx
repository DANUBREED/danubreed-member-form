"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { getUsers, getUsersByUnit, updateMembership } from "@/utils/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  submittedAt?: string
  createdAt?: string
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

const ITEMS_PER_PAGE = 100

export function UsersTable() {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUnit, setSelectedUnit] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<User>>({})

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A"
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return "N/A"
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    } catch {
      return "N/A"
    }
  }

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      let response
      if (selectedUnit) {
        response = await getUsersByUnit(selectedUnit)
      } else {
        response = await getUsers()
      }
      const users = response.data.users || response.data || []
      setAllUsers(users)
      setFilteredUsers(users)
    } catch (error) {
      toast.error("Failed to load users")
      setAllUsers([])
      setFilteredUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [selectedUnit])

  useEffect(() => {
    let filtered = allUsers
    if (searchTerm) {
      filtered = allUsers.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      )
    }
    setFilteredUsers(filtered)
    setCurrentPage(1)
  }, [searchTerm, allUsers])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleToggleMembership = async (userId: string, currentStatus: boolean) => {
    try {
      await updateMembership(userId, !currentStatus)
      const updatedUsers = allUsers.map(user => 
        user._id === userId ? { ...user, membershipStatus: !currentStatus } : user
      )
      setAllUsers(updatedUsers)
      toast.success("Membership updated")
    } catch (error) {
      toast.error("Failed to update membership")
    }
  }

  const startEdit = (user: User) => {
    setEditingUser(user._id)
    setEditForm(user)
  }

  const cancelEdit = () => {
    setEditingUser(null)
    setEditForm({})
  }

  const saveEdit = async () => {
    // Note: This would require a backend API endpoint to update user info
    // For now, just update locally
    const updatedUsers = allUsers.map(user => 
      user._id === editingUser ? { ...user, ...editForm } : user
    )
    setAllUsers(updatedUsers)
    setEditingUser(null)
    setEditForm({})
    toast.success("User updated (local only - backend update needed)")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading users...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Serving Unit</label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-2xl bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All Units</option>
            {SERVING_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Search Users</label>
          <Input
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={loadUsers}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Details</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Serving Unit</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Membership</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Submitted</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center space-y-2">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-lg font-medium">No users found</span>
                      <span className="text-sm">Try adjusting your filters or search terms</span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, index) => (
                  <tr key={user._id} className={`border-t border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="px-6 py-4">
                      {editingUser === user._id ? (
                        <div className="space-y-2">
                          <Input
                            value={editForm.firstName || ''}
                            onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                            className="text-sm"
                            placeholder="First Name"
                          />
                          <Input
                            value={editForm.surname || ''}
                            onChange={(e) => setEditForm({...editForm, surname: e.target.value})}
                            className="text-sm"
                            placeholder="Surname"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-gray-900">{user.firstName} {user.surname}</div>
                          <div className="text-sm text-gray-500 capitalize">{user.gender}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingUser === user._id ? (
                        <div className="space-y-2">
                          <Input
                            value={editForm.phone || ''}
                            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                            className="text-sm"
                            placeholder="Phone"
                          />
                          <Input
                            value={editForm.parentsNumber || ''}
                            onChange={(e) => setEditForm({...editForm, parentsNumber: e.target.value})}
                            className="text-sm"
                            placeholder="Parent's Number"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.phone}</div>
                          <div className="text-sm text-gray-500">Parent: {user.parentsNumber}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingUser === user._id ? (
                        <select
                          value={editForm.schoolStatus || ''}
                          onChange={(e) => setEditForm({...editForm, schoolStatus: e.target.value})}
                          className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1"
                        >
                          <option value="highschool">High School</option>
                          <option value="undergraduate">Undergraduate</option>
                          <option value="postgraduate">Postgraduate</option>
                        </select>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {user.schoolStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingUser === user._id ? (
                        <select
                          value={editForm.servingUnit || ''}
                          onChange={(e) => setEditForm({...editForm, servingUnit: e.target.value})}
                          className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1"
                        >
                          {SERVING_UNITS.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-sm font-medium text-gray-900">{user.servingUnit}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleMembership(user._id, user.membershipStatus)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                          user.membershipStatus
                            ? "bg-green-100 text-green-800 hover:bg-green-200 hover:scale-105"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105"
                        }`}
                      >
                        {user.membershipStatus ? "✓ Active" : "○ Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(user.submittedAt || user.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      {editingUser === user._id ? (
                        <div className="flex space-x-2">
                          <Button
                            onClick={saveEdit}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs rounded-lg"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={cancelEdit}
                            variant="outline"
                            className="px-3 py-1 text-xs rounded-lg"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => startEdit(user)}
                          variant="outline"
                          className="px-3 py-1 text-xs rounded-lg hover:bg-blue-50 border-blue-200 text-blue-600"
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-200 px-6 py-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              variant="outline"
              className="px-3 py-2 text-sm rounded-lg"
            >
              Previous
            </Button>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={currentPage === page ? "default" : "outline"}
                    className={`px-3 py-2 text-sm rounded-lg ${
                      currentPage === page 
                        ? "bg-blue-600 text-white" 
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            <Button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              className="px-3 py-2 text-sm rounded-lg"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{filteredUsers.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {filteredUsers.filter(u => u.membershipStatus).length}
            </div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{totalPages}</div>
            <div className="text-sm text-gray-600">Total Pages</div>
          </div>
        </div>
      </div>
    </div>
  )
}
