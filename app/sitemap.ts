import { MetadataRoute } from 'next'
import { posts } from '@/lib/blog-data'
import clientPromise from "@/lib/mongodb"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.kodrish.me' 

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.8 },
    { url: `${baseUrl}/verify`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/security`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/tools/nextjs-seo-generator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ]

  let certificateRoutes: MetadataRoute.Sitemap = []
  try {
    const client = await clientPromise;
    const db = client.db("certificatesDB");
    const certificates = await db.collection("certificates").find({}).toArray();
    
    certificateRoutes = certificates.map((cert) => ({
      url: `${baseUrl}/verify/${cert.credentialId}`,
      lastModified: new Date(cert.issueDate || Date.now()),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error("Error fetching certificates for sitemap:", error)
  }

  return [...staticRoutes, ...blogRoutes, ...certificateRoutes]
}
