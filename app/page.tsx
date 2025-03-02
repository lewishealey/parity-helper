import QuizStart from "@/components/QuizStart"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design System Parity Booster - Lets bring design and code together',
  description: 'Evaluate the code parity of your Design System\'s Figma components and get actionable improvement suggestions',
  openGraph: {
    images: ['/og-meta.png'],
  },
}

export default function Home() {
  return (
    <main>
      <QuizStart />
    </main>
  )
}

