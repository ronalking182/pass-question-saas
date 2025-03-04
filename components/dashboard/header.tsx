"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap, Menu, Home, FileQuestion, BookOpen, Upload, BarChart, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <nav className="flex flex-col gap-4">
                <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                  <GraduationCap className="h-5 w-5" />
                  <span>PassQuest</span>
                </Link>
                <div className="space-y-1">
                  <Link
                    href="/dashboard"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === "/dashboard" ? "bg-muted" : "hover:bg-muted"
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/questions"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === "/dashboard/questions" ? "bg-muted" : "hover:bg-muted"
                    }`}
                  >
                    <FileQuestion className="h-4 w-4" />
                    Past Questions
                  </Link>
                  <Link
                    href="/dashboard/quizzes"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === "/dashboard/quizzes" ? "bg-muted" : "hover:bg-muted"
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    My Quizzes
                  </Link>
                  <Link
                    href="/dashboard/uploads"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === "/dashboard/uploads" ? "bg-muted" : "hover:bg-muted"
                    }`}
                  >
                    <Upload className="h-4 w-4" />
                    My Uploads
                  </Link>
                  <Link
                    href="/dashboard/progress"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === "/dashboard/progress" ? "bg-muted" : "hover:bg-muted"
                    }`}
                  >
                    <BarChart className="h-4 w-4" />
                    Progress
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === "/dashboard/settings" ? "bg-muted" : "hover:bg-muted"
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">PassQuest</span>
          </Link>
        </div>
        <Link href="/dashboard" className="hidden items-center gap-2 md:flex">
          <GraduationCap className="h-6 w-6" />
          <span className="text-xl font-bold">PassQuest</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/help">Help</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/logout">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

