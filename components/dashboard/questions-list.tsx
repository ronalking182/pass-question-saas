import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, Star } from "lucide-react"

// Mock data for past questions
const pastQuestions = [
  {
    id: "1",
    title: "Computer Science 101",
    year: "2023",
    university: "University of Lagos",
    course: "CSC101",
    questionCount: 40,
    difficulty: "Medium",
    tags: ["Programming", "Algorithms", "Data Structures"],
  },
  {
    id: "2",
    title: "Introduction to Economics",
    year: "2022",
    university: "University of Ibadan",
    course: "ECO101",
    questionCount: 35,
    difficulty: "Easy",
    tags: ["Microeconomics", "Macroeconomics"],
  },
  {
    id: "3",
    title: "Organic Chemistry",
    year: "2023",
    university: "Obafemi Awolowo University",
    course: "CHM201",
    questionCount: 45,
    difficulty: "Hard",
    tags: ["Organic Compounds", "Reactions", "Lab Techniques"],
  },
  {
    id: "4",
    title: "Calculus I",
    year: "2022",
    university: "University of Lagos",
    course: "MTH101",
    questionCount: 30,
    difficulty: "Medium",
    tags: ["Derivatives", "Integrals", "Limits"],
  },
  {
    id: "5",
    title: "Introduction to Psychology",
    year: "2023",
    university: "University of Nigeria",
    course: "PSY101",
    questionCount: 50,
    difficulty: "Easy",
    tags: ["Cognitive Psychology", "Behavioral Psychology"],
  },
  {
    id: "6",
    title: "Physics II: Electricity and Magnetism",
    year: "2022",
    university: "Ahmadu Bello University",
    course: "PHY102",
    questionCount: 38,
    difficulty: "Hard",
    tags: ["Electromagnetism", "Circuits", "Fields"],
  },
]

interface QuestionsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function QuestionsList({ className, ...props }: QuestionsListProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Available Questions</CardTitle>
        <CardDescription>Browse through past questions from various courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pastQuestions.map((question) => (
            <div key={question.id} className="flex flex-col space-y-2 rounded-md border p-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                <div>
                  <h3 className="font-medium">{question.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {question.university} • {question.course} • {question.year}
                  </p>
                </div>
                <Badge
                  variant={
                    question.difficulty === "Easy"
                      ? "secondary"
                      : question.difficulty === "Medium"
                        ? "default"
                        : "destructive"
                  }
                  className="mt-1 w-fit sm:mt-0"
                >
                  {question.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{question.questionCount} questions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
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
                <Button variant="ghost" size="sm" className="ml-auto">
                  <Star className="h-4 w-4" />
                  <span className="sr-only">Save</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

