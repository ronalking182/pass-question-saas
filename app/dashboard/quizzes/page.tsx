import { DashboardShell } from "@/components/dashboard/shell"
import { QuizzesList } from "@/components/dashboard/quizzes-list"
import { QuizStats } from "@/components/dashboard/quiz-stats"

export default function QuizzesPage() {
  return (
    <>
      <DashboardShell className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">My Quizzes</h1>
        <p className="text-muted-foreground">View your quiz history and continue where you left off</p>
      </DashboardShell>

      <div className="grid gap-8">
        <QuizStats />
        <QuizzesList />
      </div>
    </>
  )
}

