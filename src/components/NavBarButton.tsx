import { isValidElement, cloneElement, type ReactNode, type ReactElement } from 'react'

type NavBarButtonVariant = 'default' | 'secondary'

interface NavBarButtonProps {
  variant?: NavBarButtonVariant
  active?: boolean
  icon?: ReactNode
  trailingIcon?: ReactNode
  children: ReactNode
  onClick?: () => void
  className?: string
}

function renderIcon(icon: ReactNode, size: number) {
  if (isValidElement(icon)) {
    return cloneElement(icon as ReactElement<{ width?: number; height?: number; color?: string }>, {
      width: size,
      height: size,
      color: 'currentColor',
    })
  }
  return icon
}

export default function NavBarButton({
  variant = 'default',
  active = false,
  icon,
  trailingIcon,
  children,
  onClick,
  className,
}: NavBarButtonProps) {
  const isDefault = variant === 'default'

  const sizeClasses = isDefault
    ? 'h-[36px] px-m gap-xs'
    : 'h-[32px] px-s'

  const fontClasses = isDefault
    ? 'text-body-s font-medium'
    : 'text-body-s font-normal'

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex items-center justify-center rounded-full text-foreground-primary whitespace-nowrap cursor-pointer transition-colors',
        sizeClasses,
        fontClasses,
        active ? 'bg-background-base' : 'hover:bg-background-base',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isDefault && icon && (
        <span className="shrink-0 flex items-center justify-center">
          {renderIcon(icon, 16)}
        </span>
      )}
      <span>{children}</span>
      {trailingIcon && (
        <span className="shrink-0 flex items-center justify-center">
          {renderIcon(trailingIcon, 12)}
        </span>
      )}
    </button>
  )
}
