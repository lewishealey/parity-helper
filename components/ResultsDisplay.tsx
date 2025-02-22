"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

type QuizResult = {
  id: string
  name: string
  componentName: string
  company: string
  score: number
  answers: number[]
  createdAt: string
}

export default function ResultsDisplay({ id }: { id: string }) {
  const [results, setResults] = useState<QuizResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/quiz-results/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch results")
        }
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error("Error fetching results:", error)
        setError("Failed to load quiz results. Please try again later.")
      }
    }

    fetchResults()
  }, [id])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!results) {
    return <div className="text-2xl text-center">Loading...</div>
  }

  const getDescription = (score: number) => {
    if (score >= 90) return "Excellent! Your design and code are in perfect harmony."
    if (score >= 70) return "Great job! There's room for minor improvements in your design-code parity."
    if (score >= 50) return "Good effort. Consider tightening the collaboration between design and development."
    return "There's significant room for improvement in your design-code parity. Focus on better collaboration and processes."
  }

  const getTips = (answers: number[]) => {
    const tips = []
    if (answers[0] <= 5) tips.push("Consider updating your design files more frequently to maintain parity.")
    if (answers[1] <= 5) tips.push("Work on achieving closer visual match between design and code.")
    if (answers[2] <= 4) tips.push("Increase collaboration frequency between designers and developers.")
    return tips
  }

  return (
    <Card className="p-8 space-y-8 max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100">
      <div>
        <h2 className="text-3xl font-bold text-indigo-800 mb-4">Results for {results.name}</h2>
        <p className="text-xl text-gray-700">Component: {results.componentName}</p>
        <p className="text-xl text-gray-700">Company: {results.company}</p>
        <p className="text-xl text-gray-700">Date: {new Date(results.createdAt).toLocaleDateString()}</p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-indigo-700">Your Score: {results.score.toFixed(2)}%</h3>
        <p className="mt-2 text-xl text-gray-700">{getDescription(results.score)}</p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-indigo-700">Tips for Improvement:</h3>
        <ul className="list-disc list-inside mt-2 space-y-2">
          {getTips(results.answers).map((tip, index) => (
            <li key={index} className="text-xl text-gray-700">
              {tip}
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={() => navigator.clipboard.writeText(window.location.href)}
        className="w-full py-3 text-xl bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        Copy Results Link
      </Button>
    </Card>
  )
}

