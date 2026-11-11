// Small label, big title and a short text, all centered.
// `light` is for dark or photo backgrounds.
type Props = {
  kicker: string;
  title: string;
  text?: string;
  light?: boolean;
};

export default function CenterHeading({
  kicker,
  title,
  text,
  light = false,
}: Props) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`text-sm font-semibold tracking-widest uppercase ${
          light ? "text-fjord-100" : "text-fjord-600"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-fjord-900"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-4 text-lg ${light ? "text-fjord-100" : "text-muted"}`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
