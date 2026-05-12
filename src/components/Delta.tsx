type DeltaType = 'neutral' | 'up' | 'down'

interface DeltaProps {
  type?: DeltaType
  label: string
  className?: string
}

const typeStyles: Record<DeltaType, string> = {
  neutral: 'bg-background-base text-foreground-primary-faded',
  up: 'bg-background-positive text-foreground-success',
  down: 'bg-background-danger text-foreground-error',
}

export default function Delta({
  type = 'neutral',
  label,
  className,
}: DeltaProps) {
  return (
    <div
      className={[
        'inline-flex items-center justify-center overflow-clip px-xxs py-[1px] rounded-[2px]',
        typeStyles[type],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="text-body-xs font-medium whitespace-nowrap">{label}</span>
    </div>
  )
}
