import AppLayout from '../components/AppLayout'
import Header from '../components/Header'
import Button from '../components/Button'
import UserAvatar from '../components/UserAvatar'
import Widget from '../components/Widget'
import WidgetHeader from '../components/WidgetHeader'
import TableRow from '../components/TableRow'
import TableCell from '../components/TableCell'
import TableHeaderCell from '../components/TableHeaderCell'
import BrandAvatar from '../components/BrandAvatar'
import CardMin from '../components/CardMin'
import { Icon, AddIcon } from '../components/icons'

// --- Transaction data ---
const transactions = [
  {
    date: 'Feb 18, 2026',
    time: '14:32',
    brand: 'amazon',
    merchant: 'Amazon',
    amount: '–$129.90',
    account: 'Checking',
    accountDetail: '4822 · USD',
    accountIcon: 'money' as const,
    cardName: 'Main',
    cardNumber: '••2255',
    cardType: 'Visa Virtual',
    attachment: null as string | null,
  },
  {
    date: 'Feb 18, 2026',
    time: '09:11',
    brand: 'figma',
    merchant: 'Figma',
    amount: '–$9.99',
    account: 'Checking',
    accountDetail: '4822 · USD',
    accountIcon: 'money' as const,
    cardName: 'Main',
    cardNumber: '••2255',
    cardType: 'Visa Virtual',
    attachment: 'Order_project.pdf',
  },
  {
    date: 'Feb 17, 2026',
    time: '18:05',
    brand: 'paypal',
    merchant: 'PayPal',
    amount: '–$45.00',
    account: 'Checking',
    accountDetail: '4822 · USD',
    accountIcon: 'money' as const,
    cardName: 'Main',
    cardNumber: '••2255',
    cardType: 'Visa Virtual',
    attachment: null,
  },
  {
    date: 'Feb 17, 2026',
    time: '10:22',
    brand: 'netflix',
    merchant: 'Netflix',
    amount: '–$24.99',
    account: 'Checking',
    accountDetail: '4822 · USD',
    accountIcon: 'money' as const,
    cardName: 'Main',
    cardNumber: '••2255',
    cardType: 'Visa Virtual',
    attachment: null,
  },
  {
    date: 'Feb 16, 2026',
    time: '13:22',
    brand: 'skrill',
    merchant: 'Skrill',
    amount: '–$120.99',
    account: 'Checking',
    accountDetail: '4822 · USD',
    accountIcon: 'money' as const,
    cardName: 'Main',
    cardNumber: '••2255',
    cardType: 'Visa Virtual',
    attachment: null,
  },
  {
    date: 'Feb 16, 2026',
    time: '09:30',
    brand: 'starbucks',
    merchant: 'Starbucks',
    amount: '–$5.75',
    account: 'Checking',
    accountDetail: '4822 · USD',
    accountIcon: 'money' as const,
    cardName: 'Main',
    cardNumber: '••2255',
    cardType: 'Visa Virtual',
    attachment: null,
  },
  {
    date: 'Feb 15, 2026',
    time: '20:15',
    brand: 'uber',
    merchant: 'Uber',
    amount: '–$18.40',
    account: 'Checking',
    accountDetail: '4822 · USD',
    accountIcon: 'money' as const,
    cardName: 'Main',
    cardNumber: '••2255',
    cardType: 'Visa Virtual',
    attachment: null,
  },
  {
    date: 'Feb 15, 2026',
    time: '07:45',
    brand: 'authy',
    merchant: 'Authy',
    amount: '–$15.00',
    account: 'Checking',
    accountDetail: '4822 · USD',
    accountIcon: 'money' as const,
    cardName: 'Main',
    cardNumber: '••2255',
    cardType: 'Visa Virtual',
    attachment: null,
  },
  {
    date: 'Feb 14, 2026',
    time: '11:08',
    brand: 'google',
    merchant: 'Google',
    amount: '+$2,482.84',
    account: 'Savings',
    accountDetail: '8472 · USD',
    accountIcon: 'money' as const,
    cardName: 'Main',
    cardNumber: '••2255',
    cardType: 'Visa Virtual',
    attachment: 'Invoice_feb.pdf',
  },
]

export default function Transactions() {
  return (
    <AppLayout
      header={
        <Header
          title="Transactions"
          hasBack={false}
          avatar={<UserAvatar size={36} variant="text" initials="MB" />}
        />
      }
    >
      {/* Summary stats */}
      <div className="flex gap-xs items-start w-full">
        <Widget className="flex-1">
          <WidgetHeader label="Net change this month" amount="–$1,801.64" amountSize="small" />
        </Widget>
        <Widget className="flex-1">
          <WidgetHeader icon={<Icon name="arrow-diagonal1" />} label="Money in" amount="$2,482.84" amountSize="small" />
        </Widget>
        <Widget className="flex-1">
          <WidgetHeader icon={<Icon name="arrow-diagonal3" />} label="Money out" amount="–$4,284.48" amountSize="small" />
        </Widget>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-xs items-center">
          <Button variant="primary" size="small" rightIcon={<Icon name="close" />}>
            Feb 15–18, 2026
          </Button>
          <Button variant="tertiary" size="small" rightIcon={<Icon name="arrow-short-down" />}>
            To/From
          </Button>
          <Button variant="tertiary" size="small" rightIcon={<Icon name="arrow-short-down" />}>
            Amount
          </Button>
          <Button variant="tertiary" size="small" rightIcon={<Icon name="arrow-short-down" />}>
            Account
          </Button>
          <Button variant="tertiary" size="small" rightIcon={<Icon name="arrow-short-down" />}>
            Method
          </Button>
          <Button variant="tertiary" size="small" rightIcon={<Icon name="arrow-short-down" />}>
            Attachment
          </Button>
        </div>
        <Button variant="tertiary" size="small" leftIcon={<Icon name="download" />}>
          Download
        </Button>
      </div>

      {/* Transaction table */}
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr className="flex items-center">
              <TableHeaderCell label="Date" className="w-[120px] shrink-0" />
              <TableHeaderCell label="To/From" className="flex-1" sortable={false} />
              <TableHeaderCell label="Amount" className="w-[120px] shrink-0" />
              <TableHeaderCell label="Account" className="flex-1" sortable={false} />
              <TableHeaderCell label="Method" className="flex-1" sortable={false} />
              <TableHeaderCell label="Attachment" className="flex-1" align="right" sortable={false} />
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <TableRow key={i} onClick={() => {}}>
                {/* Date */}
                <TableCell className="w-[120px] shrink-0">
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-body-m text-foreground-primary">{tx.date}</span>
                    <span className="text-body-s text-foreground-primary-faded">{tx.time}</span>
                  </div>
                </TableCell>

                {/* To/From */}
                <TableCell className="flex-1">
                  <div className="flex gap-xs items-center">
                    <BrandAvatar brand={tx.brand} size={24} />
                    <span className="text-body-m text-foreground-primary">{tx.merchant}</span>
                  </div>
                </TableCell>

                {/* Amount */}
                <TableCell className="w-[120px] shrink-0">
                  <span className="text-body-m text-foreground-primary">{tx.amount}</span>
                </TableCell>

                {/* Account */}
                <TableCell className="flex-1">
                  <div className="flex gap-xs items-center">
                    <span className="shrink-0 text-foreground-primary-faded-subtle">
                      <Icon name={tx.accountIcon} size={16} />
                    </span>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-body-m text-foreground-primary">{tx.account}</span>
                      <span className="text-body-s text-foreground-primary-faded">{tx.accountDetail}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Method */}
                <TableCell className="flex-1">
                  <div className="flex gap-xs items-center">
                    <CardMin size="small" />
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-body-m text-foreground-primary">{tx.cardName}</span>
                      <span className="text-body-s text-foreground-primary-faded">{tx.cardNumber} · {tx.cardType}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Attachment */}
                <TableCell className="flex-1" align="right">
                  {tx.attachment ? (
                    <div className="flex gap-xxs items-center">
                      <span className="text-body-m text-foreground-brand">{tx.attachment}</span>
                      <Icon name="attach-square" size={16} color="currentColor" />
                    </div>
                  ) : (
                    <Button variant="secondary" size="extraSmall" leftIcon={<AddIcon />}>
                      Add
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  )
}
