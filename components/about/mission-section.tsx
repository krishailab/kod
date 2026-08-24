"use client";

import { useEffect, useRef, useState } from "react";

export function MissionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`grid lg:grid-cols-2 gap-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Our Mission
            </span>
            <h2 className="text-4xl lg:text-5xl font-display tracking-tight mb-6">
              To bridge the gap between complex technology and everyday business needs.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that powerful technology shouldn't be complicated to use. Our mission is to demystify digital transformation by building solutions that are both technologically advanced and intuitively designed.
            </p>
          </div>
          <div className="relative aspect-square lg:aspect-auto bg-foreground/10 rounded-2xl overflow-hidden flex items-center justify-center">
             <div className="text-foreground/30 font-mono text-center px-6">
                Innovation through Simplicity<br />
                <span className="text-xs opacity-50 block mt-2">Core Principle</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
