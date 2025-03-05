import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { ProfileSettings } from "@/components/dashboard/profile-settings"
import { AccountSettings } from "@/components/dashboard/account-settings"
import { NotificationSettings } from "@/components/dashboard/notification-settings"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <DashboardHeader /> */}
      <div className="">
        {/* <DashboardSidebar /> */}
        <main className="flex w-full flex-col ">
          <DashboardShell className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </DashboardShell>

          <div className="grid gap-8">
            <ProfileSettings />
            <AccountSettings />
            <NotificationSettings />
          </div>
        </main>
      </div>
    </div>
  )
}

