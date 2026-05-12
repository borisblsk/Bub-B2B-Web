import type { ReactNode } from 'react'

type AvatarSize = 24 | 36 | 52 | 64

interface AvatarProps {
  size: AvatarSize
  shape?: 'circle' | 'rounded'
  hasBorder?: boolean
  className?: string
  children: ReactNode
}

const sizeClasses: Record<AvatarSize, string> = {
  24: 'size-[24px]',
  36: 'size-[36px]',
  52: 'size-[52px]',
  64: 'size-[64px]',
}

const shapeClasses: Record<NonNullable<AvatarProps['shape']>, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-s',
}

export const iconSizeByAvatar: Record<AvatarSize, number> = {
  24: 12,
  36: 16,
  52: 24,
  64: 28,
}

export const textSizeByAvatar: Record<AvatarSize, string> = {
  24: 'text-body-xs',
  36: 'text-body-s',
  52: 'text-[18px]',
  64: 'text-[22px]',
}

export default function Avatar({
  size,
  shape = 'circle',
  hasBorder = false,
  className,
  children,
}: AvatarProps) {
  return (
    <div
      className={[
        'relative overflow-clip flex items-center justify-center shrink-0',
        sizeClasses[size],
        shapeClasses[shape],
        hasBorder ? 'border-[0.5px] border-border-base' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
