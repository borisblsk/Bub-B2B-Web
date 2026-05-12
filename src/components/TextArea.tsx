import {
  isValidElement,
  cloneElement,
  useId,
  type ReactNode,
  type ReactElement,
  type TextareaHTMLAttributes,
} from 'react'

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
  label?: string
  helperText?: string
  errorMessage?: string
  leftIcon?: ReactNode
  required?: boolean
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

export default function TextArea({
  label,
  helperText,
  errorMessage,
  leftIcon,
  required,
  disabled,
  readOnly,
  className,
  id: externalId,
  ...rest
}: TextAreaProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`

  const hasError = !!errorMessage

  const fieldBase = 'flex items-start gap-xs min-h-[40px] h-[80px] pt-s px-s rounded-s transition-colors text-body-m font-normal w-full relative'

  let fieldState: string
  if (disabled) {
    fieldState = 'border border-border-base bg-transparent'
  } else if (hasError) {
    fieldState = 'bg-background-danger'
  } else {
    fieldState = [
      'bg-background-base-subtle border border-border-base',
      'hover:bg-background-base-subtle-hover hover:border-transparent',
      'focus-within:bg-background-base-subtle-active focus-within:border-transparent',
    ].join(' ')
  }

  const labelColor = disabled ? 'text-foreground-disabled' : 'text-foreground-primary-faded'
  const inputColor = disabled
    ? 'text-foreground-disabled'
    : hasError
      ? 'text-foreground-error'
      : 'text-foreground-primary'
  const iconColor = disabled ? 'text-foreground-disabled' : 'text-foreground-primary-faded-subtle'

  const describedBy = [hasError ? errorId : undefined, helperText ? helperId : undefined]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div className={`flex flex-col gap-xs w-full ${className ?? ''}`}>
      {label && (
        <label htmlFor={inputId} className={`text-body-s font-normal ${labelColor}`}>
          {label}
          {required && <span className="text-foreground-error"> *</span>}
        </label>
      )}
      <div className={`${fieldBase} ${fieldState}`}>
        {leftIcon && (
          <span className={`shrink-0 flex items-center justify-center ${iconColor}`}>
            {renderIcon(leftIcon)}
          </span>
        )}
        <textarea
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={[
            'flex-1 min-w-none bg-transparent outline-none text-body-m font-normal resize-y h-full',
            inputColor,
            'placeholder:text-foreground-primary-faded-subtle',
            'disabled:cursor-not-allowed',
          ].join(' ')}
          {...rest}
        />
      </div>
      {hasError && (
        <p id={errorId} className="text-body-s font-normal text-foreground-error">{errorMessage}</p>
      )}
      {helperText && (
        <p id={helperId} className="text-body-s font-normal text-foreground-primary-faded">{helperText}</p>
      )}
    </div>
  )
}
