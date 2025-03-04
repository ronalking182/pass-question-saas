"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Mock data for quiz progress
const quizData = [
  { name: "Mon", score: 65 },
  { name: "Tue", score: 75 },
  { name: "Wed", score: 85 },
  { name: "Thu", score: 70 },
  { name: "Fri", score: 90 },
  { name: "Sat", score: 80 },
  { name: "Sun", score: 95 },
]

interface QuizProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

export function QuizProgress({ className, ...props }: QuizProgressProps) {
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
        <CardTitle>Quiz Performance</CardTitle>
        <CardDescription>Your quiz scores over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {isMounted && Chart ? (
            <Chart.ResponsiveContainer width="100%" height="100%">
              <Chart.BarChart data={quizData}>
                <Chart.CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Chart.XAxis dataKey="name" />
                <Chart.YAxis domain={[0, 100]} />
                <Chart.Tooltip
                  formatter={(value: any) => [`${value}%`, "Score"]}
                  labelFormatter={(label: any) => `${label}`}
                />
                <Chart.Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
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

