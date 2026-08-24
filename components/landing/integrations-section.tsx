"use client";

import { useEffect, useState, useRef } from "react";
import { 
  Github, 
  Slack, 
  CreditCard, 
  Database, 
  Zap, 
  Cloud, 
  Triangle, 
  Figma, 
  ListTodo, 
  FileText, 
  Bot 
} from "lucide-react";

const integrations = [
  { name: "GitHub", category: "Version Control", Icon: Github },
  { name: "Slack", category: "Communication", Icon: Slack },
  { name: "Stripe", category: "Payments", Icon: CreditCard },
  { name: "PostgreSQL", category: "Database", Icon: Database },
  { name: "Redis", category: "Cache", Icon: Zap },
  { name: "AWS", category: "Cloud", Icon: Cloud },
  { name: "MongoDB", category: "Database", Icon: Database },
  { name: "Vercel", category: "Hosting", Icon: Triangle },
  { name: "Figma", category: "Design", Icon: Figma },
  { name: "Linear", category: "Project Management", Icon: ListTodo },
  { name: "Notion", category: "Documentation", Icon: FileText },
  { name: "OpenAI", category: "AI/ML", Icon: Bot },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="integrations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Our Technologies
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Powered by modern
            <br />
            tech stack.
          </h2>
          <p className="text-xl text-muted-foreground">
            We build robust, scalable applications using the most advanced technologies in the industry.
          </p>
        </div>

      </div>
      
      {/* Full-width marquees outside container */}
      <div className="w-full mb-6">
        <div className="flex gap-6 marquee">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {integrations.map((integration) => (
                <div
                  key={`${integration.name}-${setIndex}`}
                  className="shrink-0 px-8 py-6 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group flex items-center gap-4"
                >
                  <div className="p-3 bg-foreground/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <integration.Icon className="w-6 h-6 text-foreground/70 group-hover:text-foreground" />
                  </div>
                  <div>
                    <div className="text-lg font-medium group-hover:translate-x-1 transition-transform">
                      {integration.name}
                    </div>
                    <div className="text-sm text-muted-foreground">{integration.category}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Reverse marquee */}
      <div className="w-full">
        <div className="flex gap-6 marquee-reverse">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {[...integrations].reverse().map((integration) => (
                <div
                  key={`${integration.name}-reverse-${setIndex}`}
                  className="shrink-0 px-8 py-6 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group flex items-center gap-4"
                >
                  <div className="p-3 bg-foreground/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <integration.Icon className="w-6 h-6 text-foreground/70 group-hover:text-foreground" />
                  </div>
                  <div>
                    <div className="text-lg font-medium group-hover:translate-x-1 transition-transform">
                      {integration.name}
                    </div>
                    <div className="text-sm text-muted-foreground">{integration.category}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
