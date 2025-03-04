import { DashboardShell } from "@/components/dashboard/shell"
import { SearchQuestions } from "@/components/dashboard/search-questions"
import { QuestionsList } from "@/components/dashboard/questions-list"
import { QuestionCategories } from "@/components/dashboard/question-categories"

export default function QuestionsPage() {
  return (
    <>
      <DashboardShell className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Past Questions</h1>
        <p className="text-muted-foreground">Browse and search through past exam questions from your university</p>
      </DashboardShell>

      <div className="grid gap-8">
        <SearchQuestions />
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-7">
          <QuestionCategories className="md:col-span-1 lg:col-span-2" />
          <QuestionsList className="md:col-span-1 lg:col-span-5" />
        </div>
      </div>
    </>
  )
}

