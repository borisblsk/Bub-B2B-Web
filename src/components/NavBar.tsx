import type { ReactNode } from 'react'
import NavBarButton from './NavBarButton'
import BrandAvatar from './BrandAvatar'
import { Icon } from './icons'

interface NavBarDefaultItem {
  key: string
  label: string
  icon: ReactNode
  active?: boolean
  hasChevron?: boolean
  onClick?: () => void
}

interface NavBarSettingsSection {
  key: string
  label: string
  icon: ReactNode
  items: { key: string; label: string; active?: boolean; onClick?: () => void }[]
}

interface NavBarProps {
  variant?: 'default' | 'settings'
  companyName?: string
  companyLogo?: ReactNode
  onCompanyClick?: () => void
  items?: NavBarDefaultItem[]
  sections?: NavBarSettingsSection[]
  onBack?: () => void
  className?: string
}

function CompanyPill({
  companyName,
  companyLogo,
  onClick,
}: {
  companyName: string
  companyLogo?: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-xs h-[36px] pl-xxs pr-m bg-background-base rounded-full shrink-0 cursor-pointer hover:bg-background-base-hover transition-colors"
    >
      <div className="shrink-0">
        {companyLogo ?? <BrandAvatar size={24} brand="buburuza" />}
      </div>
      <span className="text-body-s font-medium text-foreground-primary whitespace-nowrap">
        {companyName}
      </span>
      <Icon name="arrow-short-down" size={16} />
    </button>
  )
}

export default function NavBar({
  variant = 'default',
  companyName = 'Buburuza EU GmbH',
  companyLogo,
  onCompanyClick,
  items = [],
  sections = [],
  onBack,
  className,
}: NavBarProps) {
  return (
    <nav
      className={[
        'flex flex-col gap-3xl items-start w-[212px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Company pill — shared by both variants */}
      <CompanyPill
        companyName={companyName}
        companyLogo={companyLogo}
        onClick={onCompanyClick}
      />

      {/* Default variant — flat nav item list */}
      {variant === 'default' && (
        <div className="flex flex-col gap-xxs items-start w-full">
          {items.map((item) => (
            <NavBarButton
              key={item.key}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
              trailingIcon={item.hasChevron ? <Icon name="arrow-short-down" /> : undefined}
            >
              {item.label}
            </NavBarButton>
          ))}
        </div>
      )}

      {/* Settings variant — back button + grouped sections */}
      {variant === 'settings' && (
        <>
          <NavBarButton
            icon={<Icon name="arrow-short-left" />}
            onClick={onBack}
          >
            Settings
          </NavBarButton>

          <div className="flex flex-col gap-m items-start w-full">
            {sections.map((section) => (
              <div key={section.key} className="flex flex-col gap-xxs items-start w-full">
                {/* Section header */}
                <NavBarButton icon={section.icon}>
                  {section.label}
                </NavBarButton>

                {/* Indented sub-items */}
                {/* pl-[28px] aligns sub-item text with parent label: parent px-m(16) + icon(16) + gap-xs(8) - sub px-s(12) = 28 */}
                <div className="flex flex-col gap-xxs items-start w-full pl-[28px]">
                  {section.items.map((sub) => (
                    <NavBarButton
                      key={sub.key}
                      variant="secondary"
                      active={sub.active}
                      onClick={sub.onClick}
                    >
                      {sub.label}
                    </NavBarButton>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </nav>
  )
}
