import AppLayout from '../components/AppLayout'
import Header from '../components/Header'
import UserAvatar from '../components/UserAvatar'

export default function Payments() {
  return (
    <AppLayout
      header={
        <Header
          title="Payments"
          hasBack={false}
          avatar={<UserAvatar size={36} variant="text" initials="MB" />}
        />
      }
    >
      <div className="flex-1 flex items-center justify-center">
        <p className="text-body-m text-foreground-primary-faded-subtle">Coming soon</p>
      </div>
    </AppLayout>
  )
}
