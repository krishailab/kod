"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/landing/navigation"
import { FooterSection } from "@/components/landing/footer-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/admin/dashboard")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("An error occurred during login")
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-foreground/20 via-foreground/5 to-foreground/20 rounded-[2.5rem] blur-xl opacity-50 transition duration-1000"></div>
          <div className="relative bg-background/60 backdrop-blur-2xl border border-foreground/10 p-8 lg:p-12 rounded-[2rem] shadow-2xl">
            <div className="text-center space-y-2 mb-8">
              <h3 className="text-3xl font-display">Admin Portal</h3>
              <p className="text-muted-foreground">Sign in to access the dashboard</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl text-center font-mono">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-foreground/5 border-foreground/10 focus-visible:bg-transparent transition-colors h-14 rounded-xl px-4"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-foreground/5 border-foreground/10 focus-visible:bg-transparent transition-colors h-14 rounded-xl px-4"
                />
              </div>
              <Button type="submit" className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium text-lg mt-4">
                Login to Dashboard
              </Button>
            </form>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}

