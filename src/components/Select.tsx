import {
  isValidElement,
  cloneElement,
  useId,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type ReactElement,
} from 'react'
import { ArrowDownIcon } from './icons'

interface SelectOption {
  value: string
  label: string
  subtitle?: string
}

interface SelectProps {
  label?: string
  helperText?: string
  errorMessage?: string
  placeholder?: string
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  leftIcon?: ReactNode
  disabled?: boolean
  required?: boolean
  className?: string
  id?: string
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

export default function Select({
  label,
  helperText,
  errorMessage,
  placeholder = 'Select...',
  options = [],
  value,
  onChange,
  leftIcon,
  disabled,
  required,
  className,
  id: externalId,
}: SelectProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const hasError = !!errorMessage
  const selectedOption = options.find((o) => o.value === value)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fieldBase = 'flex items-center gap-xs min-h-[40px] px-s rounded-s transition-colors text-body-m font-normal w-full cursor-pointer'

  let fieldState: string
  if (disabled) {
    fieldState = 'border border-border-base bg-transparent cursor-not-allowed'
  } else if (hasError) {
    fieldState = 'bg-background-danger'
  } else if (isOpen) {
    fieldState = 'bg-background-base-subtle-active'
  } else {
    fieldState = [
      'bg-background-base-subtle border border-border-base',
      'hover:bg-background-base-subtle-hover hover:border-transparent',
    ].join(' ')
  }

  const labelColor = disabled ? 'text-foreground-disabled' : 'text-foreground-primary-faded'
  const textColor = disabled
    ? 'text-foreground-disabled'
    : hasError
      ? 'text-foreground-error'
      : selectedOption
        ? 'text-foreground-primary'
        : 'text-foreground-primary-faded-subtle'
  const iconColor = disabled ? 'text-foreground-disabled' : 'text-foreground-primary-faded-subtle'

  const describedBy = [hasError ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div ref={ref} className={`flex flex-col gap-xs w-full relative ${className ?? ''}`}>
      {label && (
        <label htmlFor={inputId} className={`text-body-s font-normal ${labelColor}`}>
          {label}
          {required && <span className="text-foreground-error"> *</span>}
        </label>
      )}
      <button
        id={inputId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`${fieldBase} ${fieldState}`}
      >
        {leftIcon && (
          <span className={`shrink-0 flex items-center justify-center ${iconColor}`}>
            {renderIcon(leftIcon)}
          </span>
        )}
        <span className={`flex-1 min-w-none text-left truncate ${textColor}`}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span className={`shrink-0 flex items-center justify-center ${iconColor}`}>
          <ArrowDownIcon width={16} height={16} color="currentColor" />
        </span>
      </button>
      {isOpen && !disabled && (
        <div className="absolute top-full left-none right-none mt-xxs z-50 bg-background-neutral rounded-s shadow-dropdown overflow-clip">
          <div className="flex flex-col py-xs px-xs" style={{ maxHeight: 240, overflowY: 'auto' }}>
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange?.(opt.value)
                  setIsOpen(false)
                }}
                className={[
                  'flex flex-col gap-none px-s py-xs rounded-xs transition-colors cursor-pointer text-left',
                  opt.value === value ? 'bg-background-base' : 'hover:bg-background-base',
                ].join(' ')}
              >
                <span className="text-body-m font-normal text-foreground-primary">{opt.label}</span>
                {opt.subtitle && (
                  <span className="text-body-xs font-normal text-foreground-primary-faded">{opt.subtitle}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {hasError && (
        <p id={errorId} className="text-body-s font-normal text-foreground-error">{errorMessage}</p>
      )}
      {helperText && (
        <p id={helperId} className="text-body-s font-normal text-foreground-primary-faded">{helperText}</p>
      )}
    </div>
  )
}
