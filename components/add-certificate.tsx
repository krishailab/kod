"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddCertificate() {
  const [formData, setFormData] = useState({
    credentialId: "",
    name: "",
    title: "",
    issueDate: "",
    password: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!file) {
      setError("Please select a certificate file to upload.")
      setLoading(false)
      return
    }

    try {
      // 1. Upload to Cloudinary
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      const uploadData = await uploadResponse.json();
      const certificateLink = uploadData.secure_url;

      // 2. Save Certificate to Database
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, certificateLink }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to add certificate")
      }
      
      router.push("/admin/dashboard")
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Certificate</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="credentialId">Credential ID</Label>
          <Input id="credentialId" name="credentialId" value={formData.credentialId} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="issueDate">Issue Date</Label>
          <Input id="issueDate" name="issueDate" type="date" value={formData.issueDate} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="file">Certificate File (PDF or Image)</Label>
          <Input id="file" name="file" type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Uploading & Submitting..." : "Add Certificate"}
        </Button>
      </form>
    </div>
  )
}
