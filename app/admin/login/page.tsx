import { AdminLoginForm } from "@/components/admin-login-form"

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to manage registrations</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  )
}
