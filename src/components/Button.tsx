import { isValidElement, cloneElement, type ReactNode, type ReactElement, type ButtonHTMLAttributes } from 'react'

type Variant =
  | 'primary'
  | 'brand'
  | 'secondary'
  | 'tertiary'
  | 'ghosted'
  | 'transparent'
  | 'danger'
  | 'success'

type Size = 'default' | 'small' | 'extraSmall'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: ReactNode
  variant?: Variant
  size?: Size
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  iconOnly?: boolean
}

const variantClasses: Record<Variant, { base: string; hover: string; text: string }> = {
  primary: {
    base: 'bg-background-primary',
    hover: 'hover:bg-background-primary-hover',
    text: 'text-foreground-primary-inverse',
  },
  brand: {
    base: 'bg-background-brand',
    hover: 'hover:bg-background-brand-hover',
    text: 'text-foreground-primary-inverse',
  },
  secondary: {
    base: 'border border-border-base',
    hover: 'hover:bg-background-neutral-hover',
    text: 'text-foreground-primary',
  },
  tertiary: {
    base: 'bg-background-base',
    hover: 'hover:bg-background-base-hover',
    text: 'text-foreground-primary',
  },
  ghosted: {
    base: '',
    hover: 'hover:bg-background-neutral-hover',
    text: 'text-foreground-primary-faded',
  },
  transparent: {
    base: '',
    hover: 'hover:bg-background-neutral-hover',
    text: 'text-foreground-primary',
  },
  danger: {
    base: 'bg-background-danger',
    hover: 'hover:bg-background-danger-hover',
    text: 'text-foreground-error',
  },
  success: {
    base: 'bg-background-positive',
    hover: 'hover:bg-background-positive-hover',
    text: 'text-foreground-success',
  },
}

const sizeClasses: Record<Size, string> = {
  default: 'min-h-[48px] px-l py-s gap-xs text-body-m',
  small: 'h-[36px] px-m gap-xxs text-body-s',
  extraSmall: 'h-[28px] px-s gap-xxs text-body-s',
}

const iconSizeMap: Record<Size, number> = {
  default: 20,
  small: 16,
  extraSmall: 12,
}

const spinnerSizeMap: Record<Size, number> = {
  default: 24,
  small: 16,
  extraSmall: 12,
}

function Spinner({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`animate-spin ${className ?? ''}`}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
      />
    </svg>
  )
}

function renderIcon(icon: ReactNode, size: number): ReactNode {
  if (isValidElement(icon)) {
    return cloneElement(icon as ReactElement<{ size?: number; color?: string }>, {
      size,
      color: 'currentColor',
    })
  }
  return icon
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  className,
  ...rest
}: ButtonProps) {
  const v = variantClasses[variant]
  const isDisabled = disabled || loading

  const bgClass = isDisabled && !loading
    ? 'bg-background-disabled'
    : v.base

  const hoverClass = isDisabled ? '' : v.hover

  const textClass = isDisabled && !loading
    ? 'text-foreground-disabled'
    : v.text

  const focusClass = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-brand'

  const iconSize = iconSizeMap[size]
  const spinnerSize = spinnerSizeMap[size]

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap',
        'cursor-pointer disabled:cursor-not-allowed',
        'transition-colors',
        sizeClasses[size],
        bgClass,
        hoverClass,
        textClass,
        focusClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading ? (
        <Spinner size={spinnerSize} />
      ) : (
        <>
          {leftIcon && <span className="shrink-0 flex items-center justify-center">{renderIcon(leftIcon, iconSize)}</span>}
          {!iconOnly && children != null && <span>{children}</span>}
          {rightIcon && <span className="shrink-0 flex items-center justify-center">{renderIcon(rightIcon, iconSize)}</span>}
        </>
      )}
    </button>
  )
}
