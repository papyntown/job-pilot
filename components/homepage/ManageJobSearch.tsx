import Image from "next/image";

type FeatureItemProps = {
  title: string;
  description: string;
  highlighted?: boolean;
};

function FeatureItem({ title, description, highlighted = false }: FeatureItemProps) {
  return (
    <div
      className={`border-l-2 py-1 pl-5 ${
        highlighted ? "border-accent" : "border-transparent"
      }`}
    >
      <h3 className="text-base font-semibold leading-6 text-text-primary">
        {title}
      </h3>
      <p className="mt-1.5 text-sm font-medium leading-5 text-text-secondary">
        {description}
      </p>
    </div>
  );
}

export function ManageJobSearch() {
  return (
    <section className="bg-surface px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl">
            Manage Your Job Search With Ease
          </h2>

          <div className="flex flex-col gap-6">
            <FeatureItem
              highlighted
              title="Find jobs that actually fit"
              description="Search by title and location or paste a job link. Get matched roles you can quickly scan."
            />
            <FeatureItem
              title="Know the Company Before You Apply"
              description="Stop guessing what a company is about. JobPilot browses their site and gives you everything you need to apply with confidence."
            />
            <FeatureItem
              title="Keep track of every application"
              description="Keep a clear view of every job you've found, tailored. Your activity and progress all stay in one simple place."
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-surface-secondary p-3 shadow-card">
          <Image
            src="/images/find-jobs-preview.png"
            alt="JobPilot find jobs table showing company match scores, salary estimates, and sources"
            width={800}
            height={600}
            className="h-auto w-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
