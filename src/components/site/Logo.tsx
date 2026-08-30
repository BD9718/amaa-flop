export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 21c4.5-2.2 7-5.8 7-10.2V5.4L12 3 5 5.4v5.4C5 15.2 7.5 18.8 12 21Z" />
          <path d="M9 11.5c1.6.2 2.6 1.2 3 3 .4-1.8 1.4-2.8 3-3" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-lg font-semibold tracking-tight">AMAA</span>
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Assainissement
        </span>
      </span>
    </span>
  );
}
