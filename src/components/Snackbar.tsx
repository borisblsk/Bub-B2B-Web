import { isValidElement, cloneElement, type ReactNode, type ReactElement } from 'react'
import StatusBox, { type StatusType } from './internal/StatusBox'
import { InfoCircleIcon, TickCircle1Icon, ExposureClosedIcon, WarningIcon } from './icons'

interface SnackbarProps {
  type?: StatusType
  label: string
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
      size: 16,
      color: 'currentColor',
    })
  }
  return icon
}

export default function Snackbar({
  type = 'neutral',
  label,
  icon,
  className,
}: SnackbarProps) {
  const iconElement = icon ?? defaultIcons[type]

  return (
    <StatusBox
      type={type}
      intensity="solid"
      className={[
        'inline-flex gap-xxs items-center justify-center overflow-clip pl-s pr-m py-xs rounded-xs',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {iconElement && (
        <span className="shrink-0 flex items-center justify-center">
          {renderIcon(iconElement)}
        </span>
      )}
      <span className="text-body-s font-normal whitespace-nowrap">{label}</span>
    </StatusBox>
  )
}
