import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProgressOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Overview</CardTitle>
        <CardDescription>Your overall performance across all subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overall">
          <TabsList className="mb-4">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
          <TabsContent value="overall" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Computer Science</h4>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Economics</h4>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Chemistry</h4>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Mathematics</h4>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
            <div className="rounded-md bg-muted p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h4 className="font-medium">Overall Performance</h4>
                <span className="text-lg font-bold mt-1 sm:mt-0">82%</span>
              </div>
              <Progress value={82} className="mt-2 h-3" />
              <p className="mt-2 text-sm text-muted-foreground">
                You're performing well above average. Keep up the good work!
              </p>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium">Monthly Progress</h4>
              <p className="text-sm text-muted-foreground">
                Your performance has improved by 8% compared to last month.
              </p>
            </div>
            {/* Monthly data would go here */}
          </TabsContent>
          <TabsContent value="weekly" className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="font-medium">Weekly Progress</h4>
              <p className="text-sm text-muted-foreground">
                You've completed 12 quizzes this week, 5 more than last week.
              </p>
            </div>
            {/* Weekly data would go here */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

