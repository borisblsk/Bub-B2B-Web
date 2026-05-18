import { Icon } from './icons'

type TableAlign = 'left' | 'center' | 'right'

interface TableHeaderCellProps {
  label: string
  align?: TableAlign
  sortable?: boolean
  className?: string
}

export default function TableHeaderCell({
  label,
  align = 'left',
  sortable = true,
  className,
}: TableHeaderCellProps) {
  const alignClasses =
    align === 'right'
      ? 'justify-end'
      : align === 'center'
        ? 'justify-center'
        : ''

  return (
    <th
      scope="col"
      className={[
        'flex gap-xxs items-center h-[31px] pb-m text-body-s font-normal text-foreground-primary-faded whitespace-nowrap',
        alignClasses,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {align === 'right' && sortable && (
        <Icon name="arrow-down" size={12} />
      )}
      <span>{label}</span>
      {align !== 'right' && sortable && (
        <Icon name="arrow-down" size={12} />
      )}
    </th>
  )
}
