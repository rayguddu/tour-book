import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function Photo({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 33vw, 50vw",
  priority = false,
}: Props) {
  return (
    <div
      className={`relative overflow-hidden bg-linear-to-br from-fjord-100 to-fjord-300 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
