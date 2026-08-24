"use client";

import { useEffect, useRef, useState } from "react";

const team = [
  {
    "name": "Krish Bhagat",
    "role": "Founder & CEO/Executive Lead",
    "certId": "KDRS",
    "description": "Krish Bhagat is a skilled AI/ML and web developer, founder of KodRish, FastAPI developer, and AI prompting engineer, specializing in sign language translators and real-time analytics.",
    "image": "/krish.png"
  },
  {
    "name": "Shivam Patel",
    "role": "Python Developer (Data Science Team)",
    "certId": "KDRS25-001",
    "description": "A strong passion for machine learning, deep learning, and Python programming. Involved with Kodrish Innovation and Solution, where I provide cutting-edge Python apps & machine learning solutions.",
    "image": "/shivam.png"
  },
  {
    "name": "Harsh Solanki",
    "role": "Frontend Developer",
    "certId": "KDRS2025786-934",
    "description": "Passionate about creating intuitive user interfaces and delivering seamless web experiences.",
    "image": "/placeholder-user.jpg"
  },
  {
    "name": "Kishan Chandravanshi",
    "role": "Data Analysis & Power BI",
    "certId": "KDRS2025786-925",
    "description": "Specializes in transforming complex datasets into actionable business intelligence using Power BI and advanced data analytics.",
    "image": "/placeholder-user.jpg"
  },
  {
    "name": "Ritik Pawar",
    "role": "Marketing & Social Media",
    "certId": "KDRS2025786-914",
    "description": "Drives brand awareness and engagement through strategic marketing campaigns and creative social media content.",
    "image": "/ritik.png"
  },
  {
    "name": "Sahil Sharma",
    "role": "UI/UX Designer & Developer",
    "certId": "KDRS2025786-918",
    "description": "Dedicated to designing beautiful, accessible, and user-centric digital products.",
    "image": "/sahil.png"
  }
];

export function TeamSection() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Leadership
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
            Meet the team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {team.map((member, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] bg-foreground/5 rounded-xl mb-6 overflow-hidden relative">
                {member.image && member.image !== "/placeholder-user.jpg" ? (
                  <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/20 group-hover:scale-105 transition-transform duration-500">
                    <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-display group-hover:text-muted-foreground transition-colors">{member.name}</h3>
              <p className="text-muted-foreground text-sm font-medium mb-1">{member.role}</p>
              {member.certId && (
                <p className="text-xs font-mono text-muted-foreground/60 mb-4 tracking-wider">CERT ID: {member.certId}</p>
              )}
              {member.description && (
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{member.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
