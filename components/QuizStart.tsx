"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const components = [
  "Accordion",
  "Alert",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "Card",
  "Checkbox",
  "Chip",
  "Dialog",
  "Drawer",
  "Dropdown",
  "Icon",
  "Input",
  "List",
  "Menu",
  "Modal",
  "Notification",
  "Pagination",
  "Popover",
  "Progress Bar",
  "Radio Button",
  "Select",
  "Slider",
  "Snackbar",
  "Stepper",
  "Switch",
  "Tab",
  "Table",
  "Tag",
  "Text Area",
  "Text Field",
  "Toast",
  "Tooltip",
  "Typography"
];

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
    <div className="flex flex-col w-full">
      <div className="flex-1 p-8">
        <div className="h-full min-h-full flex flex-col p-8 space-y-8 bg-gray-200 rounded-2xl">
          <h2 className="text-4xl font-mono text-gray-900 mb-6">Component parity assessment</h2>
          <p className="text-xl text-gray-900">Check the parity your Figma component has with its code counterpart in with this quiz </p>
          <p className="text-gray-900">👉🏻 Brought to you by <a href="https://designsystemdiaries.com/" className="underline">Design system Diaries</a></p>
        </div>
      </div>
      <div className="bg-white p-4 flex-1 justify-center flex flex-col p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="componentName" className="block text-lg font-medium text-gray-700 mb-2">
              Component Name (requird)
            </label>
            <Input
              type="text"
              list="design-system-components" 
              id="componentName"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              required
              className="w-full p-3 text-lg rounded-lg"
              placeholder="Button Component"
            />
            <datalist id="design-system-components">
              {components.map((component) => (
                <option key={component} value={component} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 text-lg rounded-lg"
              placeholder="John Doe"
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
              className="w-full p-3 text-lg rounded-lg"
              placeholder="Acme Inc."
            />
          </div>
          <Button
            type="submit"
            className="w-full py-3 text-xl text-white bg-black hover:bg-gray-900 transition-colors font-space-mono rounded overflow-hidden"
          >
            Start Quiz
          </Button>
        </form>
      </div>
    </div>
  )
}

