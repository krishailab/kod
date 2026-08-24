"use client";

import { useState } from "react";
import { Copy, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export default function NextJsSeoGenerator() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    title: "My Awesome Next.js App",
    description: "Built with Next.js 13+ App Router, TailwindCSS, and TypeScript.",
    url: "https://example.com",
    keywords: "nextjs, react, tailwindcss",
    twitterHandle: "@my_handle",
    authorName: "John Doe",
  });

  const generateCode = () => {
    const keywordsArray = formData.keywords
      .split(",")
      .map((k) => `'${k.trim()}'`)
      .join(", ");

    return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('${formData.url}'),
  title: {
    default: '${formData.title}',
    template: '%s | ${formData.title}'
  },
  description: '${formData.description}',
  keywords: [${keywordsArray}],
  authors: [{ name: '${formData.authorName}' }],
  creator: '${formData.authorName}',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '${formData.url}',
    siteName: '${formData.title}',
    title: '${formData.title}',
    description: '${formData.description}',
    images: [
      {
        url: '/og-image.png', // Place og-image.png in your public folder
        width: 1200,
        height: 630,
        alt: '${formData.title}',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '${formData.title}',
    description: '${formData.description}',
    images: ['/og-image.png'],
    creator: '${formData.twitterHandle}',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background selection:bg-foreground/10 flex flex-col">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="mb-12">
            <Link 
              href="/tools" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="text-4xl lg:text-5xl font-display tracking-tight mb-4">
              Next.js SEO Metadata Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Instantly generate the perfect <code>export const metadata</code> object for your Next.js 13+ App Router projects. Fully typed and optimized for Open Graph and Twitter Cards.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Form Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Site Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-background border border-foreground/20 p-3 rounded-none focus:outline-none focus:border-foreground transition-colors text-foreground"
                  placeholder="My Awesome App"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-background border border-foreground/20 p-3 rounded-none focus:outline-none focus:border-foreground transition-colors text-foreground resize-none"
                  placeholder="A brief description of your app..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Base URL (Domain)</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full bg-background border border-foreground/20 p-3 rounded-none focus:outline-none focus:border-foreground transition-colors text-foreground font-mono text-sm"
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Keywords (Comma separated)</label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  className="w-full bg-background border border-foreground/20 p-3 rounded-none focus:outline-none focus:border-foreground transition-colors text-foreground"
                  placeholder="nextjs, react, seo"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Author Name</label>
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    className="w-full bg-background border border-foreground/20 p-3 rounded-none focus:outline-none focus:border-foreground transition-colors text-foreground"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Twitter Handle</label>
                  <input
                    type="text"
                    name="twitterHandle"
                    value={formData.twitterHandle}
                    onChange={handleChange}
                    className="w-full bg-background border border-foreground/20 p-3 rounded-none focus:outline-none focus:border-foreground transition-colors text-foreground font-mono text-sm"
                    placeholder="@my_handle"
                  />
                </div>
              </div>

            </div>

            {/* Code Output Section */}
            <div className="relative border border-foreground/10 bg-foreground/[0.02] p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                  layout.tsx
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-sm bg-foreground text-background px-4 py-2 hover:bg-foreground/90 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Code"}
                </button>
              </div>
              
              <pre className="overflow-x-auto text-sm font-mono text-muted-foreground leading-relaxed">
                <code>{generateCode()}</code>
              </pre>
            </div>

          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
