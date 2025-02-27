"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const questions = [
  {
    question: "Has {Component} been built yet?",
    options: [
      { text: "Yes", score: 10 },
      { text: "No", score: 0 },
    ],
    image: null,
  },
  {
    question: "Is there documentation for {Component}?",
    options: [
      { text: "Yes", score: 10 },
      { text: "No", score: 0 },
    ],
    image: null,
  },
  {
    question: "Is your {Component} using design tokens?",
    options: [
      { text: "Yes, everything is design tokens", score: 10 },
      { text: "Everything that is tokenized in code is", score: 8 },
      { text: "A mixture, some have tokens some don't", score: 5 },
      { text: "Not at all", score: 2 },
    ],
    image: null,
  },
  {
    question: "Does the Figma component name for {Component} match the namespace in code?",
    options: [
      { text: "Perfect", score: 10 },
      { text: "Slightly amended", score: 9 },
      { text: "Somewhat close", score: 5 },
      { text: "Not very close", score: 2 },
    ],
    image: {
      url: "/placeholder.svg?height=400&width=400",
      caption: "Example of design-code comparison",
    },
  },
  {
    question: "Do you include links and metadata in {Component}'s description?",
    options: [
      { text: "Both to documentation and metadata", score: 10 },
      { text: "Just links to documentation", score: 7 },
      { text: "Just metadata", score: 6 },
      { text: "None", score: 1 },
    ],
    image: {
      url: "/placeholder.svg?height=400&width=400",
      caption: "Collaboration between designers and developers",
    },
  },
  {
    question: "How are your Figma library pages set up?",
    options: [
      { text: "One page per component", score: 10 },
      { text: "One page per component with sub components too", score: 9 },
      { text: "A mixture", score: 7 },
      { text: "All in a single page", score: 3 },
    ],
    image: {
      url: "/placeholder.svg?height=400&width=400",
      caption: "Collaboration between designers and developers",
    },
  },
  {
    question: "If your componet has a state prop, how is it set-up",
    options: [
      { text: "Every state is in the state prop", score: 10 },
      { text: "Some states are componemt api", score: 9 },
      { text: "A mixture", score: 7 },
      { text: "I dont have a state prop", score: 10 },
    ],
    image: {
      url: "/placeholder.svg?height=400&width=400",
      caption: "Collaboration between designers and developers",
    },
  },
  {
    question: "How have you matched {Component} properties with code?",
    options: [
      { text: "All props are exactly the same as code, even the casing", score: 10 },
      { text: "All props are exact but casing is different", score: 9 },
      { text: "A mixture of exact and different", score: 6 },
      { text: "Nothing matches", score: 2 },
      { text: "I dont have a state prop", score: 10 },
    ],
    image: {
      url: "/placeholder.svg?height=400&width=400",
      caption: "Collaboration between designers and developers",
    },
  },
]

export default function Quiz() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const name = searchParams.get("name") || ""
  const componentName = searchParams.get("componentName") || ""
  const company = searchParams.get("company") || ""

  const handleNext = () => {
    if (selectedOption !== null) {
      setAnswers([...answers, selectedOption])
      setSelectedOption(null)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        finishQuiz()
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1])
      setAnswers(answers.slice(0, -1))
    }
  }

  const finishQuiz = async () => {
    const finalAnswers = [...answers, selectedOption!]
    const score = finalAnswers.reduce((sum, score) => sum + score, 0)
    const maxScore = questions.length * 10
    const percentage = (score / maxScore) * 100

    const result = {
      name,
      componentName,
      company,
      answers: finalAnswers,
      score: percentage,
    }

    try {
      const response = await fetch("/api/quiz-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      })

      const responseText = await response.text()
      let data

      try {
        data = JSON.parse(responseText)
      } catch (e) {
        console.error("Failed to parse response as JSON:", responseText)
        throw new Error(`Failed to parse response: ${responseText}`)
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${data.error || ""}\nDetails: ${data.details || ""}`)
      }

      if (!data.id) {
        throw new Error("Invalid response from server: missing ID")
      }

      router.push(`/results/${data.id}`)
    } catch (error) {
      console.error("Error saving quiz results:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
          <Button className="mt-2" onClick={() => setError(null)}>
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div
      className="min-h-[50vh] overflow-hidden" style={{
        background: 'linear-gradient(to right, #FF5722, #0063C0, #9C27B0)',
        padding: '6px',
        borderRadius: 20
      }}>
    <div className="overflow-hidden border-none min-h-[50vh]">
      <div className="flex flex-col md:flex-row min-h-[50vh] items-stretch">
          <div className="md:w-1/2 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 p-8 space-y-8 flex flex-col justify-between" style={{ borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }}>
          <div>
          <div className="flex justify-between pb-40">
            <Link href="/" className="inline-flex items-center text-gray-900 hover:text-indigo-800">
              <RefreshCw className="w-4 h-4 mr-2" />
              Restart
            </Link>
            <p className="text-gray-600 font-space-mono">Step {currentQuestion + 1}/{questions.length}</p>
          </div>

          <div className="space-y-8">
            <h2 className="text-6xl font-bold text-gray-800 pb-24 px-8" style={{ lineHeight: "125%"}}>{questions[currentQuestion].question.replace("{Component}",componentName)}</h2>
          </div>
          </div>
          <div className="font-space-mono">Brought to you by <a href="https://designsystemdiaries.com/?utm_source=parity_booster&utm_medium=quiz" className="underline">Design system Diaries</a></div>
        </div>
        <div className="md:w-1/2 bg-white dark:bg-gray-600 p-16 pr-8 space-y-8 min-h-[50vh] overflow-auto relative">
        <img src="/logo-icon.svg" alt="Design System Diaries" className="w-12 h-12 absolute top-8 right-8" />
          <p className="text-gray-500 text-xl pt-36">Select one answer</p>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option.score)}
                className={`w-full flex items-center border rounded-xl p-4 hover:bg-gray-50 hover:border-gray-500 transition-colors cursor-pointer ${selectedOption === option.score ? 'border-black' : 'border-gray-300 '}`}
              >
                <svg
                  className="mr-4"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke={selectedOption === option.score ? 'currentColor' : '#D1D5DB'}
                    strokeWidth="2"
                    fill={selectedOption === option.score ? 'currentColor' : 'none'}
                  />
                </svg>
                {option.text}
              </button>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={handlePrevious}
              className={`font-space-mono text-black text-xl py-4 px-8 rounded-xl ${(selectedOption === null && currentQuestion === 0) ? 'text-gray-400' : 'hover:bg-gray-200 text-black'}`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`font-space-mono py-4 px-8 text-xl rounded-xl ${selectedOption === null ? 'bg-gray-200 text-gray-400' : 'bg-black hover:bg-gray-900 text-white'}`}
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
          {questions[currentQuestion].image && (
            <div className="mt-8">
              <div className="relative w-full h-[200px]">
                <Image
                  src={questions[currentQuestion].image.url || "/placeholder.svg"}
                  alt={questions[currentQuestion].image.caption || "Question illustration"}
                  fill
                  className="rounded-lg shadow-md object-cover"
                />
              </div>
              {questions[currentQuestion].image.caption && (
                <p className="mt-2 text-sm text-gray-500 text-center">{questions[currentQuestion].image.caption}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

