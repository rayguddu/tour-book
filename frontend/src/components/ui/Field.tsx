const BASE =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-fjord-600 focus:outline-none focus:ring-2 focus:ring-fjord-600/20 disabled:bg-fog";

function Label({ text, hint }: { text: string; hint?: string }) {
  return (
    <span className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium text-ink">
      {text}
      {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
    </span>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Input({ label, hint, className = "", ...rest }: InputProps) {
  return (
    <label className="block">
      <Label text={label} hint={hint} />
      <input className={`${BASE} ${className}`} {...rest} />
    </label>
  );
}
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
};
export function Textarea({ label, hint, ...rest }: TextareaProps) {
  return (
    <label className="block">
      <Label text={label} hint={hint} />
      <textarea className={BASE} {...rest} />
    </label>
  );
}
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
};
export function Select({ label, hint, children, ...rest }: SelectProps) {
  return (
    <label className="block">
      <Label text={label} hint={hint} />
      <select className={BASE} {...rest}>
        {children}
      </select>
    </label>
  );
}
