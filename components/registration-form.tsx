"use client"

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { registerUser } from "@/utils/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RegistrationFormData {
  firstName: string
  surname: string
  phone: string
  gender: string
  parentsNumber: string
  schoolStatus: string
  servingUnit: string
  membershipStatus: boolean
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

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationFormData>({
    defaultValues: {
      membershipStatus: false,
    },
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)
    try {
      await registerUser(data)
      toast.success("User registered successfully")
      reset()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed"
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Name */}
        <div className="space-y-3">
          <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">First Name *</Label>
          <Input
            id="firstName"
            placeholder="Enter first name"
            {...register("firstName", { required: "First name is required" })}
            className="rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 px-4 text-gray-800 placeholder-gray-400"
          />
          {errors.firstName && <p className="text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.firstName.message}
          </p>}
        </div>

        {/* Surname */}
        <div className="space-y-3">
          <Label htmlFor="surname" className="text-sm font-semibold text-gray-700">Surname *</Label>
          <Input
            id="surname"
            placeholder="Enter surname"
            {...register("surname", { required: "Surname is required" })}
            className="rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 px-4 text-gray-800 placeholder-gray-400"
          />
          {errors.surname && <p className="text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.surname.message}
          </p>}
        </div>

        {/* Phone */}
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            {...register("phone", { required: "Phone is required" })}
            className="rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 px-4 text-gray-800 placeholder-gray-400"
          />
          {errors.phone && <p className="text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.phone.message}
          </p>}
        </div>

        {/* Gender */}
        <div className="space-y-3">
          <Label htmlFor="gender" className="text-sm font-semibold text-gray-700">Gender *</Label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            className="w-full h-12 px-4 border border-gray-200 rounded-2xl bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.gender.message}
          </p>}
        </div>

        {/* Parents Number */}
        <div className="space-y-3">
          <Label htmlFor="parentsNumber" className="text-sm font-semibold text-gray-700">Parent's Number *</Label>
          <Input
            id="parentsNumber"
            type="tel"
            placeholder="Enter parent's phone number"
            {...register("parentsNumber", { required: "Parent's number is required" })}
            className="rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 px-4 text-gray-800 placeholder-gray-400"
          />
          {errors.parentsNumber && <p className="text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.parentsNumber.message}
          </p>}
        </div>

        {/* School Status */}
        <div className="space-y-3">
          <Label htmlFor="schoolStatus" className="text-sm font-semibold text-gray-700">School Status *</Label>
          <select
            id="schoolStatus"
            {...register("schoolStatus", { required: "School status is required" })}
            className="w-full h-12 px-4 border border-gray-200 rounded-2xl bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select school status</option>
            <option value="secondaryschool">Secondary School</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Postgraduate</option>
            <option value="trainee">Trainee</option>
          </select>
          {errors.schoolStatus && <p className="text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.schoolStatus.message}
          </p>}
        </div>

        {/* Serving Unit */}
        <div className="space-y-3 md:col-span-2">
          <Label htmlFor="servingUnit" className="text-sm font-semibold text-gray-700">Serving Unit *</Label>
          <select
            id="servingUnit"
            {...register("servingUnit", { required: "Serving unit is required" })}
            className="w-full h-12 px-4 border border-gray-200 rounded-2xl bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select serving unit</option>
            {SERVING_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          {errors.servingUnit && <p className="text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.servingUnit.message}
          </p>}
        </div>

        {/* Membership Status */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <input 
              id="membershipStatus" 
              type="checkbox" 
              {...register("membershipStatus")} 
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
            />
            <Label htmlFor="membershipStatus" className="text-sm font-medium text-gray-700 mb-0">
              I want to be a member of Danubreed
            </Label>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting || isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registering...
          </div>
        ) : (
          "Join Community"
        )}
      </Button>
    </form>
  )
}
