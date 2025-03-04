import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data for subject progress
const subjects = [
  { name: "Computer Science", progress: 85, color: "bg-blue-500" },
  { name: "Economics", progress: 92, color: "bg-green-500" },
  { name: "Chemistry", progress: 78, color: "bg-yellow-500" },
  { name: "Mathematics", progress: 65, color: "bg-red-500" },
  { name: "Physics", progress: 70, color: "bg-purple-500" },
]

interface SubjectProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SubjectProgress({ className, ...props }: SubjectProgressProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
        <CardDescription>Your performance by subject area</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {subjects.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{subject.name}</h4>
                <span className="text-sm font-medium">{subject.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className={`h-full rounded-full ${subject.color}`} style={{ width: `${subject.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

