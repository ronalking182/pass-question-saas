"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?: (value: string) => void
  }
>(({ className, value, onValueChange, ...props }, ref) => {
  return <div ref={ref} className={cn("grid gap-2", className)} role="radiogroup" {...props} />
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
    value: string
  }
>(({ className, value, id, ...props }, ref) => {
  const radioContext = React.useContext(RadioGroupContext)

  return (
    <span className="flex items-center">
      <input
        ref={ref}
        type="radio"
        id={id}
        value={value}
        checked={radioContext?.value === value}
        onChange={() => radioContext?.onValueChange?.(value)}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </span>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

// Create a context to share the radio group state
const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
} | null>(null)

// Update the RadioGroup to provide context
const RadioGroupWithContext = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?: (value: string) => void
  }
>(({ className, value, onValueChange, ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <RadioGroup ref={ref} className={className} {...props} />
    </RadioGroupContext.Provider>
  )
})
RadioGroupWithContext.displayName = "RadioGroup"

export { RadioGroupWithContext as RadioGroup, RadioGroupItem }

