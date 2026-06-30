import Image from "next/image";
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

export function Hero() {
  return (
    <section className="bg-hero-gradient px-6 pb-16 pt-14 md:pb-20 md:pt-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl md:leading-[1.15]">
          Job hunting is hard.
          <br />
          Your tools shouldn&apos;t be.
        </h1>

        <p className="mt-5 max-w-2xl text-base font-medium leading-6 text-text-secondary md:text-lg md:leading-7">
          Stop applying blind. JobPilot finds the jobs, researches the
          companies, and gives you everything you need to stand out.
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

        <div className="mt-12 w-full max-w-5xl overflow-hidden rounded-xl border border-border bg-surface shadow-card md:mt-16">
          <div className="flex items-center gap-1.5 border-b border-border bg-surface-secondary px-4 py-3">
            <span className="size-2.5 rounded-full bg-error" />
            <span className="size-2.5 rounded-full bg-warning" />
            <span className="size-2.5 rounded-full bg-success" />
          </div>
          <Image
            src="/images/dashboard-preview.png"
            alt="JobPilot dashboard showing job stats, recent activity, and company research charts"
            width={1200}
            height={720}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
