import { forwardRef, useEffect, useRef, useState, useId, type ChangeEvent } from 'react'

type CheckboxValue = boolean | 'indeterminate' | number

interface CheckboxProps {
  value?: CheckboxValue
  defaultValue?: boolean
  error?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  className?: string
  id?: string
  'aria-label'?: string
}

function CheckSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 9L7.5 12.5L14 5.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DashSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 9H13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    value,
    defaultValue,
    error = false,
    disabled = false,
    onChange,
    className,
    id: externalId,
    ...rest
  },
  forwardedRef
) {
  const internalRef = useRef<HTMLInputElement>(null)
  const autoId = useId()
  const inputId = externalId ?? autoId

  // Controlled vs uncontrolled
  const isControlled = value !== undefined
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultValue ?? false)
  const resolved = isControlled ? value : internalChecked

  // Derive mutually exclusive visual state
  const isNumber = typeof resolved === 'number'
  const isIndeterminate = resolved === 'indeterminate'
  const isChecked = resolved === true
  const isFilled = isChecked || isIndeterminate || isNumber

  // Merge refs
  function setRef(el: HTMLInputElement | null) {
    internalRef.current = el
    if (typeof forwardedRef === 'function') forwardedRef(el)
    else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = el
  }

  // Set indeterminate property via DOM
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = isIndeterminate
    }
  }, [isIndeterminate])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternalChecked(e.target.checked)
    onChange?.(e.target.checked)
  }

  // Box styling
  let boxClasses: string
  if (isFilled) {
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

  // Native input checked state
  const nativeChecked = isFilled

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
        ref={setRef}
        type="checkbox"
        id={inputId}
        checked={isControlled ? nativeChecked : undefined}
        defaultChecked={!isControlled ? defaultValue : undefined}
        disabled={disabled}
        onChange={handleChange}
        className="peer sr-only"
        aria-checked={isIndeterminate ? 'mixed' : undefined}
        {...rest}
      />
      <span
        className={[
          'size-[20px] rounded-xxs overflow-clip transition-colors flex items-center justify-center',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground-brand',
          boxClasses,
        ].join(' ')}
      >
        {isChecked && <CheckSvg />}
        {isIndeterminate && <DashSvg />}
        {isNumber && (
          <span className="text-body-m font-normal text-foreground-primary-inverse leading-none">
            {resolved}
          </span>
        )}
      </span>
    </label>
  )
})

export default Checkbox
