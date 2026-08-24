import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickLinks() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Internship Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Gain hands-on experience and kickstart your career with our internship opportunities.
              </p>
              <Link href="/careers/internships" className="text-blue-600 hover:text-blue-800 font-semibold">
                Explore Internships →
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Training Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Enhance your skills with our comprehensive training programs in various technologies.
              </p>
              <Link href="/careers/training" className="text-blue-600 hover:text-blue-800 font-semibold">
                Browse Training Courses →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
export default QuickLinks
