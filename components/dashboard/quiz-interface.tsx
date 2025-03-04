"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, Clock, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock quiz data
const mockQuizzes = {
  "123": {
    title: "Computer Science 101 - 2023",
    course: "CSC101",
    timeLimit: 15, // minutes
    questions: [
      {
        id: "q1",
        text: "Which of the following is NOT a primitive data type in JavaScript?",
        options: ["String", "Number", "Boolean", "Array"],
        correctAnswer: "Array",
        explanation:
          "Array is a reference type in JavaScript, not a primitive type. The primitive types are String, Number, Boolean, Undefined, Null, Symbol, and BigInt.",
      },
      {
        id: "q2",
        text: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language",
        ],
        correctAnswer: "Hyper Text Markup Language",
        explanation:
          "HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages.",
      },
      {
        id: "q3",
        text: "Which of the following is a valid way to declare a variable in JavaScript?",
        options: ["var x = 5;", "let x = 5;", "const x = 5;", "All of the above"],
        correctAnswer: "All of the above",
        explanation:
          "In JavaScript, you can declare variables using var, let, or const. Each has different scoping and reassignment rules.",
      },
      {
        id: "q4",
        text: "What is the correct way to create a function in JavaScript?",
        options: [
          "function = myFunction() {}",
          "function myFunction() {}",
          "function:myFunction() {}",
          "create myFunction() {}",
        ],
        correctAnswer: "function myFunction() {}",
        explanation:
          "The correct syntax to create a function in JavaScript is 'function myFunction() {}'. This is called a function declaration.",
      },
      {
        id: "q5",
        text: "Which CSS property is used to change the text color of an element?",
        options: ["color", "text-color", "font-color", "foreground-color"],
        correctAnswer: "color",
        explanation: "The 'color' property is used to set the color of text in CSS.",
      },
      {
        id: "q6",
        text: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correctAnswer: "Cascading Style Sheets",
        explanation:
          "CSS stands for Cascading Style Sheets. It is a style sheet language used for describing the presentation of a document written in HTML.",
      },
      {
        id: "q7",
        text: "Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<style>", "<stylesheet>"],
        correctAnswer: "<style>",
        explanation: "The <style> tag is used to define internal CSS styles for an HTML document.",
      },
      {
        id: "q8",
        text: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        correctAnswer: "<br>",
        explanation: "The <br> tag inserts a single line break in HTML.",
      },
      {
        id: "q9",
        text: "Which property is used to change the background color in CSS?",
        options: ["bgcolor", "background-color", "color-background", "background"],
        correctAnswer: "background-color",
        explanation:
          "The 'background-color' property is used to set the background color of an element in CSS. The 'background' property can also be used as a shorthand.",
      },
      {
        id: "q10",
        text: "What is the correct HTML for creating a hyperlink?",
        options: [
          "<a url='http://example.com'>Example</a>",
          "<a href='http://example.com'>Example</a>",
          "<hyperlink href='http://example.com'>Example</hyperlink>",
          "<link href='http://example.com'>Example</link>",
        ],
        correctAnswer: "<a href='http://example.com'>Example</a>",
        explanation: "The correct HTML for creating a hyperlink is using the <a> tag with the href attribute.",
      },
    ],
  },
}

interface QuizInterfaceProps {
  quizId: string
}

export function QuizInterface({ quizId }: QuizInterfaceProps) {
  const router = useRouter()
  const { toast } = useToast()

  // Get quiz data based on ID
  const quizData = mockQuizzes[quizId as keyof typeof mockQuizzes] || {
    title: "Quiz Not Found",
    course: "",
    timeLimit: 0,
    questions: [],
  }

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(quizData.questions.length).fill(""))
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit * 60) // in seconds
  const [quizStarted, setQuizStarted] = useState(false)

  // Format time remaining as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Start timer when quiz starts
  useEffect(() => {
    if (!quizStarted || quizSubmitted) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizStarted, quizSubmitted])

  // Calculate progress percentage
  const progressPercentage = ((currentQuestion + 1) / quizData.questions.length) * 100

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Submit quiz
  const handleSubmitQuiz = () => {
    // Calculate score
    const score = answers.reduce((total, answer, index) => {
      if (answer === quizData.questions[index].correctAnswer) {
        return total + 1
      }
      return total
    }, 0)

    const percentage = Math.round((score / quizData.questions.length) * 100)

    toast({
      title: "Quiz Submitted",
      description: `You scored ${score}/${quizData.questions.length} (${percentage}%)`,
    })

    setQuizSubmitted(true)
  }

  // Start the quiz
  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  // Return to dashboard
  const handleFinishQuiz = () => {
    router.push("/dashboard")
  }

  if (!quizStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{quizData.title}</CardTitle>
          <CardDescription>
            This quiz contains {quizData.questions.length} questions and has a time limit of {quizData.timeLimit}{" "}
            minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <h3 className="font-medium">Instructions:</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Read each question carefully before answering.</li>
              <li>You can navigate between questions using the previous and next buttons.</li>
              <li>The timer will start once you begin the quiz.</li>
              <li>Your answers are automatically saved as you progress.</li>
              <li>You can review your answers before submitting.</li>
              <li>Once the time is up, the quiz will be automatically submitted.</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (quizSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
          <CardDescription>
            {quizData.title} - {quizData.course}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md bg-muted p-4 text-center">
            <h3 className="text-xl font-medium">
              Your Score: {answers.filter((answer, index) => answer === quizData.questions[index].correctAnswer).length}
              /{quizData.questions.length}
            </h3>
            <p className="text-muted-foreground">
              {Math.round(
                (answers.filter((answer, index) => answer === quizData.questions[index].correctAnswer).length /
                  quizData.questions.length) *
                  100,
              )}
              % Correct
            </p>
          </div>

          <div className="space-y-6">
            {quizData.questions.map((question, index) => (
              <div key={question.id} className="space-y-2 rounded-md border p-4">
                <div className="flex items-start justify-between">
                  <p className="font-medium">
                    {index + 1}. {question.text}
                  </p>
                  {answers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                </div>

                <div className="ml-4 space-y-1">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`flex items-center gap-2 p-2 rounded-md ${
                        option === question.correctAnswer
                          ? "bg-green-100 dark:bg-green-900/20"
                          : answers[index] === option
                            ? "bg-red-100 dark:bg-red-900/20"
                            : ""
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>

                {question.explanation && (
                  <div className="mt-2 text-sm bg-muted p-3 rounded-md">
                    <p className="font-semibold">Explanation:</p>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleFinishQuiz}>
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle>{quizData.title}</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {quizData.questions.length}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono">{formatTime(timeRemaining)}</span>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{quizData.questions[currentQuestion].text}</h3>

          <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswerSelect} className="space-y-3">
            {quizData.questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2 w-full sm:w-auto">
          {currentQuestion === quizData.questions.length - 1 ? (
            <Button onClick={handleSubmitQuiz} className="w-full sm:w-auto">
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="w-full sm:w-auto">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

