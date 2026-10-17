import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CARS, getCarById } from "@/data/cars";
import { whatsappLink, reserveCarMessage } from "@/lib/whatsapp";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPageMetadata, canonicalUrl } from "@/lib/seo";
import { breadcrumbSchema, productSchema, jsonLdScript } from "@/lib/schema";

type Props = { params: Promise<{ locale: string; id: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    CARS.map((c) => ({ locale, id: c.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) return {};
  const car = getCarById(id);
  if (!car) return { title: "Not found" };
  const title = car.title || car.name;
  const pageTitle =
    raw === "ar"
      ? `كراء ${title} ${car.year} في فاس`
      : raw === "en"
        ? `Rent ${title} ${car.year} in Fez`
        : `Location ${title} ${car.year} à Fès`;
  const description =
    car.description ||
    `${title} ${car.year} – ${car.price} MAD/day – AGH Elite Car Fès`;
  return buildPageMetadata({
    locale: raw,
    title: pageTitle,
    description: description.slice(0, 160),
    path: `/voiture/${id}`,
  });
}

export default async function VoiturePage({ params }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const car = getCarById(id);
  if (!car) notFound();

  const dict = await getDictionary(locale);
  const title = car.title || car.name;
  const waMsg = reserveCarMessage(title, car.year, car.price);
  const description = car.description || `${title} ${car.year}`;

  const schemas = [
    productSchema(car, locale, description),
    breadcrumbSchema([
      { name: dict.nav.home, url: canonicalUrl(locale, "") },
      { name: dict.nav.fleet, url: canonicalUrl(locale, "/flotte") },
      {
        name: `${title} ${car.year}`,
        url: canonicalUrl(locale, `/voiture/${id}`),
      },
    ]),
  ];

  const imgSrc = car.img || "/images/placeholder-car.svg";

  return (
    <div className="pt-[84px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schemas) }}
      />
      <section className="bg-white">
        <div className="max-w-[1180px] mx-auto px-6 py-10 md:py-14">
          <nav className="text-sm text-[#6b6b6b] mb-6" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-[#b8893a]">
              {dict.nav.home}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/flotte`} className="hover:text-[#b8893a]">
              {dict.nav.fleet}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#1a1a1a]">{title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="aspect-[4/3] rounded-2xl bg-[#f5f0e6] overflow-hidden border border-[#e8dfcc]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
                alt={`${title} ${car.year} – location Fès`}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
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
              <p className="text-[#6b6b6b] mb-6 leading-relaxed">{description}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Spec label={dict.car.trans} value={car.trans} />
                <Spec label={dict.car.fuel} value={car.fuel} />
                <Spec label={dict.car.seats} value={`${car.seats}`} />
              </div>

              <div className="bg-[#faf7f1] rounded-2xl p-6 border border-[#e8dfcc] mb-6">
                <p className="text-sm text-[#6b6b6b]">{dict.car.perDay}</p>
                <p className="text-3xl font-semibold text-[#8f6a25] mb-4">
                  {car.price} <span className="text-base font-normal">DH</span>
                </p>
                <a
                  href={whatsappLink(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-br from-[#e9cf94] to-[#c9993f] text-[#2a1e07] rounded-full px-6 py-3.5 font-semibold hover:-translate-y-0.5 transition-transform shadow-md"
                >
                  {dict.car.reserve}
                </a>
              </div>

              <p className="text-xs text-[#6b6b6b] mb-4">{dict.car.note}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href={`/${locale}/flotte`} className="text-[#8f6a25] hover:text-[#b8893a]">
                  ← {dict.nav.fleet}
                </Link>
                <Link href={`/${locale}/contact`} className="text-[#8f6a25] hover:text-[#b8893a]">
                  {dict.nav.contact}
                </Link>
              </div>
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
