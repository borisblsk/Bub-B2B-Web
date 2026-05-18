interface SwipePaginationProps {
  total?: number
  active?: number
  className?: string
}

export default function SwipePagination({
  total = 5,
  active = 0,
  className,
}: SwipePaginationProps) {
  return (
    <div
      className={[
        'flex gap-[3px] items-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={[
            'rounded-full shrink-0',
            i === active
              ? 'bg-foreground-primary w-[12px] h-[6px]'
              : 'bg-background-base-active size-[6px]',
          ].join(' ')}
        />
      ))}
    </div>
  )
}
