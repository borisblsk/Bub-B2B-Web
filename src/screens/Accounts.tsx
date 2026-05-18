import AppLayout from '../components/AppLayout'
import Header from '../components/Header'
import Button from '../components/Button'
import UserAvatar from '../components/UserAvatar'
import ListItemMax from '../components/ListItemMax'
import { Icon, AddIcon } from '../components/icons'

// --- Progress circle for account setup (shared with Dashboard) ---
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

export default function Accounts() {
  return (
    <AppLayout
      header={
        <Header
          title="Accounts"
          hasBack={false}
          avatar={<UserAvatar size={36} variant="text" initials="MB" />}
        />
      }
      sidebar={<AccountsSidebar />}
    >
      {/* Balance row */}
      <div className="flex gap-xs items-start w-full">
        <div className="flex flex-col gap-xxs items-start flex-1 min-w-0">
          <p className="text-body-m text-foreground-primary-faded-subtle">Total balance</p>
          <p className="text-promo-s font-normal text-foreground-primary">$0.00</p>
        </div>
        <div className="flex gap-xs items-center shrink-0">
          <Button variant="primary" size="small" leftIcon={<AddIcon />}>Add account</Button>
        </div>
      </div>

      {/* Accounts section */}
      <div className="flex flex-col gap-xs items-start w-full">
        <p className="text-body-m text-foreground-primary-faded-subtle w-full">Accounts</p>
        <div className="flex flex-col gap-xxs items-start w-full">
          <ListItemMax
            leading={<Icon name="money" size={16} />}
            title="Checking"
            leftSubtextBottom="4822 · USD"
            rightText="$0.00"
            interactive
          />
          <ListItemMax
            leading={<Icon name="money" size={16} />}
            title="Savings"
            leftSubtextBottom="8472 · USD"
            rightText="$0.00"
            interactive
          />
        </div>
      </div>

      {/* Wallets section */}
      <div className="flex flex-col gap-xs items-start w-full">
        <p className="text-body-m text-foreground-primary-faded-subtle w-full">Wallets</p>
        <ListItemMax
          leading={<Icon name="bitcoin-btc" size={16} />}
          title="Main wallet"
          leftSubtextBottom="0x3a...7F8c"
          rightText="$0.00"
          interactive
        />
      </div>
    </AppLayout>
  )
}

function AccountsSidebar() {
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
        <Button variant="secondary" size="default" className="w-full">Finish setup</Button>
      </div>

      {/* Add widgets button */}
      <div className="flex justify-center">
        <Button variant="tertiary" size="extraSmall" leftIcon={<AddIcon />}>Add widgets</Button>
      </div>
    </div>
  )
}
