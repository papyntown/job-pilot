import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
};

export function Logo({ href = "/" }: LogoProps) {
  return (
    <Link href={href} className="flex items-center">
      <Image
        src="/logo.png"
        alt="JobPilot"
        width={496}
        height={168}
        className="h-8 w-auto"
      />
    </Link>
  );
}
