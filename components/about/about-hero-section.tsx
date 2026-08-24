"use client";

import { useEffect, useState } from "react";

export function AboutHeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              About KodRish
            </span>
            <h1 className="text-5xl lg:text-7xl font-display tracking-tight mb-8">
              Building the future of
              <br />
              <span className="text-muted-foreground">intelligent innovation.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12">
              We are a team of engineers, designers, and problem solvers dedicated to creating tools that empower businesses to operate smarter, faster, and more securely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
