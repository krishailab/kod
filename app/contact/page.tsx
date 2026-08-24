"use client";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-24 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center justify-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Contact Us
              <span className="w-8 h-px bg-foreground/30" />
            </span>
            <h1 className="text-5xl lg:text-7xl font-display tracking-tight mb-8">
              Let's build something
              <br />
              <span className="text-muted-foreground">incredible together.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Reach out to our team to discuss your next project, explore partnerships, or just say hello. We typically respond within 24 hours.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
             <ContactForm />
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}