// Portaled to document.body via createPortal. Controlled via isOpen prop.

import { useId, useEffect, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './icons'

interface ModalMaxProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  hasBack?: boolean
  onBack?: () => void
  hasClose?: boolean
  children?: ReactNode
  className?: string
}

export default function ModalMax({
  isOpen,
  onClose,
  title,
  hasBack = false,
  onBack,
  hasClose = true,
  children,
  className,
}: ModalMaxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  const titleId = useId()

  if (!isOpen) return null

  // TODO a11y: focus trap (Tab cycles within modal, not to page behind)
  // TODO a11y: return focus to trigger element on close
  // TODO a11y: scroll lock on body when modal is open

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background-modal-overlay"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(e) => e.stopPropagation()}
        className={[
          'relative flex flex-col gap-3xl p-3xl w-[1156px] h-[752px] max-w-[90vw] max-h-[90vh]',
          'bg-background-neutral rounded-m',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Close button — absolute top-right */}
        {hasClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-s top-s flex items-center justify-center size-[28px] rounded-full border border-border-base cursor-pointer hover:bg-background-base transition-colors"
          >
            <Icon name="close" size={12} />
          </button>
        )}

        {/* Header */}
        {title && (
          <div className="flex gap-xs items-center w-full shrink-0">
            {hasBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="flex items-center justify-center size-[28px] rounded-full border border-border-base cursor-pointer hover:bg-background-base transition-colors shrink-0"
              >
                <Icon name="arrow-short-left" size={12} />
              </button>
            )}
            <div className="flex-1 min-w-0">
              <h2
                id={titleId}
                className="text-heading-s font-medium text-foreground-primary truncate"
              >
                {title}
              </h2>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-h-0 w-full overflow-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}
