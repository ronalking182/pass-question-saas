import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for uploads
const uploads = [
  {
    id: "1",
    title: "Computer Science 101 - 2023",
    course: "CSC101",
    year: "2023",
    uploadDate: "2023-10-15",
    status: "approved",
    questions: 25,
  },
  {
    id: "2",
    title: "Introduction to Economics - 2023",
    course: "ECO101",
    year: "2023",
    uploadDate: "2023-10-12",
    status: "pending",
    questions: 30,
  },
  {
    id: "3",
    title: "Organic Chemistry - 2023",
    course: "CHM201",
    year: "2023",
    uploadDate: "2023-10-10",
    status: "approved",
    questions: 20,
  },
  {
    id: "4",
    title: "Calculus I - 2023",
    course: "MTH101",
    year: "2023",
    uploadDate: "2023-10-05",
    status: "rejected",
    questions: 15,
    rejectionReason: "Duplicate content",
  },
]

export function UploadsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Uploads</CardTitle>
        <CardDescription>Manage your uploaded past questions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Course</TableHead>
                  <TableHead className="hidden md:table-cell">Year</TableHead>
                  <TableHead className="hidden sm:table-cell">Questions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Upload Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      <div className="py-6">
                        <p className="text-muted-foreground">You haven't uploaded any questions yet.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  uploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell className="font-medium">
                        {upload.title}
                        <div className="md:hidden text-xs text-muted-foreground mt-1">
                          {upload.course} • {upload.year} • {upload.questions} questions
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{upload.course}</TableCell>
                      <TableCell className="hidden md:table-cell">{upload.year}</TableCell>
                      <TableCell className="hidden sm:table-cell">{upload.questions}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            upload.status === "approved"
                              ? "default"
                              : upload.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {upload.status.charAt(0).toUpperCase() + upload.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {new Date(upload.uploadDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled={upload.status === "approved"}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

