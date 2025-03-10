import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { QuestionViewer } from "@/components/dashboard/question-viewer"
import { QuizGenerator } from "@/components/dashboard/quiz-generator"

interface QuestionPageProps {
  params: {
    id: string
  }
}

export default function QuestionPage({ params }: QuestionPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <DashboardHeader /> */}
      <div className="">
        {/* <DashboardSidebar /> */}
        <main className="flex w-full flex-col overflow-hidden">
          <DashboardShell className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Past Question</h1>
            <p className="text-muted-foreground">View past question details and generate quizzes</p>
          </DashboardShell>

          <div className="grid gap-8">
            <QuestionViewer questionId={params.id} />
            <QuizGenerator questionId={params.id} />
          </div>
        </main>
      </div>
    </div>
  )
}

