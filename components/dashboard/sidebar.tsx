"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, BookOpen, FileQuestion, Home, Settings, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <nav className="hidden w-[220px] flex-col md:flex lg:w-[240px]">
      <div className="flex flex-col gap-2 py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight">Navigation</h2>
        <div className="flex flex-col gap-1 px-2">
          <Link href="/dashboard" passHref>
            <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dashboard" && "bg-muted")}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/questions" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/questions" && "bg-muted")}
            >
              <FileQuestion className="mr-2 h-4 w-4" />
              Past Questions
            </Button>
          </Link>
          <Link href="/dashboard/quizzes" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/quizzes" && "bg-muted")}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              My Quizzes
            </Button>
          </Link>
          <Link href="/dashboard/uploads" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/uploads" && "bg-muted")}
            >
              <Upload className="mr-2 h-4 w-4" />
              My Uploads
            </Button>
          </Link>
          <Link href="/dashboard/progress" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/progress" && "bg-muted")}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Progress
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-2 py-2">
        <div className="flex flex-col gap-1 px-2">
          <Link href="/dashboard/settings" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/settings" && "bg-muted")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

