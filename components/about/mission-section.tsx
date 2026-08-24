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
          <div className="relative aspect-square lg:aspect-auto bg-foreground/10 rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
              alt="Technology bridging the gap" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
