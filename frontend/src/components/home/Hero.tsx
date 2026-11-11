"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import { HERO_SLIDES } from "@/content/home";

const SLIDE_MS = 6000;
function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;
  const go = (i: number) => setIndex((i + count) % count);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [index, paused, count]);

  return (
    <section
      className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-fjord-900 text-white sm:min-h-[40rem] lg:min-h-[46rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {HERO_SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          unoptimized
          priority={i === 0}
          sizes="100vw"
          aria-hidden
          className={`-z-20 object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-fjord-900/30 via-fjord-900/35 to-fjord-900/70" />
      <div className="container-page pt-16 pb-32 text-center sm:pb-36">
        <p className="mx-auto w-fit rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
          Guided tours · Small groups
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl leading-[1.05] font-extrabold sm:text-6xl lg:text-7xl">
          Guided tours where every seat is counted.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-fjord-100 sm:text-lg">
          Pick a tour, see exactly how many places are left on each date, and
          book in a minute.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/tours" variant="light">
            Browse all tours
          </ButtonLink>
          <ButtonLink href="/#how-it-works" variant="ghost">
            How booking works
          </ButtonLink>
        </div>
      </div>
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous picture"
        className="absolute top-1/2 left-4 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-white hover:text-fjord-900 sm:grid lg:left-8"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next picture"
        className="absolute top-1/2 right-4 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-white hover:text-fjord-900 sm:grid lg:right-8"
      >
        <ChevronRight className="size-6" />
      </button>
      <div className="absolute inset-x-0 bottom-20 flex justify-center gap-2.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show picture ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index
                ? "w-8 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
