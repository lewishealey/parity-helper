"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function QuizStart() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [componentName, setComponentName] = useState("")
  const [company, setCompany] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams({ name, componentName, company }).toString()
    router.push(`/quiz?${queryParams}`)
  }

  return (
    <Card className="p-8 space-y-6 max-w-2xl mx-auto bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Start Your Design-Code Parity Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 text-lg font-bold"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="componentName" className="block text-lg font-medium text-gray-700 mb-2">
            Component Name
          </label>
          <Input
            type="text"
            id="componentName"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            required
            className="w-full p-3 text-lg font-bold"
            placeholder="Button Component"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-lg font-medium text-gray-700 mb-2">
            Company
          </label>
          <Input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full p-3 text-lg font-bold"
            placeholder="Acme Inc."
          />
        </div>
        <Button
          type="submit"
          className="w-full py-3 text-xl bg-black hover:bg-gray-900 transition-colors font-space-mono"
        >
          Start Quiz
        </Button>
      </form>
    </Card>
  )
}

