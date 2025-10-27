import Link from "next/link"
import Image from "next/image"
import { RegistrationForm } from "@/components/registration-form"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">DB</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Danubreed</span>
          </Link>
          <Link href="/admin/login">
            <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50">
              Admin Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">DB</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Join Danubreed
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Register for our youth ministry program and become part of our community
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </main>
  )
}
