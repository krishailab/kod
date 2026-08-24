"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import type React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-28%20at%2010.57.36%E2%80%AFAM-EtzuPbFmxVqBMxlM7bJ6ZNq4JE2S89.png"
                  alt="KodRish Logo"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-8 max-[860px]:hidden">
              <Link href="/" className="text-sm font-medium">
                Home
              </Link>
              <div className="relative group">
                <Link href="/services" className="text-sm font-medium flex items-center">
                  Services <ChevronDown className="h-4 w-4 ml-1" />
                </Link>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link
                      href="/services/web-development"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Web Development
                    </Link>
                    <Link
                      href="/services/project-development"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Project Development
                    </Link>
                    <Link
                      href="/services/graphic-designing"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Graphic Designing
                    </Link>
                    <Link
                      href="/services/ai-ml-solution"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      AI/ML Solution
                    </Link>
                  </div>
                </div>
              </div>
              <Link href="/projects" className="text-sm font-medium">
                Projects
              </Link>
              <div className="relative group">
                <Link href="/careers" className="text-sm font-medium flex items-center">
                  Careers <ChevronDown className="h-4 w-4 ml-1" />
                </Link>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link href="/careers/team" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Meet Our Team
                    </Link>
                    <Link
                      href="/careers/internships"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Internships
                    </Link>
                    <Link href="/careers/training" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Training Programs
                    </Link>
                  </div>
                </div>
              </div>
                <Link href="/verify" className="text-gray-600 hover:text-gray-900">
                  Verify Certificate
                </Link>
              <Link href="/about" className="text-sm font-medium">
                About us
              </Link>
              <Link href="/contact" className="text-sm font-medium">
              <Button className="bg-[#1e2b5e] hover:bg-[#2a3b7e] text-white">Contact us</Button>
              </Link>
            </div>
            <div className="hidden max-[860px]:block">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4">
                    <Link href="/" className="text-sm font-medium">
                      Home
                    </Link>
                    <div className="space-y-2">
                      <Link href="/services" className="text-sm font-medium">
                        Services
                      </Link>
                      <div className="pl-4 space-y-2">
                        <Link href="/services/web-development" className="text-sm font-medium block">
                          Web Development
                        </Link>
                        <Link href="/services/project-development" className="text-sm font-medium block">
                          Project Development
                        </Link>
                        <Link href="/services/graphic-designing" className="text-sm font-medium block">
                          Graphic Designing
                        </Link>
                        <Link href="/services/ai-ml-solution" className="text-sm font-medium block">
                          AI/ML Solution
                        </Link>
                      </div>
                    </div>
                    <Link href="/projects" className="text-sm font-medium">
                      Projects
                    </Link>
                    <div className="space-y-2">
                      <Link href="/careers" className="text-sm font-medium">
                        Careers
                      </Link>
                      <div className="pl-4 space-y-2">
                        <Link href="/careers/team" className="text-sm font-medium block">
                          Meet Our Team
                        </Link>
                        <Link href="/careers/internships" className="text-sm font-medium block">
                          Internships
                        </Link>
                        <Link href="/careers/training" className="text-sm font-medium block">
                          Training Programs
                        </Link>
                      </div>
                    </div>
                    <Link href="/about" className="text-sm font-medium">
                      About us
                    </Link>
                    <Link href="/verify" className="text-gray-600 hover:text-gray-900">
                  Verify Certificate
                </Link>
                <Link href="/contact" className="text-sm font-medium">
              <Button className="bg-[#1e2b5e] hover:bg-[#2a3b7e] text-white">Contact us</Button>
              </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-28%20at%2010.57.36%E2%80%AFAM-EtzuPbFmxVqBMxlM7bJ6ZNq4JE2S89.png"
                alt="KodRish Logo"
                width={180}
                height={60}
                className="mb-4 h-12 w-auto"
              />
              <p className="text-sm text-gray-600">Innovation & Solutions</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-sm">
                    Projects
                  </Link>
                </li>

              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/web-development" className="text-sm">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/project-development" className="text-sm">
                    Project Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/graphic-designing" className="text-sm">
                    Graphic Designing
                  </Link>
                </li>
                <li>
                  <Link href="/services/ai-ml-solution" className="text-sm">
                    AI/ML Solutions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-sm">+91 7067954499</li>
                <li className="text-sm">kodrishsolutions@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            © 2025 Kodrish. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

