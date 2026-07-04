import Link from "next/link";

function PlayArrowIcon() {
  return (
    <svg
      width="13"
      height="15"
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-text-muted"
    >
      <path
        d="M2 1.8L11.5 7.5L2 13.2V1.8Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeCtaButtons() {
  return (
    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 rounded-md bg-cta-dark px-6 py-3 text-base font-medium text-surface transition-opacity hover:opacity-90"
      >
        Get Started
        <PlayArrowIcon />
      </Link>
      <Link
        href="/login"
        className="inline-flex items-center rounded-md border border-border bg-surface px-6 py-3 text-base font-medium text-text-primary transition-colors hover:bg-surface-secondary"
      >
        Find Your First Match
      </Link>
    </div>
  );
}
