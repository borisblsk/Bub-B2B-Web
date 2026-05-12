import { useState, type ReactNode } from 'react'
import Input from './Input'
import { SearchIcon } from './icons'

interface DropdownProps {
  children: ReactNode
  searchable?: boolean
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
  actions?: ReactNode
  className?: string
}

export default function Dropdown({
  children,
  searchable = true,
  searchPlaceholder = 'Search',
  onSearchChange,
  actions,
  className,
}: DropdownProps) {
  const [search, setSearch] = useState('')

  return (
    <div
      className={[
        'flex flex-col bg-background-neutral rounded-s shadow-dropdown overflow-clip',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {searchable && (
        <div className="px-xs pt-xs">
          <Input
            placeholder={searchPlaceholder}
            leftIcon={<SearchIcon />}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              onSearchChange?.(e.target.value)
            }}
            onClear={() => {
              setSearch('')
              onSearchChange?.('')
            }}
          />
        </div>
      )}
      <div className="flex-1 overflow-y-auto px-xs py-xs" style={{ maxHeight: 240 }}>
        {children}
      </div>
      {actions && (
        <div className="flex items-center gap-xs px-s py-s border-t border-border-base">
          {actions}
        </div>
      )}
    </div>
  )
}
