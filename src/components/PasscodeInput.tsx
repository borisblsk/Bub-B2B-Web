import { useRef, useState, useCallback, type KeyboardEvent, type ClipboardEvent } from 'react'

interface PasscodeInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  error?: boolean
  disabled?: boolean
  className?: string
}

export default function PasscodeInput({
  length = 6,
  value = '',
  onChange,
  error = false,
  disabled = false,
  className,
}: PasscodeInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const digits = value.split('').concat(Array(length).fill('')).slice(0, length)

  const focusAt = useCallback((i: number) => {
    if (i >= 0 && i < length) inputRefs.current[i]?.focus()
  }, [length])

  function handleChange(i: number, char: string) {
    if (disabled) return
    const digit = char.replace(/\D/g, '').slice(-1)
    const next = digits.slice()
    next[i] = digit
    onChange?.(next.join(''))
    if (digit && i < length - 1) focusAt(i + 1)
  }

  function handleKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (digits[i]) {
        const next = digits.slice()
        next[i] = ''
        onChange?.(next.join('').replace(/\s+$/, ''))
      } else if (i > 0) {
        const next = digits.slice()
        next[i - 1] = ''
        onChange?.(next.join('').replace(/\s+$/, ''))
        focusAt(i - 1)
      }
    } else if (e.key === 'ArrowLeft') {
      focusAt(i - 1)
    } else if (e.key === 'ArrowRight') {
      focusAt(i + 1)
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange?.(pasted)
    focusAt(Math.min(pasted.length, length - 1))
  }

  function getCellClasses(i: number) {
    const base = 'flex items-center justify-center w-[40px] h-[56px] rounded-s text-heading-m font-medium text-center transition-colors outline-none'

    if (disabled) {
      return `${base} border border-border-base bg-transparent text-foreground-disabled cursor-not-allowed`
    }
    if (error) {
      return `${base} border border-border-danger bg-background-danger text-foreground-error`
    }
    if (focusedIndex === i) {
      return `${base} bg-background-base-subtle-active text-foreground-primary`
    }
    if (digits[i]) {
      return `${base} bg-background-base-subtle border border-border-base text-foreground-primary`
    }
    return `${base} bg-background-base-subtle border border-border-base text-foreground-primary`
  }

  return (
    <div className={`flex items-center gap-xs ${className ?? ''}`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={digits[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(i)}
          onBlur={() => setFocusedIndex(-1)}
          className={getCellClasses(i)}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}
