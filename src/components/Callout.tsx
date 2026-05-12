import { isValidElement, cloneElement, type ReactNode, type ReactElement } from 'react'
import StatusBox, { type StatusType } from './internal/StatusBox'
import { InfoCircleIcon, TickCircle1Icon, ExposureClosedIcon, WarningIcon } from './icons'

interface CalloutProps {
  type?: StatusType
  title: string
  description?: string
  icon?: ReactNode
  className?: string
}

const defaultIcons: Record<StatusType, ReactNode> = {
  neutral: <InfoCircleIcon />,
  info: <InfoCircleIcon />,
  success: <TickCircle1Icon />,
  error: <ExposureClosedIcon />,
  warning: <WarningIcon />,
}

function renderIcon(icon: ReactNode) {
  if (isValidElement(icon)) {
    return cloneElement(icon as ReactElement<{ size?: number; color?: string }>, {
      size: 24,
      color: 'currentColor',
    })
  }
  return icon
}

export default function Callout({
  type = 'neutral',
  title,
  description,
  icon,
  className,
}: CalloutProps) {
  const iconElement = icon ?? defaultIcons[type]

  return (
    <StatusBox
      type={type}
      intensity="subtle"
      className={[
        'flex gap-xs items-center p-s rounded-s w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {iconElement && (
        <div className="flex items-center self-stretch shrink-0">
          <span className="flex items-center justify-center">
            {renderIcon(iconElement)}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-xxs items-start justify-center min-w-0">
        <span className="text-body-m font-normal text-foreground-primary w-full">
          {title}
        </span>
        {description && (
          <span className="text-body-s font-normal text-foreground-primary-faded w-full">
            {description}
          </span>
        )}
      </div>
    </StatusBox>
  )
}
