import Stars from "../ui/Star";
import CenterHeading from "./CenterHeading";
import { Link, Quote } from "lucide-react";

export type HomeReview = {
  id: string;
  name: string;
  comment: string;
  rating: number;
};
export default function Testimonials({ reviews }: { reviews: HomeReview[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="container-page py-16 lg:py-24">
      <CenterHeading
        kicker="Guest feedback"
        title="See what our guests say"
        text="Every review comes from someone who completed the tour."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.id}
            className="relative flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8"
          >
            <Quote
              className="absolute top-6 right-6 size-10 text-fjord-100"
              aria-hidden
            />
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-fjord-600 font-display text-lg font-bold text-white">
                {r.name.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-fjord-900">
                  {r.name}
                </p>
              </div>
            </div>
            <blockquote className="mt-5 line-clamp-5 text-muted">
              {r.comment}
            </blockquote>
            <div className="mt-auto pt-5">
              <Stars rating={r.rating} />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
