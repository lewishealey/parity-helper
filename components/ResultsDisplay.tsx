"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

type QuizResult = {
  id: string
  name: string
  componentName: string
  company: string
  score: number
  answers: number[]
  createdAt: string
}

const LOW_THRESHOLD = 30;
const MEDIUM_THRESHOLD = 70;
const HIGH_THRESHOLD = 90;

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

  const getColor = (score: number) => {
    if (score >= HIGH_THRESHOLD) return "#9C27B0"
    if (score >= MEDIUM_THRESHOLD) return "#0063C0"
    if (score >= LOW_THRESHOLD) return "#FF5722"
    return "There's significant room for improvement in your design-code parity. Focus on better collaboration and processes."
  }

  const getDescription = (score: number) => {
    if (score >= HIGH_THRESHOLD) return "You have high parity"
    if (score >= MEDIUM_THRESHOLD) return "You have moderate paity"
    if (score >= LOW_THRESHOLD) return "You have low parity"
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
    <div
      className="min-h-[50vh] overflow-hidden max-w-7xl" style={{
        background: 'linear-gradient(to right, #FF5722, #0063C0, #9C27B0)',
        padding: '6px',
        borderRadius: 20
      }}>
      <div className="overflow-hidden border-none min-h-[50vh]">
        <div className="flex flex-col md:flex-row min-h-[50vh] items-stretch">
          <div className="md:w-1/2 overflow-hidden p-8 space-y-8 flex flex-col justify-between bg-gray-200 rounded-tl-xl rounded-tr-xl lg:rounded-tr-none lg:rounded-tl-lg lg:rounded-bl-lg">
            <div>
              <div className="flex justify-between pb-12 lg:pb-16">
              <Link href="/" className="inline-flex items-center text-gray-800 hover:text-indigo-800">
                <RefreshCw className="w-4 h-4 mr-2" />
                Take test again
              </Link>
              </div>

              <div className="space-y-8 px-0 lg:px-8">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">{getDescription(results.score)}</h2>
              <h3 className="text-lg lg:text-2xl text-gray-800">{results.componentName ? results.componentName : 'Your component '} received a total parity score of {results.score.toFixed(2)}% based on answers from {results.answers.length} questions.</h3>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="py-4 px-8 text-xl font-bold text-white bg-black dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors rounded-xl"
              >
                Share results
              </button>
              </div>
            </div>
            <div className="font-mono text-gray-800">Brought to you by <a href="https://designsystemdiaries.com/?utm_source=parity_booster&utm_medium=results_display" className="underline">Design system Diaries</a></div>
            </div>
          <div className="md:w-1/2 bg-white dark:bg-gray-600 p-8 lg:p-16 space-y-8 min-h-[50vh] overflow-auto relative rounded-br-xl rounded-bl-xl lg:rounded-bl-none lg:rounded-tr-lg lg:rounded-br-lg">
            <img src="/logo-icon.svg" alt="Design System Diaries" className="invisible lg:visible w-12 h-12 absolute top-8 right-8" />
            <h3 className="text-2xl font-semibold text-gray-800 lg:pt-12">Tips for Improvement 🚀</h3>
            <ul className="list-decimal mt-2 space-y-2">
              {results.answers.length === 0 ? "None" : getTips(results.answers).map((tip, index) => (
              <li key={index} className="text-xl text-gray-700 ml-6">
                {tip}
              </li>
              ))}
            </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

