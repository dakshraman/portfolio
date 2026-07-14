export default function ServiceIcon({ icon }) {
  const icons = {
    laravel: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <path d="M8 32V8H24L32 16V32H8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M24 8V16H32" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 18H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 23H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 28H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    flutter: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="6" width="24" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="28" r="2" fill="currentColor" opacity="0.3" />
        <path d="M14 14H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 18H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 22H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    api: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="10" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="10" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="6" y="22" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="22" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 14H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 26H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    architecture: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="22" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 28H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    fullstack: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 18L10 22L14 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 18L30 22L26 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 14L18 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    consulting: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 14V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="26" r="1.5" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  };
  return icons[icon] || icons.api;
}
