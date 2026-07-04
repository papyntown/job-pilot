import { HomeCtaButtons } from "@/components/homepage/HomeCtaButtons";

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

        <HomeCtaButtons />
      </div>
    </section>
  );
}
