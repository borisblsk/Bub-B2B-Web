import { useId, useState, useRef, useEffect } from 'react'
import { CalendarIcon } from './icons'
import Calendar from './Calendar'

interface DatePickerProps {
  label?: string
  helperText?: string
  errorMessage?: string
  placeholder?: string
  value?: Date | null
  onChange?: (date: Date | null) => void
  disabled?: boolean
  required?: boolean
  className?: string
  id?: string
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return ''
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${mm}/${dd}/${yyyy}`
}

export default function DatePicker({
  label,
  helperText,
  errorMessage,
  placeholder = 'mm/dd/yyyy',
  value,
  onChange,
  disabled = false,
  required,
  className,
  id: externalId,
}: DatePickerProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const hasError = !!errorMessage
  const hasValue = !!value

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
      : hasValue
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
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`${fieldBase} ${fieldState}`}
      >
        <span className={`flex-1 min-w-none text-left truncate ${textColor}`}>
          {hasValue ? formatDate(value) : placeholder}
        </span>
        <span className={`shrink-0 flex items-center justify-center ${iconColor}`}>
          <CalendarIcon width={16} height={16} color="currentColor" />
        </span>
      </button>
      {isOpen && !disabled && (
        <div className="absolute top-full left-none mt-xxs z-50 bg-background-neutral rounded-s shadow-dropdown p-m">
          <Calendar
            value={value}
            onChange={(date) => {
              onChange?.(date)
              setIsOpen(false)
            }}
          />
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
