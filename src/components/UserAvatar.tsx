import { useState } from 'react'
import Avatar, { textSizeByAvatar } from './internal/Avatar'
import { UserIcon } from './icons'

type UserAvatarSize = 24 | 36 | 52 | 64

interface UserAvatarProps {
  size?: UserAvatarSize
  variant?: 'default' | 'photo' | 'text'
  src?: string
  initials?: string
  alt?: string
  className?: string
}

// 5-color palette — sum of consecutive char pairs mod 5 always differs
const palette = [
  { bg: 'bg-brand-100', text: 'text-brand-700' },
  { bg: 'bg-success-100', text: 'text-success-700' },
  { bg: 'bg-warning-100', text: 'text-warning-700' },
  { bg: 'bg-danger-100', text: 'text-danger-700' },
  { bg: 'bg-gray-100', text: 'text-gray-700' },
]

function getColor(initials: string) {
  const code = initials.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return palette[code % palette.length]
}

// Icon at ~50% of container size
const defaultIconSize: Record<UserAvatarSize, number> = {
  24: 12,
  36: 18,
  52: 26,
  64: 32,
}

export default function UserAvatar({
  size = 36,
  variant = 'default',
  src,
  initials = '',
  alt,
  className,
}: UserAvatarProps) {
  const [imgError, setImgError] = useState(false)

  // Photo fallback: if image fails, show initials or default icon
  const effectiveVariant = variant === 'photo' && (imgError || !src)
    ? (initials ? 'text' : 'default')
    : variant

  if (effectiveVariant === 'default') {
    const iconSize = defaultIconSize[size]
    return (
      <Avatar size={size} hasBorder className={`bg-background-base-subtle ${className ?? ''}`}>
        <UserIcon width={iconSize} height={iconSize} color="currentColor" />
      </Avatar>
    )
  }

  if (effectiveVariant === 'photo') {
    return (
      <Avatar size={size} className={className}>
        <img
          src={src}
          alt={alt ?? 'User avatar'}
          className="absolute inset-0 size-full object-cover rounded-full"
          onError={() => setImgError(true)}
        />
      </Avatar>
    )
  }

  // Text variant
  const color = getColor(initials)
  const textSize = textSizeByAvatar[size]
  return (
    <Avatar size={size} className={`${color.bg} ${className ?? ''}`}>
      <span className={`${textSize} ${color.text} font-normal leading-none`}>
        {initials.slice(0, 2).toUpperCase()}
      </span>
    </Avatar>
  )
}
