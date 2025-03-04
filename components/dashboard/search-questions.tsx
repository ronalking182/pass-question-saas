"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

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

const years = ["2023", "2022", "2021", "2020", "2019"]

export function SearchQuestions() {
  const [university, setUniversity] = useState("")
  const [course, setCourse] = useState("")
  const [year, setYear] = useState("")
  const [keyword, setKeyword] = useState("")

  const handleSearch = () => {
    console.log({ university, course, year, keyword })
    // In a real app, this would trigger a search API call
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Past Questions</CardTitle>
        <CardDescription>Search for past questions by university, course, year, or keyword</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <Select value={university} onValueChange={setUniversity}>
              <SelectTrigger>
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
          <div className="space-y-2">
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger>
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
          <div className="space-y-2">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Search by keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button onClick={handleSearch} className="whitespace-nowrap">
                <Search className="h-4 w-4 mr-2 sm:mr-0 md:mr-2" />
                <span className="hidden sm:inline md:hidden lg:inline">Search</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

