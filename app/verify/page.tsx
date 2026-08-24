"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/landing/navigation"
import { FooterSection } from "@/components/landing/footer-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Search } from "lucide-react"

export default function VerifyCertificate() {
  const [credentialId, setCredentialId] = useState("")
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsVerifying(true)
    
    try {
      const response = await fetch(`/api/verify?credentialId=${credentialId}`)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          router.push(`/credential/${credentialId}`)
        } else {
          setError("No certificate found with this credential ID")
        }
      } else {
        setError("Failed to verify certificate")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background">
      <Navigation />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-2xl relative group px-4">
          <div className="absolute -inset-1 bg-gradient-to-r from-foreground/20 via-foreground/5 to-foreground/20 rounded-[2.5rem] blur-xl opacity-50 transition duration-1000"></div>
          
          <div className="relative bg-background/60 backdrop-blur-2xl border border-foreground/10 p-8 lg:p-16 rounded-[2rem] shadow-2xl text-center">
            
            <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-foreground/10">
              <ShieldCheck className="w-8 h-8 text-foreground" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-display mb-4">
              Verify Certificate
            </h1>
            <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto leading-relaxed">
              Enter a credential ID to verify the authenticity of a KodRish certificate or credential.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl text-center font-mono">
                  {error}
                </div>
              )}
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g. KOD-2026-12345"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  required
                  className="bg-foreground/5 border-foreground/10 focus-visible:bg-transparent transition-colors h-14 rounded-full pl-12 pr-4 text-lg"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isVerifying}
                className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-full font-medium text-lg mt-4 transition-all"
              >
                {isVerifying ? "Verifying..." : "Verify Credential"}
              </Button>
            </form>

          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}

