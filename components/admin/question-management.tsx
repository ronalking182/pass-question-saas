"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Eye, MoreHorizontal, Search, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data
const mockQuestions = [
  {
    id: "1",
    title: "Computer Science 101 - 2023",
    course: "CSC101",
    year: "2023",
    questions: 25,
    status: "published",
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Introduction to Economics - 2023",
    course: "ECO101",
    year: "2023",
    questions: 30,
    status: "published",
    createdAt: "2023-10-12",
  },
  {
    id: "3",
    title: "Organic Chemistry - 2023",
    course: "CHM201",
    year: "2023",
    questions: 20,
    status: "draft",
    createdAt: "2023-10-10",
  },
  {
    id: "4",
    title: "Calculus I - 2023",
    course: "MTH101",
    year: "2023",
    questions: 15,
    status: "published",
    createdAt: "2023-10-05",
  },
  {
    id: "5",
    title: "Physics II - 2023",
    course: "PHY102",
    year: "2023",
    questions: 22,
    status: "draft",
    createdAt: "2023-10-01",
  },
]

export function QuestionManagement() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // Get unique courses, years, and statuses for filters
  const courses = Array.from(new Set(mockQuestions.map((q) => q.course)))
  const years = Array.from(new Set(mockQuestions.map((q) => q.year)))
  const statuses = Array.from(new Set(mockQuestions.map((q) => q.status)))

  // Filter questions based on search and filters
  const filteredQuestions = mockQuestions.filter((question) => {
    const matchesSearch =
      searchQuery === "" ||
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.course.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCourse = courseFilter === "" || question.course === courseFilter
    const matchesYear = yearFilter === "" || question.year === yearFilter
    const matchesStatus = statusFilter === "" || question.status === statusFilter

    return matchesSearch && matchesCourse && matchesYear && matchesStatus
  })

  const handleDelete = (id: string) => {
    toast({
      title: "Question deleted",
      description: "The question has been deleted successfully.",
    })

    // In a real app, you would call your API to delete the question
    console.log(`Delete question with ID: ${id}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Questions</CardTitle>
        <CardDescription>Manage all past questions for your university</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex w-full md:w-1/3 relative">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 sm:flex-row">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No questions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium">{question.title}</TableCell>
                      <TableCell>{question.course}</TableCell>
                      <TableCell>{question.year}</TableCell>
                      <TableCell>{question.questions}</TableCell>
                      <TableCell>
                        <Badge variant={question.status === "published" ? "default" : "secondary"}>
                          {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{question.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(question.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

