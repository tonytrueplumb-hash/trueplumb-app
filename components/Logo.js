export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="50" fill="none" stroke="#FF7A00" strokeWidth="8" />
      <line x1="60" y1="13" x2="60" y2="50" stroke="#fff" strokeWidth="4" />
      <rect x="54" y="48" width="12" height="6" rx="1.5" fill="#fff" />
      <path d="M52 56 H68 L71 68 L60 94 L49 68 Z" fill="#fff" />
      <line x1="44" y1="99" x2="76" y2="99" stroke="#FF7A00" strokeWidth="5" />
    </svg>
  );
}
