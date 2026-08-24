"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

interface Certificate {
  _id: string
  credentialId: string
  name: string
  title: string
  issueDate: string
  certificateLink: string
}

export default function AdminDashboard() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [titleQuery, setTitleQuery] = useState("")
  const [issueDateQuery, setIssueDateQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const response = await fetch("/api/certificates")
        if (!response.ok) {
          throw new Error("Failed to fetch certificates")
        }
        const data = await response.json()
        setCertificates(data)
      } catch (error) {
        console.error("Error fetching certificates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  if (loading) {
    return <p>Loading certificates...</p>
  }

  // Filter certificates by name, title, and issue date
  const filteredCertificates = certificates.filter((cert) =>
    cert.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    cert.title.toLowerCase().includes(titleQuery.toLowerCase()) &&
    cert.issueDate.includes(issueDateQuery)
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCertificates = filteredCertificates.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Certificate Management</h1>
      <div className="flex justify-between mb-4 space-x-4">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/4"
        />
        <Input
          type="text"
          placeholder="Search by title..."
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
          className="w-1/4"
        />
        <Input
          type="date"
          placeholder="Search by issue date..."
          value={issueDateQuery}
          onChange={(e) => setIssueDateQuery(e.target.value)}
          className="w-1/4"
        />
        <Link href="/admin/dashboard/add">
          <Button>Add New Certificate</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Credential ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Certificate Link</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCertificates.map((cert) => (
            <TableRow key={cert._id}>
              <TableCell>{cert.credentialId}</TableCell>
              <TableCell>{cert.name}</TableCell>
              <TableCell>{cert.title}</TableCell>
              <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <a
                  href={cert.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Certificate
                </a>
              </TableCell>
              <TableCell>
                <Link href={`/admin/dashboard/edit/${cert._id}`}>
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </Button>
        <span className="self-center">Page {currentPage} of {totalPages}</span>
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  )
}
