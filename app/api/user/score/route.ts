import { NextResponse } from "next/server"

let userDB: { [email: string]: { score: number; scans: any[] } } = {}

export async function POST(req: Request) {
  const { email, productName, carbonEstimate } = await req.json()

  if (!email || !productName || !carbonEstimate) {
    return NextResponse.json(
      { error: "Missing data in request" },
      { status: 400 }
    )
  }

  if (!userDB[email]) {
    userDB[email] = { score: 0, scans: [] }
  }

  userDB[email].score += parseFloat(carbonEstimate)
  userDB[email].scans.push({ productName, carbonEstimate })

  return NextResponse.json({
    success: true,
    newScore: userDB[email].score.toFixed(2),
  })
}
