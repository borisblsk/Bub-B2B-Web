import {
  isValidElement,
  cloneElement,
  useId,
  type ReactNode,
  type ReactElement,
  type InputHTMLAttributes,
} from 'react'
import { CloseCircleIcon } from './icons'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  errorMessage?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  trailingText?: ReactNode
  required?: boolean
  onClear?: () => void
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

export default function Input({
  label,
  helperText,
  errorMessage,
  leftIcon,
  rightIcon,
  trailingText,
  required,
  disabled,
  readOnly,
  onClear,
  className,
  id: externalId,
  value,
  ...rest
}: InputProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`

  const hasError = !!errorMessage
  const hasValue = value !== undefined && value !== ''

  // Field container classes by state
  const fieldBase = 'flex items-center gap-xs min-h-[40px] px-s rounded-s transition-colors text-body-m font-normal w-full'

  let fieldState: string
  if (disabled) {
    fieldState = 'border border-border-base bg-transparent'
  } else if (hasError) {
    fieldState = 'bg-background-danger'
  } else {
    // Default + hover + focus
    fieldState = [
      'bg-background-base-subtle border border-border-base',
      'hover:bg-background-base-subtle-hover hover:border-transparent',
      'focus-within:bg-background-base-subtle-active focus-within:border-transparent',
    ].join(' ')
  }

  // Label color
  const labelColor = disabled
    ? 'text-foreground-disabled'
    : 'text-foreground-primary-faded'

  // Input text color
  const inputColor = disabled
    ? 'text-foreground-disabled'
    : hasError
      ? 'text-foreground-error'
      : 'text-foreground-primary'

  // Icon color in the field
  const iconColor = disabled
    ? 'text-foreground-disabled'
    : 'text-foreground-primary-faded-subtle'

  const describedBy = [
    hasError ? errorId : undefined,
    helperText ? helperId : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div className={`flex flex-col gap-xs w-full ${className ?? ''}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`text-body-s font-normal ${labelColor}`}
        >
          {label}
          {required && <span className="text-foreground-error"> *</span>}
        </label>
      )}

      {/* Field container */}
      <div className={`${fieldBase} ${fieldState}`}>
        {/* Leading icon */}
        {leftIcon && (
          <span className={`shrink-0 flex items-center justify-center ${iconColor}`}>
            {renderIcon(leftIcon)}
          </span>
        )}

        {/* Input */}
        <input
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={[
            'flex-1 min-w-none bg-transparent outline-none text-body-m font-normal',
            inputColor,
            'placeholder:text-foreground-primary-faded-subtle',
            'disabled:cursor-not-allowed',
          ].join(' ')}
          {...rest}
        />

        {/* Trailing text */}
        {trailingText && (
          <span className="shrink-0 text-body-s font-normal text-foreground-primary-faded whitespace-nowrap">
            {trailingText}
          </span>
        )}

        {/* Trailing icon */}
        {rightIcon && (
          <span className={`shrink-0 flex items-center justify-center ${iconColor}`}>
            {renderIcon(rightIcon)}
          </span>
        )}

        {/* Clear button — shown when there's a value and onClear is provided */}
        {hasValue && onClear && !disabled && !readOnly && (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 flex items-center justify-center text-foreground-primary-faded-subtle hover:text-foreground-primary-faded cursor-pointer"
            aria-label="Clear input"
            tabIndex={-1}
          >
            <CloseCircleIcon width={16} height={16} color="currentColor" />
          </button>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p id={errorId} className="text-body-s font-normal text-foreground-error">
          {errorMessage}
        </p>
      )}

      {/* Helper text */}
      {helperText && (
        <p id={helperId} className="text-body-s font-normal text-foreground-primary-faded">
          {helperText}
        </p>
      )}
    </div>
  )
}
