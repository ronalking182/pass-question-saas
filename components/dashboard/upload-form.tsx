"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, FileText, X } from "lucide-react"

// Mock data
const courses = [
  { id: "1", name: "Computer Science 101" },
  { id: "2", name: "Introduction to Economics" },
  { id: "3", name: "Organic Chemistry" },
  { id: "4", name: "Calculus I" },
  { id: "5", name: "Introduction to Psychology" },
]

export function UploadForm() {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [course, setCourse] = useState("")
  const [year, setYear] = useState("")
  const [examType, setExamType] = useState("final")
  const [questions, setQuestions] = useState("")
  const [uploadMethod, setUploadMethod] = useState("text")
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log({
        title,
        course,
        year,
        examType,
        questions: uploadMethod === "text" ? questions : extractedText,
        uploadMethod,
      })

      toast({
        title: "Questions uploaded successfully!",
        description: "Your questions have been submitted for review.",
      })

      // Clear form
      setTitle("")
      setCourse("")
      setYear("")
      setExamType("final")
      setQuestions("")
      setUploadedImage(null)
      setExtractedText("")
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your questions.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string)
      processImage(file)
    }
    reader.readAsDataURL(file)
  }

  const processImage = async (file: File) => {
    setIsProcessing(true)

    try {
      // Simulate AI processing the image
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock extracted text
      const mockExtractedText = `1. What is the primary function of an operating system?
a) Run applications
b) Manage hardware resources
c) Provide user interface
d) All of the above

2. Which data structure follows the Last-In-First-Out (LIFO) principle?
a) Queue
b) Stack
c) Linked List
d) Tree

3. Explain the concept of polymorphism in object-oriented programming.`

      setExtractedText(mockExtractedText)

      toast({
        title: "Image processed successfully",
        description: "The text has been extracted from your image.",
      })
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "There was an error processing your image.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    setExtractedText("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Past Questions</CardTitle>
        <CardDescription>Share past questions with other students</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. Computer Science 101 - 2023"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={course} onValueChange={setCourse} required>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                placeholder="e.g. 2023"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Exam Type</Label>
              <RadioGroup
                value={examType}
                onValueChange={setExamType}
                className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mid" id="mid-semester" />
                  <Label htmlFor="mid-semester">Mid-Semester Exam</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="final" id="final-exam" />
                  <Label htmlFor="final-exam">Final Exam</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Upload Method</Label>
            <Tabs value={uploadMethod} onValueChange={setUploadMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">
                  <FileText className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Type Questions</span>
                  <span className="sm:hidden">Type</span>
                </TabsTrigger>
                <TabsTrigger value="image">
                  <Camera className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Upload Image</span>
                  <span className="sm:hidden">Image</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="questions">Questions</Label>
                  <Textarea
                    id="questions"
                    placeholder="Enter your questions here..."
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    rows={8}
                    required={uploadMethod === "text"}
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: Question number followed by the question text, options (if multiple choice), and the answer.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="image" className="space-y-4 pt-4">
                {!uploadedImage ? (
                  <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-dashed p-8">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">Upload an image of your past questions</h3>
                      <p className="text-sm text-muted-foreground">Our AI will extract the text from your image</p>
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                      Select Image
                    </Label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-md border">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded question"
                        className="max-h-[300px] w-full rounded-md object-contain"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="extracted-text">Extracted Text</Label>
                        {isProcessing && <span className="text-sm text-muted-foreground">Processing image...</span>}
                      </div>
                      <Textarea
                        id="extracted-text"
                        value={extractedText}
                        onChange={(e) => setExtractedText(e.target.value)}
                        placeholder={isProcessing ? "Extracting text from image..." : "No text extracted yet"}
                        rows={8}
                        disabled={isProcessing}
                        required={uploadMethod === "image"}
                      />
                      <p className="text-xs text-muted-foreground">You can edit the extracted text if needed.</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button type="submit" disabled={isLoading || isProcessing} className="w-full sm:w-auto">
              {isLoading ? "Uploading..." : "Upload Questions"}
            </Button>
            <Button type="button" variant="outline" disabled={isLoading || isProcessing} className="w-full sm:w-auto">
              Save as Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

