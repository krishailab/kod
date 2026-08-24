"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditCertificate({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    credentialId: "",
    name: "",
    title: "",
    issueDate: "",
    password: "",
    certificateLink: ""
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (!params.id) return

    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/certificates/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch certificate")
        }
        const data = await response.json()
        setFormData({
          ...data,
          issueDate: new Date(data.issueDate).toISOString().split('T')[0],
          password: "" // Don't populate the password field for security reasons
        })
      } catch (error) {
        setError("Failed to load certificate data")
      }
    }

    fetchCertificate()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch(`/api/certificates/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error("Failed to update certificate")
      }
      
      router.push("/admin/dashboard")
    } catch (error) {
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
      <h1 className="text-2xl font-bold mb-4">Edit Certificate</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="credentialId">Credential ID</Label>
          <Input id="credentialId" name="credentialId" value={formData.credentialId} onChange={handleChange} required readOnly />
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
          <Label htmlFor="password">New Password (leave blank to keep current)</Label>
          <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="certificateLink">Certificate Link</Label>
          <Input id="certificateLink" name="certificateLink" type="url" value={formData.certificateLink} onChange={handleChange} required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Certificate"}
        </Button>
      </form>
    </div>
  )
}