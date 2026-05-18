import type { ReactNode } from 'react'

interface ListItemLayoutProps {
  size: 'max' | 'min' | 'compact'
  variant?: 'default' | 'tile'
  interactive?: boolean
  onClick?: () => void
  leading?: ReactNode
  content: ReactNode
  trailing?: ReactNode
  className?: string
  /** @internal Force hover state for visual showcase only */
  _forceHover?: boolean
}

const sizeConfig = {
  max: {
    minH: 'min-h-[56px]',
    innerGap: 'gap-s',
    hoverInset: 'inset-y-[-4px] inset-x-[-8px]',
    hoverRadius: 'rounded-s',
  },
  min: {
    minH: 'min-h-[40px]',
    innerGap: 'gap-xs',
    hoverInset: 'inset-y-[-2px] inset-x-[-8px]',
    hoverRadius: 'rounded-xs',
  },
  compact: {
    minH: 'min-h-[25px]',
    innerGap: 'gap-s',
    hoverInset: 'inset-y-[-2px] inset-x-[-4px]',
    hoverRadius: 'rounded-xxs',
  },
} as const

export default function ListItemLayout({
  size,
  variant = 'default',
  interactive = false,
  onClick,
  leading,
  content,
  trailing,
  className,
  _forceHover = false,
}: ListItemLayoutProps) {
  const isTile = variant === 'tile'
  const cfg = sizeConfig[size]

  let containerClasses: string
  if (isTile) {
    containerClasses = [
      cfg.minH,
      'p-s rounded-s',
      _forceHover
        ? 'bg-background-base-subtle-hover'
        : 'bg-background-base-subtle border border-border-base hover:bg-background-base-subtle-hover hover:border-transparent',
    ].join(' ')
  } else {
    containerClasses = cfg.minH
  }

  return (
    <div
      className={[
        'flex gap-xs items-center w-full relative isolate group/row',
        containerClasses,
        interactive ? 'cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={interactive ? onClick : undefined}
    >
      {/* Hover background for default variant — extends beyond content bounds */}
      {!isTile && (
        <div
          className={[
            'absolute pointer-events-none -z-10',
            cfg.hoverInset,
            cfg.hoverRadius,
            _forceHover
              ? 'bg-background-base-subtle-hover'
              : 'bg-transparent group-hover/row:bg-background-base-subtle-hover',
          ].join(' ')}
        />
      )}

      <div className={`flex flex-1 ${cfg.innerGap} items-center min-w-0`}>
        {leading}
        {content}
      </div>

      {trailing && (
        <div className="flex gap-xs items-center justify-end shrink-0">
          {trailing}
        </div>
      )}
    </div>
  )
}
