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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="Enter first name"
            {...register("firstName", { required: "First name is required" })}
            className="rounded-2xl"
          />
          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
        </div>

        {/* Surname */}
        <div className="space-y-2">
          <Label htmlFor="surname">Surname *</Label>
          <Input
            id="surname"
            placeholder="Enter surname"
            {...register("surname", { required: "Surname is required" })}
            className="rounded-2xl"
          />
          {errors.surname && <p className="text-sm text-red-500">{errors.surname.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            {...register("phone", { required: "Phone is required" })}
            className="rounded-2xl"
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            className="w-full px-4 py-2 border border-input rounded-2xl bg-background text-foreground"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
        </div>

        {/* Parents Number */}
        <div className="space-y-2">
          <Label htmlFor="parentsNumber">Parent's Number *</Label>
          <Input
            id="parentsNumber"
            type="tel"
            placeholder="Enter parent's phone number"
            {...register("parentsNumber", { required: "Parent's number is required" })}
            className="rounded-2xl"
          />
          {errors.parentsNumber && <p className="text-sm text-red-500">{errors.parentsNumber.message}</p>}
        </div>

        {/* School Status */}
        <div className="space-y-2">
          <Label htmlFor="schoolStatus">School Status *</Label>
          <select
            id="schoolStatus"
            {...register("schoolStatus", { required: "School status is required" })}
            className="w-full px-4 py-2 border border-input rounded-2xl bg-background text-foreground"
          >
            <option value="">Select school status</option>
            <option value="highschool">High School</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Postgraduate</option>
          </select>
          {errors.schoolStatus && <p className="text-sm text-red-500">{errors.schoolStatus.message}</p>}
        </div>

        {/* Serving Unit */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="servingUnit">Serving Unit *</Label>
          <select
            id="servingUnit"
            {...register("servingUnit", { required: "Serving unit is required" })}
            className="w-full px-4 py-2 border border-input rounded-2xl bg-background text-foreground"
          >
            <option value="">Select serving unit</option>
            {SERVING_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          {errors.servingUnit && <p className="text-sm text-red-500">{errors.servingUnit.message}</p>}
        </div>

        {/* Membership Status */}
        <div className="space-y-2 md:col-span-2 flex items-center gap-3">
          <input id="membershipStatus" type="checkbox" {...register("membershipStatus")} className="w-4 h-4 rounded" />
          <Label htmlFor="membershipStatus" className="mb-0">
            I want to be a member
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-2 font-semibold"
      >
        {isSubmitting || isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  )
}
