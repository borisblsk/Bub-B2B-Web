import {
  AreaChart,
  Area,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts'

import AppLayout from '../components/AppLayout'
import Header from '../components/Header'
import Button from '../components/Button'
import UserAvatar from '../components/UserAvatar'
import CryptoAvatar from '../components/CryptoAvatar'
import Delta from '../components/Delta'
import Badge from '../components/Badge'
import ListItemMin from '../components/ListItemMin'
import Widget from '../components/Widget'
import WidgetHeader from '../components/WidgetHeader'
import {
  Icon,
  AddIcon,
  ThreeDotsMoreIcon,
  SettingIcon,
} from '../components/icons'

import promoBg from '../assets/meet-b1.png'

// --- Chart colors from tailwind config primitives ---
const BRAND_100 = '#FFDDDE'
const BRAND_500 = '#FF0055'
const DANGER_500 = '#FF3B30'

// --- Sample chart data ---
const balanceData = [
  { v: 40 }, { v: 55 }, { v: 48 }, { v: 62 }, { v: 58 }, { v: 72 },
  { v: 68 }, { v: 80 }, { v: 75 }, { v: 90 }, { v: 85 }, { v: 95 },
]

const btcData = [
  { v: 90 }, { v: 85 }, { v: 88 }, { v: 75 }, { v: 70 }, { v: 72 },
  { v: 65 }, { v: 60 }, { v: 55 }, { v: 58 }, { v: 50 }, { v: 45 },
]

const ethData = [
  { v: 80 }, { v: 78 }, { v: 82 }, { v: 70 }, { v: 65 }, { v: 68 },
  { v: 60 }, { v: 55 }, { v: 52 }, { v: 48 }, { v: 45 }, { v: 40 },
]

// --- Time tab options ---
const timeTabs = ['24h', '7d', '1M', '1Y', 'Max'] as const

// --- Empty state pattern ---
function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex-1 bg-background-base-subtle rounded-s flex flex-col items-center justify-center gap-xxs p-m">
      <p className="text-body-m text-foreground-primary">{title}</p>
      <p className="text-body-s text-foreground-primary-faded-subtle text-center">{subtitle}</p>
    </div>
  )
}

// --- Crypto token card ---
function CryptoTokenCard({
  symbol,
  name,
  ticker,
  delta,
}: {
  symbol: string
  name: string
  ticker: string
  delta: string
}) {
  return (
    <div className="border border-border-base rounded-s p-m flex-1 flex flex-col gap-m min-w-0">
      <div className="flex-1 flex flex-col gap-xs">
        <div className="flex gap-xs items-start">
          <div className="flex flex-col gap-xs flex-1 min-w-0">
            <CryptoAvatar symbol={symbol} size={36} />
            <div className="flex items-center gap-xs">
              <span className="text-body-m text-foreground-primary">{name}</span>
              <span className="text-body-m text-foreground-primary-faded-subtle">{ticker}</span>
            </div>
          </div>
          <Button variant="transparent" size="extraSmall" iconOnly leftIcon={<ThreeDotsMoreIcon />} />
        </div>
        <Delta type="down" label={delta} />
      </div>
      <div className="flex flex-col">
        <span className="text-body-m text-foreground-primary">0</span>
        <span className="text-body-s text-foreground-primary-faded-subtle">$0.00</span>
      </div>
    </div>
  )
}

// --- Converter display box ---
function ConverterBox({ value, currency }: { value: string; currency: string }) {
  return (
    <div className="flex-1 flex items-center justify-between bg-background-base-subtle border border-border-base rounded-s px-s min-h-[40px]">
      <span className="text-body-m text-foreground-primary">{value}</span>
      <span className="text-body-s text-foreground-primary-faded-subtle">{currency}</span>
    </div>
  )
}

// --- Chart time tabs ---
function ChartTabs({ activeTab = '24h' }: { activeTab?: string }) {
  return (
    <div className="flex gap-xxs">
      {timeTabs.map((tab) => (
        <Button
          key={tab}
          variant={tab === activeTab ? 'tertiary' : 'ghosted'}
          size="extraSmall"
        >
          {tab}
        </Button>
      ))}
    </div>
  )
}

// --- Price chart widget ---
function PriceChartWidget({
  label,
  value,
  delta,
  data,
  converterLeft,
  converterRight,
}: {
  label: string
  value: string
  delta: string
  data: { v: number }[]
  converterLeft?: { value: string; currency: string }
  converterRight?: { value: string; currency: string }
}) {
  return (
    <Widget
      className="flex-1 h-widget-chart"
      title={
        <WidgetHeader label={label} amount={value} amountExtra={<Delta type="down" label={delta} />} />
      }
      actions={
        <Button variant="secondary" size="extraSmall" iconOnly leftIcon={<ThreeDotsMoreIcon />} />
      }
    >
      <div className="flex flex-col gap-xs flex-1 min-h-0">
        <ChartTabs />
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height={90}>
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={DANGER_500}
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-xs">
          <ConverterBox value={converterLeft?.value ?? '1'} currency={converterLeft?.currency ?? 'BTC'} />
          <ConverterBox value={converterRight?.value ?? '67,478.12'} currency={converterRight?.currency ?? 'USD'} />
        </div>
      </div>
    </Widget>
  )
}

// --- World clock column ---
function ClockColumn({ city, gmt, hours, minutes }: { city: string; gmt: string; hours: string; minutes: string }) {
  return (
    <div className="flex flex-col items-center gap-xs">
      <div className="text-[27px] font-bold text-foreground-primary tracking-[0.54px] leading-none text-center" style={{ fontFamily: "'Dogica Pixel', monospace" }}>
        <p className="leading-[34px]">{hours}</p>
        <p className="leading-[34px]">{minutes}</p>
      </div>
      <div className="flex flex-col gap-xxs items-center">
        <p className="text-body-s text-foreground-primary text-center">{city}</p>
        <p className="text-body-s text-foreground-primary-faded-subtle text-center">{gmt}</p>
      </div>
    </div>
  )
}

// --- Progress circle for account setup ---
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

export default function Dashboard() {
  return (
    <AppLayout
      header={
        <Header
          title="Welcome, Marco"
          hasBack={false}
          avatar={<UserAvatar size={36} variant="text" initials="MB" />}
        />
      }
      sidebar={<DashboardSidebar />}
    >

          {/* Body */}
          <div className="flex flex-col gap-2xl">
            {/* Quick Actions */}
            <div className="flex gap-xs">
              <Button variant="primary" size="small" leftIcon={<Icon name="arrow-diagonal3" />}>Send</Button>
              <Button variant="tertiary" size="small" leftIcon={<Icon name="arrow-diagonal1" />}>Request</Button>
              <Button variant="tertiary" size="small" leftIcon={<AddIcon />}>Receive</Button>
              <Button variant="tertiary" size="small" iconOnly leftIcon={<ThreeDotsMoreIcon />} />
            </div>

            {/* Row 1: Total Balance + Accounts */}
            <div className="flex gap-m">
              {/* Total Balance Widget */}
              <Widget
                className="flex-1 h-widget overflow-hidden"
                title={
                  <WidgetHeader
                    label="Total balance"
                    amount="$0.00"
                    amountExtra={
                      <>
                        <Badge type="success" size="extraSmall" label="$0.00" />
                        <Badge type="error" size="extraSmall" label="-$0.00" />
                      </>
                    }
                  />
                }
              >
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={balanceData}>
                      <defs>
                        <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={BRAND_100} stopOpacity={1} />
                          <stop offset="100%" stopColor={BRAND_100} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={BRAND_500}
                        strokeWidth={1.5}
                        fill="url(#balanceGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Widget>

              {/* Accounts Widget */}
              <Widget
                className="flex-1 h-widget"
                title={<WidgetHeader label="Accounts" />}
                actions={
                  <>
                    <Button variant="secondary" size="extraSmall" iconOnly leftIcon={<ThreeDotsMoreIcon />} />
                  </>
                }
              >
                <div className="flex flex-col gap-xxs">
                  <ListItemMin
                    leading={<Icon name="money" size={16} />}
                    title="Checking"
                    badge1={<Badge type="neutral" size="extraSmall" label="4822" />}
                    badge2={<Badge type="neutral" size="extraSmall" label="USD" />}
                    rightText="$0.00"
                    interactive
                  />
                  <ListItemMin
                    leading={<Icon name="money" size={16} />}
                    title="Savings"
                    badge1={<Badge type="neutral" size="extraSmall" label="8472" />}
                    badge2={<Badge type="neutral" size="extraSmall" label="USD" />}
                    rightText="$0.00"
                    interactive
                  />
                  <ListItemMin
                    leading={<Icon name="bitcoin-btc" size={16} />}
                    title="Main wallet"
                    badge1={<Badge type="neutral" size="extraSmall" label="0x3a...7F8c" />}
                    rightText="$0.00"
                    interactive
                  />
                </div>
              </Widget>
            </div>

            {/* Row 2: Money In + Money Out */}
            <div className="flex gap-m">
              {/* Money In */}
              <Widget
                className="flex-1 h-widget"
                title={
                  <WidgetHeader icon={<Icon name="arrow-diagonal1" />} label="Money in" amount="$0.00" />
                }
              >
                <EmptyState
                  title="No incoming transfers"
                  subtitle="Add funds to get started"
                />
              </Widget>

              {/* Money Out */}
              <Widget
                className="flex-1 h-widget"
                title={
                  <WidgetHeader icon={<Icon name="arrow-diagonal3" />} label="Money out" amount="–$0.00" />
                }
              >
                <EmptyState
                  title="No outgoing transfers"
                  subtitle="Add funds to get started"
                />
              </Widget>
            </div>

            {/* Checking Widget (full width, empty state) */}
            <Widget
              className="h-widget"
              title={
                <WidgetHeader icon={<Icon name="money" />} label="Checking · 4822 · USD" amount="$0.00" />
              }
              actions={
                <>
                  <Button variant="secondary" size="extraSmall" iconOnly leftIcon={<ThreeDotsMoreIcon />} />
                  <Button variant="secondary" size="extraSmall" iconOnly leftIcon={<SettingIcon />} />
                </>
              }
            >
              <EmptyState
                title="Add money to your account"
                subtitle="Start using this account by adding funds"
              />
            </Widget>

            {/* Main Wallet Widget */}
            <Widget
              className="h-widget"
              title={
                <WidgetHeader icon={<Icon name="bitcoin-btc" />} label="Main wallet · 0x3a...7F8c" amount="$0.00" />
              }
              actions={
                <>
                  <Button variant="secondary" size="extraSmall" leftIcon={<Icon name="arrow-diagonal1" />}>Deposit</Button>
                  <Button variant="secondary" size="extraSmall" leftIcon={<Icon name="arrow-diagonal3" />}>Withdrawal</Button>
                  <Button variant="secondary" size="extraSmall" iconOnly leftIcon={<ThreeDotsMoreIcon />} />
                  <Button variant="secondary" size="extraSmall" iconOnly leftIcon={<SettingIcon />} />
                </>
              }
            >
              <div className="flex gap-xs flex-1 min-h-0">
                <CryptoTokenCard symbol="BTC" name="Bitcoin" ticker="BTC" delta="–7.59%" />
                <CryptoTokenCard symbol="ETH" name="Ethereum" ticker="ETH" delta="–8.43%" />
                <CryptoTokenCard symbol="SOL" name="Solana" ticker="SOL" delta="–0.89%" />
                <button
                  type="button"
                  className="border border-border-base rounded-s p-m flex items-center justify-center min-w-[48px] cursor-pointer hover:bg-background-base-subtle transition-colors"
                >
                  <Icon name="add" size={20} />
                </button>
              </div>
            </Widget>

            {/* Row 3: BTC/USD + ETH/USD Charts */}
            <div className="flex gap-m">
              <PriceChartWidget
                label="BTC/USD"
                value="$67,478.12"
                delta="–7.59%"
                converterLeft={{ value: '1', currency: 'BTC' }}
                converterRight={{ value: '67,478.12', currency: 'USD' }}
                data={btcData}
              />
              <PriceChartWidget
                label="ETH/USD"
                value="$1,962.61"
                delta="–8.43%"
                converterLeft={{ value: '1', currency: 'ETH' }}
                converterRight={{ value: '1,962.61', currency: 'USD' }}
                data={ethData}
              />
            </div>
          </div>

    </AppLayout>
  )
}

function DashboardSidebar() {
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

      {/* Promo Banner */}
      <div className="bg-gradient-elevated-inverse rounded-m shadow-widget h-[212px] overflow-hidden relative flex flex-col justify-between p-m">
        <div className="flex items-start justify-between relative z-10">
          <div className="flex flex-col w-[154px]">
            <p className="text-body-s text-foreground-primary-faded-subtle leading-[15px]">Welcome to Business bank.</p>
            <p className="text-body-s text-foreground-primary-faded-subtle leading-[15px]">See latest info and updates here</p>
          </div>
          <button
            type="button"
            className="shrink-0 size-[16px] flex items-center justify-center cursor-pointer"
            aria-label="Close promo"
          >
            <Icon name="close-circle" size={16} color="white" />
          </button>
        </div>
        <img
          src={promoBg}
          alt=""
          className="absolute h-[144px] left-[-2px] top-[26px] w-[330px] object-cover pointer-events-none"
        />
        <Button variant="tertiary" size="default" className="w-full relative z-10">Find out more</Button>
      </div>

      {/* World Clock */}
      <div className="bg-gradient-elevated rounded-m shadow-widget px-m py-l flex items-center justify-between">
        <ClockColumn city="California" gmt="GMT -8" hours="10" minutes="23" />
        <ClockColumn city="Tokyo" gmt="GMT +9" hours="12" minutes="23" />
        <ClockColumn city="Sydney" gmt="GMT +11" hours="00" minutes="23" />
        <ClockColumn city="Paris" gmt="GMT +1" hours="11" minutes="23" />
      </div>

      {/* Edit Widgets button */}
      <div className="flex justify-center">
        <Button variant="tertiary" size="extraSmall" leftIcon={<SettingIcon />}>Button</Button>
      </div>
    </div>
  )
}
