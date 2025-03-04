"use client"

import { useState } from "react"
import { PlusCircle, Save, ShieldCheck, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Predefined security questions
const PREDEFINED_QUESTIONS = [
  "What was the name of your first pet?",
  "What was your childhood nickname?",
  "In what city were you born?",
  "What is your mother's maiden name?",
  "What high school did you attend?",
  "What was the make of your first car?",
  "What is your favorite movie?",
  "What is the name of your favorite childhood teacher?",
  "What street did you grow up on?",
  "What was the first concert you attended?",
]

type SecurityQuestion = {
  id: string
  question: string
  answer: string
}

export default function SecurityQuestions() {
  const [questions, setQuestions] = useState<SecurityQuestion[]>([{ id: "1", question: "", answer: "" }])
  const [verifyQuestions, setVerifyQuestions] = useState<SecurityQuestion[]>([])
  const [activeTab, setActiveTab] = useState("setup")
  const { toast } = useToast()

  // Add a new question
  const addQuestion = () => {
    if (questions.length >= 5) {
      toast({
        title: "Maximum questions reached",
        description: "You can only set up to 5 security questions.",
        variant: "destructive",
      })
      return
    }

    setQuestions([...questions, { id: Date.now().toString(), question: "", answer: "" }])
  }

  // Remove a question
  const removeQuestion = (id: string) => {
    if (questions.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You need at least one security question.",
        variant: "destructive",
      })
      return
    }

    setQuestions(questions.filter((q) => q.id !== id))
  }

  // Update question or answer
  const updateQuestion = (id: string, field: "question" | "answer", value: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  // Save questions to local storage
  const saveQuestions = () => {
    // Validate all questions and answers are filled
    const isValid = questions.every((q) => q.question.trim() && q.answer.trim())

    if (!isValid) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all questions and answers.",
        variant: "destructive",
      })
      return
    }

    localStorage.setItem("securityQuestions", JSON.stringify(questions))
    toast({
      title: "Security questions saved",
      description: "Your security questions have been saved successfully.",
    })

    // Load questions for verification
    loadQuestionsForVerification()
    setActiveTab("verify")
  }

  // Load questions for verification
  const loadQuestionsForVerification = () => {
    const savedQuestions = localStorage.getItem("securityQuestions")
    if (savedQuestions) {
      const parsedQuestions = JSON.parse(savedQuestions) as SecurityQuestion[]
      setVerifyQuestions(parsedQuestions.map((q) => ({ ...q, answer: "" })))
    }
  }

  // Verify answers
  const verifyAnswers = () => {
    const savedQuestions = localStorage.getItem("securityQuestions")
    if (!savedQuestions) {
      toast({
        title: "No questions found",
        description: "Please set up your security questions first.",
        variant: "destructive",
      })
      return
    }

    const originalQuestions = JSON.parse(savedQuestions) as SecurityQuestion[]

    // Check if all answers match
    const allCorrect = verifyQuestions.every((vq) => {
      const original = originalQuestions.find((oq) => oq.id === vq.id)
      return original && original.answer.toLowerCase() === vq.answer.toLowerCase()
    })

    if (allCorrect) {
      toast({
        title: "Verification successful",
        description: "All security answers are correct.",
      })
    } else {
      toast({
        title: "Verification failed",
        description: "One or more answers are incorrect.",
        variant: "destructive",
      })
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "verify") {
      loadQuestionsForVerification()
    }
  }

  return (
    <>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="setup">Setup Questions</TabsTrigger>
          <TabsTrigger value="verify">Verify Answers</TabsTrigger>
        </TabsList>

        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle>Set Up Security Questions</CardTitle>
              <CardDescription>
                Choose and answer security questions to help protect your account. We recommend setting up at least
                three questions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((q, index) => (
                <div key={q.id} className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-medium">Question {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQuestion(q.id)}
                      aria-label="Remove question"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`question-${q.id}`}>Select a security question</Label>
                    <Select value={q.question} onValueChange={(value) => updateQuestion(q.id, "question", value)}>
                      <SelectTrigger id={`question-${q.id}`}>
                        <SelectValue placeholder="Choose a question" />
                      </SelectTrigger>
                      <SelectContent>
                        {PREDEFINED_QUESTIONS.map((question) => (
                          <SelectItem key={question} value={question}>
                            {question}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`answer-${q.id}`}>Your answer</Label>
                    <Input
                      id={`answer-${q.id}`}
                      value={q.answer}
                      onChange={(e) => updateQuestion(q.id, "answer", e.target.value)}
                      placeholder="Enter your answer"
                    />
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full" onClick={addQuestion} disabled={questions.length >= 5}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Another Question
              </Button>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={saveQuestions}>
                <Save className="mr-2 h-4 w-4" />
                Save Security Questions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="verify">
          <Card>
            <CardHeader>
              <CardTitle>Verify Your Identity</CardTitle>
              <CardDescription>Answer your security questions to verify your identity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {verifyQuestions.length > 0 ? (
                verifyQuestions.map((q) => (
                  <div key={q.id} className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="space-y-2">
                      <Label htmlFor={`verify-${q.id}`}>{q.question}</Label>
                      <Input
                        id={`verify-${q.id}`}
                        value={q.answer}
                        onChange={(e) =>
                          setVerifyQuestions(
                            verifyQuestions.map((vq) => (vq.id === q.id ? { ...vq, answer: e.target.value } : vq)),
                          )
                        }
                        placeholder="Enter your answer"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    No security questions found. Please set up your questions first.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={verifyAnswers} disabled={verifyQuestions.length === 0}>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Verify Answers
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </>
  )
}

