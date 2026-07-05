export function ResumeUpload() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h2 className="text-base font-semibold text-text-primary">Resume</h2>
      <p className="mt-1 text-sm font-medium text-text-secondary">
        Upload an existing resume to auto-fill the profile, or generate a new
        tailored one from your details below.
      </p>

      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border-muted bg-surface-tertiary px-6 py-12 text-center transition-colors hover:bg-surface-secondary">
        <input type="file" accept="application/pdf" className="sr-only" />
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-card">
          <svg
            className="h-5 w-5 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7.5 7.5l4.5-4.5m0 0l4.5 4.5M12 3v13.5M4.5 19.5h15"
            />
          </svg>
        </span>
        <span className="mt-4 text-sm font-semibold text-text-primary">
          Click to upload or drag and drop
        </span>
        <span className="mt-1 text-sm font-medium text-text-secondary">
          PDF formatting only. Maximum file size 5MB.
        </span>
        <span className="mt-4 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary">
          Select Resume
        </span>
      </label>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
        <p className="text-sm font-medium text-text-secondary">
          Need a fresh document based on the fields below?
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Generate Resume from Profile
        </button>
      </div>
    </section>
  );
}
