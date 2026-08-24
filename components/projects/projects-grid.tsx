"use client"

import { useState } from "react"
import { ExternalLink, ArrowRight, Layout, MonitorSmartphone, Code2, Sparkles, Server, Cpu } from "lucide-react"

const projects = [
  {
    name: "Score100",
    url: "https://www.score100.in",
    description: "An advanced educational platform designed to enhance student learning experiences with interactive tools and comprehensive resources.",
    tags: ["EdTech", "Web App", "Learning"],
    icon: <Layout className="w-6 h-6" />,
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    name: "Harsh Tatsuya",
    url: "https://www.harshtatsuya.live",
    description: "A dynamic personal portfolio and streaming hub showcasing creative content, live engagements, and community interactions.",
    tags: ["Portfolio", "Streaming", "Creator"],
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    name: "Ridoo",
    url: "https://ridoo.co.in",
    description: "A seamless e-commerce or booking platform offering an intuitive user interface for streamlined customer experiences.",
    tags: ["Platform", "Consumer", "UI/UX"],
    icon: <MonitorSmartphone className="w-6 h-6" />,
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    name: "Vega Auto Central",
    url: "https://central.vegaauto.in",
    description: "An end-to-end industry automation and traceability project for streamlined operations.",
    tags: ["Automotive", "Enterprise", "Portal"],
    icon: <Server className="w-6 h-6" />,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "Prachin Ayurved",
    url: "https://www.prachinayurved.in",
    description: "A modern digital presence for traditional Ayurvedic practices, blending ancient wisdom with contemporary web design.",
    tags: ["Healthcare", "Wellness", "E-commerce"],
    icon: <Cpu className="w-6 h-6" />,
    gradient: "from-green-500/20 to-lime-500/20",
  },
  {
    name: "Gidan Store",
    url: "https://gidan.store",
    description: "A premium modern e-commerce destination offering a curated shopping experience with cutting-edge UI and performance.",
    tags: ["E-commerce", "Retail", "Next.js"],
    icon: <Code2 className="w-6 h-6" />,
    gradient: "from-indigo-500/20 to-cyan-500/20",
  },
]

export function ProjectsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl mx-auto relative z-10">
      {projects.map((project, index) => (
        <a
          key={project.name}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative h-full block"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Animated Background Glow */}
          <div
            className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
          
          {/* Card Content */}
          <div className="relative h-full bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:border-foreground/30 shadow-2xl">
            
            {/* Top Section */}
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${project.gradient} border border-foreground/5 shadow-inner`}>
                  {project.icon}
                </div>
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-foreground/10 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              
              <h3 className="text-2xl font-display mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 transition-all">
                {project.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {project.description}
              </p>
            </div>
            
            {/* Bottom Section */}
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-muted-foreground group-hover:border-foreground/20 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                View Project <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-gradient-to-bl from-foreground/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </a>
      ))}
    </div>
  )
}
