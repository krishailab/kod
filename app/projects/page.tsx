import { Navigation } from "@/components/landing/navigation"
import { FooterSection } from "@/components/landing/footer-section"
import { ProjectsGrid } from "@/components/projects/projects-grid"

export const metadata = {
  title: 'Our Projects',
  description: 'Explore our portfolio of successful digital projects built by KodRish Innovation & Solutions.',
}

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background">
      <Navigation />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 flex flex-col items-center">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 mix-blend-screen" />
          <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl opacity-50 mix-blend-screen" />
        </div>

        <div className="text-center mb-16 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/20 bg-foreground/5 text-sm mb-6 font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Our Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display mb-6 tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">Projects</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Discover a selection of our finest work. From advanced e-learning platforms to premium corporate websites, we build digital experiences that drive growth and wow users.
          </p>
        </div>

        <ProjectsGrid />
        
      </section>

      <FooterSection />
    </main>
  )
}
