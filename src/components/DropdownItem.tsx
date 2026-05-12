import {
  isValidElement,
  cloneElement,
  type ReactNode,
  type ReactElement,
  type ButtonHTMLAttributes,
} from 'react'

type Variant = 'default' | 'action'

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  title: string
  subtitle?: string
  label?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

function renderIcon(icon: ReactNode): ReactNode {
  if (isValidElement(icon)) {
    return cloneElement(icon as ReactElement<{ size?: number; color?: string }>, {
      size: 16,
      color: 'currentColor',
    })
  }
  return icon
}

export default function DropdownItem({
  variant = 'default',
  title,
  subtitle,
  label,
  leftIcon,
  rightIcon,
  disabled,
  className,
  ...rest
}: DropdownItemProps) {
  const baseClasses = 'flex items-center gap-xs px-s min-h-[48px] w-full rounded-xs transition-colors cursor-pointer text-left'

  const variantClasses =
    variant === 'action'
      ? 'hover:bg-background-brand-subtle text-foreground-brand'
      : disabled
        ? 'text-foreground-disabled cursor-not-allowed'
        : 'hover:bg-background-base text-foreground-primary'

  const iconColor = variant === 'action' ? 'text-foreground-brand' : disabled ? 'text-foreground-disabled' : 'text-foreground-primary-faded-subtle'
  const labelColor = variant === 'action' ? 'text-foreground-brand' : 'text-foreground-primary-faded'

  return (
    <button
      disabled={disabled}
      className={[baseClasses, variantClasses, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {leftIcon && (
        <span className={`shrink-0 flex items-center justify-center ${iconColor}`}>
          {renderIcon(leftIcon)}
        </span>
      )}
      <div className="flex flex-col flex-1 min-w-none">
        <span className={`text-body-m ${variant === 'action' ? 'font-medium' : 'font-normal'} truncate`}>
          {title}
        </span>
        {subtitle && (
          <span className="text-body-xs font-normal text-foreground-primary-faded truncate">{subtitle}</span>
        )}
      </div>
      {label && (
        <span className={`shrink-0 text-body-s font-normal ${labelColor}`}>{label}</span>
      )}
      {rightIcon && (
        <span className={`shrink-0 flex items-center justify-center ${iconColor}`}>
          {renderIcon(rightIcon)}
        </span>
      )}
    </button>
  )
}
