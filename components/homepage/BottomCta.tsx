import Link from "next/link";

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BottomCta() {
  return (
    <section className="bg-hero-gradient px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl">
          Your next job search can feel a lot less overwhelming
        </h2>

        <p className="mt-4 max-w-xl text-base font-medium leading-6 text-text-secondary">
          Set up your profile, upload your resume, and start finding matches in
          minutes.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-md bg-overlay-dark px-5 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            Get Started
            <ChevronRightIcon />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
          >
            Find Your First Match
          </Link>
        </div>
      </div>
    </section>
  );
}
