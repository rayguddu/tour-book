import Link from "next/link";

// A link that looks like a button. Same shape and looks as <Button>.
const VARIANTS = {
  primary: "bg-fjord-600 text-white hover:bg-fjord-700",
  dark: "bg-fjord-900 text-white hover:bg-ink",
  light: "bg-white text-fjord-900 hover:bg-fjord-50",
  outline: "border border-line bg-white text-ink hover:bg-fog",
  ghost: "border border-white/40 text-white hover:bg-white/10",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
