import { useId, type ComponentPropsWithoutRef } from 'react'
import Toggle from './Toggle'

interface ToggleFieldProps extends Omit<ComponentPropsWithoutRef<typeof Toggle>, 'error'> {
  label: string
  description?: string
  position?: 'left' | 'right'
  error?: boolean
  errorMessage?: string
}

export default function ToggleField({
  label,
  description,
  position = 'left',
  error,
  errorMessage,
  disabled,
  id: externalId,
  ...toggleProps
}: ToggleFieldProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId

  const hasError = !!errorMessage || error

  const labelColor = disabled
    ? 'text-foreground-disabled'
    : 'text-foreground-primary'

  const descColor = disabled
    ? 'text-foreground-disabled'
    : 'text-foreground-primary-faded-subtle'

  const toggle = (
    <Toggle
      id={inputId}
      error={hasError}
      disabled={disabled}
      {...toggleProps}
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
          {toggle}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {toggle}
        </>
      )}
    </div>
  )
}
