import mongoose, { Schema, type Document } from "mongoose"

export interface ICertificate extends Document {
  credentialId: string
  name: string
  title: string
  issueDate: Date
  pdfUrl: string
}

const CertificateSchema: Schema = new Schema(
  {
    credentialId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    issueDate: { type: Date, required: true },
    pdfUrl: { type: String, required: true },
  },
  { collection: "certificates" },
)

export default mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema)

