import visaLogoUrl from '../assets/VisaLogo.svg'

type CardMinSize = 'default' | 'small'

interface CardMinProps {
  size?: CardMinSize
  cardNumber?: string
  className?: string
}

const sizeConfig = {
  default: {
    width: 56,
    height: 36,
    radius: 'rounded-xxs',
    logoWidth: 37,
    logoHeight: 12,
    logoBottom: 6,
    logoRight: 6,
    numberFontSize: 12,
    numberBottom: 18,
    numberLeft: 6,
    gradient: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 56 36' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.8'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-2.8 3.6 -4.1432 -3.9137 56 0)'><stop stop-color='rgba(82,82,82,1)' offset='0'/><stop stop-color='rgba(51,51,51,1)' offset='0.5'/><stop stop-color='rgba(36,36,36,1)' offset='0.75'/><stop stop-color='rgba(20,20,20,1)' offset='1'/></radialGradient></defs></svg>"), linear-gradient(90deg, #0f0f0f 0%, #0f0f0f 100%)`,
  },
  small: {
    width: 38,
    height: 26,
    radius: 'rounded-[4px]',
    logoWidth: 28,
    logoHeight: 9,
    logoBottom: 3,
    logoRight: 3,
    numberFontSize: 10,
    numberBottom: 14,
    numberLeft: 4,
    gradient: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 38 26' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.8'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-1.9 2.6 -2.8115 -2.8266 38 0)'><stop stop-color='rgba(82,82,82,1)' offset='0'/><stop stop-color='rgba(51,51,51,1)' offset='0.5'/><stop stop-color='rgba(36,36,36,1)' offset='0.75'/><stop stop-color='rgba(20,20,20,1)' offset='1'/></radialGradient></defs></svg>"), linear-gradient(90deg, #0f0f0f 0%, #0f0f0f 100%)`,
  },
} as const

export default function CardMin({
  size = 'default',
  cardNumber,
  className,
}: CardMinProps) {
  const cfg = sizeConfig[size]

  return (
    <div
      className={[
        'relative overflow-clip shrink-0',
        cfg.radius,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        width: cfg.width,
        height: cfg.height,
        backgroundImage: cfg.gradient,
      }}
    >
      {cardNumber ? (
        <span
          className="absolute text-foreground-primary-inverse font-normal whitespace-nowrap"
          style={{
            fontSize: cfg.numberFontSize,
            bottom: cfg.numberBottom,
            left: cfg.numberLeft,
            transform: 'translateY(100%)',
          }}
        >
          {cardNumber}
        </span>
      ) : (
        <img
          src={visaLogoUrl}
          alt="Visa"
          className="absolute"
          style={{
            width: cfg.logoWidth,
            height: cfg.logoHeight,
            bottom: cfg.logoBottom,
            right: cfg.logoRight,
          }}
        />
      )}
    </div>
  )
}
