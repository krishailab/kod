import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("certificatesDB");
    const certificates = await db.collection("certificates").find({}).toArray();

    return NextResponse.json(certificates);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { credentialId, name, title, issueDate, certificateLink, password } = formData;

    if (!certificateLink) {
      return NextResponse.json({ error: "Certificate link is required" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise;
    const db = client.db("certificatesDB");
    const result = await db.collection("certificates").insertOne({
      credentialId,
      name,
      title,
      issueDate: new Date(issueDate),
      certificateLink, // Store the certificate link instead of a file
      password: hashedPassword,
    });

    return NextResponse.json({
      id: result.insertedId,
      credentialId,
      name,
      title,
      issueDate,
      certificateLink,
    });
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}
