"use client";

import { useState } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";
import { ApplyModal } from "@/components/apply-modal";

const positions = [
  { title: "Fullstack Engineer Intern", department: "Engineering", location: "Remote", type: "Internship" },
  { title: "Product Design Intern", department: "Design", location: "Remote", type: "Internship" },
  { title: "Machine Learning Intern", department: "AI/ML", location: "Remote", type: "Internship" },
  { title: "Developer Advocate", department: "Marketing", location: "Remote", type: "Internship" }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (title: string) => {
    setSelectedJob(title);
    setIsModalOpen(true);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-24">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Careers
            </span>
            <h1 className="text-5xl lg:text-7xl font-display tracking-tight mb-8">
              Join the mission.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              We're always looking for ambitious, talented individuals who want to solve hard problems and build things that matter.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-3xl font-display mb-8">Why work with us?</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-display mb-2">Remote-First Culture</h3>
                  <p className="text-muted-foreground">Work from anywhere in the world. We care about what you build, not where you sit.</p>
                </div>
                <div>
                  <h3 className="text-xl font-display mb-2">Continuous Learning</h3>
                  <p className="text-muted-foreground">Dedicated budgets for courses, conferences, and books to keep you growing.</p>
                </div>
                <div>
                  <h3 className="text-xl font-display mb-2">Health & Wellness</h3>
                  <p className="text-muted-foreground">Comprehensive health coverage and flexible time off to keep you at your best.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display mb-8">Open Positions</h2>
              <div className="space-y-4">
                {positions.map((pos, i) => (
                  <div key={i} className="group p-6 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors border border-foreground/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-display group-hover:text-muted-foreground transition-colors">{pos.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-muted-foreground mt-2">
                        <span>{pos.department}</span>
                        <span className="w-1 h-1 rounded-full bg-foreground/30" />
                        <span>{pos.location}</span>
                        <span className="w-1 h-1 rounded-full bg-foreground/30" />
                        <span>{pos.type}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-full" onClick={() => handleApply(pos.title)}>Apply Now</Button>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-muted-foreground">
                Don't see a role that fits? <a href="/contact" className="underline hover:text-foreground">Send us your resume</a> anyway.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />

      <ApplyModal 
        jobTitle={selectedJob} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}
