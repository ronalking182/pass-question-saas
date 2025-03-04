"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

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
  const [isMounted, setIsMounted] = useState(false)
  const [Chart, setChart] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)
    // Dynamically import Recharts components only on the client side
    import("recharts").then((recharts) => {
      const { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } = recharts
      setChart({ BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer })
    })
  }, [])

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Popular Courses</CardTitle>
        <CardDescription>Most accessed courses by students</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {isMounted && Chart ? (
            <Chart.ResponsiveContainer width="100%" height="100%">
              <Chart.BarChart data={courseData} layout="vertical">
                <Chart.CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <Chart.XAxis type="number" />
                <Chart.YAxis dataKey="name" type="category" width={60} />
                <Chart.Tooltip
                  formatter={(value: any) => [`${value} students`, "Accessed by"]}
                  labelFormatter={(label: any) => `${label}`}
                />
                <Chart.Bar dataKey="students" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </Chart.BarChart>
            </Chart.ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Loading chart...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

