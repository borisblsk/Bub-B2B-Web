import type { ReactNode } from 'react'
import Avatar, { iconSizeByAvatar } from './internal/Avatar'
import { isValidElement, cloneElement, type ReactElement } from 'react'

type ThumbnailSize = 24 | 36 | 52

interface ThumbnailProps {
  size?: ThumbnailSize
  variant?: 'simple' | 'elevated' | 'icon' | 'brand'
  icon?: ReactNode
  src?: string
  alt?: string
  className?: string
  children?: ReactNode
}

function renderIcon(icon: ReactNode, size: number, color: string) {
  if (isValidElement(icon)) {
    return cloneElement(icon as ReactElement<{ size?: number; color?: string }>, { size, color })
  }
  return icon
}

export default function Thumbnail({
  size = 36,
  variant = 'simple',
  icon,
  src,
  alt,
  className,
  children,
}: ThumbnailProps) {
  const iconSize = iconSizeByAvatar[size]
  const shape = variant === 'brand' ? 'circle' : 'rounded'

  let bgClass: string
  let iconColor: string
  let shadow = ''

  switch (variant) {
    case 'simple':
      bgClass = 'bg-background-base'
      iconColor = 'currentColor'
      break
    case 'elevated':
      bgClass = 'bg-gradient-elevated-inverse'
      iconColor = 'white'
      shadow = 'shadow-card'
      break
    case 'icon':
      bgClass = ''
      iconColor = 'currentColor'
      break
    case 'brand':
      bgClass = 'bg-background-brand'
      iconColor = 'white'
      break
  }

  const content = children ?? (
    src ? (
      <img src={src} alt={alt ?? ''} className="absolute inset-0 size-full object-cover" />
    ) : icon ? (
      renderIcon(icon, iconSize, iconColor)
    ) : null
  )

  return (
    <Avatar size={size} shape={shape} className={`${bgClass} ${shadow} ${className ?? ''}`}>
      {content}
    </Avatar>
  )
}
