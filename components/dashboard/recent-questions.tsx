import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BookOpen, FileText } from "lucide-react"

// Mock data for recent questions
const recentQuestions = [
  {
    id: "1",
    title: "Computer Science 101",
    year: "2023",
    university: "University of Lagos",
    accessedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Introduction to Economics",
    year: "2022",
    university: "University of Ibadan",
    accessedAt: "Yesterday",
  },
  {
    id: "3",
    title: "Organic Chemistry",
    year: "2023",
    university: "Obafemi Awolowo University",
    accessedAt: "3 days ago",
  },
  {
    id: "4",
    title: "Calculus I",
    year: "2022",
    university: "University of Lagos",
    accessedAt: "1 week ago",
  },
]

interface RecentQuestionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentQuestions({ className, ...props }: RecentQuestionsProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Recently Accessed</CardTitle>
        <CardDescription>Continue where you left off with your recent past questions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentQuestions.map((question) => (
            <div key={question.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">{question.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {question.university} • {question.year}
                  </p>
                  <p className="text-xs text-muted-foreground">Accessed {question.accessedAt}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/questions/${question.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/dashboard/quizzes/generate?question=${question.id}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Quiz
                  </Link>
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/questions">View All Past Questions</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

