import { ReactNode } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
              {title}
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
