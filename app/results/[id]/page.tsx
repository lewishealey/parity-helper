import ResultsDisplay from "@/components/ResultsDisplay"

export default function ResultsPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
      <ResultsDisplay id={params.id} />
    </main>
  )
}

