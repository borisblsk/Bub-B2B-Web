import type { ReactNode } from 'react'
import Avatar from './internal/Avatar'
import { getFlag } from './registries/flags'

type FlagSize = 24 | 36 | 52

interface FlagAvatarProps {
  size?: FlagSize
  className?: string
  children?: ReactNode
  country?: string
}

export default function FlagAvatar({
  size = 36,
  className,
  children,
  country,
}: FlagAvatarProps) {
  if (children) {
    return (
      <Avatar size={size} className={className}>
        {children}
      </Avatar>
    )
  }

  const FlagSvg = country ? getFlag(country) : null

  if (FlagSvg) {
    return (
      <Avatar size={size} className={className}>
        <FlagSvg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: '9999px' }}
        />
      </Avatar>
    )
  }

  // Fallback: country code text
  return (
    <Avatar size={size} className={`bg-background-base ${className ?? ''}`}>
      <span className="text-foreground-primary-faded font-medium leading-none" style={{ fontSize: size * 0.35 }}>
        {(country ?? '??').slice(0, 2).toUpperCase()}
      </span>
    </Avatar>
  )
}
