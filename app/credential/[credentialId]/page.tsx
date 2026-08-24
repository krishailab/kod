"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/landing/navigation"
import { FooterSection } from "@/components/landing/footer-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Linkedin, Twitter, Lock } from "lucide-react"
import Image from "next/image"

interface Certificate {
  _id: string
  credentialId: string
  name: string
  title: string
  issueDate: string
  certificateLink: string
}

export default function CredentialPage() {
  const { credentialId } = useParams()
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (!credentialId) return

    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/verify?credentialId=${credentialId}`)
        if (!response.ok) throw new Error("Failed to fetch certificate")

        const data = await response.json()
        if (!data) throw new Error("No certificate found")

        setCertificate(data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchCertificate()
  }, [credentialId])

  const verifyPassword = async () => {
    try {
      const response = await fetch(`/api/verify?credentialId=${credentialId}&password=${password}`)
      if (!response.ok) throw new Error("Failed to verify password")

      const data = await response.json()
      if (data.certificateLink) {
        setCertificate(data)
        setIsVerified(true)
      } else {
        setError("Incorrect password")
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const getCertificateMessage = (title: string) => {
    return `This certificate provided by KodRish is a testament to the sheer grit, hard work, and dedication of the recipient, through which they have been successfully honored for ${title}. KodRish congratulates them on achieving yet another milestone! 🚀🎉`
  }

  const addOnLinkedIn = () => {
    if (!certificate) return;
    const organizationId = "106099840"; // KodRish's LinkedIn org ID

    const title = `${certificate.title}`; // Updated title

    const url = `https://www.linkedin.com/profile/add?certId=${encodeURIComponent(
      certificate.credentialId
    )}&name=${encodeURIComponent(title)}&organizationId=${organizationId}&issueYear=${new Date(
      certificate.issueDate
    ).getFullYear()}&issueMonth=${new Date(certificate.issueDate).getMonth() + 1}&certUrl=${encodeURIComponent(
      window.location.href
    )}`;

    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    if (!certificate) return
    const text = `I've earned the ${certificate.title}! From KodRish Innovation & Solutions. Check it out:`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
    )
  }

  const shareOnLinkedIn = () => {
    if (!certificate) return
    const certificateUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `I've earned the ${certificate.title}! From KodRish Innovation & Solutions. Check it out:${window.location.href} From @Kodrish Innovation & Solutions`
    );
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${certificateUrl}&text=${text}`;
  
    window.open(linkedInUrl, "_blank");
  };

  const shareOnWhatsApp = () => {
    if (!certificate) return
    const text = `Check out my ${certificate.title}!`
    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + window.location.href)}`, "_blank")
  }

  if (error)
    return (
      <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center pt-32 px-4">
          <div className="text-red-500 bg-red-500/10 border border-red-500/20 p-6 rounded-2xl font-mono text-center">{error}</div>
        </div>
        <FooterSection />
      </main>
    )

  if (!certificate)
    return (
      <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center pt-32">
          <div className="animate-pulse flex items-center gap-4 text-muted-foreground">
             <div className="w-6 h-6 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
             Loading Certificate...
          </div>
        </div>
        <FooterSection />
      </main>
    )

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background">
      <Navigation />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 flex flex-col items-center min-h-[80vh]">
        <div className="w-full max-w-4xl relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-foreground/20 via-foreground/5 to-foreground/20 rounded-[2.5rem] blur-xl opacity-50 transition duration-1000"></div>
          
          <div className="relative bg-background/60 backdrop-blur-2xl border border-foreground/10 p-6 lg:p-16 rounded-[2rem] shadow-2xl">
            
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/20 bg-foreground/5 text-sm mb-6 font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Verified Credential
              </div>
              <h1 className="text-3xl lg:text-5xl font-display mb-6">{certificate.title}</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                {getCertificateMessage(certificate.title)}
              </p>
            </div>

            <div 
              className="w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden border border-foreground/10 mb-12 bg-black shadow-inner relative group select-none"
              onContextMenu={(e) => {
                if (!isVerified) e.preventDefault();
              }}
            >
              <img
                src={certificate.certificateLink.replace(/\.pdf$/i, '.jpg')}
                alt={`${certificate.title} Certificate`}
                className={`w-full h-full object-contain ${!isVerified ? "pointer-events-none" : ""}`}
                draggable={false}
              />

              {!isVerified && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <div className="flex flex-wrap gap-8 opacity-30 -rotate-12 scale-150 transform">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <span key={i} className="text-4xl font-black text-white tracking-widest whitespace-nowrap mix-blend-overlay drop-shadow-md">
                        UNVERIFIED PREVIEW
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!isVerified ? (
              <div className="max-w-md mx-auto bg-foreground/5 border border-foreground/10 rounded-2xl p-8 text-center">
                <Lock className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-display mb-2">Unlock Certificate Actions</h3>
                <p className="text-sm text-muted-foreground mb-6">Enter your password to download and share this credential.</p>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <Input
                    type="password"
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 border-foreground/10 focus-visible:bg-transparent transition-colors h-12 rounded-xl px-4 w-full"
                  />
                  <Button onClick={verifyPassword} className="h-12 px-6 rounded-xl bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
                    Unlock
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-foreground/10 pt-12">
                
                <Button 
                  asChild
                  className="w-full md:w-auto h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 text-lg transition-all"
                >
                  <a href={certificate.certificateLink.replace("/upload/", "/upload/fl_attachment/")} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" /> Download Certificate
                  </a>
                </Button>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button
                    className="h-14 px-6 rounded-full bg-[#0077B5] hover:bg-[#005983] text-white flex items-center transition-colors w-full sm:w-auto"
                    onClick={addOnLinkedIn}
                  >
                    <Linkedin className="mr-2 h-5 w-5" /> Add to Profile
                  </Button>

                  <div className="flex items-center gap-2 border border-foreground/10 rounded-full p-1 bg-foreground/5">
                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-foreground/10" onClick={shareOnTwitter}>
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-foreground/10" onClick={shareOnWhatsApp}>
                      <Image src="https://img.icons8.com/?size=512&id=85088&format=png" alt="WhatsApp" width={20} height={20} className="opacity-80 hover:opacity-100" />
                    </Button>
                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-foreground/10" onClick={shareOnLinkedIn}>
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}

