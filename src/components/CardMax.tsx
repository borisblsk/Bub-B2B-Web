import type { ReactNode } from 'react'
import visaLogoUrl from '../assets/VisaLogo.svg'
import frostTextureUrl from '../assets/23921c736064939f389608a323fe1c7877ecd3b6.png'
import { Icon } from './icons'

interface CardMaxProps {
  back?: boolean
  cardName?: string
  companyName?: string
  balance?: string
  cardNumber?: string
  label?: string
  validDate?: string
  cvv?: string
  isFrozen?: boolean
  isTerminated?: boolean
  showVisaLogo?: boolean
  onCopy?: () => void
  button?: ReactNode
  className?: string
}

const cardGradient = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 360 210' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.5'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-18 21 -26.635 -22.83 360 0)'><stop stop-color='rgba(82,82,82,1)' offset='0'/><stop stop-color='rgba(51,51,51,1)' offset='0.5'/><stop stop-color='rgba(36,36,36,1)' offset='0.75'/><stop stop-color='rgba(20,20,20,1)' offset='1'/></radialGradient></defs></svg>"), linear-gradient(90deg, #0f0f0f 0%, #0f0f0f 100%)`

export default function CardMax({
  back = false,
  cardName,
  companyName,
  balance,
  cardNumber,
  label,
  validDate,
  cvv,
  isFrozen = false,
  isTerminated = false,
  showVisaLogo = true,
  onCopy,
  button,
  className,
}: CardMaxProps) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-s shadow-card w-[360px] h-[210px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ backgroundImage: cardGradient }}
    >
      {/* ── FRONT FACE ── */}
      {!back && (
        <>
          {/* Top-left: card name + company */}
          {cardName && (
            <span className="absolute top-xl left-xl text-body-m font-medium text-foreground-primary-inverse whitespace-nowrap">
              {cardName}
            </span>
          )}
          {companyName && (
            <span className="absolute top-[43px] left-xl text-body-s font-normal text-foreground-primary-faded-subtle whitespace-nowrap">
              {companyName}
            </span>
          )}

          {/* Top-right: translucent label badge */}
          {label && (
            <div className="absolute top-xl right-xl bg-white/10 border border-white/20 rounded-full px-xs py-xxs">
              <span className="text-body-xs font-normal text-foreground-primary-inverse">{label}</span>
            </div>
          )}

          {/* Bottom-left: balance + masked card number */}
          {balance && (
            <span className="absolute bottom-[43px] left-xl text-[20px] font-medium text-foreground-primary-inverse leading-[25px] tracking-[-0.1px] whitespace-nowrap">
              {balance}
            </span>
          )}
          {cardNumber && (
            <span className="absolute bottom-xl left-xl text-body-m font-normal text-foreground-primary-faded-subtle whitespace-nowrap">
              {cardNumber}
            </span>
          )}

          {/* Bottom-right: Visa logo */}
          {showVisaLogo && (
            <img
              src={visaLogoUrl}
              alt="Visa"
              className="absolute bottom-xl right-xl"
              style={{ width: 73, height: 23 }}
            />
          )}

          {/* Optional action button */}
          {button && (
            <div className="absolute bottom-xl right-[28px]">
              {button}
            </div>
          )}

          {/* Frozen overlay — frost texture with screen blend to reveal on dark bg */}
          {isFrozen && (
            <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-60">
              <img
                src={frostTextureUrl}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          )}

          {/* Terminated overlay — uniform silver overlay, card content faintly visible */}
          {isTerminated && (
            <div
              className="absolute inset-0 w-full h-full backdrop-blur-[8px] flex flex-col items-center justify-center gap-xs"
              style={{
                background: 'rgba(255,255,255,0.55)',
              }}
            >
              <div className="size-[52px] rounded-m bg-gradient-to-b from-danger-500 to-danger-700 flex items-center justify-center">
                <Icon name="minus" size={32} color="white" />
              </div>
              <span className="text-[20px] font-medium text-foreground-primary leading-[25px] tracking-[-0.1px]">
                Card terminated
              </span>
            </div>
          )}
        </>
      )}

      {/* ── BACK FACE ── */}
      {back && (
        <div className="absolute top-xl left-xl flex flex-col gap-m">
          {/* Card number */}
          {cardNumber && (
            <div className="flex flex-col">
              <span className="text-body-s font-normal text-foreground-primary-faded-subtle">
                Card number
              </span>
              <div className="flex gap-xxs items-center">
                <span className="text-body-m font-normal text-foreground-primary-inverse whitespace-nowrap">
                  {cardNumber}
                </span>
                {onCopy && (
                  <button
                    type="button"
                    onClick={onCopy}
                    aria-label="Copy card number"
                    className="cursor-pointer"
                  >
                    <Icon name="copy" size={20} color="white" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Valid date + CVV */}
          {(validDate || cvv) && (
            <div className="flex gap-xl">
              {validDate && (
                <div className="flex flex-col">
                  <span className="text-body-s font-normal text-foreground-primary-faded-subtle">
                    Valid date
                  </span>
                  <span className="text-body-m font-normal text-foreground-primary-inverse">
                    {validDate}
                  </span>
                </div>
              )}
              {cvv && (
                <div className="flex flex-col">
                  <span className="text-body-s font-normal text-foreground-primary-faded-subtle">
                    CVV
                  </span>
                  <span className="text-body-m font-normal text-foreground-primary-inverse">
                    {cvv}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
