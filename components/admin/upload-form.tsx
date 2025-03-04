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

// Mock data
const universities = [
  { id: "1", name: "University of Lagos" },
  { id: "2", name: "University of Ibadan" },
  { id: "3", name: "Obafemi Awolowo University" },
]

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
  const [university, setUniversity] = useState("")
  const [course, setCourse] = useState("")
  const [year, setYear] = useState("")
  const [questions, setQuestions] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log({
        title,
        university,
        course,
        year,
        questions,
      })

      toast({
        title: "Questions uploaded successfully!",
        description: "Your questions have been submitted for review.",
      })

      // Clear form
      setTitle("")
      setUniversity("")
      setCourse("")
      setYear("")
      setQuestions("")
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Past Questions</CardTitle>
        <CardDescription>Fill in the details and upload your past questions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. Computer Science 101 - 2023"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="university">University</Label>
              <Select value={university} onValueChange={setUniversity} required>
                <SelectTrigger id="university">
                  <SelectValue placeholder="Select University" />
                </SelectTrigger>
                <SelectContent>
                  {universities.map((uni) => (
                    <SelectItem key={uni.id} value={uni.id}>
                      {uni.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
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
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                placeholder="e.g. 2023"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="questions">Questions</Label>
            <Textarea
              id="questions"
              placeholder="Enter your questions here..."
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              rows={8}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Uploading..." : "Upload Questions"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

