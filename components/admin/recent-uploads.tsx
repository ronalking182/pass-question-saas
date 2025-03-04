import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Edit, FileText, Trash } from "lucide-react"

// Mock data for recent uploads
const recentUploads = [
  {
    id: "1",
    title: "Computer Science 101",
    year: "2023",
    course: "CSC101",
    uploadedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Introduction to Economics",
    year: "2023",
    course: "ECO101",
    uploadedAt: "Yesterday",
  },
  {
    id: "3",
    title: "Organic Chemistry",
    year: "2023",
    course: "CHM201",
    uploadedAt: "3 days ago",
  },
  {
    id: "4",
    title: "Calculus I",
    year: "2023",
    course: "MTH101",
    uploadedAt: "1 week ago",
  },
]

interface RecentUploadsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentUploads({ className, ...props }: RecentUploadsProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Recent Uploads</CardTitle>
        <CardDescription>Recently uploaded past questions for your university</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUploads.map((upload) => (
            <div key={upload.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">{upload.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {upload.course} • {upload.year}
                  </p>
                  <p className="text-xs text-muted-foreground">Uploaded {upload.uploadedAt}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/admin/questions/${upload.id}`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="text-destructive">
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" asChild>
            <Link href="/admin/questions">View All Questions</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

