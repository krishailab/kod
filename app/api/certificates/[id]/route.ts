import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Certificate ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("certificatesDB");

    const objectId = new ObjectId(id); // Convert to ObjectId
    const certificate = await db.collection("certificates").findOne({ _id: objectId });

    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    // Remove password before sending response
    const { password, ...certificateWithoutPassword } = certificate;
    return NextResponse.json(certificateWithoutPassword);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return NextResponse.json({ error: "Failed to fetch certificate" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Certificate ID" }, { status: 400 });
    }

    const formData = await request.json();
    const { name, title, issueDate, certificateLink, password } = formData;

    const client = await clientPromise;
    const db = client.db("certificatesDB");

    const objectId = new ObjectId(id); // Convert to ObjectId

    const updateData: any = {
      name,
      title,
      issueDate: new Date(issueDate),
      certificateLink,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const result = await db.collection("certificates").updateOne(
      { _id: objectId }, // Match by ObjectId
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Certificate updated successfully" });
  } catch (error) {
    console.error("Error updating certificate:", error);
    return NextResponse.json({ error: "Failed to update certificate" }, { status: 500 });
  }
}
