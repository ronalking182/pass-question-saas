import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { QuizInterface } from "@/components/dashboard/quiz-interface"

interface QuizPageProps {
  params: {
    id: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DashboardSidebar />
        <main className="flex w-full flex-col overflow-hidden">
          <DashboardShell className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Quiz</h1>
            <p className="text-muted-foreground">Test your knowledge with this AI-generated quiz</p>
          </DashboardShell>

          <div className="grid gap-8">
            <QuizInterface quizId={params.id} />
          </div>
        </main>
      </div>
    </div>
  )
}

