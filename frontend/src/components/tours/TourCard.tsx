import { Tour } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import Stars from "../ui/Star";
function TourCard({ tour }: { tour: Tour }) {
  const href = `/tours/${tour._id}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={tour.imageCover}
          alt={tour.name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-fjord-900/85 px-3 py-1 text-xs font-medium text-white capitalize">
          {tour.difficulty}
        </span>
      </Link>{" "}
      <div className="flex flex-1 flex-col p-4">
        <p className="flex items-center gap-1 text-sm text-muted">
          <MapPin className="size-4 shrink-0 text-fjord-600" aria-hidden />
          <span className="truncate">{tour.location}</span>
        </p>

        <h3 className="mt-2 line-clamp-2 text-lg leading-snug font-semibold text-fjord-900">
          <Link href={href} className="hover:text-fjord-600">
            {tour.name}
          </Link>
        </h3>

        <p className="mt-2 flex items-center gap-1 text-sm text-muted">
          <Clock className="size-4 text-fjord-600" aria-hidden />
          {tour.duration} days
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-4">
          <p>
            <span className="text-xl font-bold text-fjord-700">
              {tour.price}
            </span>
            <span className="text-sm text-muted"> / person</span>
          </p>
          <Stars rating={tour.ratingsAverage} count={tour.ratingsQuantity} />
        </div>
      </div>
    </article>
  );
}

export default TourCard;
