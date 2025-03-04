"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { BookOpen, Brain, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface QuizGeneratorProps {
  questionId: string
}

export function QuizGenerator({ questionId }: QuizGeneratorProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [questionCount, setQuestionCount] = useState(10)
  const [timeLimit, setTimeLimit] = useState(15)
  const [includeAnswers, setIncludeAnswers] = useState(true)
  const [includeExplanations, setIncludeExplanations] = useState(true)

  const handleGenerateQuiz = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would call an API to generate a quiz
      console.log({
        questionId,
        questionCount,
        timeLimit,
        includeAnswers,
        includeExplanations,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Quiz generated successfully",
        description: `Created a quiz with ${questionCount} questions.`,
      })

      // Redirect to the quiz page
      router.push(`/dashboard/quizzes/123`)
    } catch (error) {
      toast({
        title: "Failed to generate quiz",
        description: "There was an error generating your quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Quiz</CardTitle>
        <CardDescription>Create a personalized quiz based on this past question</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="question-count">Number of Questions</Label>
            <span className="text-sm font-medium">{questionCount}</span>
          </div>
          <Slider
            id="question-count"
            min={5}
            max={30}
            step={5}
            value={[questionCount]}
            onValueChange={(value) => setQuestionCount(value[0])}
          />
          <p className="text-xs text-muted-foreground">Select how many questions you want in your quiz</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="time-limit">Time Limit (minutes)</Label>
            <span className="text-sm font-medium">{timeLimit}</span>
          </div>
          <Slider
            id="time-limit"
            min={5}
            max={60}
            step={5}
            value={[timeLimit]}
            onValueChange={(value) => setTimeLimit(value[0])}
          />
          <p className="text-xs text-muted-foreground">Set a time limit for your quiz</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="include-answers" className="flex flex-col space-y-1">
              <span>Include Answers</span>
              <span className="font-normal text-xs text-muted-foreground">Show correct answers after submission</span>
            </Label>
            <Switch id="include-answers" checked={includeAnswers} onCheckedChange={setIncludeAnswers} />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="include-explanations" className="flex flex-col space-y-1">
              <span>Include Explanations</span>
              <span className="font-normal text-xs text-muted-foreground">Show explanations for answers</span>
            </Label>
            <Switch id="include-explanations" checked={includeExplanations} onCheckedChange={setIncludeExplanations} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="col-span-1">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">{questionCount} Questions</p>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">{timeLimit} Minutes</p>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Brain className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">AI Generated</p>
              </CardContent>
            </Card>
          </div>
          <Button className="w-full" onClick={handleGenerateQuiz} disabled={isLoading}>
            {isLoading ? "Generating Quiz..." : "Generate Quiz"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

