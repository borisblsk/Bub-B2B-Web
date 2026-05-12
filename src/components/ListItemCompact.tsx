import type { ReactNode } from 'react'
import ListItemLayout from './internal/ListItemLayout'

interface ListItemCompactProps {
  variant?: 'default' | 'tile'
  interactive?: boolean
  onClick?: () => void

  text: ReactNode
  label: ReactNode
  header?: ReactNode
  avatar?: ReactNode
  toggle?: ReactNode
  button?: ReactNode
  trailingIcon?: ReactNode

  className?: string
  /** @internal Force hover state for visual showcase only */
  _forceHover?: boolean
}

export default function ListItemCompact({
  variant = 'default',
  interactive = false,
  onClick,
  text,
  label,
  header,
  avatar,
  toggle,
  button,
  trailingIcon,
  className,
  _forceHover,
}: ListItemCompactProps) {
  const isDefault = variant === 'default'

  const defaultContent = (
    <div className="flex gap-3xl items-center w-full">
      {/* Left column: header + descriptive text */}
      <div className="flex flex-1 flex-col gap-xxs items-start justify-center min-w-0">
        {header && (
          <span className="text-body-m font-normal text-foreground-primary w-full truncate">
            {header}
          </span>
        )}
        <span className="text-body-m font-normal text-foreground-primary-faded w-full truncate">
          {text}
        </span>
      </div>
      {/* Right column: avatar + label + controls + icon */}
      <div className="flex flex-1 gap-xs items-center min-w-0">
        {avatar}
        <span className="flex-1 text-body-m font-normal text-foreground-primary min-w-0 truncate">
          {label}
        </span>
        {toggle && (
          <div onClick={(e) => e.stopPropagation()}>
            {toggle}
          </div>
        )}
        {button && (
          <div onClick={(e) => e.stopPropagation()}>
            {button}
          </div>
        )}
        {trailingIcon && <span className="shrink-0 flex items-center justify-center">{trailingIcon}</span>}
      </div>
    </div>
  )

  const tileContent = (
    <div className="flex gap-xs items-center w-full">
      <span className="flex-1 text-body-m font-normal text-foreground-primary-faded min-w-0 truncate">
        {text}
      </span>
      <span className="flex-1 text-body-m font-normal text-foreground-primary min-w-0 truncate">
        {label}
      </span>
      {trailingIcon && <span className="shrink-0 flex items-center justify-center">{trailingIcon}</span>}
      {toggle && (
        <div onClick={(e) => e.stopPropagation()}>
          {toggle}
        </div>
      )}
    </div>
  )

  return (
    <ListItemLayout
      size="compact"
      variant={variant}
      interactive={interactive}
      onClick={onClick}
      content={isDefault ? defaultContent : tileContent}
      className={[isDefault ? 'py-xxs' : '', className].filter(Boolean).join(' ') || undefined}
      _forceHover={_forceHover}
    />
  )
}
