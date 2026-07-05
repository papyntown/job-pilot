import { CompletionIndicator } from "@/components/profile/CompletionIndicator";

type Props = {
  completionPercentage: number;
  missingFields: string[];
};

export function ProfileAttentionBanner({
  completionPercentage,
  missingFields,
}: Props) {
  if (missingFields.length === 0) return null;

  return (
    <section className="flex items-center justify-between rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div>
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-error"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <h2 className="text-base font-semibold text-text-primary">
            Profile needs attention
          </h2>
        </div>
        <p className="mt-2 max-w-md text-sm font-medium text-text-secondary">
          Complete the missing fields to improve your chance of getting
          tailored matches and generating quality resumes.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {missingFields.map((field) => (
            <span
              key={field}
              className="rounded-full bg-error/10 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-error"
            >
              {field}
            </span>
          ))}
        </div>
      </div>

      <CompletionIndicator percentage={completionPercentage} />
    </section>
  );
}
