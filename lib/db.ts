import { v4 as uuidv4 } from "uuid"
import mongoose from "mongoose"
import Certificate, { type ICertificate } from "@/lib/models/Certificate"
import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
  }
}

export async function addCertificate(certificate: Omit<ICertificate, "credentialId">) {
  await connectDB()
  const credentialId = uuidv4()
  const newCertificate = new Certificate({
    ...certificate,
    credentialId,
  })
  await newCertificate.save()
  return credentialId
}

export async function verifyCredential(credentialId: string) {
  await connectDB()
  return Certificate.findOne({ credentialId })
}

export async function getAllCertificates() {
  await connectDB()
  return Certificate.find({})
}

