import Link from "next/link";
import type { Car } from "@/data/cars";

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
            src={car.img}
            alt={`${car.name} ${car.year}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f5f0e6' width='400' height='300'/%3E%3Ctext fill='%23b8893a' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E" +
                encodeURIComponent(car.name) +
                "%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-[#1a1a1a]">
            {car.name}{" "}
            <span className="text-[#6b6b6b] font-normal text-sm">{car.year}</span>
          </h3>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-[#6b6b6b] mb-4">
          <span>{car.trans}</span>
          <span>{car.fuel}</span>
          <span>{car.seats}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[#8f6a25] font-semibold">
            {car.price} DH <span className="text-xs font-normal text-[#6b6b6b]">{perDay}</span>
          </div>
          <Link
            href={`/${locale}/voiture/${car.id}`}
            className="w-9 h-9 rounded-full border border-[#e8dfcc] flex items-center justify-center text-[#b8893a] group-hover:bg-[#b8893a] group-hover:text-white group-hover:border-[#b8893a] transition-colors"
            aria-label={`Voir ${car.name}`}
          >
            →
          </Link>
        </div>
      </div>
    </article>
  );
}
