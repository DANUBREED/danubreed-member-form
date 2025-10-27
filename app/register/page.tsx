import { RegistrationForm } from "@/components/registration-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Danubreed</h1>
          <p className="text-muted-foreground">Register for our youth ministry program</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <RegistrationForm />
        </div>
      </div>
    </main>
  )
}
