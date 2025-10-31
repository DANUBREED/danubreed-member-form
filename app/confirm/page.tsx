import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ConfirmPage() {
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

      {/* Confirmation Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Registration Successful!
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto mb-8">
              Welcome to Danubreed! Your registration has been submitted successfully. We'll review your information and get back to you soon.
            </p>
            <div className="space-y-4">
              <p className="text-lg text-gray-500">
                What happens next?
              </p>
              <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Our team will review your application
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  You'll receive a confirmation email
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Join our community events and activities
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-6">
              While you wait for confirmation, feel free to explore our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-3 font-semibold">
                  Back to Home
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-600 hover:bg-gray-50 rounded-2xl px-8 py-3 font-semibold">
                  Register Another Member
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
