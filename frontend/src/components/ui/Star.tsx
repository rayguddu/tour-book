import { Star } from "lucide-react";

// Shows 5 stars. `rating` is 0 to 5 (it is rounded to whole stars).
// Pass `count` to also show "(3 reviews)".
type Props = {
  rating: number;
  count?: number;
};

export default function Stars({ rating, count }: Props) {
  // A tour nobody has reviewed yet has rating 0, so say that clearly.
  if (count === 0) {
    return <span className="text-xs text-muted">No reviews yet</span>;
  }

  const filled = Math.round(rating);

  return (
    <span className="flex items-center gap-1.5">
      <span className="flex" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`size-4 ${
              n <= filled ? "fill-amber text-amber" : "text-line"
            }`}
            aria-hidden
          />
        ))}
      </span>
      {count !== undefined && (
        <span className="text-xs text-muted">({count})</span>
      )}
    </span>
  );
}
