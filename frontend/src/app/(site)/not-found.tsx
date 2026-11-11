import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-fjord-100">404</p>
      <h1 className="mt-4 text-3xl font-bold text-fjord-900">
        We could not find that page
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        The link may be old, or the tour may have been removed.
      </p>
      <ButtonLink href="/tours" className="mt-8">
        Browse tours
      </ButtonLink>
    </div>
  );
}
