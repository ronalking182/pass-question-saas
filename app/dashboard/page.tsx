import { DashboardShell } from "@/components/dashboard/shell"
import { SearchQuestions } from "@/components/dashboard/search-questions"
import { RecentQuestions } from "@/components/dashboard/recent-questions"
import { QuizProgress } from "@/components/dashboard/quiz-progress"

export default function DashboardPage() {
  return (
    <>
      <DashboardShell className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Search for past questions or continue where you left off.</p>
      </DashboardShell>

      <div className="grid gap-8">
        <SearchQuestions />
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-7">
          <RecentQuestions className="md:col-span-1 lg:col-span-4" />
          <QuizProgress className="md:col-span-1 lg:col-span-3" />
        </div>
      </div>
    </>
  )
}

