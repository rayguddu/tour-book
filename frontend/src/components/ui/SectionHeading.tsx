// Title with optional text. `children` is for a link or button on the right.
type Props = {
  title: string;
  text?: string;
  light?: boolean; // true on dark backgrounds
  children?: React.ReactNode;
};

export default function SectionHeading({
  title,
  text,
  light = false,
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2
          className={`text-3xl font-bold sm:text-4xl lg:text-5xl ${
            light ? "text-white" : "text-fjord-900"
          }`}
        >
          {title}
        </h2>
        {text && (
          <p
            className={`mt-3 text-lg ${light ? "text-fjord-100" : "text-muted"}`}
          >
            {text}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
