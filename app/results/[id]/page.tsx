import ResultsDisplay from "@/components/ResultsDisplay"

export default function ResultsPage({ params }: { params: { id: string } }) {
  return (
    <main> 
      <ResultsDisplay id={params.id} />
    </main>
  )
}

