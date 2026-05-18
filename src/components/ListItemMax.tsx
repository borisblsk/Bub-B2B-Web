import type { ReactNode } from 'react'
import ListItemLayout from './internal/ListItemLayout'

interface ListItemMaxProps {
  variant?: 'default' | 'tile'
  interactive?: boolean
  onClick?: () => void

  // Leading area
  leading?: ReactNode
  primary?: ReactNode
  card?: ReactNode

  // Content area
  title: ReactNode
  chip?: ReactNode
  subLabel?: ReactNode
  leftSubtextTop?: ReactNode
  leftSubtextBottom?: ReactNode

  // Trailing — right-side text
  rightText?: ReactNode
  rightSubtextTop?: ReactNode
  rightSubtextBottom?: ReactNode

  // Trailing — controls
  toggle?: ReactNode
  radio?: ReactNode
  button?: ReactNode

  // Trailing — icons
  trailingIcon?: ReactNode
  trailingIcon2?: ReactNode

  className?: string
  /** @internal Force hover state for visual showcase only */
  _forceHover?: boolean
}

export default function ListItemMax({
  variant = 'default',
  interactive = false,
  onClick,
  leading,
  primary,
  card,
  title,
  chip,
  subLabel,
  leftSubtextTop,
  leftSubtextBottom,
  rightText,
  rightSubtextTop,
  rightSubtextBottom,
  toggle,
  radio,
  button,
  trailingIcon,
  trailingIcon2,
  className,
  _forceHover,
}: ListItemMaxProps) {
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
    <div className="flex flex-1 flex-col gap-[2px] items-start justify-center min-w-0">
      {leftSubtextTop && (
        <div className="flex gap-xxs items-center text-body-s font-normal text-foreground-primary-faded overflow-clip w-full whitespace-nowrap">
          {leftSubtextTop}
        </div>
      )}
      <div className="flex gap-xxs items-center overflow-clip w-full">
        <span className="text-body-s font-medium text-foreground-primary whitespace-nowrap truncate">
          {title}
        </span>
        {chip}
        {subLabel && (
          <span className="text-body-xs font-medium text-foreground-primary-faded whitespace-nowrap">
            {subLabel}
          </span>
        )}
      </div>
      {leftSubtextBottom && (
        <div className="flex gap-xxs items-center text-body-s font-normal text-foreground-primary-faded overflow-clip w-full whitespace-nowrap">
          {leftSubtextBottom}
        </div>
      )}
    </div>
  )

  // Compose trailing area
  const hasTrailing = rightText || toggle || radio || button || trailingIcon || trailingIcon2
  const trailingContent = hasTrailing ? (
    <>
      {rightText && (
        <div className="flex flex-col gap-[2px] items-end whitespace-nowrap shrink-0">
          {rightSubtextTop && (
            <span className="text-body-s font-normal text-foreground-primary-faded">
              {rightSubtextTop}
            </span>
          )}
          <span className="text-body-s font-medium text-foreground-primary text-right">
            {rightText}
          </span>
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
      {radio}
      {button && (
        <div onClick={(e) => e.stopPropagation()}>
          {button}
        </div>
      )}
      {trailingIcon && <span className="shrink-0 flex items-center justify-center">{trailingIcon}</span>}
      {trailingIcon2 && <span className="shrink-0 flex items-center justify-center">{trailingIcon2}</span>}
    </>
  ) : undefined

  return (
    <ListItemLayout
      size="max"
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
