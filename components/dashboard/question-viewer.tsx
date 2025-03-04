"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookmarkPlus, Download, Share2 } from "lucide-react"

// Mock question data
const mockQuestions = {
  "1": {
    title: "Computer Science 101 - 2023",
    university: "University of Lagos",
    course: "CSC101",
    year: "2023",
    content: [
      {
        type: "section",
        title: "Section A: Multiple Choice Questions (40 marks)",
        questions: [
          {
            id: "q1",
            text: "Which of the following is NOT a primitive data type in JavaScript?",
            options: ["String", "Number", "Boolean", "Array"],
            answer: "Array",
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
            answer: "Hyper Text Markup Language",
          },
          {
            id: "q3",
            text: "Which of the following is a valid way to declare a variable in JavaScript?",
            options: ["var x = 5;", "let x = 5;", "const x = 5;", "All of the above"],
            answer: "All of the above",
          },
        ],
      },
      {
        type: "section",
        title: "Section B: Theory Questions (60 marks)",
        questions: [
          {
            id: "q4",
            text: "Explain the concept of Object-Oriented Programming and discuss its four main principles with examples.",
            answer:
              "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of 'objects', which can contain data and code. The four main principles are:\n\n1. Encapsulation: Bundling data and methods that operate on that data within a single unit (class).\n\n2. Inheritance: The ability of a class to inherit properties and methods from another class.\n\n3. Polymorphism: The ability to present the same interface for different underlying forms or data types.\n\n4. Abstraction: Hiding complex implementation details and showing only the necessary features of an object.",
          },
          {
            id: "q5",
            text: "Compare and contrast between SQL and NoSQL databases. When would you choose one over the other?",
            answer:
              "SQL databases are relational, table-based databases that use structured query language for defining and manipulating data. NoSQL databases are non-relational and document-oriented, allowing for more flexible data models.\n\nSQL databases are better for complex queries, high transaction applications, and when data integrity is crucial. NoSQL databases are better for large datasets with simple query needs, rapid development, and when horizontal scaling is needed.",
          },
        ],
      },
    ],
  },
  // Add more questions for other IDs as needed
}

interface QuestionViewerProps {
  questionId: string
}

export function QuestionViewer({ questionId }: QuestionViewerProps) {
  const [activeTab, setActiveTab] = useState("view")

  // Get question data based on ID
  const questionData = mockQuestions[questionId as keyof typeof mockQuestions] || {
    title: "Question Not Found",
    university: "",
    course: "",
    year: "",
    content: [],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{questionData.title}</CardTitle>
        <CardDescription>
          {questionData.university} • {questionData.course} • {questionData.year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="view" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="view">View Questions</TabsTrigger>
            <TabsTrigger value="answers">View Answers</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="space-y-6">
            {questionData.content.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <div className="space-y-6">
                  {section.questions.map((question, questionIndex) => (
                    <div key={question.id} className="space-y-2 rounded-md border p-4">
                      <p className="font-medium">
                        {sectionIndex + 1}.{questionIndex + 1}. {question.text}
                      </p>
                      {question.options && (
                        <div className="ml-4 space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-2">
                              <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                              <span>{option}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="answers" className="space-y-6">
            {questionData.content.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <div className="space-y-6">
                  {section.questions.map((question, questionIndex) => (
                    <div key={question.id} className="space-y-2 rounded-md border p-4">
                      <p className="font-medium">
                        {sectionIndex + 1}.{questionIndex + 1}. {question.text}
                      </p>
                      <div className="mt-2 rounded-md bg-muted p-3">
                        <p className="font-semibold">Answer:</p>
                        <p className="whitespace-pre-line">{question.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <BookmarkPlus className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

