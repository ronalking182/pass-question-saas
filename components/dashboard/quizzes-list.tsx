import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Play, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for quizzes
const completedQuizzes = [
  {
    id: "1",
    title: "Computer Science 101",
    course: "CSC101",
    date: "2023-10-15",
    score: 85,
    totalQuestions: 20,
    timeSpent: "18:45",
  },
  {
    id: "2",
    title: "Introduction to Economics",
    course: "ECO101",
    date: "2023-10-10",
    score: 92,
    totalQuestions: 15,
    timeSpent: "12:30",
  },
  {
    id: "3",
    title: "Organic Chemistry",
    course: "CHM201",
    date: "2023-10-05",
    score: 78,
    totalQuestions: 25,
    timeSpent: "22:15",
  },
]

const inProgressQuizzes = [
  {
    id: "4",
    title: "Calculus I",
    course: "MTH101",
    date: "2023-10-18",
    progress: 60,
    totalQuestions: 30,
    questionsAnswered: 18,
    timeSpent: "15:20",
  },
  {
    id: "5",
    title: "Introduction to Psychology",
    course: "PSY101",
    date: "2023-10-16",
    progress: 40,
    totalQuestions: 25,
    questionsAnswered: 10,
    timeSpent: "08:45",
  },
]

export function QuizzesList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz History</CardTitle>
        <CardDescription>View your completed and in-progress quizzes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="in-progress">
          <TabsList className="mb-4">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="in-progress" className="space-y-4">
            {inProgressQuizzes.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No quizzes in progress</h3>
                  <p className="text-sm text-muted-foreground">Start a new quiz to see it here.</p>
                </div>
              </div>
            ) : (
              inProgressQuizzes.map((quiz) => (
                <div key={quiz.id} className="rounded-md border p-4">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                    <div>
                      <h3 className="font-medium">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {quiz.course} • Started on {new Date(quiz.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="secondary" className="mt-1 w-fit sm:mt-0">
                      In Progress
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {quiz.questionsAnswered} of {quiz.totalQuestions} questions
                      </span>
                    </div>
                    <Progress value={quiz.progress} className="h-2" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.timeSpent}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{quiz.totalQuestions} questions</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full sm:w-auto" asChild>
                      <Link href={`/dashboard/quizzes/${quiz.id}`}>
                        <Play className="mr-2 h-4 w-4" />
                        Continue Quiz
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            {completedQuizzes.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No completed quizzes</h3>
                  <p className="text-sm text-muted-foreground">Complete a quiz to see it here.</p>
                </div>
              </div>
            ) : (
              completedQuizzes.map((quiz) => (
                <div key={quiz.id} className="rounded-md border p-4">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                    <div>
                      <h3 className="font-medium">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {quiz.course} • Completed on {new Date(quiz.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center mt-1 sm:mt-0 sm:ml-auto">
                      <div className="text-right">
                        <p className="font-medium">{quiz.score}%</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.timeSpent}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{quiz.totalQuestions} questions</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" className="flex-1 sm:flex-none" asChild>
                      <Link href={`/dashboard/quizzes/${quiz.id}/review`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Review
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none" asChild>
                      <Link href={`/dashboard/quizzes/generate?source=${quiz.id}`}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Retake
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

