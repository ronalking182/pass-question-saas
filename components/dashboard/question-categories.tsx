import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

// Mock data for categories
const categories = [
  { id: "all", name: "All Courses", count: 120 },
  { id: "csc", name: "Computer Science", count: 25 },
  { id: "eco", name: "Economics", count: 18 },
  { id: "chm", name: "Chemistry", count: 22 },
  { id: "mth", name: "Mathematics", count: 15 },
  { id: "psy", name: "Psychology", count: 20 },
  { id: "phy", name: "Physics", count: 12 },
  { id: "eng", name: "Engineering", count: 8 },
]

// Mock data for years
const years = [
  { id: "all", name: "All Years" },
  { id: "2023", name: "2023" },
  { id: "2022", name: "2022" },
  { id: "2021", name: "2021" },
  { id: "2020", name: "2020" },
  { id: "2019", name: "2019" },
]

interface QuestionCategoriesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function QuestionCategories({ className, ...props }: QuestionCategoriesProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Filter questions by category and year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Subject Areas</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={category.id === "all" ? "default" : "ghost"}
                  className="w-full justify-between"
                >
                  <span>{category.name}</span>
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs">
                    {category.id === "all" ? <Check className="h-3 w-3" /> : category.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Year</h3>
            <div className="space-y-1">
              {years.map((year) => (
                <Button
                  key={year.id}
                  variant={year.id === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {year.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

