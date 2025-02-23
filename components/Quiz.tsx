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
    question: "How closely does your code match the design?",
    options: [
      { text: "Pixel-perfect", score: 10 },
      { text: "Very close", score: 8 },
      { text: "Somewhat close", score: 5 },
      { text: "Not very close", score: 2 },
    ],
    image: {
      url: "/placeholder.svg?height=400&width=400",
      caption: "Example of design-code comparison",
    },
  },
  {
    question: "How often do designers and developers collaborate?",
    options: [
      { text: "Daily", score: 10 },
      { text: "Weekly", score: 7 },
      { text: "Monthly", score: 4 },
      { text: "Rarely", score: 1 },
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

  console.log("selectedOption", selectedOption)
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
    <div className="overflow-hidden border-none">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200
       p-16 space-y-8 rounded-2xl overflow-hidden">
          <Link href="/" className="inline-flex items-center text-gray-900 hover:text-indigo-800">
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart
          </Link>
          <div className="space-y-8">
            <p className="text-gray-600 font-space-mono">Step {currentQuestion + 1}/3</p>
            <h2 className="text-5xl font-bold text-gray-800" style={{ lineHeight: "125%"}}>{questions[currentQuestion].question.replace("{Component}",componentName)}</h2>
            <p className="text-gray-500 text-xl">Select one answer</p>
          </div>
        </div>
        <div className="md:w-1/2 bg-white p-16 space-y-8">
          <RadioGroup
            value={selectedOption?.toString()}
            onValueChange={(value) => setSelectedOption(Number.parseInt(value))}
            className="space-y-4"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className={`border border-gray-300 rounded-xl p-4 hover:bg-gray-50 hover:border-gray-500 transition-colors cursor-pointer ${selectedOption === option.score ? 'bg-gray-100 border-black': ''}`}>
                <RadioGroupItem value={option.score.toString()} id={`option-${index}`} className="peer sr-only rounded-xl" />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex items-center space-x-3 cursor-pointer text-lg font-medium"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-between pt-4">
            <button
              onClick={handlePrevious}
              className={`font-space-mono text-black py-4 px-8 rounded-xl ${(selectedOption === null && currentQuestion === 0) ? 'text-gray-400' : 'hover:bg-gray-200 text-black'}`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`font-space-mono py-4 px-8 rounded-xl ${selectedOption === null ? 'bg-gray-200 text-gray-400' :'bg-black hover:bg-gray-900 text-white'}`}
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
  )
}

