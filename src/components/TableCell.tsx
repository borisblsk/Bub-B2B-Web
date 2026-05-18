import type { ReactNode } from 'react'

type TableAlign = 'left' | 'center' | 'right'

interface TableCellProps {
  align?: TableAlign
  children?: ReactNode
  className?: string
}

export default function TableCell({
  align = 'left',
  children,
  className,
}: TableCellProps) {
  const alignClasses =
    align === 'right'
      ? 'justify-end'
      : align === 'center'
        ? 'justify-center'
        : ''

  return (
    <td
      className={[
        'flex items-center px-s first:rounded-l-xs last:rounded-r-xs',
        alignClasses,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </td>
  )
}
