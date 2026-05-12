import type { ReactNode } from 'react'
import { getCrypto } from './registries/crypto'

type CryptoSize = 24 | 36 | 52

interface CryptoAvatarProps {
  symbol: string
  size?: CryptoSize
  variant?: 'default' | 'swap' | 'stack'
  fromSymbol?: string
  toSymbol?: string
  symbols?: string[]
  className?: string
  children?: ReactNode
}

// Inner glyph sizing relative to container
const glyphScale: Record<CryptoSize, string> = { 52: 'w-[75%] h-[75%]', 36: 'w-[75%] h-[75%]', 24: 'w-[75%] h-[75%]' }

function CryptoCoin({ symbol, size, className }: { symbol: string; size: number; className?: string }) {
  const info = getCrypto(symbol)
  if (info) {
    const scale = glyphScale[size as CryptoSize] ?? 'w-[60%] h-[60%]'
    return (
      <div
        className={[
          'flex items-center justify-center rounded-full overflow-clip shrink-0',
          info.hasBorder ? 'border-[0.2px] border-border-base-strong' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{ width: size, height: size, backgroundColor: info.bg }}
      >
        <img src={info.icon} alt={symbol} className={`${scale} object-contain`} />
      </div>
    )
  }
  // Fallback: first letter on gray
  const fontSize = size <= 24 ? 10 : size <= 36 ? 14 : 18
  return (
    <div
      className={['flex items-center justify-center rounded-full overflow-clip shrink-0 bg-gray-400', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-medium leading-none" style={{ fontSize }}>
        {symbol.slice(0, 1).toUpperCase()}
      </span>
    </div>
  )
}

// Swap sub-sizes per container size
const swapSizes: Record<CryptoSize, number> = { 52: 32, 36: 22, 24: 15 }
const swapBorders: Record<CryptoSize, string> = { 52: 'border-[1.5px]', 36: 'border', 24: 'border-[0.5px]' }

// Stack negative margins per size
const stackMargins: Record<CryptoSize, string> = { 52: 'mr-[-16px]', 36: 'mr-[-8px]', 24: 'mr-[-4px]' }

export default function CryptoAvatar({
  symbol,
  size = 36,
  variant = 'default',
  fromSymbol,
  toSymbol,
  symbols,
  className,
  children,
}: CryptoAvatarProps) {
  if (variant === 'default') {
    return (
      <div className={`relative shrink-0 ${className ?? ''}`} style={{ width: size, height: size }}>
        {children ?? <CryptoCoin symbol={symbol} size={size} className="absolute inset-0" />}
      </div>
    )
  }

  if (variant === 'swap') {
    const subSize = swapSizes[size]
    const from = fromSymbol ?? symbol
    const to = toSymbol ?? 'USDT'
    return (
      <div className={`relative shrink-0 ${className ?? ''}`} style={{ width: size, height: size }}>
        <CryptoCoin symbol={from} size={subSize} className="absolute top-0 left-0" />
        <CryptoCoin
          symbol={to}
          size={subSize}
          className={`absolute bottom-0 right-0 ${swapBorders[size]} border-white border-solid`}
        />
      </div>
    )
  }

  // Stack variant — render exactly the symbols passed, no overflow badge
  const stackSymbols = symbols ?? [symbol, 'USDT']
  const margin = stackMargins[size]
  return (
    <div className={`relative flex items-end shrink-0 ${className ?? ''}`}>
      {stackSymbols.map((s, i) => (
        <div key={i} className={`${margin} relative shrink-0`} style={{ width: size, height: size }}>
          <CryptoCoin symbol={s} size={size} className="absolute inset-0" />
        </div>
      ))}
    </div>
  )
}
