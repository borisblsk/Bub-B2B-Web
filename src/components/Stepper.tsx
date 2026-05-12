import { TickCircleIcon, LoadingIcon } from './icons'

type StepVariant = 'completed' | 'in-progress' | 'not-started'

interface StepperStep {
  variant: StepVariant
  title: string
  timestamp?: string
}

interface StepperProps {
  steps: StepperStep[]
  className?: string
}

function StepIndicator({ variant }: { variant: StepVariant }) {
  if (variant === 'completed') {
    return <TickCircleIcon width={16} height={16} color="currentColor" className="text-foreground-primary shrink-0" />
  }
  if (variant === 'in-progress') {
    return <LoadingIcon width={16} height={16} color="currentColor" className="text-foreground-primary-faded animate-spin shrink-0" />
  }
  // not-started: empty circle outline
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="8" cy="8" r="6.5" stroke="#A3A3A3" strokeWidth="1.5" />
    </svg>
  )
}

function StepperItem({ step, isLast }: { step: StepperStep; isLast: boolean }) {
  const isNotStarted = step.variant === 'not-started'
  const isCompleted = step.variant === 'completed'

  const lineColor = isCompleted
    ? 'bg-foreground-primary'
    : 'bg-border-base'

  const titleColor = isNotStarted
    ? 'text-foreground-disabled'
    : 'text-foreground-primary'

  const timestampColor = isNotStarted
    ? 'text-foreground-disabled'
    : 'text-foreground-primary-faded-subtle'

  return (
    <div className="flex gap-xs items-start overflow-clip">
      {/* Left column: indicator + connector line */}
      <div
        className={[
          'flex flex-col items-center shrink-0 w-[20px] pb-xxs',
          isLast ? 'self-stretch' : 'h-[48px]',
        ].join(' ')}
      >
        <StepIndicator variant={step.variant} />
        {!isLast && (
          <div className={`flex-1 w-[2px] mt-xxs rounded-full ${lineColor}`} />
        )}
      </div>

      {/* Right column: title + timestamp */}
      <div className="flex flex-1 flex-col min-w-0 overflow-clip">
        <span className={`text-body-m font-medium ${titleColor}`}>
          {step.title}
        </span>
        {step.timestamp && (
          <span className={`text-body-m font-normal ${timestampColor}`}>
            {step.timestamp}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Stepper({ steps, className }: StepperProps) {
  return (
    <div
      role="list"
      className={['flex flex-col', className].filter(Boolean).join(' ')}
    >
      {steps.map((step, i) => (
        <div
          key={i}
          role="listitem"
          aria-current={step.variant === 'in-progress' ? 'step' : undefined}
        >
          <StepperItem step={step} isLast={i === steps.length - 1} />
        </div>
      ))}
    </div>
  )
}
