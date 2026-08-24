import { ProtectedRoute } from "@/components/protected-route"
import AddCertificate from "@/components/add-certificate"

export default function AddCertificatePage() {
  return (
    <ProtectedRoute>
      <AddCertificate />
    </ProtectedRoute>
  )
}

