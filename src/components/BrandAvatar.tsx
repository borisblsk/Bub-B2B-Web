import type { ReactNode } from 'react'
import { getBrand } from './registries/brands'

type BrandSize = 24 | 36 | 52

interface BrandAvatarProps {
  size?: BrandSize
  hasBorder?: boolean
  className?: string
  children?: ReactNode
  brand?: string
}

export default function BrandAvatar({
  size = 36,
  hasBorder = false,
  className,
  children,
  brand,
}: BrandAvatarProps) {
  // Direct children take priority
  if (children) {
    return (
      <div
        style={{ width: size, height: size }}
        className={[
          'rounded-full overflow-clip shrink-0',
          hasBorder ? 'border border-border-base' : '',
          className,
        ].filter(Boolean).join(' ')}
      >
        {children}
      </div>
    )
  }

  // Look up brand SVG from registry — self-contained circular logos
  const BrandSvg = brand ? getBrand(brand) : null

  if (BrandSvg) {
    return (
      <div
        style={{ width: size, height: size }}
        className={[
          'rounded-full overflow-clip shrink-0',
          hasBorder ? 'border border-border-base' : '',
          className,
        ].filter(Boolean).join(' ')}
      >
        <BrandSvg width="100%" height="100%" />
      </div>
    )
  }

  // Fallback: first letter on gray circle
  return (
    <div
      style={{ width: size, height: size }}
      className={[
        'rounded-full overflow-clip shrink-0 flex items-center justify-center bg-background-base',
        hasBorder ? 'border border-border-base' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="text-foreground-primary-faded font-medium leading-none" style={{ fontSize: size * 0.4 }}>
        {(brand ?? '?').charAt(0).toUpperCase()}
      </span>
    </div>
  )
}
