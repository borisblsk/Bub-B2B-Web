import type { ReactNode } from 'react'
import ListItemLayout from './internal/ListItemLayout'

interface ListItemMinProps {
  variant?: 'default' | 'tile'
  interactive?: boolean
  onClick?: () => void

  // Leading area
  leading?: ReactNode
  primary?: ReactNode
  card?: ReactNode

  // Content area
  title: ReactNode
  badge1?: ReactNode
  badge2?: ReactNode
  leftSubtextBottom?: ReactNode

  // Trailing — right-side text
  rightText?: ReactNode
  rightSubtextBottom?: ReactNode

  // Trailing — controls
  toggle?: ReactNode

  // Trailing — icons
  trailingIcon?: ReactNode
  trailingIcon2?: ReactNode

  className?: string
  /** @internal Force hover state for visual showcase only */
  _forceHover?: boolean
}

export default function ListItemMin({
  variant = 'default',
  interactive = false,
  onClick,
  leading,
  primary,
  card,
  title,
  badge1,
  badge2,
  leftSubtextBottom,
  rightText,
  rightSubtextBottom,
  toggle,
  trailingIcon,
  trailingIcon2,
  className,
  _forceHover,
}: ListItemMinProps) {
  // Compose leading area
  const leadingContent = (leading || card || primary) ? (
    <>
      {leading && <span className="shrink-0 flex items-center justify-center text-foreground-primary-faded-subtle">{leading}</span>}
      {card}
      {primary}
    </>
  ) : undefined

  // Compose content area
  const contentArea = (
    <div className="flex flex-1 flex-col gap-xxs items-start justify-center min-w-0">
      <div className="flex gap-xxs items-center overflow-clip w-full">
        <span className="text-body-m font-normal text-foreground-primary whitespace-nowrap truncate">
          {title}
        </span>
        {badge1}
        {badge2}
      </div>
      {leftSubtextBottom && (
        <div className="flex gap-xxs items-center text-body-s font-normal text-foreground-primary-faded overflow-clip w-full whitespace-nowrap">
          {leftSubtextBottom}
        </div>
      )}
    </div>
  )

  // Compose trailing area
  const hasTrailing = rightText || toggle || trailingIcon || trailingIcon2
  const trailingContent = hasTrailing ? (
    <>
      {(rightText || rightSubtextBottom) && (
        <div className="flex flex-col gap-[2px] items-end whitespace-nowrap shrink-0">
          {rightText && (
            <span className="text-body-m font-normal text-foreground-primary text-right">
              {rightText}
            </span>
          )}
          {rightSubtextBottom && (
            <span className="text-body-s font-normal text-foreground-primary-faded">
              {rightSubtextBottom}
            </span>
          )}
        </div>
      )}
      {toggle && (
        <div onClick={(e) => e.stopPropagation()}>
          {toggle}
        </div>
      )}
      {trailingIcon && <span className="shrink-0 flex items-center justify-center">{trailingIcon}</span>}
      {trailingIcon2 && <span className="shrink-0 flex items-center justify-center">{trailingIcon2}</span>}
    </>
  ) : undefined

  return (
    <ListItemLayout
      size="min"
      variant={variant}
      interactive={interactive}
      onClick={onClick}
      leading={leadingContent}
      content={contentArea}
      trailing={trailingContent}
      className={className}
      _forceHover={_forceHover}
    />
  )
}
