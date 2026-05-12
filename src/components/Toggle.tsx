import { forwardRef, useState, useId, type ChangeEvent } from 'react'

interface ToggleProps {
  checked?: boolean
  defaultChecked?: boolean
  error?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  className?: string
  id?: string
  'aria-label'?: string
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    checked,
    defaultChecked,
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

  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
  const isChecked = isControlled ? checked : internalChecked

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternalChecked(e.target.checked)
    onChange?.(e.target.checked)
  }

  // Track styling
  let trackClasses: string
  if (isChecked) {
    if (disabled) {
      trackClasses = 'bg-background-disabled border border-border-base'
    } else if (error) {
      trackClasses = 'bg-foreground-error'
    } else {
      trackClasses = 'bg-background-primary group-hover:bg-background-primary-hover'
    }
  } else {
    if (disabled) {
      trackClasses = 'border border-border-base'
    } else if (error) {
      trackClasses = 'bg-foreground-error'
    } else {
      trackClasses = 'bg-background-base group-hover:bg-background-base-hover'
    }
  }

  // Thumb styling
  let thumbClasses: string
  if (disabled) {
    thumbClasses = 'bg-foreground-disabled opacity-30'
  } else if (error || isChecked) {
    thumbClasses = 'bg-foreground-primary-inverse'
  } else {
    thumbClasses = 'bg-foreground-primary-inverse shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]'
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
        type="checkbox"
        role="switch"
        id={inputId}
        checked={isControlled ? isChecked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        disabled={disabled}
        onChange={handleChange}
        className="peer sr-only"
        aria-checked={isChecked}
        {...rest}
      />
      <span
        className={[
          'relative w-[32px] h-[20px] rounded-full transition-colors',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground-brand',
          trackClasses,
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-1/2 -translate-y-1/2 left-[2px] w-[20px] h-[16px] rounded-full',
            'transition-transform duration-200',
            isChecked ? 'translate-x-[8px]' : 'translate-x-0',
            thumbClasses,
          ].join(' ')}
        />
      </span>
    </label>
  )
})

export default Toggle
