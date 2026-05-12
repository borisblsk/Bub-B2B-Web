interface ProgressBarProps {
  value: number
  max?: number
  height?: number
  className?: string
  'aria-label'?: string
}

export default function ProgressBar({
  value,
  max = 100,
  height = 6,
  className,
  'aria-label': ariaLabel,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(value, max))
  const percentage = max > 0 ? (clamped / max) * 100 : 0

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      style={{ height: `${height}px` }}
      className={[
        'w-full rounded-full bg-background-brand-subtle overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        style={{ width: `${percentage}%`, height: '100%' }}
        className="rounded-full bg-foreground-brand transition-all duration-300 ease-out"
      />
    </div>
  )
}
