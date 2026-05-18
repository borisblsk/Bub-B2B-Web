import type { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import SideBar from './SideBar'
import { Icon } from './icons'

const navItems = [
  { key: 'home', label: 'Home', icon: 'home' as const, route: '/dashboard' },
  { key: 'accounts', label: 'Accounts', icon: 'bank' as const, route: '/accounts' },
  { key: 'cards', label: 'Cards', icon: 'card' as const, route: '/cards' },
  { key: 'transactions', label: 'Transactions', icon: 'arrow-swap' as const, route: '/transactions' },
  { key: 'payments', label: 'Payments', icon: 'money-change' as const, route: '/payments', hasChevron: true },
]

interface AppLayoutProps {
  header: ReactNode
  sidebar?: ReactNode
  children: ReactNode
}

export default function AppLayout({ header, sidebar, children }: AppLayoutProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="bg-background-page min-h-screen w-full">
      <div className="flex gap-xl p-xl overflow-auto min-h-screen">
        <NavBar
          variant="default"
          companyName="Buburuza EU GmbH"
          items={navItems.map((item) => ({
            key: item.key,
            label: item.label,
            icon: <Icon name={item.icon} size={16} />,
            active: pathname === item.route,
            hasChevron: item.hasChevron,
            onClick: () => navigate(item.route),
          }))}
          className="shrink-0 self-stretch"
        />

        <div className="flex-1 flex flex-col gap-3xl min-w-0">
          {header}
          {children}
        </div>

        {sidebar != null && (
          <SideBar>
            {sidebar}
          </SideBar>
        )}
      </div>
    </div>
  )
}
