import { useId, type ComponentPropsWithoutRef } from 'react'
import Checkbox from './Checkbox'

interface CheckboxFieldProps extends Omit<ComponentPropsWithoutRef<typeof Checkbox>, 'error'> {
  label: string
  description?: string
  position?: 'left' | 'right'
  error?: boolean
  errorMessage?: string
}

export default function CheckboxField({
  label,
  description,
  position = 'left',
  error,
  errorMessage,
  disabled,
  id: externalId,
  ...checkboxProps
}: CheckboxFieldProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId

  const hasError = !!errorMessage || error

  const labelColor = disabled
    ? 'text-foreground-disabled'
    : 'text-foreground-primary'

  const descColor = disabled
    ? 'text-foreground-disabled'
    : 'text-foreground-primary-faded-subtle'

  const checkbox = (
    <Checkbox
      id={inputId}
      error={hasError}
      disabled={disabled}
      {...checkboxProps}
    />
  )

  const textContent = (
    <label
      htmlFor={inputId}
      className={[
        'flex flex-1 min-w-0 flex-col gap-xxs pt-[2px]',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      <span className={`text-body-m font-normal ${labelColor}`}>{label}</span>
      {description && (
        <span className={`text-body-s font-normal ${descColor}`}>{description}</span>
      )}
      {errorMessage && (
        <span className="text-body-s font-normal text-foreground-error">{errorMessage}</span>
      )}
    </label>
  )

  return (
    <div className="flex gap-s items-start">
      {position === 'left' ? (
        <>
          {checkbox}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {checkbox}
        </>
      )}
    </div>
  )
}
