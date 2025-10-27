import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-foreground mb-4">Danubreed</h1>
        <p className="text-xl text-muted-foreground mb-8">Youth Ministry Registration and Management System</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 py-3 font-semibold">
              Register
            </Button>
          </Link>
          <Link href="/admin/login">
            <Button className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-foreground rounded-2xl px-8 py-3 font-semibold">
              Admin Login
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border border-border rounded-2xl">
            <h3 className="text-lg font-semibold text-foreground mb-2">For Participants</h3>
            <p className="text-muted-foreground">
              Register for Danubreed and join our youth ministry program. Select your serving unit and provide your
              information.
            </p>
          </div>
          <div className="p-6 border border-border rounded-2xl">
            <h3 className="text-lg font-semibold text-foreground mb-2">For Administrators</h3>
            <p className="text-muted-foreground">
              Access the admin dashboard to manage registrations, filter by serving unit, and update membership status.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
