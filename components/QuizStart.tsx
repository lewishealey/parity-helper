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
  const [getStarted, setGetStarted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams({ name, componentName, company }).toString()
    router.push(`/quiz?${queryParams}`)
  }

  if(getStarted) {

  return (
    <div
      className="max-w-lg min-h-[50vh]" style={{
        background: 'linear-gradient(to right, #FF5722, #0063C0, #9C27B0)',
        padding: '6px',
        borderRadius: 20
      }}>
      <div className="border-none bg-white dark:bg-gray-800 rounded-2xl p-8 h-full border borde-4">
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-5xl font-black text-black dark:text-white text-center" style={{ lineHeight: "125%" }}>Before we start</h2>
          <p className="text-2xl text-black dark:text-gray-300 text-center" style={{ lineHeight: "125%" }}>Lets get a little info about you and the component you're checking.</p>
          <div>
            <label htmlFor="componentName" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Component Name (required)
            </label>
            <Input
              type="text"
              list="design-system-components"
              id="componentName"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              required
              className="w-full px-6 py-4 text-lg rounded-lg placeholder-gray-500 dark:bg-gray-900"
              placeholder="Button Component"
            />
            <datalist id="design-system-components">
              {components.map((component) => (
                <option key={component} value={component} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 text-lg rounded-lg placeholder-gray-500 dark:bg-gray-900"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 ">
              Company
            </label>
            <Input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-6 py-4 text-lg rounded-lg placeholder-gray-500 dark:bg-gray-900"
              placeholder="Acme Inc."
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-xl text-white bg-black dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors font-space-mono rounded-xl text-xl"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  )
}

  return ( 
    <div 
      className="max-w-lg min-h-[50vh]" style={{
        background: 'linear-gradient(to right, #FF5722, #0063C0, #9C27B0)',
        padding: '6px',
        borderRadius: 20
      }}>
    <div className="border-none bg-white dark:bg-gray-800 rounded-2xl p-8 h-full border borde-4">
      <div className="flex flex-col items-scenter justify-center space-y-8">
        <div className="relative p-0 space-y-8 rounded-2xl flex flex-col justify-between items-center">
            <img src="/parity-pals.png" alt="Design System Diaries" className="w-full" />
              <h2 className="text-5xl font-black text-black dark:text-white" style={{ lineHeight: "125%" }}>Parity Booster</h2>
            <p className="text-2xl text-black dark:text-gray-300 text-center" style={{ lineHeight: "125%" }}>Lets bring design and code together. Evaluate the code parity of your Design System’s Figma components and get actionable improvement suggestions.</p><button
                type="submit"
                className="w-full py-4 text-2xl font-bold text-white bg-black dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors rounded-xl text-xl"
                onClick={() => setGetStarted(true)}
              >
                Check your parity
              </button>
                <div className="text-xl dark:text-gray-300">Brought to you by <a href="https://designsystemdiaries.com/" className="underline">Design system Diaries</a></div>

        </div>
        
      </div>
    </div>
    </div>
  )
}

