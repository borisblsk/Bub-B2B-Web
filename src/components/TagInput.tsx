import { useState, useId, type KeyboardEvent } from 'react'
import { CloseCircleIcon } from './icons'

interface TagInputProps {
  label?: string
  helperText?: string
  errorMessage?: string
  placeholder?: string
  tags?: string[]
  onChange?: (tags: string[]) => void
  disabled?: boolean
  required?: boolean
  className?: string
  id?: string
}

export default function TagInput({
  label,
  helperText,
  errorMessage,
  placeholder = 'Press Enter to add',
  tags = [],
  onChange,
  disabled = false,
  required,
  className,
  id: externalId,
}: TagInputProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`
  const [inputValue, setInputValue] = useState('')

  const hasError = !!errorMessage

  function addTag() {
    const trimmed = inputValue.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onChange?.([...tags, trimmed])
      setInputValue('')
    }
  }

  function removeTag(tag: string) {
    onChange?.(tags.filter((t) => t !== tag))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange?.(tags.slice(0, -1))
    }
  }

  const fieldBase = 'flex flex-wrap items-center gap-xxs min-h-[40px] px-s py-xxs rounded-s transition-colors text-body-m font-normal w-full'

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
  const tagBg = hasError ? 'bg-background-danger-hover' : 'bg-background-base'
  const tagText = hasError ? 'text-foreground-error' : 'text-foreground-primary'

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
        {tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center gap-xxs px-xs py-xxs rounded-xxs text-body-s font-medium ${tagBg} ${tagText}`}
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="shrink-0 flex items-center justify-center cursor-pointer hover:text-foreground-primary-faded"
                tabIndex={-1}
              >
                <CloseCircleIcon width={12} height={12} color="currentColor" />
              </button>
            )}
          </span>
        ))}
        <input
          id={inputId}
          type="text"
          disabled={disabled}
          placeholder={tags.length === 0 ? placeholder : ''}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={[
            'flex-1 min-w-[80px] bg-transparent outline-none text-body-m font-normal',
            disabled ? 'text-foreground-disabled cursor-not-allowed' : 'text-foreground-primary',
            'placeholder:text-foreground-primary-faded-subtle',
          ].join(' ')}
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
