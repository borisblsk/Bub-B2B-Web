import { US, GB, AU, AT, RU, BY, KZ, AM, GE, EU } from 'country-flag-icons/react/1x1'

// Use the library's own component type to avoid SVGSVGElement vs HTMLSVGElement mismatch
type FlagComponent = typeof US

const flagRegistry: Record<string, FlagComponent> = {
  USA: US,
  US: US,
  EU: EU,
  UK: GB,
  GB: GB,
  AUS: AU,
  AU: AU,
  AUT: AT,
  AT: AT,
  RU: RU,
  BY: BY,
  KZ: KZ,
  AM: AM,
  GE: GE,
}

export type FlagKey = keyof typeof flagRegistry

export function getFlag(key: string): FlagComponent | null {
  return flagRegistry[key.toUpperCase()] ?? null
}
