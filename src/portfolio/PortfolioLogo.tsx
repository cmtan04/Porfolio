interface PortfolioLogoProps {
  size?: number;
  className?: string;
  title?: string;
}

export default function PortfolioLogo({
  size = 40,
  className = "",
  title = "Portfolio",
}: PortfolioLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="logo-grad" x1="8" y1="8" x2="56" y2="56">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#4ECDC4" />
        </linearGradient>
        <linearGradient id="logo-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="32" r="28" fill="#0a0a14" />
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="url(#logo-grad)"
        strokeWidth="2.5"
        opacity="0.9"
      />

      <rect
        x="16"
        y="18"
        width="32"
        height="28"
        rx="6"
        fill="#12121f"
        stroke="url(#logo-grad)"
        strokeWidth="1.75"
      />
      <rect x="16" y="18" width="32" height="8" rx="6" fill="url(#logo-shine)" />

      <circle cx="22" cy="22" r="1.6" fill="#FF6B6B" />
      <circle cx="27" cy="22" r="1.6" fill="#F7DF1E" />
      <circle cx="32" cy="22" r="1.6" fill="#4ECDC4" />

      <path
        d="M24 38 L19 32 L24 26"
        fill="none"
        stroke="#6C63FF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 38 L45 32 L40 26"
        fill="none"
        stroke="#4ECDC4"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 40 L29 24"
        fill="none"
        stroke="url(#logo-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />

      <circle cx="48" cy="16" r="2" fill="#4ECDC4" opacity="0.9" />
    </svg>
  );
}
