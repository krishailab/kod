"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useState } from "react"
import { submitContactForm } from "@/app/actions"
import { AnimatedTetrahedron } from "@/components/landing/animated-tetrahedron"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      const result = await submitContactForm(formData)

      if (result.success) {
        setDialogMessage(result.message)
        setDialogOpen(true)
        form.reset()
      } else {
        setDialogMessage(result.message || "An error occurred. Please try again.")
        setDialogOpen(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setDialogMessage("An unexpected error occurred. Please try again later.")
      setDialogOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className="relative border border-foreground transition-all duration-1000 w-full"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`
        }}
      />
      
      <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left content - Form */}
          <div className="flex-1 w-full max-w-xl">
            <h3 className="text-3xl font-display mb-8">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input placeholder="Your Name" name="name" required className="bg-transparent border-foreground/20 focus-visible:border-foreground transition-colors h-14 rounded-none px-4" />
                <Input placeholder="Company" name="company" required className="bg-transparent border-foreground/20 focus-visible:border-foreground transition-colors h-14 rounded-none px-4" />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <Input placeholder="Email" type="email" name="email" required className="bg-transparent border-foreground/20 focus-visible:border-foreground transition-colors h-14 rounded-none px-4" />
                <Input placeholder="Phone Number" name="phone" required className="bg-transparent border-foreground/20 focus-visible:border-foreground transition-colors h-14 rounded-none px-4" />
              </div>
              <Textarea placeholder="Project Details" name="projectDetail" required className="bg-transparent border-foreground/20 focus-visible:border-foreground transition-colors min-h-[160px] rounded-none p-4 resize-none" />
              <div className="flex items-start space-x-3">
                <Checkbox id="privacy" name="privacyAccepted" required className="mt-1" />
                <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to the processing of my personal data according to the Privacy Policy.
                </label>
              </div>
              <Button type="submit" className="w-full sm:w-auto px-8 h-14 bg-foreground text-background hover:bg-foreground/90 rounded-full font-medium mt-4" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Right animation */}
          <div className="hidden lg:flex items-center justify-center w-[500px] h-[500px] -mr-16">
            <AnimatedTetrahedron />
          </div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-background border-foreground/20">
          <DialogHeader>
            <DialogTitle className="font-display">Form Submission</DialogTitle>
            <DialogDescription className="text-muted-foreground">{dialogMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

