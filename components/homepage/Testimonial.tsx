export function Testimonial() {
  return (
    <section className="bg-testimonial-pattern px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Success Stories
        </p>

        <blockquote className="mt-6 max-w-3xl text-xl font-medium italic leading-8 text-text-primary md:text-2xl md:leading-9">
          &ldquo;I used to spend my evenings copy-pasting resumes. Now I open my
          dashboard to see interviews waiting. It feels like cheating. Had 3 offers
          on the table simultaneously.&rdquo;
        </blockquote>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-accent-light text-sm font-semibold text-accent">
            TW
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Tom Wilson</p>
            <p className="text-sm text-text-muted">Junior Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
