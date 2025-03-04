import { AdminHeader } from "@/components/admin/header"
import { AdminShell } from "@/components/admin/shell"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminStats } from "@/components/admin/stats"
import { RecentUploads } from "@/components/admin/recent-uploads"
import { PopularCourses } from "@/components/admin/popular-courses"

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <AdminSidebar />
        <main className="flex w-full flex-col overflow-hidden">
          <AdminShell className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage past questions and view analytics for your university.</p>
          </AdminShell>

          <div className="grid gap-8">
            <AdminStats />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
              <RecentUploads className="md:col-span-1 lg:col-span-4" />
              <PopularCourses className="md:col-span-1 lg:col-span-3" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

