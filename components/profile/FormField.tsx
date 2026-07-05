type Props = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
};

export function FormField({ label, htmlFor, children }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-wide text-text-secondary"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
