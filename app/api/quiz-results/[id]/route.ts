import { NextResponse } from "next/server"
import redis from "@/lib/redis"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  try {
    const result = await redis.get(`quiz:${id}`)

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 })
    }

    // Check if the result is already an object
    const parsedResult = typeof result === "string" ? JSON.parse(result) : result

    return NextResponse.json(parsedResult)
  } catch (error) {
    console.error("Error in GET /api/quiz-results/[id]:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

