import Widget from '../components/Widget'
import WidgetHeader from '../components/WidgetHeader'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { AddIcon, ThreeDotsMoreIcon, SettingIcon } from '../components/icons'

export default function WidgetPreview() {
  return (
    <div className="bg-background-page min-h-screen p-3xl flex flex-col gap-xl max-w-[800px] mx-auto">
      <h1 className="text-heading-m font-medium text-foreground-primary">Widget Component</h1>

      {/* 1. Simple title only */}
      <Widget title={<WidgetHeader label="Total balance" />}>
        <div className="h-[120px] rounded-xs bg-background-base flex items-center justify-center">
          <p className="text-body-s text-foreground-primary-faded">Chart placeholder</p>
        </div>
      </Widget>

      {/* 2. Title with value */}
      <Widget
        title={
          <WidgetHeader
            label="Total balance"
            amount="$12,450.00"
            amountExtra={
              <>
                <Badge type="success" size="extraSmall" label="+$320" />
                <Badge type="error" size="extraSmall" label="–$45" />
              </>
            }
          />
        }
      >
        <div className="h-[120px] rounded-xs bg-background-base flex items-center justify-center">
          <p className="text-body-s text-foreground-primary-faded">Chart placeholder</p>
        </div>
      </Widget>

      {/* 3. Title + actions */}
      <Widget
        title={<WidgetHeader label="Accounts" />}
        actions={
          <>
            <Button variant="tertiary" size="small" leftIcon={<AddIcon />}>
              Add Account
            </Button>
            <Button variant="tertiary" size="small" iconOnly leftIcon={<ThreeDotsMoreIcon />} />
          </>
        }
      >
        <div className="flex flex-col gap-xxs">
          <div className="flex justify-between py-xs">
            <p className="text-body-m text-foreground-primary">Checking</p>
            <p className="text-body-m text-foreground-primary">$8,200.00</p>
          </div>
          <div className="flex justify-between py-xs">
            <p className="text-body-m text-foreground-primary">Savings</p>
            <p className="text-body-m text-foreground-primary">$4,250.00</p>
          </div>
        </div>
      </Widget>

      {/* 4. Complex header with multiple actions */}
      <Widget
        title={<WidgetHeader label="Checking · 4822 · USD" amount="$8,200.00" />}
        actions={
          <>
            <Button variant="tertiary" size="small" leftIcon={<AddIcon />}>
              Receive
            </Button>
            <Button variant="tertiary" size="small" iconOnly leftIcon={<ThreeDotsMoreIcon />} />
            <Button variant="tertiary" size="small" iconOnly leftIcon={<SettingIcon />} />
          </>
        }
      >
        <div className="h-[80px] rounded-xs bg-background-base flex items-center justify-center">
          <p className="text-body-s text-foreground-primary-faded">Transaction list placeholder</p>
        </div>
      </Widget>

      {/* 5. No header — pure content wrapper */}
      <Widget>
        <div className="flex items-center justify-center py-xl">
          <p className="text-body-m text-foreground-primary-faded">Widget with no header — just a content wrapper</p>
        </div>
      </Widget>
    </div>
  )
}
