// Portaled to document.body via createPortal. Controlled via isOpen prop.

import { useId, useEffect, useCallback, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './icons'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  title2?: string
  hasBack?: boolean
  onBack?: () => void
  hasClose?: boolean
  children?: ReactNode
  className?: string
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  title2,
  hasBack = false,
  onBack,
  hasClose = true,
  children,
  className,
}: DrawerProps) {
  // Keep mounted briefly during close animation
  const [shouldRender, setShouldRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Delay visibility by a frame so the initial translate-x-full is painted first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true))
      })
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => setShouldRender(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Esc to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (shouldRender) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [shouldRender, handleKeyDown])

  const titleId = useId()

  if (!shouldRender) return null

  // TODO a11y: focus trap (Tab cycles within drawer, not to page behind)
  // TODO a11y: return focus to trigger element on close
  // TODO a11y: scroll lock on body when drawer is open

  return createPortal(
    <div
      className={[
        'fixed inset-0 z-50 flex items-start justify-end p-xl',
        'transition-colors duration-200',
        isVisible ? 'bg-background-modal-overlay' : 'bg-transparent',
      ].join(' ')}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(e) => e.stopPropagation()}
        className={[
          'flex flex-col gap-xl p-s w-[448px] h-full',
          'bg-background-neutral rounded-m',
          'transition-transform duration-200 ease-out',
          isVisible ? 'translate-x-0' : 'translate-x-full',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Close button — normal flow, first child */}
        {hasClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center size-[28px] rounded-full border border-border-base cursor-pointer hover:bg-background-base transition-colors shrink-0"
          >
            <Icon name="close" size={12} />
          </button>
        )}

        {/* Header */}
        {title && (
          <div className="flex gap-xs items-center h-[28px] w-full shrink-0">
            {hasBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="flex items-center justify-center size-[28px] rounded-full cursor-pointer hover:bg-background-base transition-colors shrink-0"
              >
                <Icon name="arrow-short-left" size={12} />
              </button>
            )}
            <div className="flex flex-1 gap-xs items-center min-w-0">
              <h2
                id={titleId}
                className="text-body-m font-medium text-foreground-primary whitespace-nowrap"
              >
                {title}
              </h2>
              {title2 && (
                <>
                  <div className="w-[1px] h-[30px] bg-border-base shrink-0" />
                  <span className="text-body-m font-medium text-foreground-primary whitespace-nowrap">
                    {title2}
                  </span>
                </>
              )}
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
