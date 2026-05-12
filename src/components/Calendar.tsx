import { useState, useMemo } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from './icons'

interface CalendarProps {
  value?: Date | null
  onChange?: (date: Date) => void
  rangeStart?: Date | null
  rangeEnd?: Date | null
  onRangeChange?: (start: Date | null, end: Date | null) => void
  variant?: 'default' | 'range'
  className?: string
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function isSameDay(a: Date | null | undefined, b: Date | null | undefined) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isToday(date: Date) {
  return isSameDay(date, new Date())
}

function isInRange(date: Date, start: Date | null | undefined, end: Date | null | undefined) {
  if (!start || !end) return false
  const t = date.getTime()
  return t >= start.getTime() && t <= end.getTime()
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function MonthGrid({
  year,
  month,
  selected,
  rangeStart,
  rangeEnd,
  onSelect,
}: {
  year: number
  month: number
  selected?: Date | null
  rangeStart?: Date | null
  rangeEnd?: Date | null
  onSelect: (date: Date) => void
}) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfWeek(year, month)
  const prevMonthDays = getDaysInMonth(year, month - 1)

  const cells: { day: number; inMonth: boolean; date: Date }[] = []

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i
    cells.push({ day: d, inMonth: false, date: new Date(year, month - 1, d) })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, date: new Date(year, month, d) })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, inMonth: false, date: new Date(year, month + 1, d) })
  }

  return (
    <div className="flex flex-col gap-none">
      <div className="grid grid-cols-7 gap-none">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="flex items-center justify-center h-[32px] text-body-xs font-medium text-foreground-primary-faded">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-none">
        {cells.map((cell, i) => {
          const isSelected = isSameDay(cell.date, selected)
          const isTodayDate = cell.inMonth && isToday(cell.date)
          const inRange = isInRange(cell.date, rangeStart, rangeEnd)
          const isRangeEdge = isSameDay(cell.date, rangeStart) || isSameDay(cell.date, rangeEnd)

          let dayClasses = 'flex items-center justify-center h-[32px] text-body-s font-normal rounded-full transition-colors cursor-pointer'

          if (!cell.inMonth) {
            dayClasses += ' text-foreground-primary-faded-subtle'
          } else if (isSelected || isRangeEdge) {
            dayClasses += ' bg-background-primary text-foreground-primary-inverse font-medium'
          } else if (inRange) {
            dayClasses += ' bg-background-base text-foreground-primary'
          } else if (isTodayDate) {
            dayClasses += ' text-foreground-brand font-medium'
          } else {
            dayClasses += ' text-foreground-primary hover:bg-background-base'
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(cell.date)}
              className={dayClasses}
            >
              {cell.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function Calendar({
  value,
  onChange,
  rangeStart,
  rangeEnd,
  onRangeChange,
  variant = 'default',
  className,
}: CalendarProps) {
  const now = new Date()
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? now.getFullYear())
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? now.getMonth())
  const [rangeSelecting, setRangeSelecting] = useState<'start' | 'end'>('start')

  const secondMonth = useMemo(() => {
    const m = viewMonth + 1
    return { year: m > 11 ? viewYear + 1 : viewYear, month: m > 11 ? 0 : m }
  }, [viewYear, viewMonth])

  function prev() {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11) }
    else setViewMonth(viewMonth - 1)
  }

  function next() {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0) }
    else setViewMonth(viewMonth + 1)
  }

  function handleSelect(date: Date) {
    if (variant === 'range' && onRangeChange) {
      if (rangeSelecting === 'start') {
        onRangeChange(date, null)
        setRangeSelecting('end')
      } else {
        if (rangeStart && date < rangeStart) {
          onRangeChange(date, rangeStart)
        } else {
          onRangeChange(rangeStart ?? date, date)
        }
        setRangeSelecting('start')
      }
    } else {
      onChange?.(date)
    }
  }

  const headerLabel = `${MONTH_NAMES[viewMonth]}, ${viewYear}`

  return (
    <div className={`flex gap-2xl ${className ?? ''}`}>
      <div className="flex flex-col gap-xs" style={{ width: 280 }}>
        <div className="flex items-center justify-between px-xs">
          <button type="button" onClick={prev} className="cursor-pointer text-foreground-primary-faded hover:text-foreground-primary">
            <ArrowLeftIcon width={16} height={16} color="currentColor" />
          </button>
          <span className="text-body-m font-medium text-foreground-primary">{headerLabel}</span>
          {variant === 'default' && (
            <button type="button" onClick={next} className="cursor-pointer text-foreground-primary-faded hover:text-foreground-primary">
              <ArrowRightIcon width={16} height={16} color="currentColor" />
            </button>
          )}
          {variant === 'range' && <div style={{ width: 16 }} />}
        </div>
        <MonthGrid
          year={viewYear}
          month={viewMonth}
          selected={variant === 'default' ? value : undefined}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onSelect={handleSelect}
        />
      </div>
      {variant === 'range' && (
        <div className="flex flex-col gap-xs" style={{ width: 280 }}>
          <div className="flex items-center justify-between px-xs">
            <div style={{ width: 16 }} />
            <span className="text-body-m font-medium text-foreground-primary">
              {MONTH_NAMES[secondMonth.month]}, {secondMonth.year}
            </span>
            <button type="button" onClick={next} className="cursor-pointer text-foreground-primary-faded hover:text-foreground-primary">
              <ArrowRightIcon width={16} height={16} color="currentColor" />
            </button>
          </div>
          <MonthGrid
            year={secondMonth.year}
            month={secondMonth.month}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  )
}
