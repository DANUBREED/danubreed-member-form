import axios from "axios"

const API_BASE_URL = "https://daniels-camp-backend.onrender.com"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const registerUser = async (data: {
  firstName: string
  surname: string
  phone: string
  gender: string
  parentsNumber: string
  schoolStatus: string
  servingUnit: string
  tribe: string
  membershipStatus: boolean
}) => {
  return apiClient.post("/register", data)
}

export const adminLogin = async (adminId: string, password: string) => {
  return apiClient.post("/admin/login", { adminId, password })
}

export const getUsers = async () => {
  return apiClient.get("/admin")
}

export const getUsersByUnit = async (unit: string) => {
  return apiClient.get(`/admin/users/sort/${unit}`)
}

export const updateMembership = async (userId: string, membershipStatus: boolean) => {
  return apiClient.patch(`/admin/users/${userId}/membership`, { membershipStatus })
}

export const updateSchoolStatus = async (userId: string, schoolStatus: string) => {
  return apiClient.patch(`/admin/users/${userId}/school-status`, { schoolStatus })
}

export const updateContact = async (userId: string, data: { phone?: string; parentsNumber?: string }) => {
  return apiClient.patch(`/admin/users/${userId}/contact`, data)
}

export const updateTribe = async (userId: string, tribe: string) => {
  return apiClient.patch(`/admin/users/${userId}/tribe`, { tribe })
}
