import type { ReactNode } from 'react'

interface WidgetProps {
  /** Left side of the header row — string for simple title, or ReactNode for complex headers */
  title?: ReactNode
  /** Right side of the header row — action buttons, icons, etc. */
  actions?: ReactNode
  /** Body content rendered below the header */
  children?: ReactNode
  /** Additional classes on the outer container */
  className?: string
}

export default function Widget({
  title,
  actions,
  children,
  className,
}: WidgetProps) {
  const hasHeader = title || actions

  return (
    <div
      className={[
        'bg-background-neutral border border-border-base rounded-m p-m flex flex-col gap-xs',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {hasHeader && (
        <div className="flex items-start gap-xs w-full">
          <div className="flex-1 min-w-0">{title}</div>
          {actions && (
            <div className="flex items-center gap-xs shrink-0">{actions}</div>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
