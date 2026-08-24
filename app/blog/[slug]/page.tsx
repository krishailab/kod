import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { posts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: `${post.title} - KodRish Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      
      <article className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground mb-6">
              <span>{post.category}</span>
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div className="w-full h-px bg-foreground/10 mb-12" />

          <div 
            className="[&>p]:text-muted-foreground [&>p]:mb-6 [&>p]:leading-relaxed [&>h3]:text-2xl [&>h3]:font-display [&>h3]:mt-12 [&>h3]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:text-muted-foreground [&>ul>li]:mb-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:text-muted-foreground [&>ol>li]:mb-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </div>
      </article>

      <FooterSection />
    </main>
  );
}
