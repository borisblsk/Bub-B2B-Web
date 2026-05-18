import type { ReactNode } from 'react'
import { Icon } from './icons'
import UserAvatar from './UserAvatar'

interface HeaderProps {
  title: string
  hasBack?: boolean
  onBack?: () => void
  onSearch?: () => void
  onNotification?: () => void
  avatar?: ReactNode
  className?: string
}

function IconButton({
  icon,
  onClick,
  label,
}: {
  icon: ReactNode
  onClick?: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center shrink-0 size-[36px] rounded-full bg-background-base cursor-pointer hover:bg-background-base-hover transition-colors"
    >
      {icon}
    </button>
  )
}

export default function Header({
  title,
  hasBack = true,
  onBack,
  onSearch,
  onNotification,
  avatar,
  className,
}: HeaderProps) {
  return (
    <div
      className={[
        'flex gap-xs items-center w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {hasBack && (
        <IconButton
          icon={<Icon name="arrow-short-left" size={16} />}
          onClick={onBack}
          label="Go back"
        />
      )}

      <h1 className="flex-1 min-w-0 text-heading-s font-medium text-foreground-primary truncate">
        {title}
      </h1>

      <IconButton
        icon={<Icon name="search" size={16} />}
        onClick={onSearch}
        label="Search"
      />

      <IconButton
        icon={<Icon name="notification" size={16} />}
        onClick={onNotification}
        label="Notifications"
      />

      {avatar ?? <UserAvatar size={36} variant="text" initials="MB" />}
    </div>
  )
}
