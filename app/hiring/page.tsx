import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: 'Hire Our Teams - KodRish',
  description: 'Scale your engineering capacity with our expert teams.',
}

const specialties = [
  "Frontend Architecture",
  "Fullstack Development",
  "Cloud & DevOps",
  "Machine Learning Integration",
  "UI/UX Design",
  "Quality Assurance"
];

export default function HiringPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16 lg:mb-24">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Staff Augmentation
            </span>
            <h1 className="text-5xl lg:text-7xl font-display tracking-tight mb-8">
              Scale your team,
              <br />
              <span className="text-muted-foreground">without the overhead.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Hire pre-vetted, elite engineering teams from KodRish to accelerate your product development. We integrate seamlessly into your existing workflows.
            </p>
            <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group">
              Talk to an expert
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-foreground/5 border border-foreground/10">
              <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-display mb-3">Rapid Onboarding</h3>
              <p className="text-muted-foreground">Our engineers are trained to jump into complex codebases and start contributing on day one.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-foreground/5 border border-foreground/10">
              <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-display mb-3">Guaranteed Quality</h3>
              <p className="text-muted-foreground">Rigorous internal code reviews and standard practices mean you get enterprise-grade output every time.</p>
            </div>

            <div className="p-8 rounded-2xl bg-foreground/5 border border-foreground/10">
              <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display mb-3">Flexible Scaling</h3>
              <p className="text-muted-foreground">Scale your team up or down based on your sprint requirements and budget constraints.</p>
            </div>
          </div>
          
          <div className="mt-24 pt-24 border-t border-foreground/10">
            <h2 className="text-3xl font-display mb-12">Our Specialties</h2>
            <div className="flex flex-wrap gap-4">
              {specialties.map((spec, i) => (
                <div key={i} className="px-6 py-3 rounded-full border border-foreground/20 text-foreground font-mono text-sm">
                  {spec}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
