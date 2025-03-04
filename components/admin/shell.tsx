import type React from "react"
import { cn } from "@/lib/utils"

interface AdminShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminShell({ children, className, ...props }: AdminShellProps) {
  return (
    <div className={cn("flex flex-col gap-4 md:gap-8 py-4", className)} {...props}>
      {children}
    </div>
  )
}

