const VARIANTS = {
  primary: "bg-fjord-600 text-white hover:bg-fjord-700",
  dark: "bg-fjord-900 text-white hover:bg-ink",
  outline: "border border-line bg-white text-ink hover:bg-fog",
  danger: "bg-danger text-white hover:bg-danger/90",
  ghost: "text-fjord-700 hover:bg-fjord-50",
};

const SIZES = {
  md: "px-5 py-3 text-sm",
  sm: "px-3.5 py-2 text-xs",
};

// type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: "primary" | "outline" | "danger" | "ghost" | "dark";
//   size?: "sm" | "md";
//   loading?: boolean;
// };
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  loading?: boolean; // shows "Please wait…" and blocks double clicks
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors
                 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}
