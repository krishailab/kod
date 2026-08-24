"use client";

import { useEffect, useRef, useState } from "react";

const values = [
  { title: "Innovation First", description: "We constantly push the boundaries of what's possible." },
  { title: "User-Centric Design", description: "Every product we build starts with the user in mind." },
  { title: "Uncompromising Quality", description: "We deliver reliable, scalable, and secure solutions." },
  { title: "Radical Transparency", description: "Open communication builds trust and drives success." },
];

export function ValuesSection() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h2 className="text-4xl lg:text-5xl font-display tracking-tight mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-md">The principles that guide our work, shape our culture, and drive our commitment to excellence.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div 
                key={i}
                className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              >
                <div className="text-sm font-mono text-muted-foreground mb-4">0{i + 1}</div>
                <h3 className="text-xl font-display mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
