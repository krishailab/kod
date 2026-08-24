import { NextRequest, NextResponse } from "next/server"

const ADMIN_EMAIL = "admin@courtney.lk"
const ADMIN_PASSWORD = "admin123"

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return NextResponse.json({ success: true, token: "dummy-token" })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}