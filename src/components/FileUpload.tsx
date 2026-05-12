import { useId, useRef } from 'react'
import { AttachSquareIcon, CloseCircleIcon, DocumentDownloadIcon } from './icons'

interface FileUploadProps {
  label?: string
  placeholder?: string
  accept?: string
  file?: File | { name: string } | null
  loading?: boolean
  readOnly?: boolean
  disabled?: boolean
  onChange?: (file: File | null) => void
  onRemove?: () => void
  className?: string
  id?: string
}

function Spinner() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="31.4 31.4" />
    </svg>
  )
}

export default function FileUpload({
  label,
  placeholder = 'Add .png, .pdf, .jpeg file up to 5MB',
  accept,
  file,
  loading = false,
  readOnly = false,
  disabled = false,
  onChange,
  onRemove,
  className,
  id: externalId,
}: FileUploadProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const fileRef = useRef<HTMLInputElement>(null)

  const hasFile = !!file
  const fileName = file ? ('name' in file ? file.name : '') : ''

  const labelColor = disabled ? 'text-foreground-disabled' : 'text-foreground-primary-faded'

  let fieldClasses: string
  if (readOnly) {
    fieldClasses = 'bg-background-brand-subtle text-foreground-brand'
  } else if (disabled) {
    fieldClasses = 'border border-border-base bg-transparent text-foreground-disabled cursor-not-allowed'
  } else {
    fieldClasses = [
      'bg-background-base-subtle border border-border-base',
      'hover:bg-background-base-subtle-hover hover:border-transparent',
      'cursor-pointer',
    ].join(' ')
  }

  const textColor = readOnly
    ? 'text-foreground-brand'
    : hasFile
      ? 'text-foreground-primary'
      : 'text-foreground-primary-faded-subtle'

  const iconColor = readOnly
    ? 'text-foreground-brand'
    : disabled
      ? 'text-foreground-disabled'
      : 'text-foreground-primary-faded-subtle'

  function handleClick() {
    if (!disabled && !readOnly && !hasFile) {
      fileRef.current?.click()
    }
  }

  return (
    <div className={`flex flex-col gap-xs w-full ${className ?? ''}`}>
      {label && (
        <label htmlFor={inputId} className={`text-body-s font-normal ${labelColor}`}>{label}</label>
      )}
      <input
        ref={fileRef}
        id={inputId}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null
          onChange?.(f)
        }}
      />
      <div
        onClick={handleClick}
        className={[
          'flex items-center gap-xs min-h-[40px] px-s rounded-s transition-colors text-body-m font-normal w-full',
          fieldClasses,
        ].join(' ')}
      >
        <span className={`shrink-0 flex items-center justify-center ${iconColor}`}>
          <AttachSquareIcon width={16} height={16} color="currentColor" />
        </span>
        <span className={`flex-1 min-w-none truncate ${textColor}`}>
          {hasFile ? fileName : placeholder}
        </span>
        {loading && (
          <span className="shrink-0 flex items-center justify-center text-foreground-brand">
            <Spinner />
          </span>
        )}
        {hasFile && !readOnly && !disabled && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove?.() }}
            className="shrink-0 flex items-center justify-center text-foreground-primary-faded-subtle hover:text-foreground-primary-faded cursor-pointer"
            aria-label="Remove file"
          >
            <CloseCircleIcon width={16} height={16} color="currentColor" />
          </button>
        )}
        {readOnly && (
          <span className="shrink-0 flex items-center justify-center text-foreground-brand">
            <DocumentDownloadIcon width={16} height={16} color="currentColor" />
          </span>
        )}
      </div>
    </div>
  )
}
