type P = { className?: string };

export function WhatsIcon({ className = 'h-5 w-5' }: P) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.04 3C8.86 3 3.04 8.8 3.04 15.96c0 2.29.6 4.52 1.75 6.49L3 29l6.73-1.76a13 13 0 0 0 6.3 1.6h.01c7.17 0 13-5.8 13-12.96C29.04 8.8 23.21 3 16.04 3Zm0 23.66h-.01c-1.94 0-3.85-.52-5.51-1.51l-.4-.23-4 1.04 1.07-3.89-.26-.4a10.7 10.7 0 0 1-1.65-5.71c0-5.95 4.85-10.79 10.8-10.79a10.8 10.8 0 0 1 10.8 10.8c0 5.94-4.85 10.7-10.84 10.7Zm5.92-8.08c-.32-.16-1.92-.95-2.22-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6-.96-.86-1.61-1.91-1.8-2.23-.19-.32-.02-.5.14-.66.15-.14.32-.38.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.58 1.16 3.12 1.32 3.33.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.92-.78 2.19-1.54.27-.75.27-1.4.19-1.54-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function Check({ className = 'h-5 w-5' }: P) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

export function Seta({ className = 'h-4 w-4' }: P) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

export function Instagram({ className = 'h-5 w-5' }: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Marca de quadradinhos, igual ao “R” pixelado da logo */
export function Pixels({ className = '' }: P) {
  const q = [
    [2, 0], [0, 2], [3, 3], [1, 4], [4, 5], [2, 6], [0, 7], [3, 8],
  ];
  return (
    <svg viewBox="0 0 50 90" aria-hidden="true" className={className} fill="currentColor">
      {q.map(([x, y], i) => (
        <rect key={i} x={x * 10} y={y * 10} width="8" height="8" />
      ))}
    </svg>
  );
}
