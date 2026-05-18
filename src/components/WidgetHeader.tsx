import { isValidElement, cloneElement, type ReactNode, type ReactElement } from 'react'

type AmountSize = 'default' | 'small'

const amountSizeClasses: Record<AmountSize, string> = {
  default: 'text-heading-s',
  small: 'text-body-m',
}

interface WidgetHeaderProps {
  /** Optional 16px leading icon */
  icon?: ReactNode
  /** Title label — e.g. "Total balance", "Checking · 4822 · USD" */
  label: string
  /** Amount value — e.g. "$0.00", "$67,478.12" */
  amount?: string
  /** Amount text size: 'default' (20px heading-s) or 'small' (14px body-m) */
  amountSize?: AmountSize
  /** Inline content after amount — Badges, Deltas, etc. */
  amountExtra?: ReactNode
}

function renderIcon(icon: ReactNode): ReactNode {
  if (isValidElement(icon)) {
    return cloneElement(icon as ReactElement<{ size?: number; width?: number; height?: number; color?: string }>, {
      size: 16,
      width: 16,
      height: 16,
      color: 'currentColor',
    })
  }
  return icon
}

export default function WidgetHeader({
  icon,
  label,
  amount,
  amountSize = 'default',
  amountExtra,
}: WidgetHeaderProps) {
  return (
    <div className="flex gap-xs items-start w-full">
      {icon && (
        <span className="shrink-0 flex items-center justify-center text-foreground-primary-faded-subtle">
          {renderIcon(icon)}
        </span>
      )}
      <div className="flex flex-col gap-xxs items-start flex-1 min-w-0">
        <p className="text-body-s text-foreground-primary-faded-subtle w-full">
          {label}
        </p>
        {amount != null && (
          <div className="flex gap-xxs items-center w-full">
            <p className={`${amountSizeClasses[amountSize]} font-normal text-foreground-primary whitespace-nowrap`}>
              {amount}
            </p>
            {amountExtra}
          </div>
        )}
      </div>
    </div>
  )
}
