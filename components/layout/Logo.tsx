import Link from "next/link";

type LogoProps = {
  href?: string;
};

export function Logo({ href = "/" }: LogoProps) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <span
        className="bg-logo-gradient flex size-9 shrink-0 items-center justify-center rounded-[10px]"
        aria-hidden="true"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 5.5L9 3L14 5.5V12.5L9 15L4 12.5V5.5Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 8V15"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-[19px] font-bold leading-7 text-text-darkest">
        JobPilot
      </span>
    </Link>
  );
}
