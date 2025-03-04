import { DashboardShell } from "@/components/dashboard/shell"
import { UploadsList } from "@/components/dashboard/uploads-list"
import { UploadForm } from "@/components/dashboard/upload-form"

export default function UploadsPage() {
  return (
    <>
      <DashboardShell className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">My Uploads</h1>
        <p className="text-muted-foreground">Manage your uploaded questions and contribute to the community</p>
      </DashboardShell>

      <div className="grid gap-8">
        <UploadForm />
        <UploadsList />
      </div>
    </>
  )
}

