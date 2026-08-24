"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import type React from "react" // Added import for React

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/admin/login")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>
  }

  return isAuthenticated ? <>{children}</> : null
}

