"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [quizReminders, setQuizReminders] = useState(true)
  const [newQuestions, setNewQuestions] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  const handleSaveNotifications = async () => {
    setIsLoading(true)

    try {
      // In a real app, you would call your API to update notification settings
      console.log({ emailNotifications, quizReminders, newQuestions, marketingEmails })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your notification settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive email notifications for important updates
                </span>
              </Label>
              <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="quiz-reminders" className="flex flex-col space-y-1">
                <span>Quiz Reminders</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Get reminders about upcoming and incomplete quizzes
                </span>
              </Label>
              <Switch id="quiz-reminders" checked={quizReminders} onCheckedChange={setQuizReminders} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="new-questions" className="flex flex-col space-y-1">
                <span>New Questions</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Be notified when new questions are added for your courses
                </span>
              </Label>
              <Switch id="new-questions" checked={newQuestions} onCheckedChange={setNewQuestions} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                <span>Marketing Emails</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive promotional emails and special offers
                </span>
              </Label>
              <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveNotifications} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </CardFooter>
    </Card>
  )
}

