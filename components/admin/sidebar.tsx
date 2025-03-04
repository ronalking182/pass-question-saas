"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, FileQuestion, Home, Settings, Upload, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <nav className="hidden w-[220px] flex-col md:flex lg:w-[240px]">
      <div className="flex flex-col gap-2 py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight">Navigation</h2>
        <div className="flex flex-col gap-1 px-2">
          <Link href="/admin" passHref>
            <Button variant="ghost" className={cn("w-full justify-start", pathname === "/admin" && "bg-muted")}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/questions" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/admin/questions" && "bg-muted")}
            >
              <FileQuestion className="mr-2 h-4 w-4" />
              Manage Questions
            </Button>
          </Link>
          <Link href="/admin/uploads" passHref>
            <Button variant="ghost" className={cn("w-full justify-start", pathname === "/admin/uploads" && "bg-muted")}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Questions
            </Button>
          </Link>
          <Link href="/admin/analytics" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/admin/analytics" && "bg-muted")}
            >
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </Link>
          <Link href="/admin/users" passHref>
            <Button variant="ghost" className={cn("w-full justify-start", pathname === "/admin/users" && "bg-muted")}>
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-2 py-2">
        <div className="flex flex-col gap-1 px-2">
          <Link href="/admin/settings" passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/admin/settings" && "bg-muted")}
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

