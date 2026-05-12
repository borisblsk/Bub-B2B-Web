import btcUrl from '../../assets/icons/crypto/btc.svg'
import ethUrl from '../../assets/icons/crypto/eth.svg'
import usdtUrl from '../../assets/icons/crypto/usdt.svg'
import usdcUrl from '../../assets/icons/crypto/usdc.svg'
import bnbUrl from '../../assets/icons/crypto/bnb.svg'
import solUrl from '../../assets/icons/crypto/sol.svg'
import xrpUrl from '../../assets/icons/crypto/xrp.svg'
import trxUrl from '../../assets/icons/crypto/trx.svg'
import tonUrl from '../../assets/icons/crypto/ton.svg'
import bubUrl from '../../assets/icons/crypto/bub.svg'

interface CryptoInfo {
  icon: string
  bg: string
  hasBorder?: boolean
}

const cryptoRegistry: Record<string, CryptoInfo> = {
  BUB: { icon: bubUrl, bg: '#000000' },
  BTC: { icon: btcUrl, bg: '#F7931A' },
  ETH: { icon: ethUrl, bg: '#FFFFFF', hasBorder: true },
  USDT: { icon: usdtUrl, bg: '#26A17B' },
  USDC: { icon: usdcUrl, bg: '#2775CA' },
  BNB: { icon: bnbUrl, bg: '#F0B90B' },
  SOL: { icon: solUrl, bg: '#FFFFFF', hasBorder: true },
  XRP: { icon: xrpUrl, bg: '#FFFFFF', hasBorder: true },
  TRX: { icon: trxUrl, bg: '#FF060A' },
  TON: { icon: tonUrl, bg: '#0098EA' },
}

export type CryptoKey = keyof typeof cryptoRegistry

export function getCrypto(key: string): CryptoInfo | null {
  return cryptoRegistry[key.toUpperCase()] ?? null
}
