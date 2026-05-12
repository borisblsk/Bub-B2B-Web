interface CalloutElevatedProps {
  title: string
  description?: string
  className?: string
}

export default function CalloutElevated({
  title,
  description,
  className,
}: CalloutElevatedProps) {
  return (
    <div
      className={[
        'flex gap-xs items-center overflow-clip px-xl py-m rounded-m w-full',
        'bg-gradient-elevated-inverse',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex flex-1 flex-col gap-xs items-start min-w-0 overflow-clip">
        <span className="text-heading-xs font-medium text-foreground-primary-inverse w-full">
          {title}
        </span>
        {description && (
          <span className="text-body-s font-normal text-foreground-primary-faded-subtle w-full">
            {description}
          </span>
        )}
      </div>
    </div>
  )
}
