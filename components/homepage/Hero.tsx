import Image from "next/image";
import { HomeCtaButtons } from "@/components/homepage/HomeCtaButtons";

export function Hero() {
  return (
    <section className="bg-hero-gradient px-6 pb-16 pt-14 md:pb-20 md:pt-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-[3.25rem] md:leading-[1.1]">
          Job hunting is hard.
          <br />
          Your tools shouldn&apos;t be.
        </h1>

        <p className="mt-5 max-w-2xl text-base font-medium leading-6 text-text-secondary md:text-lg md:leading-7">
          Stop applying blind. JobPilot finds the jobs, researches the
          companies, and gives you everything you need to stand out.
        </p>

        <HomeCtaButtons />

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
