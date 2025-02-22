import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import redis from "@/lib/redis"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = uuidv4()
    const result = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
    }

    console.log("Attempting to save result to Redis:", id)

    try {
      // Store the result as a JSON string
      await redis.set(`quiz:${id}`, JSON.stringify(result))
      console.log("Result saved successfully to Redis:", id)
    } catch (redisError) {
      console.error("Redis error:", redisError)
      throw new Error(`Failed to save to Redis: ${redisError.message}`)
    }

    return NextResponse.json({ id }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/quiz-results:", error)
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

