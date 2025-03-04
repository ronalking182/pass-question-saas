import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface WeeklyActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function WeeklyActivity({ className, ...props }: WeeklyActivityProps) {
  // Mock data for weekly activity
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const activityData = [3, 7, 5, 2, 10, 8, 4] // Number of questions answered each day

  // Find the max value to calculate relative heights
  const maxActivity = Math.max(...activityData)

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>Questions answered per day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[200px] items-end justify-between px-2">
          {days.map((day, index) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <div
                className="w-5 sm:w-8 rounded-t-md bg-primary"
                style={{
                  height: `${(activityData[index] / maxActivity) * 150}px`,
                }}
              />
              <span className="text-xs font-medium">{day}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-md bg-muted p-3">
          <p className="text-sm font-medium">Total: 39 questions</p>
          <p className="text-xs text-muted-foreground">
            Your most active day was Friday with 10 questions.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

