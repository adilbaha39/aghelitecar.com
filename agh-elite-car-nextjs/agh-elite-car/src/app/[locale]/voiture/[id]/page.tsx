import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CARS, getCarById } from "@/data/cars";
import { whatsappLink, reserveCarMessage } from "@/lib/whatsapp";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateStaticParams() {
  const { locales } = await import("@/i18n/config");
  return locales.flatMap((locale) => CARS.map((c) => ({ locale, id: c.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const car = getCarById(id);
  if (!car) return { title: "Véhicule introuvable" };
  const title = car.title || car.name;
  return {
    title: `${title} ${car.year} – Location à Fès`,
    description: `Louez la ${title} ${car.year} à Fès avec AGH Elite Car. À partir de ${car.price} DH/jour. Réservation sur WhatsApp.`,
    openGraph: {
      title: `${title} ${car.year} | AGH Elite Car`,
      description: car.description,
    },
  };
}

export default async function VoiturePage({ params }: Props) {
  const { locale, id } = await params;
  const car = getCarById(id);
  if (!car) notFound();

  const title = car.title || car.name;
  const waMsg = reserveCarMessage(title, car.year, car.price);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${title} ${car.year}`,
    description: car.description,
    brand: {
      "@type": "Brand",
      name: car.name.split(" ")[0],
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: car.price,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      url: `https://aghelitecar.ma/${locale}/voiture/${car.id}`,
    },
  };

  return (
    <div className="pt-[84px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <section className="bg-white">
        <div className="max-w-[1180px] mx-auto px-6 py-10 md:py-14">
          <nav className="text-sm text-[#6b6b6b] mb-6">
            <Link href={`/${locale}`} className="hover:text-[#b8893a]">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/flotte`} className="hover:text-[#b8893a]">
              Flotte
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#1a1a1a]">{title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="aspect-[4/3] rounded-2xl bg-[#f5f0e6] overflow-hidden border border-[#e8dfcc]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.img}
                  alt={`${title} ${car.year}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450'%3E%3Crect fill='%23f5f0e6' width='600' height='450'/%3E%3Ctext fill='%23b8893a' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E" +
                      encodeURIComponent(title) +
                      "%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-[#8f6a25] mb-2">
                {car.type.toUpperCase()}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">
                {title}{" "}
                <span className="text-[#6b6b6b] font-normal text-2xl">
                  {car.year}
                </span>
              </h1>
              <p className="text-[#6b6b6b] mb-6 leading-relaxed">
                {car.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Spec label="Transmission" value={car.trans} />
                <Spec label="Carburant" value={car.fuel} />
                <Spec label="Places" value={`${car.seats}`} />
              </div>

              <div className="bg-[#faf7f1] rounded-2xl p-6 border border-[#e8dfcc] mb-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-[#6b6b6b]">Prix par jour</p>
                    <p className="text-3xl font-semibold text-[#8f6a25]">
                      {car.price}{" "}
                      <span className="text-base font-normal">DH</span>
                    </p>
                  </div>
                </div>
                <a
                  href={whatsappLink(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-br from-[#e9cf94] to-[#c9993f] text-[#2a1e07] rounded-full px-6 py-3.5 font-semibold hover:-translate-y-0.5 transition-transform shadow-md"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Réserver cette voiture
                </a>
              </div>

              <p className="text-xs text-[#6b6b6b]">
                Réservation instantanée via WhatsApp • Réponse sous 15 min •
                Assistance 7j/7
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-[#e8dfcc] rounded-xl px-4 py-3 min-w-[110px]">
      <p className="text-xs text-[#6b6b6b]">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
