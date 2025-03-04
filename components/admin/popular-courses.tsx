import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for popular courses
const courseData = [
  { name: "CSC101", students: 245 },
  { name: "ECO101", students: 187 },
  { name: "CHM201", students: 156 },
  { name: "MTH101", students: 132 },
  { name: "PHY102", students: 98 },
]

interface PopularCoursesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopularCourses({ className, ...props }: PopularCoursesProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Popular Courses</CardTitle>
        <CardDescription>Most accessed courses by students</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={courseData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={60} />
              <Tooltip
                formatter={(value) => [`${value} students`, "Accessed by"]}
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey="students" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

