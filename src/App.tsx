// =====================================================================
// COMPONENT LIBRARY STATUS — 2026-05-14
//
// Shipped:
//   Navs: NavBarButton, NavBar, SwipePagination, Header, ActionFooter, SideBar
//   Tables: TableHeaderCell, TableCell, TableRow + composed demos
//   Cards: CardMin, CardMax
//
// Deferred:
//   Modals: ModalMin, ModalMax, Drawer — components built, triggers do not fire
//     onClick. Diagnose with React DevTools open from start tomorrow.
//
// Known TODOs:
//   - NavBarButton showcase active-cell visual (works in real NavBar usage)
//   - Button small height: 36px vs Figma's 40px in some contexts
//   - Tables hover bg bleed: not exactly 8px (cosmetic)
// =====================================================================

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
import NavBarButton from './components/NavBarButton'
import NavBar from './components/NavBar'
import SwipePagination from './components/SwipePagination'
import Header from './components/Header'
import ActionFooter from './components/ActionFooter'
import SideBar from './components/SideBar'
import TableHeaderCell from './components/TableHeaderCell'
import TableCell from './components/TableCell'
import TableRow from './components/TableRow'
import CardMin from './components/CardMin'
import CardMax from './components/CardMax'
import ModalMin from './components/ModalMin'
import ModalMax from './components/ModalMax'
import Drawer from './components/Drawer'
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
  const [modalMinOpen, setModalMinOpen] = useState(false)
  const [modalMinBackOpen, setModalMinBackOpen] = useState(false)
  const [modalMaxOpen, setModalMaxOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerTitle2Open, setDrawerTitle2Open] = useState(false)

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

      {/* ═══ NAVS ═══ */}
      <h1 className="text-heading-l font-bold mb-3xl mt-3xl">Navs</h1>

      {/* TODO: active cell renders without bg-background-base in showcase only — works correctly in NavBar real usage (Home pill, Settings Profile sub-item). Defer. */}
      <Section title="NavBarButton">
        <div className="flex flex-col gap-xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default variant — 3 states</p>
            <div className="flex items-center gap-m">
              <NavBarButton icon={<Icon name="home" />}>Home</NavBarButton>
              <NavBarButton icon={<Icon name="home" />} className="bg-background-base">Home (hover)</NavBarButton>
              <NavBarButton icon={<Icon name="home" />} active>Home (active)</NavBarButton>
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Secondary variant — 3 states</p>
            <div className="flex items-center gap-m">
              <NavBarButton variant="secondary">Profile</NavBarButton>
              <NavBarButton variant="secondary" className="bg-background-base">Profile (hover)</NavBarButton>
              <NavBarButton variant="secondary" active>Profile (active)</NavBarButton>
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Interactive — click to toggle active</p>
            <div className="flex flex-col gap-xxs items-start">
              {(['home', 'bank', 'card', 'transaction-arrows', 'briefcase'] as const).map(name => (
                <NavBarButton key={name} icon={<Icon name={name} />}>{name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')}</NavBarButton>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="NavBar">
        <div className="flex flex-wrap gap-3xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default variant</p>
            <div className="bg-background-neutral rounded-s p-m" style={{ width: 244 }}>
              <NavBar
                variant="default"
                items={[
                  { key: 'home', label: 'Home', icon: <Icon name="home" />, active: true },
                  { key: 'accounts', label: 'Accounts', icon: <Icon name="bank" /> },
                  { key: 'cards', label: 'Cards', icon: <Icon name="card" /> },
                  { key: 'transactions', label: 'Transactions', icon: <Icon name="arrow-swap" /> },
                  { key: 'payments', label: 'Payments', icon: <Icon name="money-change" />, hasChevron: true },
                ]}
              />
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Settings variant</p>
            <div className="bg-background-neutral rounded-s p-m" style={{ width: 244 }}>
              <NavBar
                variant="settings"
                onBack={() => console.log('Back clicked')}
                sections={[
                  {
                    key: 'company',
                    label: 'Company',
                    icon: <Icon name="briefcase" />,
                    items: [
                      { key: 'profile', label: 'Profile', active: true },
                      { key: 'security', label: 'Security' },
                      { key: 'notifications', label: 'Notifications' },
                    ],
                  },
                  {
                    key: 'personal',
                    label: 'Personal',
                    icon: <Icon name="user" />,
                    items: [
                      { key: 'profile', label: 'Profile' },
                      { key: 'security', label: 'Security' },
                      { key: 'notifications', label: 'Notifications' },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="SwipePagination">
        <div className="flex flex-col gap-m">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">All 5 active positions</p>
            <div className="flex flex-col gap-xs items-start">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-xs">
                  <span className="text-body-xs text-foreground-primary-faded w-[20px]">{i + 1}</span>
                  <SwipePagination active={i} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Custom total (3 dots)</p>
            <SwipePagination total={3} active={1} />
          </div>
        </div>
      </Section>

      <Section title="Header">
        <div className="flex flex-col gap-xl" style={{ maxWidth: 802 }}>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">With back button</p>
            <Header
              title="Transactions"
              onBack={() => console.log('Back')}
              onSearch={() => console.log('Search')}
              onNotification={() => console.log('Notifications')}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Without back button</p>
            <Header
              title="Dashboard"
              hasBack={false}
              onSearch={() => console.log('Search')}
              onNotification={() => console.log('Notifications')}
              avatar={<UserAvatar size={36} variant="text" initials="AK" />}
            />
          </div>
        </div>
      </Section>

      <Section title="ActionFooter">
        <div className="flex flex-wrap gap-3xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Footer</p>
            <div className="bg-background-neutral rounded-s p-m" style={{ width: 400 }}>
              <ActionFooter
                purpose="footer"
                caption="Caption"
                leftButton={<Button variant="transparent" size="small">Cancel</Button>}
                primaryButton={<Button variant="primary" size="small" className="w-full">Confirm</Button>}
                rightButton={<Button variant="transparent" size="small">Skip</Button>}
              />
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Drawer</p>
            <div className="bg-background-neutral rounded-s p-m" style={{ width: 400 }}>
              <ActionFooter
                purpose="drawer"
                caption="Caption"
                leftButton={<Button variant="transparent" size="small" className="w-full">Cancel</Button>}
                primaryButton={<Button variant="primary" size="small" className="w-full">Confirm</Button>}
                rightButton={<Button variant="transparent" size="small" className="w-full">Skip</Button>}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="SideBar">
        <div className="flex gap-xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">SideBar with NavBar inside</p>
            <div className="border border-border-base rounded-s overflow-clip" style={{ height: 400 }}>
              <SideBar className="p-m h-full">
                <NavBar
                  variant="default"
                  items={[
                    { key: 'home', label: 'Home', icon: <Icon name="home" />, active: true },
                    { key: 'accounts', label: 'Accounts', icon: <Icon name="bank" /> },
                    { key: 'cards', label: 'Cards', icon: <Icon name="card" /> },
                  ]}
                />
              </SideBar>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ MODALS ═══ */}
      {/* =====================================================================
       * MODALS — KNOWN BROKEN
       * ModalMin, ModalMax, Drawer built. Code review looks correct.
       * Triggers do not fire onClick — state does not change when clicked.
       * Confirmed: not variant-specific, not orphan-portal blocking, other Buttons work, console clean.
       * Defer until tomorrow with fresh investigation (React DevTools from start, possible Strict Mode interaction, minimal reproduction).
       * ===================================================================== */}
      <h1 className="text-heading-l font-bold mb-3xl mt-3xl">Modals</h1>

      <Section title="ModalMin">
        <div className="flex gap-m">
          <Button variant="secondary" size="small" onClick={() => setModalMinOpen(true)}>Open ModalMin</Button>
          <Button variant="secondary" size="small" onClick={() => setModalMinBackOpen(true)}>Open ModalMin (with back)</Button>
        </div>
        <ModalMin
          isOpen={modalMinOpen}
          onClose={() => setModalMinOpen(false)}
          title="Transfer details"
        >
          <div className="flex flex-col gap-m">
            <p className="text-body-m text-foreground-primary">Review your transfer before confirming.</p>
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between text-body-s"><span className="text-foreground-primary-faded">From</span><span className="text-foreground-primary">Checking ****4521</span></div>
              <div className="flex justify-between text-body-s"><span className="text-foreground-primary-faded">To</span><span className="text-foreground-primary">Savings ****7832</span></div>
              <div className="flex justify-between text-body-s"><span className="text-foreground-primary-faded">Amount</span><span className="text-foreground-primary font-medium">$1,250.00</span></div>
            </div>
          </div>
        </ModalMin>
        <ModalMin
          isOpen={modalMinBackOpen}
          onClose={() => setModalMinBackOpen(false)}
          title="Select account"
          hasBack
          onBack={() => setModalMinBackOpen(false)}
        >
          <p className="text-body-m text-foreground-primary-faded">Modal with back button. Click back or close to dismiss.</p>
        </ModalMin>
      </Section>

      <Section title="ModalMax">
        <div className="flex gap-m">
          <Button variant="secondary" size="small" onClick={() => setModalMaxOpen(true)}>Open ModalMax</Button>
        </div>
        <ModalMax
          isOpen={modalMaxOpen}
          onClose={() => setModalMaxOpen(false)}
          title="Account overview"
        >
          <div className="flex flex-col gap-m">
            <p className="text-body-m text-foreground-primary">This is a large modal (1156×752) for detailed views like account dashboards, transaction history, or settings panels.</p>
            <p className="text-body-s text-foreground-primary-faded">The content area scrolls independently. Close via the X button, clicking the overlay, or pressing Esc.</p>
          </div>
        </ModalMax>
      </Section>

      <Section title="Drawer">
        <div className="flex gap-m">
          <Button variant="secondary" size="small" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          <Button variant="secondary" size="small" onClick={() => setDrawerTitle2Open(true)}>Open Drawer (dual title)</Button>
        </div>
        <Drawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Transfer"
        >
          <div className="flex flex-col gap-m">
            <p className="text-body-m text-foreground-primary">Drawer slides in from the right with a 200ms ease-out transition.</p>
            <p className="text-body-s text-foreground-primary-faded">Close via the X button, overlay click, or Esc key. The slide-out animation plays on close.</p>
          </div>
        </Drawer>
        <Drawer
          isOpen={drawerTitle2Open}
          onClose={() => setDrawerTitle2Open(false)}
          title="Step 1"
          title2="Recipient"
          hasBack
          onBack={() => setDrawerTitle2Open(false)}
        >
          <p className="text-body-m text-foreground-primary-faded">Drawer with dual title and back button.</p>
        </Drawer>
      </Section>

      {/* ═══ TABLES ═══ */}
      {/* TODO: Hover bg bleed value not matching spec — should be 8px each side, currently larger.
       * Likely caused by mix of: incorrect spacing value + header/body column flex-weight mismatch.
       * Defer — visually acceptable, not blocking. Revisit when doing tokenization audit pass. */}
      <h1 className="text-heading-l font-bold mb-3xl mt-3xl">Tables</h1>

      <Section title="TableHeaderCell">
        <table className="border-collapse" style={{ width: 600 }}>
          <thead>
            <tr className="flex px-xs">
              <TableHeaderCell label="Date" className="flex-1" />
              <TableHeaderCell label="To/From" className="flex-1" />
              <TableHeaderCell label="Amount" className="flex-1" />
              <TableHeaderCell label="Status" align="center" className="flex-1" />
              <TableHeaderCell label="Total" align="right" className="flex-1" />
              <TableHeaderCell label="Notes" sortable={false} className="flex-1" />
            </tr>
          </thead>
        </table>
      </Section>

      <Section title="TableCell">
        <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Individual cells with different content types</p>
        <div className="flex gap-xs items-center" style={{ width: 600 }}>
          <TableCell className="flex-1 h-[60px] bg-background-neutral rounded-xs">
            <span className="text-body-m text-foreground-primary">Plain text</span>
          </TableCell>
          <TableCell className="flex-1 h-[60px] bg-background-neutral rounded-xs">
            <div className="flex gap-xs items-center">
              <BrandAvatar size={24} brand="amazon" />
              <span className="text-body-m text-foreground-primary">Amazon</span>
            </div>
          </TableCell>
          <TableCell className="flex-1 h-[60px] bg-background-neutral rounded-xs" align="right">
            <div className="flex gap-xxs">
              <Badge type="neutral" size="extraSmall" label="4822" />
              <Badge type="neutral" size="extraSmall" label="USD" />
            </div>
          </TableCell>
        </div>
      </Section>

      <Section title="TableRow">
        <div className="flex flex-col gap-xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default size (h-60) — hover to see row highlight</p>
            <table style={{ width: 800 }}>
              <thead>
                <tr className="flex px-xs">
                  <TableHeaderCell label="To/From" className="flex-[2]" />
                  <TableHeaderCell label="Amount" className="flex-1" />
                  <TableHeaderCell label="Account" className="flex-1" />
                  <TableHeaderCell label="Method" className="flex-1" />
                  <TableHeaderCell label="Action" align="right" className="flex-1" />
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell className="flex-[2]">
                    <div className="flex gap-xs items-center">
                      <BrandAvatar size={24} brand="amazon" />
                      <div className="flex flex-col gap-xxs"><span className="text-body-m text-foreground-primary">Amazon</span><span className="text-body-s text-foreground-primary-faded">Feb 18, 2026</span></div>
                    </div>
                  </TableCell>
                  <TableCell className="flex-1"><span className="text-body-m text-foreground-primary">-$129.90</span></TableCell>
                  <TableCell className="flex-1"><div className="flex gap-xxs"><Badge type="neutral" size="extraSmall" label="Checking" /><Badge type="neutral" size="extraSmall" label="4822" /></div></TableCell>
                  <TableCell className="flex-1"><div className="flex gap-xxs items-center"><CardMin size="small" /><span className="text-body-s text-foreground-primary-faded">Visa Virtual</span></div></TableCell>
                  <TableCell className="flex-1" align="right"><Button size="extraSmall" variant="secondary">+ Add</Button></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex-[2]">
                    <div className="flex gap-xs items-center">
                      <BrandAvatar size={24} brand="netflix" />
                      <div className="flex flex-col gap-xxs"><span className="text-body-m text-foreground-primary">Netflix</span><span className="text-body-s text-foreground-primary-faded">Feb 17, 2026</span></div>
                    </div>
                  </TableCell>
                  <TableCell className="flex-1"><span className="text-body-m text-foreground-primary">-$24.99</span></TableCell>
                  <TableCell className="flex-1"><div className="flex gap-xxs"><Badge type="neutral" size="extraSmall" label="Checking" /><Badge type="neutral" size="extraSmall" label="4822" /></div></TableCell>
                  <TableCell className="flex-1"><div className="flex gap-xxs items-center"><CardMin size="small" /><span className="text-body-s text-foreground-primary-faded">Visa Virtual</span></div></TableCell>
                  <TableCell className="flex-1" align="right"><Button size="extraSmall" variant="secondary">+ Add</Button></TableCell>
                </TableRow>
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Small size (h-40)</p>
            <table style={{ width: 600 }}>
              <thead>
                <tr className="flex px-xs">
                  <TableHeaderCell label="Name" className="flex-[2]" />
                  <TableHeaderCell label="Status" className="flex-1" />
                  <TableHeaderCell label="Added" className="flex-1" />
                  <TableHeaderCell label="Action" align="right" className="flex-1" />
                </tr>
              </thead>
              <tbody>
                <TableRow size="small">
                  <TableCell className="flex-[2]"><span className="text-body-m text-foreground-primary">iCloud Keychain</span></TableCell>
                  <TableCell className="flex-1"><span className="text-body-s text-foreground-primary-faded">Synced</span></TableCell>
                  <TableCell className="flex-1"><span className="text-body-s text-foreground-primary-faded">Mar 22, 2023</span></TableCell>
                  <TableCell className="flex-1" align="right"><Button size="extraSmall" variant="secondary">Remove</Button></TableCell>
                </TableRow>
                <TableRow size="small">
                  <TableCell className="flex-[2]"><span className="text-body-m text-foreground-primary">Google Password Manager</span></TableCell>
                  <TableCell className="flex-1"><span className="text-body-s text-foreground-primary-faded">Synced</span></TableCell>
                  <TableCell className="flex-1"><span className="text-body-s text-foreground-primary-faded">Sep 14, 2024</span></TableCell>
                  <TableCell className="flex-1" align="right"><Button size="extraSmall" variant="secondary">Remove</Button></TableCell>
                </TableRow>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ═══ CARDS ═══ */}
      <h1 className="text-heading-l font-bold mb-3xl mt-3xl">Cards</h1>

      <Section title="CardMin">
        <div className="flex flex-col gap-m">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default (56×36) and Small (38×26)</p>
            <div className="flex items-end gap-m">
              <CardMin />
              <CardMin size="small" />
            </div>
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">With card number</p>
            <div className="flex items-end gap-m">
              <CardMin cardNumber="2255" />
              <CardMin size="small" cardNumber="2255" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="CardMax">
        <div className="flex flex-wrap gap-xl">
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Default</p>
            <CardMax
              cardName="Main Card"
              companyName="Buburuza EU GmbH."
              balance="$12,450.00"
              cardNumber="•• 2255"
              label="Virtual"
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Frozen</p>
            <CardMax
              cardName="Main Card"
              companyName="Buburuza EU GmbH."
              balance="$0.00"
              cardNumber="•• 4521"
              isFrozen
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Back</p>
            <CardMax
              back
              cardNumber="4532 0000 0000 2255"
              validDate="12 / 28"
              cvv="000"
              onCopy={() => console.log('Copy card number')}
            />
          </div>
          <div>
            <p className="text-body-xs font-medium text-foreground-primary-faded mb-xs">Terminated</p>
            <CardMax
              cardName="Main Card"
              companyName="Buburuza EU GmbH."
              balance="$0.00"
              cardNumber="•• 1190"
              isTerminated
            />
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
            { name: 'NavBarButton', status: 'built' },
            { name: 'NavBar', status: 'built' },
            { name: 'SwipePagination', status: 'built' },
            { name: 'Header', status: 'built' },
            { name: 'ActionFooter', status: 'built' },
            { name: 'SideBar', status: 'built' },
            { name: 'ModalMin', status: 'built' },
            { name: 'ModalMax', status: 'built' },
            { name: 'Drawer', status: 'built' },
            { name: 'TableHeaderCell', status: 'built' },
            { name: 'TableCell', status: 'built' },
            { name: 'TableRow', status: 'built' },
            { name: 'CardMin', status: 'built' },
            { name: 'CardMax', status: 'built' },
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
