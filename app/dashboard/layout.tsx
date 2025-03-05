import type React from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[256px_1fr]">
        <DashboardSidebar />
        <main className="flex w-full flex-col overflow-hidden p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

