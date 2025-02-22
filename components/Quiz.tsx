"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const questions = [
  {
    question: "How often do you update your design files?",
    options: [
      { text: "After every code change", score: 10 },
      { text: "Weekly", score: 7 },
      { text: "Monthly", score: 5 },
      { text: "Rarely", score: 2 },
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
    <Card className="max-w-6xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 space-y-6">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Homepage
          </Link>
          <div className="space-y-4">
            <p className="text-indigo-600">step {currentQuestion + 1}/3</p>
            <h2 className="text-4xl font-bold text-gray-900">{questions[currentQuestion].question}</h2>
            <p className="text-gray-500">Select one answer</p>
          </div>
          <div className="mt-auto pt-8">
            <p className="text-indigo-600 font-space-mono">{componentName}</p>
          </div>
        </div>
        <div className="md:w-1/2 bg-white p-8 space-y-6">
          <RadioGroup
            value={selectedOption?.toString()}
            onValueChange={(value) => setSelectedOption(Number.parseInt(value))}
            className="space-y-4"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <RadioGroupItem value={option.score.toString()} id={`option-${index}`} className="peer sr-only" />
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
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="font-space-mono"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="bg-black hover:bg-gray-900 font-space-mono"
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
            </Button>
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
    </Card>
  )
}

