import type { ReactNode } from 'react'

type TableRowSize = 'default' | 'small'

interface TableRowProps {
  size?: TableRowSize
  children: ReactNode
  onClick?: () => void
  className?: string
}

const sizeClasses: Record<TableRowSize, string> = {
  default: 'h-[60px]',
  small: 'h-[40px]',
}

export default function TableRow({
  size = 'default',
  children,
  onClick,
  className,
}: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={[
        'flex items-center rounded-xs hover:bg-background-neutral-hover transition-colors -mx-xs px-xs',
        sizeClasses[size],
        onClick ? 'cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </tr>
  )
}
