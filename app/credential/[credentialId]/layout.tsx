import type { Metadata } from 'next'
import clientPromise from "@/lib/mongodb"

type Props = {
  params: { credentialId: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const credentialId = params.credentialId
  
  let certificate = null;
  try {
    const client = await clientPromise
    const db = client.db("certificatesDB")
    certificate = await db.collection("certificates").findOne({ credentialId: credentialId })
  } catch (error) {
    console.error("Error fetching certificate for metadata:", error)
  }

  if (!certificate) {
    return {
      title: 'Certificate Not Found',
    }
  }

  const title = `${certificate.title} - KodRish Verified Credential`
  const description = `This certificate provided by KodRish is a testament to the sheer grit, hard work, and dedication of the recipient, honored for ${certificate.title}.`
  
  const ogImageUrl = `/api/og/credential?title=${encodeURIComponent(certificate.title)}&image=${encodeURIComponent(certificate.certificateLink)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    }
  }
}

export default function CredentialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
