import StatusBox, { type StatusType } from './internal/StatusBox'

type BadgeSize = 'default' | 'small' | 'extraSmall'

interface BadgeProps {
  type?: StatusType
  size?: BadgeSize
  label: string
  className?: string
}

const sizeClasses: Record<BadgeSize, string> = {
  default: 'h-[32px] px-s text-body-s font-medium',
  small: 'px-xs py-xxs text-body-xs font-normal',
  extraSmall: 'px-[6px] pt-[3px] pb-[2px] text-body-xs font-normal',
}

export default function Badge({
  type = 'neutral',
  size = 'default',
  label,
  className,
}: BadgeProps) {
  return (
    <StatusBox
      type={type}
      intensity="subtle"
      className={[
        'inline-flex gap-xxs items-center justify-center overflow-clip rounded-full border border-solid',
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="whitespace-nowrap">{label}</span>
    </StatusBox>
  )
}
