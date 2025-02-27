import { Suspense } from "react"
import Quiz from "@/components/Quiz"
import { Card } from "@/components/ui/card"

export default function QuizPage() {
  return (
    <main className="flex items-center justify-center h-full">
      <Suspense
        fallback={
          <div className="p-6">
            <div className="h-8 w-3/4 bg-muted animate-pulse rounded mb-4" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </div>
        }
      >
        <Quiz />
      </Suspense>
    </main>
  )
}

