import { forwardRef, useId } from 'react'

interface RadioProps {
  checked?: boolean
  value: string
  name?: string
  error?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
  className?: string
  id?: string
  'aria-label'?: string
}

function DotSvg() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="3" r="3" fill="white" />
    </svg>
  )
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    checked,
    value,
    name,
    error = false,
    disabled = false,
    onChange,
    className,
    id: externalId,
    ...rest
  },
  forwardedRef
) {
  const autoId = useId()
  const inputId = externalId ?? autoId

  // Box styling
  let boxClasses: string
  if (checked) {
    if (disabled) {
      boxClasses = 'bg-foreground-disabled'
    } else if (error) {
      boxClasses = 'bg-foreground-error'
    } else {
      boxClasses = 'bg-background-primary group-hover:bg-background-primary-hover'
    }
  } else {
    if (disabled) {
      boxClasses = 'border border-border-base'
    } else if (error) {
      boxClasses = 'bg-background-danger border border-border-danger'
    } else {
      boxClasses = 'bg-background-base-subtle border border-border-base-strong group-hover:bg-background-base-subtle-hover'
    }
  }

  return (
    <label
      htmlFor={inputId}
      className={[
        'group relative inline-flex items-center justify-center shrink-0',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        ref={forwardedRef}
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(value)}
        className="peer sr-only"
        {...rest}
      />
      <span
        className={[
          'size-[20px] rounded-full overflow-clip transition-colors flex items-center justify-center',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground-brand',
          boxClasses,
        ].join(' ')}
      >
        {checked && <DotSvg />}
      </span>
    </label>
  )
})

export default Radio
