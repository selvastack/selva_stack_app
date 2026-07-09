export function TechBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-90" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[rgba(10,105,9,0.12)] blur-3xl" />
      <div className="absolute right-[-8rem] top-28 h-96 w-96 rounded-full bg-[rgba(107,166,92,0.18)] blur-3xl" />
      <svg
        className="absolute left-1/2 top-10 h-[620px] w-[620px] -translate-x-1/2 text-[var(--color-primary)] opacity-[0.09]"
        fill="none"
        viewBox="0 0 620 620"
      >
        <path
          d="M303 32c89 72 117 128 189 118-7 89 45 116 88 137-80 43-54 102-22 168-82-4-125 34-157 115-42-68-108-74-182-34-6-84-61-114-142-131 64-54 54-111 4-173 86 9 120-50 145-127 28 12 52-8 77-73Z"
          stroke="currentColor"
          strokeWidth="18"
        />
        <path
          d="M283 111c15 87-39 129-7 176 27 39 92 39 103 93 11 56-60 87-86 123"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="10"
        />
      </svg>
      <svg
        className="absolute bottom-0 right-0 h-72 w-72 text-[var(--color-primary)] opacity-[0.12]"
        fill="none"
        viewBox="0 0 320 320"
      >
        <path d="M16 260h82c36 0 45-40 86-40h120" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
        <circle cx="99" cy="260" r="9" fill="currentColor" />
        <circle cx="184" cy="220" r="9" fill="currentColor" />
        <path d="M32 92h72c42 0 48 54 90 54h84" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
        <circle cx="104" cy="92" r="9" fill="currentColor" />
        <circle cx="194" cy="146" r="9" fill="currentColor" />
      </svg>
    </div>
  );
}
