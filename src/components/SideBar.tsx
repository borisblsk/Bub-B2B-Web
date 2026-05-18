import type { ReactNode } from 'react'

interface SideBarProps {
  children?: ReactNode
  className?: string
}

export default function SideBar({ children, className }: SideBarProps) {
  return (
    <div
      className={[
        'flex flex-col items-start w-[330px] max-w-[330px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex-1 min-h-0 w-full relative">
        {children}
      </div>
    </div>
  )
}
