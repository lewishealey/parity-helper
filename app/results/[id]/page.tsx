import { Metadata } from 'next'
import ResultsDisplay from '@/components/ResultsDisplay'

interface PageProps {
  params: {
    id: string
  }
}

// Generate metadata based on the quiz result
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    // Fetch the result data
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/quiz-results/${params.id}`, { next: { revalidate: 60 } })
    
    if (!response.ok) {
      return {
        title: 'Quiz Results | Parity Helper',
      }
    }
    
    const result = await response.json()
    
    return {
      title: `Quiz Results for ${result.name} | Parity Helper`,
      description: result.description,
    }
  } catch (error) {
    return {
      title: 'Quiz Results | Parity Helper',
    }
  }
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  return (
    <main> 
      <ResultsDisplay id={params.id} />
    </main>
  )
}

