import { DashboardShell } from "@/components/dashboard/shell"
import { ProgressOverview } from "@/components/dashboard/progress-overview"
import { SubjectProgress } from "@/components/dashboard/subject-progress"
import { WeeklyActivity } from "@/components/dashboard/weekly-activity"
import { PerformanceInsights } from "@/components/dashboard/performance-insights"

export default function ProgressPage() {
  return (
    <>
      <DashboardShell className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Progress Tracking</h1>
        <p className="text-muted-foreground">Track your performance and identify areas for improvement</p>
      </DashboardShell>

      <div className="grid gap-8">
        <ProgressOverview />
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          <SubjectProgress className="md:col-span-1 lg:col-span-1" />
          <WeeklyActivity className="md:col-span-1 lg:col-span-1" />
          <PerformanceInsights className="md:col-span-1 lg:col-span-1" />
        </div>
      </div>
    </>
  )
}

