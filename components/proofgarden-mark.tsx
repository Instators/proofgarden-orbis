export function ProofGardenMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-lockup ${compact ? "brand-lockup-compact" : ""}`}>
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 42C24 29 27 18 39 8C39 25 34 38 24 42Z" fill="currentColor" opacity=".92" />
        <path d="M24 42C24 31 19 22 9 15C8 28 13 39 24 42Z" fill="currentColor" opacity=".55" />
        <path d="M24 43V18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="1" opacity=".22" />
      </svg>
      {!compact && <span>ProofGarden</span>}
    </span>
  );
}
