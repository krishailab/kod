import { ProtectedRoute } from "@/components/protected-route"
import EditCertificate from "@/components/edit-certificate"

export default function EditCertificatePage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <EditCertificate params={params} />
    </ProtectedRoute>
  )
}

