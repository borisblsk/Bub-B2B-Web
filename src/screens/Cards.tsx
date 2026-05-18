import AppLayout from '../components/AppLayout'
import Header from '../components/Header'
import Button from '../components/Button'
import UserAvatar from '../components/UserAvatar'
import ListItemMax from '../components/ListItemMax'
import CardMin from '../components/CardMin'
import Badge from '../components/Badge'
import { Icon, AddIcon } from '../components/icons'

// --- Sidebar ---
function CardsSidebar() {
  return (
    <div className="flex flex-col gap-3xl">
      {/* Account Setup Callout */}
      <div className="bg-background-neutral shadow-widget rounded-m p-m flex flex-col gap-xl">
        <div className="flex gap-s items-start">
          <ProgressCircle />
          <div className="flex flex-col gap-xxs flex-1 min-w-0">
            <p className="text-body-m font-medium text-foreground-primary">Finish account setup</p>
            <p className="text-body-m text-foreground-primary-faded-subtle">Complete a few easy steps to get your account up and running</p>
          </div>
        </div>
        <Button variant="secondary" size="default" className="w-full">Button</Button>
      </div>

      {/* Add widgets button */}
      <div className="flex justify-center">
        <Button variant="tertiary" size="extraSmall" leftIcon={<AddIcon />}>Button</Button>
      </div>
    </div>
  )
}

// --- Progress circle (shared pattern) ---
function ProgressCircle() {
  return (
    <div className="relative shrink-0 flex items-center justify-center" style={{ width: 40, height: 40 }}>
      <svg width={40} height={40} viewBox="0 0 40 40" className="absolute inset-0">
        <circle cx="20" cy="20" r="17" fill="none" stroke="#EFEFEF" strokeWidth="3" />
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="#FF0055"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 17 * 0.25} ${2 * Math.PI * 17 * 0.75}`}
          transform="rotate(-90 20 20)"
        />
      </svg>
      <span className="text-body-xs font-medium text-foreground-primary relative">1/4</span>
    </div>
  )
}

// --- Card data ---
const cards = [
  { name: 'Main', number: '••2255', type: 'Visa Virtual' },
  { name: 'Operational staff', number: '••3872', type: 'Visa Virtual' },
  { name: 'Marketing budget', number: '••7482', type: 'Visa Virtual' },
  { name: 'Tech budget', number: '••5728', type: 'Visa Virtual' },
]

export default function Cards() {
  return (
    <AppLayout
      header={
        <Header
          title="Cards"
          hasBack={false}
          avatar={<UserAvatar size={36} variant="text" initials="MB" />}
        />
      }
      sidebar={<CardsSidebar />}
    >
      {/* Toolbar row */}
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-xs items-center">
          <Button variant="tertiary" size="small" iconOnly leftIcon={<Icon name="grid-list" />} />
          <Button variant="transparent" size="small" iconOnly leftIcon={<Icon name="grid-tiles" />} />
        </div>
        <div className="flex gap-xs items-center">
          <Button variant="primary" size="small" leftIcon={<AddIcon />}>Add Card</Button>
        </div>
      </div>

      {/* Card list */}
      <div className="flex flex-col gap-xxs items-start w-full">
        {cards.map((card) => (
          <ListItemMax
            key={card.number}
            leading={<CardMin />}
            title={card.name}
            chip={<Badge type="success" size="extraSmall" label="Active" />}
            leftSubtextBottom={`${card.number} · ${card.type}`}
            rightText="$0.00"
            interactive
          />
        ))}
      </div>
    </AppLayout>
  )
}
