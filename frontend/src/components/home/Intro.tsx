import ButtonLink from "@/components/ui/ButtonLink";
import Photo from "@/components/ui/Photo";
import { INTRO_IMAGES } from "@/content/home";

// Text in the middle, pictures on both sides (two pictures below on phones).
export default function Intro() {
  const [a, b, c, d] = INTRO_IMAGES;

  return (
    <section className="container-page pt-28 pb-16 sm:pt-32 lg:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr_1fr]">
        {/* Left pictures (large screens) */}
        <div className="hidden space-y-5 lg:block">
          <Photo
            src={a}
            alt=""
            sizes="25vw"
            className="aspect-[4/3] rounded-2xl"
          />
          <Photo
            src={b}
            alt=""
            sizes="25vw"
            className="ml-10 aspect-[4/3] rounded-2xl"
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-fjord-600 uppercase">
            Welcome to Wayfar
          </p>
          <h2 className="mt-3 text-3xl font-bold text-fjord-900 sm:text-4xl lg:text-5xl">
            Let&apos;s discover the world with our excellent eyes
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted">
            Small groups, local guides and seats you can see before you book.
            Choose a place, check the dates and send your booking in a minute.
          </p>
          <ButtonLink href="/tours" className="mt-8">
            Take a tour
          </ButtonLink>
        </div>

        {/* Right pictures (large screens) */}
        <div className="hidden space-y-5 lg:block">
          <Photo
            src={c}
            alt=""
            sizes="25vw"
            className="mr-10 aspect-[4/3] rounded-2xl"
          />
          <Photo
            src={d}
            alt=""
            sizes="25vw"
            className="aspect-[4/3] rounded-2xl"
          />
        </div>

        {/* Two pictures for phones and tablets */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          <Photo
            src={a}
            alt=""
            sizes="50vw"
            className="aspect-[4/3] rounded-2xl"
          />
          <Photo
            src={c}
            alt=""
            sizes="50vw"
            className="aspect-[4/3] rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
