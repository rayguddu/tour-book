"use client";

import { useState } from "react";
// import TourCard from "@/components/tours/TourCard";
import ButtonLink from "@/components/ui/ButtonLink";
import type { Difficulty, Tour } from "@/types/api";
import CenterHeading from "./CenterHeading";
import TourCard from "../tours/TourCard";

const TABS: { label: string; value: Difficulty | "all" }[] = [
  { label: "All tours", value: "all" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Difficult", value: "difficult" },
];

type Props = { tours: Tour[]; error: string };

// Best-rated tours with tabs. The tabs only filter the tours already loaded,
// so switching is instant and no new API call is made.
export default function Packages({ tours, error }: Props) {
  const [tab, setTab] = useState<Difficulty | "all">("all");

  const shown = (
    tab === "all" ? tours : tours.filter((t) => t.difficulty === tab)
  ).slice(0, 8);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <CenterHeading
          kicker="Most popular tour packages"
          title="Something amazing is waiting for you"
          text="The tours our guests rate highest."
        />

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:justify-center">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              aria-pressed={tab === t.value}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.value
                  ? "bg-fjord-600 text-white"
                  : "bg-fog text-ink hover:bg-fjord-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {error ? (
            <p className="rounded-xl bg-danger-50 px-4 py-3 text-danger">
              Could not load tours: {error}
            </p>
          ) : shown.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-muted">
              No tours in this group yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {shown.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/tours" variant="outline">
            See all tours
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
