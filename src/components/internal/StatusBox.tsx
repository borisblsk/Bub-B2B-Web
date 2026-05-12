import type { ReactNode } from 'react'

export type StatusType = 'neutral' | 'info' | 'success' | 'error' | 'warning'
export type StatusIntensity = 'solid' | 'subtle'

interface StatusBoxProps {
  type: StatusType
  intensity: StatusIntensity
  className?: string
  children: ReactNode
}

// Solid: strong colored bg, white text, no border
const solidStyles: Record<StatusType, string> = {
  neutral: 'bg-foreground-primary text-foreground-primary-inverse',
  info: 'bg-foreground-brand text-foreground-primary-inverse',
  success: 'bg-foreground-success text-foreground-primary-inverse',
  error: 'bg-foreground-error text-foreground-primary-inverse',
  warning: 'bg-foreground-warning text-foreground-primary-inverse',
}

// Subtle: faded bg, colored border, colored text
const subtleStyles: Record<StatusType, string> = {
  neutral: 'bg-background-base-subtle border-border-base-strong text-foreground-primary-faded',
  info: 'bg-background-brand-subtle border-border-brand text-foreground-brand',
  success: 'bg-background-positive border-border-positive text-foreground-success',
  error: 'bg-background-danger border-border-danger text-foreground-error',
  warning: 'bg-background-warning border-border-warning text-foreground-warning',
}

// Export the config for consumers that need class strings directly
export function getStatusClasses(type: StatusType, intensity: StatusIntensity) {
  return intensity === 'solid' ? solidStyles[type] : subtleStyles[type]
}

export default function StatusBox({
  type,
  intensity,
  className,
  children,
}: StatusBoxProps) {
  const colorClasses = getStatusClasses(type, intensity)
  const borderClass = intensity === 'subtle' ? 'border-[0.3px] border-solid' : ''

  return (
    <div
      className={[colorClasses, borderClass, className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}
