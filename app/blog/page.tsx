import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: 'Blog - KodRish',
  description: 'Latest insights, updates, and thoughts from the KodRish team.',
}

import { posts } from "@/lib/blog-data";

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-24">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Insights
            </span>
            <h1 className="text-5xl lg:text-7xl font-display tracking-tight mb-8">
              The KodRish Blog
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Thoughts, updates, and deep dives on engineering, design, and building the future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {posts.map((post, i) => (
              <Link 
                key={i} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col p-8 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors border border-foreground/10"
              >
                <div className="flex items-center justify-between mb-6 text-sm font-mono text-muted-foreground">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-display mb-4 group-hover:text-muted-foreground transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-8 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
