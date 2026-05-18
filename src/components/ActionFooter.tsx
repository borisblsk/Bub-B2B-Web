import type { ReactNode } from 'react'

type ActionFooterPurpose = 'footer' | 'drawer'

interface ActionFooterProps {
  purpose?: ActionFooterPurpose
  caption?: string
  leftButton?: ReactNode
  primaryButton: ReactNode
  rightButton?: ReactNode
  progressBar?: ReactNode
  showOverflow?: boolean
  className?: string
}

export default function ActionFooter({
  purpose = 'footer',
  caption,
  leftButton,
  primaryButton,
  rightButton,
  progressBar,
  showOverflow = false,
  className,
}: ActionFooterProps) {
  const isFooter = purpose === 'footer'
  const isDrawer = purpose === 'drawer'

  return (
    <div
      className={[
        'flex flex-col gap-m items-start relative w-full',
        isFooter ? 'pb-2xl px-l' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Overflow gradient */}
      {showOverflow && isFooter && (
        <div className="absolute backdrop-blur-[4px] bottom-0 left-0 right-0 h-[102px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}
      {showOverflow && isDrawer && (
        <div className="absolute inset-x-0 -top-[32px] h-[32px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}

      {/* Progress bar — drawer only */}
      {isDrawer && progressBar}

      {/* Caption */}
      {caption && (
        <p className="text-body-xs font-normal text-foreground-primary-faded text-center w-full">
          {caption}
        </p>
      )}

      {/* Buttons row */}
      <div className="flex gap-xs items-start w-full">
        {leftButton && (
          <div className={isDrawer ? 'flex-1 min-w-0' : 'shrink-0'}>
            {leftButton}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {primaryButton}
        </div>
        {rightButton && (
          <div className={isDrawer ? 'flex-1 min-w-0' : 'shrink-0'}>
            {rightButton}
          </div>
        )}
      </div>
    </div>
  )
}
