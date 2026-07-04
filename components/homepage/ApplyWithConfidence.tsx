import Image from "next/image";

type FeatureItemProps = {
  title: string;
  description: string;
};

function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <div className="py-1">
      <h3 className="text-base font-semibold leading-6 text-text-primary">
        {title}
      </h3>
      <p className="mt-1.5 text-sm font-medium leading-5 text-text-secondary">
        {description}
      </p>
    </div>
  );
}

export function ApplyWithConfidence() {
  return (
    <section className="bg-surface px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-xl border border-border bg-surface-secondary p-3 shadow-card">
            <Image
              src="/images/agent-log.png"
              alt="JobPilot agent log showing the agent initializing, scanning roles, filtering by salary, and tailoring a resume"
              width={2144}
              height={1656}
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl">
            Apply With More Confidence, Every Time
          </h2>

          <div className="flex flex-col gap-6">
            <FeatureItem
              title="Understand your match score"
              description="See how your profile lines up with each role before you apply. Get a clear breakdown of what fits and what's missing."
            />
            <FeatureItem
              title="AI-Powered Job Matching"
              description="Stop guessing which jobs are worth applying to. JobPilot scores every role against your actual skills so you focus on the ones that matter."
            />
            <FeatureItem
              title="Focus on the right roles"
              description="Filter out low fit jobs and stay on the ones that actually matter. Spend less time sorting and more time applying."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
