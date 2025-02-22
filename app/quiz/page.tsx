import { Suspense } from "react"
import Quiz from "@/components/Quiz"
import { Card } from "@/components/ui/card"

export default function QuizPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Design and Code Parity Quiz</h1>
      <Suspense
        fallback={
          <Card className="p-6">
            <div className="h-8 w-3/4 bg-muted animate-pulse rounded mb-4" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </Card>
        }
      >
        <Quiz />
      </Suspense>
    </main>
  )
}

