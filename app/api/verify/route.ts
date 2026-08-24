import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const credentialId = searchParams.get("credentialId")

  if (!credentialId) {
    return NextResponse.json({ error: "Credential ID is required" }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db("certificatesDB")
    const certificate = await db.collection("certificates").findOne({ credentialId: credentialId })
    if (!certificate) {
      return NextResponse.json(null)
    }
    return NextResponse.json(certificate)
  } catch (error) {
    console.error("Error verifying certificate:", error)
    return NextResponse.json({ error: "Failed to verify certificate" }, { status: 500 })
  }
}

