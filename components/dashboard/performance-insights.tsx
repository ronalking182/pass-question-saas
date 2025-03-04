import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUpRight, BrainCircuit, Clock, Target } from "lucide-react"

interface PerformanceInsightsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PerformanceInsights({ className, ...props }: PerformanceInsightsProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
        <CardDescription>Key metrics and improvement areas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Strengths</h4>
              <p className="text-sm text-muted-foreground">You excel in Economics (92%) and Computer Science (85%).</p>
            </div>
          </div>
        </div>
        <div className="rounded-md border p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Areas for Improvement</h4>
              <p className="text-sm text-muted-foreground">
                Focus on Mathematics (65%) and Chemistry (78%) to improve your overall score.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-md border p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Time Management</h4>
              <p className="text-sm text-muted-foreground">
                You spend an average of 45 seconds per question. Try to reduce this to improve your efficiency.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-md border p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BrainCircuit className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Recommended Focus</h4>
              <p className="text-sm text-muted-foreground">
                Based on your performance, we recommend focusing on Calculus and Organic Chemistry topics.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

