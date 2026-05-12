import AlfaBank from '../../assets/icons/brands/Alfa-Bank.svg?react'
import Amazon from '../../assets/icons/brands/Amazon.svg?react'
import ApplePay from '../../assets/icons/brands/ApplePay.svg?react'
import Authy from '../../assets/icons/brands/Authy.svg?react'
import BuburuzaDark from '../../assets/icons/brands/BuburuzaDark.svg?react'
import BuburuzaLight from '../../assets/icons/brands/BuburuzaLight.svg?react'
import Figma from '../../assets/icons/brands/Figma.svg?react'
import Github from '../../assets/icons/brands/Github.svg?react'
import Google from '../../assets/icons/brands/Google.svg?react'
import Instagram from '../../assets/icons/brands/Instagram.svg?react'
import Netflix from '../../assets/icons/brands/Netflix.svg?react'
import PayPal from '../../assets/icons/brands/PayPal.svg?react'
import PaySafe from '../../assets/icons/brands/PaySafe.svg?react'
import Reddit from '../../assets/icons/brands/Reddit.svg?react'
import Revolut from '../../assets/icons/brands/Revolut.svg?react'
import Skrill from '../../assets/icons/brands/Skrill.svg?react'
import Starbucks from '../../assets/icons/brands/Starbucks.svg?react'
import TBank from '../../assets/icons/brands/T-Bank.svg?react'
import Telegram from '../../assets/icons/brands/Telegram.svg?react'
import Tiktok from '../../assets/icons/brands/Tiktok.svg?react'
import Uber from '../../assets/icons/brands/Uber.svg?react'
import Wallet from '../../assets/icons/brands/Wallet.svg?react'
import X from '../../assets/icons/brands/X.svg?react'

import type { ComponentType, SVGProps } from 'react'

type BrandComponent = ComponentType<SVGProps<SVGSVGElement>>

export const brandRegistry: Record<string, BrandComponent> = {
  'alfa-bank': AlfaBank,
  amazon: Amazon,
  applepay: ApplePay,
  authy: Authy,
  buburuza: BuburuzaDark,
  'buburuza-dark': BuburuzaDark,
  'buburuza-light': BuburuzaLight,
  figma: Figma,
  github: Github,
  google: Google,
  instagram: Instagram,
  netflix: Netflix,
  paypal: PayPal,
  paysafe: PaySafe,
  reddit: Reddit,
  revolut: Revolut,
  skrill: Skrill,
  starbucks: Starbucks,
  't-bank': TBank,
  telegram: Telegram,
  tiktok: Tiktok,
  uber: Uber,
  wallet: Wallet,
  x: X,
}

export type BrandKey = keyof typeof brandRegistry

export function getBrand(key: string): BrandComponent | null {
  return brandRegistry[key.toLowerCase()] ?? null
}
