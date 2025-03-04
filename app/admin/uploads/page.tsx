import { AdminHeader } from "@/components/admin/header"
import { AdminShell } from "@/components/admin/shell"
import { AdminSidebar } from "@/components/admin/sidebar"
import { UploadForm } from "@/components/admin/upload-form"

export default function UploadQuestionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <AdminSidebar />
        <main className="flex w-full flex-col overflow-hidden">
          <AdminShell className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Upload Questions</h1>
            <p className="text-muted-foreground">Upload past questions for your university courses</p>
          </AdminShell>

          <div className="grid gap-8">
            <UploadForm />
          </div>
        </main>
      </div>
    </div>
  )
}

