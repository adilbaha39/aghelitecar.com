import Link from "next/link";
import type { Car } from "@/data/cars";

const PLACEHOLDER = "/images/placeholder-car.svg";

type Props = {
  car: Car;
  locale?: string;
  perDay?: string;
  popularLabel?: string;
};

export default function CarCard({
  car,
  locale = "fr",
  perDay = "/jour",
  popularLabel = "Populaire",
}: Props) {
  const imgSrc = car.img || PLACEHOLDER;

  return (
    <article className="group bg-white rounded-2xl border border-[#e8dfcc] overflow-hidden hover:shadow-lg hover:border-[#b8893a]/40 transition-all duration-300">
      <Link href={`/${locale}/voiture/${car.id}`} className="block relative">
        {car.popular && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-gradient-to-r from-[#e3c27d] to-[#b8893a] text-[#2a1e07] text-xs font-semibold px-3 py-1 rounded-full">
            {popularLabel}
          </span>
        )}
        <div className="aspect-[4/3] bg-[#f5f0e6] flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={`${car.name} ${car.year} – location Fès`}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-medium text-[#1a1a1a] mb-2">
          {car.name}{" "}
          <span className="text-[#6b6b6b] font-normal text-sm">{car.year}</span>
        </h3>

        <div className="flex flex-wrap gap-3 text-xs text-[#6b6b6b] mb-4">
          <span>{car.trans}</span>
          <span>{car.fuel}</span>
          <span>{car.seats}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[#8f6a25] font-semibold">
            {car.price} DH{" "}
            <span className="text-xs font-normal text-[#6b6b6b]">{perDay}</span>
          </div>
          <Link
            href={`/${locale}/voiture/${car.id}`}
            className="w-9 h-9 rounded-full border border-[#e8dfcc] flex items-center justify-center text-[#b8893a] group-hover:bg-[#b8893a] group-hover:text-white group-hover:border-[#b8893a] transition-colors"
            aria-label={`${car.name} ${car.year}`}
          >
            →
          </Link>
        </div>
      </div>
    </article>
  );
}
