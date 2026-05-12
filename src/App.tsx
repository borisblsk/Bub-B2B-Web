import { useState } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import TextArea from './components/TextArea'
import Select from './components/Select'
import FileUpload from './components/FileUpload'
import PasscodeInput from './components/PasscodeInput'
import TagInput from './components/TagInput'
import DatePicker from './components/DatePicker'
import Calendar from './components/Calendar'
import Dropdown from './components/Dropdown'
import DropdownItem from './components/DropdownItem'
import Checkbox from './components/Checkbox'
import CheckboxField from './components/CheckboxField'
import Radio from './components/Radio'
import RadioField from './components/RadioField'
import Toggle from './components/Toggle'
import ToggleField from './components/ToggleField'
import ListItemMax from './components/ListItemMax'
import ListItemMin from './components/ListItemMin'
import ListItemCompact from './components/ListItemCompact'
import UserAvatar from './components/UserAvatar'
import CryptoAvatar from './components/CryptoAvatar'
import BrandAvatar from './components/BrandAvatar'
import FlagAvatar from './components/FlagAvatar'
import Thumbnail from './components/Thumbnail'
import Snackbar from './components/Snackbar'
import Badge from './components/Badge'
import Callout from './components/Callout'
import CalloutElevated from './components/CalloutElevated'
import Delta from './components/Delta'
import ProgressBar from './components/ProgressBar'
import Stepper from './components/Stepper'
import { Icon } from './components/icons'
import { AddIcon, ArrowRightIcon, SendIcon, ArrowUpIcon, SearchIcon, EyeIcon, DollarCircleIcon, ArrowDownIcon } from './components/icons'

const btnVariants = ['primary', 'brand', 'secondary', 'tertiary', 'ghosted', 'transparent', 'danger', 'success'] as const
const btnSizes = ['default', 'small', 'extraSmall'] as const
const btnSizeLabels: Record<(typeof btnSizes)[number], string> = { default: 'Default', small: 'Small', extraSmall: 'XS' }

const selectOptions = [
  { value: 'us', label: 'United States', subtitle: 'USD' },
  { value: 'uk', label: 'United Kingdom', subtitle: 'GBP' },
  { value: 'de', label: 'Germany', subtitle: 'EUR' },
  { value: 'jp', label: 'Japan', subtitle: 'JPY' },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3xl">
      <h2 className="text-heading-s font-bold text-foreground-primary mb-l">{title}</h2>
      {children}
    </div>
  )
}

function Col({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ maxWidth: 320 }} className="w-full">
      {label && <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">{label}</p>}
      {children}
    </div>
  )
}

function App() {
  const [inputVal1, setInputVal1] = useState('')
  const [inputVal2, setInputVal2] = useState('john@example.com')
  const [inputVal3, setInputVal3] = useState('Bad value')
  const [textArea1, setTextArea1] = useState('')
  const [textArea2, setTextArea2] = useState('This is a filled textarea with some content.')
  const [select1, setSelect1] = useState('')
  const [select2, setSelect2] = useState('uk')
  const [passcode, setPasscode] = useState('')
  const [passcode2, setPasscode2] = useState('382')
  const [tags1, setTags1] = useState<string[]>([])
  const [tags2, setTags2] = useState(['React', 'TypeScript'])
  const [tags3, setTags3] = useState(['Invalid'])
  const [file1, setFile1] = useState<File | null>(null)
  const [date1, setDate1] = useState<Date | null>(null)
  const [date2, setDate2] = useState<Date | null>(new Date(2026, 3, 14))
  const [calDate, setCalDate] = useState<Date | null>(null)
  const [rangeStart, setRangeStart] = useState<Date | null>(null)
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null)
  const [cb1, setCb1] = useState(false)
  const [cb2, setCb2] = useState(true)
  const [cb3, setCb3] = useState<boolean | 'indeterminate'>('indeterminate')
  const [cbField, setCbField] = useState(false)
  const [radioVal, setRadioVal] = useState('option1')
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(true)
  const [listToggle, setListToggle] = useState(false)
  const [listRadio, setListRadio] = useState('')
  const [progress, setProgress] = useState(50)

  return (
    <div className="min-h-screen bg-background-page p-3xl font-sans text-foreground-primary">
      <h1 className="text-heading-l font-bold mb-3xl">Component Showcase</h1>

      {/* ═══ BUTTON ═══ */}
      <Section title="Button — Variants x Sizes">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">Variant</th>
                {btnSizes.map((s) => (
                  <th key={s} className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">{btnSizeLabels[s]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {btnVariants.map((v) => (
                <tr key={v}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs capitalize align-middle">{v}</td>
                  {btnSizes.map((s) => (
                    <td key={s} className="pr-xl py-xs align-middle">
                      <Button variant={v} size={s} leftIcon={<ArrowUpIcon />} rightIcon={<ArrowUpIcon />}>Button</Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Button — States">
        <div className="flex flex-wrap items-center gap-m">
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" leftIcon={<AddIcon />}>Left</Button>
          <Button variant="primary" rightIcon={<ArrowRightIcon />}>Right</Button>
          <Button variant="primary" leftIcon={<SendIcon />} iconOnly />
        </div>
      </Section>

      {/* ═══ INPUT ═══ */}
      <h1 className="text-heading-l font-bold mb-3xl mt-3xl">Form Components</h1>

      <Section title="Input — States">
        <div className="flex flex-wrap gap-xl">
          <Col label="Empty"><Input placeholder="Placeholder" helperText="Helper text" value={inputVal1} onChange={(e) => setInputVal1(e.target.value)} onClear={() => setInputVal1('')} label="Default" /></Col>
          <Col label="Filled"><Input placeholder="Placeholder" value={inputVal2} onChange={(e) => setInputVal2(e.target.value)} onClear={() => setInputVal2('')} label="Filled" /></Col>
          <Col label="Error"><Input placeholder="Placeholder" errorMessage="This field is required" value={inputVal3} onChange={(e) => setInputVal3(e.target.value)} label="Error" /></Col>
          <Col label="Disabled"><Input placeholder="Placeholder" disabled value="Disabled value" label="Disabled" /></Col>
          <Col label="With icons"><Input placeholder="Search..." leftIcon={<SearchIcon />} rightIcon={<EyeIcon />} label="Icons" /></Col>
          <Col label="With trailing text"><Input placeholder="0.00" leftIcon={<DollarCircleIcon />} trailingText="USD" label="Currency" /></Col>
        </div>
      </Section>

      {/* ═══ TEXTAREA ═══ */}
      <Section title="TextArea">
        <div className="flex flex-wrap gap-xl">
          <Col label="Empty"><TextArea placeholder="Type something..." label="Description" helperText="Max 500 characters" value={textArea1} onChange={(e) => setTextArea1(e.target.value)} /></Col>
          <Col label="Filled"><TextArea placeholder="Type something..." label="Notes" value={textArea2} onChange={(e) => setTextArea2(e.target.value)} /></Col>
          <Col label="Error"><TextArea placeholder="Type something..." label="Message" errorMessage="Required field" defaultValue="x" /></Col>
          <Col label="Disabled"><TextArea placeholder="Type something..." label="Read only" disabled value="Cannot edit" /></Col>
        </div>
      </Section>

      {/* ═══ SELECT ═══ */}
      <Section title="Select">
        <div className="flex flex-wrap gap-xl">
          <Col label="Empty"><Select placeholder="Choose country..." options={selectOptions} value={select1} onChange={setSelect1} label="Country" helperText="Select your country" /></Col>
          <Col label="Filled"><Select placeholder="Choose country..." options={selectOptions} value={select2} onChange={setSelect2} label="Country" /></Col>
          <Col label="Error"><Select placeholder="Choose..." options={selectOptions} errorMessage="Selection required" label="Required" /></Col>
          <Col label="Disabled"><Select placeholder="Choose..." options={selectOptions} value="de" disabled label="Locked" /></Col>
        </div>
      </Section>

      {/* ═══ DATEPICKER ═══ */}
      <Section title="DatePicker">
        <div className="flex flex-wrap gap-xl">
          <Col label="Empty"><DatePicker label="Start date" value={date1} onChange={setDate1} /></Col>
          <Col label="Filled"><DatePicker label="Due date" value={date2} onChange={setDate2} /></Col>
          <Col label="Error"><DatePicker label="Expiry" errorMessage="Date is in the past" value={new Date(2020, 0, 1)} /></Col>
          <Col label="Disabled"><DatePicker label="Locked" disabled value={new Date()} /></Col>
        </div>
      </Section>

      {/* ═══ TAG INPUT ═══ */}
      <Section title="Tag Input">
        <div className="flex flex-wrap gap-xl">
          <Col label="Empty"><TagInput label="Tags" placeholder="Press Enter to add" tags={tags1} onChange={setTags1} helperText="Add up to 5 tags" /></Col>
          <Col label="With tags"><TagInput label="Skills" tags={tags2} onChange={setTags2} /></Col>
          <Col label="Error"><TagInput label="Recipients" tags={tags3} onChange={setTags3} errorMessage="Invalid email address" /></Col>
          <Col label="Disabled"><TagInput label="Locked" tags={['Fixed', 'Tags']} disabled /></Col>
        </div>
      </Section>

      {/* ═══ FILE UPLOAD ═══ */}
      <Section title="FileUpload">
        <div className="flex flex-wrap gap-xl">
          <Col label="Default"><FileUpload label="Document" onChange={(f) => setFile1(f)} file={file1} onRemove={() => setFile1(null)} /></Col>
          <Col label="Loading"><FileUpload label="Uploading" file={{ name: 'Report.pdf' }} loading /></Col>
          <Col label="Filled"><FileUpload label="Attached" file={{ name: 'Contract.pdf' }} onRemove={() => {}} /></Col>
          <Col label="Read-only"><FileUpload label="Download" file={{ name: 'Statement.pdf' }} readOnly /></Col>
        </div>
      </Section>

      {/* ═══ PASSCODE INPUT ═══ */}
      <Section title="PasscodeInput">
        <div className="flex flex-col gap-xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default (type to fill)</p>
            <PasscodeInput value={passcode} onChange={setPasscode} />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Partially filled</p>
            <PasscodeInput value={passcode2} onChange={setPasscode2} />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Error</p>
            <PasscodeInput value="123456" error />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Disabled</p>
            <PasscodeInput value="000000" disabled />
          </div>
        </div>
      </Section>

      {/* ═══ CALENDAR ═══ */}
      <Section title="Calendar">
        <div className="flex flex-wrap gap-2xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Single</p>
            <div className="bg-background-neutral rounded-s shadow-card p-m">
              <Calendar value={calDate} onChange={setCalDate} />
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Range</p>
            <div className="bg-background-neutral rounded-s shadow-card p-m">
              <Calendar
                variant="range"
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                onRangeChange={(s, e) => { setRangeStart(s); setRangeEnd(e) }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ DROPDOWN ═══ */}
      <Section title="Dropdown + DropdownItem">
        <div className="flex flex-wrap gap-2xl">
          <div style={{ width: 300 }}>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">With search + actions</p>
            <Dropdown
              actions={
                <>
                  <Button variant="primary" size="small">Confirm</Button>
                  <Button variant="ghosted" size="small">Cancel</Button>
                </>
              }
            >
              <DropdownItem title="Checking Account" subtitle="****4521" label="$12,450" leftIcon={<ArrowDownIcon />} />
              <DropdownItem title="Savings Account" subtitle="****7832" label="$85,200" leftIcon={<ArrowDownIcon />} />
              <DropdownItem title="Business Account" subtitle="****1190" label="$245,000" leftIcon={<ArrowDownIcon />} disabled />
              <DropdownItem variant="action" title="Add Account" leftIcon={<AddIcon />} />
            </Dropdown>
          </div>
          <div style={{ width: 300 }}>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Without search</p>
            <Dropdown searchable={false}>
              <DropdownItem title="USD" subtitle="US Dollar" />
              <DropdownItem title="EUR" subtitle="Euro" />
              <DropdownItem title="GBP" subtitle="British Pound" />
            </Dropdown>
          </div>
        </div>
      </Section>

      {/* ═══ CONTROLS ═══ */}
      <h1 className="text-heading-l font-bold mb-3xl mt-3xl">Controls</h1>

      <Section title="Checkbox — Interactive">
        <div className="flex flex-wrap items-center gap-xl">
          <Col label="Unchecked → Checked">
            <Checkbox value={cb1} onChange={setCb1} />
          </Col>
          <Col label="Checked → Unchecked">
            <Checkbox value={cb2} onChange={setCb2} />
          </Col>
          <Col label="Indeterminate → Checked → Unchecked">
            <Checkbox
              value={cb3}
              onChange={(checked) => setCb3(checked)}
            />
          </Col>
          <Col label="Number (display only)">
            <Checkbox value={3} />
          </Col>
        </div>
        <div className="mt-l" style={{ maxWidth: 320 }}>
          <CheckboxField
            label="Accept terms and conditions"
            description="Read the full agreement before continuing"
            value={cbField}
            onChange={setCbField}
          />
        </div>
      </Section>

      {/* Static variant grids — display-only, not interactive */}
      <Section title="Checkbox — Standalone Control">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m" />
                {(['Unchecked', 'Checked', 'Indeterminate', 'Number'] as const).map((col) => (
                  <th key={col} className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Default', error: false, disabled: false },
                { label: 'Hover', error: false, disabled: false },
                { label: 'Error', error: true, disabled: false },
                { label: 'Disabled', error: false, disabled: true },
              ] as const).map((row) => (
                <tr key={row.label}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs align-middle">{row.label}</td>
                  <td className="pr-xl py-xs align-middle"><Checkbox value={false} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-middle"><Checkbox value={true} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-middle"><Checkbox value="indeterminate" error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-middle"><Checkbox value={3} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Checkbox — Row (Left Position)">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m" />
                {(['Unchecked', 'Checked', 'Indeterminate', 'Number'] as const).map((col) => (
                  <th key={col} className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Default', error: false, disabled: false },
                { label: 'Hover', error: false, disabled: false },
                { label: 'Error', error: true, disabled: false },
                { label: 'Disabled', error: false, disabled: true },
              ] as const).map((row) => (
                <tr key={row.label}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs align-top">{row.label}</td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><CheckboxField label="Accept terms" description="Read the full agreement" value={false} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><CheckboxField label="Accept terms" description="Read the full agreement" value={true} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><CheckboxField label="Accept terms" description="Read the full agreement" value="indeterminate" error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><CheckboxField label="Accept terms" description="Read the full agreement" value={3} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Checkbox — Row (Right Position)">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m" />
                {(['Unchecked', 'Checked', 'Indeterminate', 'Number'] as const).map((col) => (
                  <th key={col} className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Default', error: false, disabled: false },
                { label: 'Hover', error: false, disabled: false },
                { label: 'Error', error: true, disabled: false },
                { label: 'Disabled', error: false, disabled: true },
              ] as const).map((row) => (
                <tr key={row.label}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs align-top">{row.label}</td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><CheckboxField label="Accept terms" description="Read the full agreement" position="right" value={false} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><CheckboxField label="Accept terms" description="Read the full agreement" position="right" value={true} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><CheckboxField label="Accept terms" description="Read the full agreement" position="right" value="indeterminate" error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><CheckboxField label="Accept terms" description="Read the full agreement" position="right" value={3} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="RadioButton — Interactive">
        <div className="flex flex-col gap-s" style={{ maxWidth: 320 }}>
          <RadioField label="Email notifications" description="Get notified by email" value="option1" name="demo-radio" checked={radioVal === 'option1'} onChange={setRadioVal} />
          <RadioField label="SMS notifications" description="Get notified by text" value="option2" name="demo-radio" checked={radioVal === 'option2'} onChange={setRadioVal} />
          <RadioField label="Push notifications" description="Get notified in-app" value="option3" name="demo-radio" checked={radioVal === 'option3'} onChange={setRadioVal} />
        </div>
      </Section>

      {/* Static variant grids — display-only, not interactive */}
      <Section title="RadioButton — Standalone Control">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m" />
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">Unselected</th>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">Selected</th>
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Default', error: false, disabled: false },
                { label: 'Hover', error: false, disabled: false },
                { label: 'Error', error: true, disabled: false },
                { label: 'Disabled', error: false, disabled: true },
              ] as const).map((row) => (
                <tr key={row.label}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs align-middle">{row.label}</td>
                  <td className="pr-xl py-xs align-middle"><Radio value="" checked={false} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-middle"><Radio value="" checked={true} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="RadioButton — Row (Left Position)">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m" />
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">Unselected</th>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">Selected</th>
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Default', error: false, disabled: false },
                { label: 'Hover', error: false, disabled: false },
                { label: 'Error', error: true, disabled: false },
                { label: 'Disabled', error: false, disabled: true },
              ] as const).map((row) => (
                <tr key={row.label}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs align-top">{row.label}</td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><RadioField label="Email notifications" description="Get notified by email" value="" checked={false} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><RadioField label="Email notifications" description="Get notified by email" value="" checked={true} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="RadioButton — Row (Right Position)">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m" />
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">Unselected</th>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">Selected</th>
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Default', error: false, disabled: false },
                { label: 'Hover', error: false, disabled: false },
                { label: 'Error', error: true, disabled: false },
                { label: 'Disabled', error: false, disabled: true },
              ] as const).map((row) => (
                <tr key={row.label}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs align-top">{row.label}</td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><RadioField label="Email notifications" description="Get notified by email" position="right" value="" checked={false} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><RadioField label="Email notifications" description="Get notified by email" position="right" value="" checked={true} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Toggle — Interactive">
        <div className="flex flex-wrap gap-xl">
          <Col label="Off → On">
            <Toggle checked={toggle1} onChange={setToggle1} />
          </Col>
          <Col label="On → Off">
            <Toggle checked={toggle2} onChange={setToggle2} />
          </Col>
        </div>
        <div className="mt-l flex flex-col gap-s" style={{ maxWidth: 320 }}>
          <ToggleField label="Dark mode" description="Switch to dark theme" checked={toggle1} onChange={setToggle1} />
          <ToggleField label="Notifications" description="Enable push alerts" checked={toggle2} onChange={setToggle2} />
        </div>
      </Section>

      {/* Static variant grids — display-only, not interactive */}
      <Section title="Toggle — Standalone Control">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m" />
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">Off</th>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">On</th>
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Default', error: false, disabled: false },
                { label: 'Hover', error: false, disabled: false },
                { label: 'Error', error: true, disabled: false },
                { label: 'Disabled', error: false, disabled: true },
              ] as const).map((row) => (
                <tr key={row.label}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs align-middle">{row.label}</td>
                  <td className="pr-xl py-xs align-middle"><Toggle checked={false} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-middle"><Toggle checked={true} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Toggle — Row (Left Position)">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m" />
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">Off</th>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">On</th>
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Default', error: false, disabled: false },
                { label: 'Hover', error: false, disabled: false },
                { label: 'Error', error: true, disabled: false },
                { label: 'Disabled', error: false, disabled: true },
              ] as const).map((row) => (
                <tr key={row.label}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs align-top">{row.label}</td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><ToggleField label="Dark mode" description="Switch to dark theme" checked={false} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><ToggleField label="Dark mode" description="Switch to dark theme" checked={true} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Toggle — Row (Right Position)">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m" />
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">Off</th>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m">On</th>
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Default', error: false, disabled: false },
                { label: 'Hover', error: false, disabled: false },
                { label: 'Error', error: true, disabled: false },
                { label: 'Disabled', error: false, disabled: true },
              ] as const).map((row) => (
                <tr key={row.label}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs align-top">{row.label}</td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><ToggleField label="Dark mode" description="Switch to dark theme" position="right" checked={false} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                  <td className="pr-xl py-xs align-top" style={{ width: 311 }}><ToggleField label="Dark mode" description="Switch to dark theme" position="right" checked={true} error={row.error} disabled={row.disabled} onChange={() => {}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ═══ LISTS ═══ */}
      <h1 className="text-heading-l font-bold mb-3xl mt-3xl">Lists</h1>

      <Section title="ListItemMax — Static Reference">
        <div className="flex flex-col gap-m" style={{ maxWidth: 700 }}>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default × Default</p>
            <ListItemMax
              leading={<Icon name="arrow-diagonal1" size={16} />}
              primary={<UserAvatar size={36} />}
              title="Label"
              leftSubtextTop="Subtext"
              leftSubtextBottom="Subtext"
              rightText="Label"
              rightSubtextTop="Subtext"
              rightSubtextBottom="Subtext"
              trailingIcon={<Icon name="arrow-right" size={16} />}
              trailingIcon2={<Icon name="arrow-right" size={16} />}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default × Hover (forced)</p>
            <ListItemMax
              _forceHover
              interactive
              leading={<Icon name="arrow-diagonal1" size={16} />}
              primary={<UserAvatar size={36} />}
              title="Label"
              leftSubtextTop="Subtext"
              leftSubtextBottom="Subtext"
              rightText="Label"
              rightSubtextTop="Subtext"
              rightSubtextBottom="Subtext"
              trailingIcon={<Icon name="arrow-right" size={16} />}
              trailingIcon2={<Icon name="arrow-right" size={16} />}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Tile × Default</p>
            <ListItemMax
              variant="tile"
              leading={<Icon name="arrow-diagonal1" size={16} />}
              primary={<UserAvatar size={36} />}
              title="Label"
              leftSubtextTop="Subtext"
              leftSubtextBottom="Subtext"
              rightText="Label"
              rightSubtextTop="Subtext"
              rightSubtextBottom="Subtext"
              trailingIcon={<Icon name="arrow-right" size={16} />}
              trailingIcon2={<Icon name="arrow-right" size={16} />}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Tile × Hover (forced)</p>
            <ListItemMax
              variant="tile"
              _forceHover
              interactive
              leading={<Icon name="arrow-diagonal1" size={16} />}
              primary={<UserAvatar size={36} />}
              title="Label"
              leftSubtextTop="Subtext"
              leftSubtextBottom="Subtext"
              rightText="Label"
              rightSubtextTop="Subtext"
              rightSubtextBottom="Subtext"
              trailingIcon={<Icon name="arrow-right" size={16} />}
              trailingIcon2={<Icon name="arrow-right" size={16} />}
            />
          </div>
        </div>
      </Section>

      <Section title="ListItemMax — Interactive Examples">
        <div className="flex flex-col gap-none" style={{ maxWidth: 700 }}>
          {/* 1. Account row */}
          <ListItemMax
            interactive
            onClick={() => console.log('Account row clicked')}
            leading={<Icon name="user" size={16} />}
            title="Alex Buburuza"
            leftSubtextBottom="alex@buburuza.com"
            trailingIcon={<Icon name="arrow-right" size={16} />}
          />

          {/* 2. Transaction row */}
          <ListItemMax
            interactive
            onClick={() => console.log('Transaction row clicked')}
            primary={<BrandAvatar size={36} brand="Starbucks" />}
            title="Coffee shop"
            leftSubtextBottom="Today, 14:23"
            rightText={<span className="text-foreground-error">−€12.50</span>}
            rightSubtextBottom="EUR"
          />

          {/* 3. Settings row with toggle — row NOT interactive (no onClick), only toggle is clickable. Hover bg still visible on mouse-over. */}
          <ListItemMax
            leading={<Icon name="setting" size={16} />}
            title="Notifications"
            leftSubtextBottom="Get alerts on transactions"
            toggle={<Toggle checked={listToggle} onChange={setListToggle} />}
          />

          {/* 4. Selection row with radio — row IS interactive, clicking selects */}
          <ListItemMax
            interactive
            onClick={() => setListRadio('premium')}
            title="Premium plan"
            leftSubtextBottom="€9.99/month"
            radio={<Radio value="premium" name="list-plan" checked={listRadio === 'premium'} onChange={setListRadio} />}
          />
          <ListItemMax
            interactive
            onClick={() => setListRadio('basic')}
            title="Basic plan"
            leftSubtextBottom="Free"
            radio={<Radio value="basic" name="list-plan" checked={listRadio === 'basic'} onChange={setListRadio} />}
          />

          {/* 5. Action row with button — button click isolated from row click */}
          <ListItemMax
            interactive
            onClick={() => console.log('Row clicked (not button)')}
            title="Verify account"
            leftSubtextBottom="Required to make transfers"
            button={<Button size="extraSmall" variant="brand" onClick={() => console.log('Verify button clicked')}>Verify</Button>}
          />

          {/* 6. Tile variant */}
          <div className="mt-m">
            <ListItemMax
              variant="tile"
              interactive
              onClick={() => console.log('Tile transaction clicked')}
              primary={<UserAvatar size={36} />}
              title="Coffee shop"
              leftSubtextBottom="Today, 14:23"
              rightText={<span className="text-foreground-error">−€12.50</span>}
              rightSubtextBottom="EUR"
            />
          </div>
        </div>
      </Section>

      <Section title="ListItemMin — Static Reference">
        <div className="flex flex-col gap-m" style={{ maxWidth: 400 }}>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default × Default</p>
            <ListItemMin
              leading={<Icon name="arrow-diagonal1" size={16} />}
              title="Label"
              badge1={<span className="inline-flex items-center px-xs py-[1px] rounded-full border border-border-base-strong bg-background-base-subtle text-body-xs text-foreground-primary-faded">Label</span>}
              badge2={<span className="inline-flex items-center px-xs py-[1px] rounded-full border border-border-base-strong bg-background-base-subtle text-body-xs text-foreground-primary-faded">Label</span>}
              leftSubtextBottom="Subtext"
              rightText="Label"
              trailingIcon={<Icon name="arrow-right" size={16} />}
              trailingIcon2={<Icon name="arrow-right" size={16} />}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default × Hover (forced)</p>
            <ListItemMin
              _forceHover
              interactive
              leading={<Icon name="arrow-diagonal1" size={16} />}
              title="Label"
              badge1={<span className="inline-flex items-center px-xs py-[1px] rounded-full border border-border-base-strong bg-background-base-subtle text-body-xs text-foreground-primary-faded">Label</span>}
              badge2={<span className="inline-flex items-center px-xs py-[1px] rounded-full border border-border-base-strong bg-background-base-subtle text-body-xs text-foreground-primary-faded">Label</span>}
              leftSubtextBottom="Subtext"
              rightText="Label"
              trailingIcon={<Icon name="arrow-right" size={16} />}
              trailingIcon2={<Icon name="arrow-right" size={16} />}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Tile × Default</p>
            <ListItemMin
              variant="tile"
              leading={<Icon name="arrow-diagonal1" size={16} />}
              title="Label"
              badge1={<span className="inline-flex items-center px-xs py-[1px] rounded-full border border-border-base-strong bg-background-base-subtle text-body-xs text-foreground-primary-faded">Label</span>}
              badge2={<span className="inline-flex items-center px-xs py-[1px] rounded-full border border-border-base-strong bg-background-base-subtle text-body-xs text-foreground-primary-faded">Label</span>}
              leftSubtextBottom="Subtext"
              rightText="Label"
              trailingIcon={<Icon name="arrow-right" size={16} />}
              trailingIcon2={<Icon name="arrow-right" size={16} />}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Tile × Hover (forced)</p>
            <ListItemMin
              variant="tile"
              _forceHover
              interactive
              leading={<Icon name="arrow-diagonal1" size={16} />}
              title="Label"
              badge1={<span className="inline-flex items-center px-xs py-[1px] rounded-full border border-border-base-strong bg-background-base-subtle text-body-xs text-foreground-primary-faded">Label</span>}
              badge2={<span className="inline-flex items-center px-xs py-[1px] rounded-full border border-border-base-strong bg-background-base-subtle text-body-xs text-foreground-primary-faded">Label</span>}
              leftSubtextBottom="Subtext"
              rightText="Label"
              trailingIcon={<Icon name="arrow-right" size={16} />}
              trailingIcon2={<Icon name="arrow-right" size={16} />}
            />
          </div>
        </div>
      </Section>

      <Section title="ListItemMin — Interactive Examples">
        <div className="flex flex-col gap-none" style={{ maxWidth: 400 }}>
          {/* 1. Sidebar nav item */}
          <ListItemMin
            interactive
            onClick={() => console.log('Dashboard clicked')}
            leading={<Icon name="home" size={16} />}
            title="Dashboard"
            trailingIcon={<Icon name="arrow-right" size={16} />}
          />

          {/* 2. Currency selector row */}
          <ListItemMin
            interactive
            onClick={() => console.log('USD clicked')}
            primary={<FlagAvatar size={24} country="US" />}
            title="USD"
            rightText="$1,234.56"
          />

          {/* 3. Notification item */}
          <ListItemMin
            interactive
            onClick={() => console.log('Notification clicked')}
            leading={<Icon name="email" size={16} />}
            title="New message from Alex"
            leftSubtextBottom="2 min ago"
          />

          {/* 4. Tile variant */}
          <div className="mt-m">
            <ListItemMin
              variant="tile"
              interactive
              onClick={() => console.log('Tile USD clicked')}
              primary={<FlagAvatar size={24} country="US" />}
              title="USD"
              leftSubtextBottom="US Dollar"
              rightText="$1,234.56"
              rightSubtextBottom="Balance"
            />
          </div>
        </div>
      </Section>

      <Section title="ListItemCompact — Static Reference">
        <div className="flex flex-col gap-m" style={{ maxWidth: 400 }}>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default</p>
            <ListItemCompact
              text="Text"
              label="Label"
              trailingIcon={<Icon name="arrow-right" size={16} />}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default × Hover (forced)</p>
            <ListItemCompact
              _forceHover
              interactive
              text="Text"
              label="Label"
              trailingIcon={<Icon name="arrow-right" size={16} />}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Tile</p>
            <ListItemCompact
              variant="tile"
              text="Text"
              label="Label"
              trailingIcon={<Icon name="arrow-right" size={16} />}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Tile × Hover (forced)</p>
            <ListItemCompact
              variant="tile"
              _forceHover
              interactive
              text="Text"
              label="Label"
              trailingIcon={<Icon name="arrow-right" size={16} />}
            />
          </div>
        </div>
      </Section>

      <Section title="ListItemCompact — Interactive Examples">
        <div className="flex flex-col gap-none" style={{ maxWidth: 400 }}>
          {/* 1. Dropdown menu item */}
          <ListItemCompact
            interactive
            onClick={() => console.log('Edit clicked')}
            text="Edit"
            label="⌘E"
            trailingIcon={<Icon name="arrow-right" size={16} />}
          />

          {/* 2. Inline crypto row */}
          <ListItemCompact
            interactive
            onClick={() => console.log('BTC clicked')}
            text="BTC"
            label="$67,432.10"
          />

          {/* 3. Tile variant */}
          <div className="mt-m">
            <ListItemCompact
              variant="tile"
              interactive
              onClick={() => console.log('Tile BTC clicked')}
              text="BTC"
              label="$67,432.10"
              trailingIcon={<Icon name="arrow-right" size={16} />}
            />
          </div>
        </div>
      </Section>

      {/* ═══ AVATARS ═══ */}
      <h1 className="text-heading-l font-bold mb-3xl mt-3xl">Avatars</h1>

      <Section title="UserAvatar">
        <div className="flex flex-col gap-xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default (icon) — all sizes</p>
            <div className="flex items-end gap-m">
              {([24, 36, 52, 64] as const).map(s => <UserAvatar key={s} size={s} />)}
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Text (initials) — all sizes</p>
            <div className="flex items-end gap-m">
              {([24, 36, 52, 64] as const).map(s => <UserAvatar key={s} size={s} variant="text" initials="AB" />)}
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Text — deterministic colors</p>
            <div className="flex items-end gap-m">
              <UserAvatar size={36} variant="text" initials="AB" />
              <UserAvatar size={36} variant="text" initials="CD" />
              <UserAvatar size={36} variant="text" initials="EF" />
              <UserAvatar size={36} variant="text" initials="GH" />
              <UserAvatar size={36} variant="text" initials="IJ" />
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Photo — all sizes + broken src fallback</p>
            <div className="flex items-end gap-m">
              {([24, 36, 52, 64] as const).map(s => (
                <UserAvatar key={s} size={s} variant="photo" src="/Users/b/Desktop/Buburuza/B2B Sandbox/src/assets/27f9c563385d24bc916fc4abae14103ae5d25ab5.png" alt="User" />
              ))}
              <UserAvatar size={36} variant="photo" src="/broken-url.jpg" initials="FB" alt="Fallback test" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="CryptoAvatar">
        <div className="flex flex-col gap-xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default — all sizes × symbols</p>
            <div className="flex items-end gap-m">
              {(['BTC', 'ETH', 'USDT', 'USDC'] as const).map(sym => (
                <div key={sym} className="flex items-end gap-xs">
                  {([24, 36, 52] as const).map(s => <CryptoAvatar key={s} symbol={sym} size={s} />)}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Swap — all sizes</p>
            <div className="flex items-end gap-m">
              {([24, 36, 52] as const).map(s => (
                <CryptoAvatar key={s} symbol="USDC" size={s} variant="swap" fromSymbol="USDC" toSymbol="USDT" />
              ))}
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Stack — all sizes</p>
            <div className="flex items-end gap-xl">
              {([24, 36, 52] as const).map(s => (
                <CryptoAvatar key={s} symbol="USDC" size={s} variant="stack" symbols={['USDC', 'USDT']} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="BrandAvatar">
        <div className="flex flex-col gap-xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">All 23 brands at 36px</p>
            <div className="flex flex-wrap items-end gap-m">
              {(['alfa-bank', 'amazon', 'applepay', 'authy', 'buburuza-dark', 'buburuza-light', 'figma', 'github', 'google', 'instagram', 'netflix', 'paypal', 'paysafe', 'reddit', 'revolut', 'skrill', 'starbucks', 't-bank', 'telegram', 'tiktok', 'uber', 'wallet', 'x'] as const).map(brand => (
                <div key={brand} className="flex flex-col items-center gap-xxs">
                  <BrandAvatar size={36} brand={brand} />
                  <span className="text-body-xs text-foreground-primary-faded max-w-[52px] truncate text-center">{brand}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Size scale</p>
            <div className="flex flex-wrap items-end gap-xl">
              {(['netflix', 'starbucks', 'paypal', 'buburuza'] as const).map(brand => (
                <div key={brand} className="flex items-end gap-xxs">
                  {([24, 36, 52] as const).map(s => <BrandAvatar key={s} size={s} brand={brand} />)}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">With border (52px)</p>
            <div className="flex items-end gap-m">
              {(['amazon', 'netflix', 'paypal', 'starbucks', 'buburuza'] as const).map(brand => (
                <BrandAvatar key={brand} size={52} brand={brand} hasBorder />
              ))}
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Unknown fallback</p>
            <div className="flex items-end gap-m">
              <BrandAvatar size={36} brand="nonexistent" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="FlagAvatar">
        <div className="flex flex-col gap-xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">All flags — 3 sizes each</p>
            <div className="flex flex-wrap items-end gap-m">
              {(['USA', 'EU', 'UK', 'AUS', 'AUT', 'RU', 'BY', 'KZ', 'AM', 'GE'] as const).map(code => (
                <div key={code} className="flex flex-col items-center gap-xxs">
                  <div className="flex items-end gap-xxs">
                    {([24, 36, 52] as const).map(s => <FlagAvatar key={s} size={s} country={code} />)}
                  </div>
                  <span className="text-body-xs text-foreground-primary-faded">{code}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-xxs">
                <div className="flex items-end gap-xxs">
                  {([24, 36, 52] as const).map(s => <FlagAvatar key={s} size={s} country="ZZ" />)}
                </div>
                <span className="text-body-xs text-foreground-primary-faded">ZZ (invalid)</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Thumbnail">
        <div className="flex flex-col gap-xl">
          {(['simple', 'elevated', 'icon', 'brand'] as const).map(v => (
            <div key={v}>
              <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs capitalize">{v} — all sizes</p>
              <div className="flex items-end gap-m">
                {([24, 36, 52] as const).map(s => (
                  <Thumbnail key={s} size={s} variant={v} icon={<Icon name="arrow-diagonal1" />} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ STATUS ═══ */}
      <h1 className="text-heading-l font-bold mb-3xl mt-3xl">Status</h1>

      <Section title="Snackbar">
        <div className="flex flex-col gap-m items-start">
          <Snackbar type="neutral" label="Saved to drafts" />
          <Snackbar type="info" label="New version available" />
          <Snackbar type="success" label="Transaction completed" />
          <Snackbar type="error" label="Insufficient funds" />
          <Snackbar type="warning" label="Verify your account" />
        </div>
      </Section>

      <Section title="Badge">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m" />
                {(['neutral', 'info', 'success', 'error', 'warning'] as const).map(t => (
                  <th key={t} className="text-body-s font-medium text-foreground-primary-faded text-left pr-xl pb-m capitalize">{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(['default', 'small', 'extraSmall'] as const).map(s => (
                <tr key={s}>
                  <td className="text-body-s font-medium text-foreground-primary-faded pr-xl py-xs align-middle">{s}</td>
                  {(['neutral', 'info', 'success', 'error', 'warning'] as const).map(t => (
                    <td key={t} className="pr-xl py-xs align-middle">
                      <Badge type={t} size={s} label="Label" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Callout">
        <div className="flex flex-col gap-m" style={{ maxWidth: 400 }}>
          <Callout type="neutral" title="Notice" description="System maintenance in 2 hours" />
          <Callout type="info" title="New feature" description="Crypto wallet now supports staking rewards" />
          <Callout type="success" title="Transfer successful" description="Funds arrived in your account" />
          <Callout type="error" title="Payment failed" description="Card declined — try another payment method" />
          <Callout type="warning" title="Action required" description="Complete verification to enable transfers" />
        </div>
      </Section>

      <Section title="CalloutElevated">
        <div style={{ maxWidth: 400 }}>
          <CalloutElevated title="Upgrade to Premium" description="Unlock advanced trading features and lower fees" />
        </div>
      </Section>

      <Section title="Delta">
        <div className="flex flex-col gap-m">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">All 3 types</p>
            <div className="flex items-center gap-m">
              <Delta type="up" label="+2.5%" />
              <Delta type="down" label="-1.2%" />
              <Delta type="neutral" label="0%" />
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Inline context</p>
            <div className="flex flex-col gap-xs">
              <div className="flex items-center gap-xs text-body-m text-foreground-primary">
                <span className="font-medium">BTC</span>
                <span>$67,432.10</span>
                <Delta type="up" label="+2.5%" />
              </div>
              <div className="flex items-center gap-xs text-body-m text-foreground-primary">
                <span className="font-medium">ETH</span>
                <span>$3,210.50</span>
                <Delta type="down" label="-1.8%" />
              </div>
              <div className="flex items-center gap-xs text-body-m text-foreground-primary">
                <span className="font-medium">USDT</span>
                <span>$1.00</span>
                <Delta type="neutral" label="0%" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="ProgressBar">
        <div className="flex flex-col gap-xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Static — Figma's 4 variants</p>
            <div className="flex flex-col gap-m" style={{ maxWidth: 400 }}>
              <ProgressBar value={0} aria-label="Empty" />
              <ProgressBar value={33} aria-label="One third" />
              <ProgressBar value={66} aria-label="Two thirds" />
              <ProgressBar value={100} aria-label="Complete" />
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Interactive — value: {progress}%</p>
            <div className="flex flex-col gap-m" style={{ maxWidth: 400 }}>
              <ProgressBar value={progress} aria-label="Demo progress" />
              <div className="flex gap-xs">
                <Button size="extraSmall" variant="secondary" onClick={() => setProgress(p => Math.max(0, p - 10))}>Decrease</Button>
                <Button size="extraSmall" variant="secondary" onClick={() => setProgress(p => Math.min(100, p + 10))}>Increase</Button>
              </div>
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Edge cases</p>
            <div className="flex flex-col gap-m" style={{ maxWidth: 400 }}>
              <div><span className="text-body-xs text-foreground-primary-faded">value={-50} (clamped to 0)</span><ProgressBar value={-50} aria-label="Clamped low" /></div>
              <div><span className="text-body-xs text-foreground-primary-faded">value={150} (clamped to 100)</span><ProgressBar value={150} aria-label="Clamped high" /></div>
              <div><span className="text-body-xs text-foreground-primary-faded">max={50} value={25} (50%)</span><ProgressBar value={25} max={50} aria-label="Custom max" /></div>
              <div><span className="text-body-xs text-foreground-primary-faded">height={12} value={50}</span><ProgressBar value={50} height={12} aria-label="Taller bar" /></div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Stepper">
        <div className="flex flex-wrap gap-3xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Banking onboarding</p>
            <div style={{ width: 220 }}>
              <Stepper
                steps={[
                  { variant: 'completed', title: 'Apply', timestamp: 'Nov 25 at 15:10' },
                  { variant: 'completed', title: 'Verify identity', timestamp: 'Nov 25 at 15:14' },
                  { variant: 'in-progress', title: 'Review', timestamp: 'Nov 26 at 09:00' },
                  { variant: 'not-started', title: 'Get card' },
                  { variant: 'not-started', title: 'Activate' },
                ]}
              />
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Compact 3-step</p>
            <div style={{ width: 180 }}>
              <Stepper
                steps={[
                  { variant: 'completed', title: 'Step 1', timestamp: '14:30' },
                  { variant: 'in-progress', title: 'Step 2', timestamp: 'Now' },
                  { variant: 'not-started', title: 'Step 3' },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ INVENTORY ═══ */}
      <Section title="Build Status">
        <div className="flex flex-col gap-xs" style={{ maxWidth: 600 }}>
          {[
            { name: 'Button', status: 'built' },
            { name: 'Input', status: 'built' },
            { name: 'TextArea', status: 'built' },
            { name: 'Select', status: 'built' },
            { name: 'DatePicker', status: 'built' },
            { name: 'Tag Input', status: 'built' },
            { name: 'FileUpload', status: 'built' },
            { name: 'PasscodeInput', status: 'built' },
            { name: 'Calendar', status: 'built' },
            { name: 'Dropdown', status: 'built' },
            { name: 'DropdownItem', status: 'built' },
            { name: 'Checkbox', status: 'built' },
            { name: 'CheckboxField', status: 'built' },
            { name: 'Radio', status: 'built' },
            { name: 'RadioField', status: 'built' },
            { name: 'Toggle', status: 'built' },
            { name: 'ToggleField', status: 'built' },
            { name: 'ListItemMax', status: 'built' },
            { name: 'ListItemMin', status: 'built' },
            { name: 'ListItemCompact', status: 'built' },
            { name: 'UserAvatar', status: 'built' },
            { name: 'CryptoAvatar', status: 'built' },
            { name: 'BrandAvatar', status: 'built' },
            { name: 'FlagAvatar', status: 'built' },
            { name: 'Thumbnail', status: 'built' },
            { name: 'Snackbar', status: 'built' },
            { name: 'Badge', status: 'built' },
            { name: 'Callout', status: 'built' },
            { name: 'CalloutElevated', status: 'built' },
            { name: 'Delta', status: 'built' },
            { name: 'ProgressBar', status: 'built' },
            { name: 'Stepper', status: 'built' },
          ].map((c) => (
            <div key={c.name} className="flex items-center gap-m px-s py-xs rounded-xs bg-background-neutral border border-border-base">
              <span className="inline shrink-0 text-body-s font-medium px-xs py-xxs rounded-xxs bg-background-positive text-foreground-success">
                Built
              </span>
              <span className="text-body-m font-medium text-foreground-primary">{c.name}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

export default App
