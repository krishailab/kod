import { ArrowUpRight, Code, Terminal, FileText, Search } from "lucide-react";
import Link from "next/link";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";

const tools = [
  {
    title: "Next.js SEO Metadata Generator",
    description: "Instantly generate perfectly formatted export const metadata objects for your Next.js 13+ App Router projects.",
    icon: Search,
    href: "/tools/nextjs-seo-generator",
    tag: "Next.js",
  },
  {
    title: "Glassmorphism CSS Generator",
    description: "Create beautiful, modern glassmorphism CSS snippets for your frontend components. (Coming Soon)",
    icon: Code,
    href: "#",
    tag: "CSS",
    disabled: true,
  },
  {
    title: "README.md Generator",
    description: "Build a professional, well-structured README for your open-source projects in seconds. (Coming Soon)",
    icon: FileText,
    href: "#",
    tag: "GitHub",
    disabled: true,
  },
  {
    title: "Regex Cheat Sheet",
    description: "An interactive, searchable cheat sheet for regular expressions for Python and JavaScript. (Coming Soon)",
    icon: Terminal,
    href: "#",
    tag: "Utility",
    disabled: true,
  },
];

export const metadata = {
  title: "Free Developer Tools | KodRish",
  description: "A collection of free developer tools, generators, and cheat sheets built by KodRish Innovation & Solutions.",
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-foreground/10">
      <Navigation />

      <main className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-3xl mb-16 lg:mb-24">
            <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
              Free Developer Tools.
              <br />
              <span className="text-muted-foreground">Built by KodRish.</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A curated collection of tools and generators to help you build better, faster, and more efficiently. Open for the community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {tools.map((tool) => (
              <div 
                key={tool.title} 
                className={`group relative p-8 border border-foreground/10 flex flex-col justify-between overflow-hidden ${
                  tool.disabled ? "opacity-60 cursor-not-allowed" : "hover:border-foreground/30 transition-colors bg-foreground/[0.02] hover:bg-foreground/[0.04]"
                }`}
              >
                {!tool.disabled && (
                  <Link href={tool.href} className="absolute inset-0 z-10">
                    <span className="sr-only">Go to {tool.title}</span>
                  </Link>
                )}
                
                <div>
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-3 bg-foreground/5 rounded-lg border border-foreground/10">
                      <tool.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground bg-foreground/5 px-3 py-1 rounded-full border border-foreground/10">
                      {tool.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-display mb-3">{tool.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center text-sm font-medium text-foreground">
                  {tool.disabled ? (
                    "Coming Soon"
                  ) : (
                    <span className="flex items-center gap-2 group-hover:gap-3 transition-all">
                      Launch Tool <ArrowUpRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <FooterSection />
    </div>
  );
}
