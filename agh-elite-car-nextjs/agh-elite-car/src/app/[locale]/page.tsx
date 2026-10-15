import Link from "next/link";
import { CARS } from "@/data/cars";
import CarCard from "@/components/CarCard";
import { whatsappLink, contactMessage } from "@/lib/whatsapp";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDesc,
    alternates: {
      canonical: `https://aghelitecar.ma/${locale}`,
      languages: {
        fr: "https://aghelitecar.ma/fr",
        en: "https://aghelitecar.ma/en",
        ar: "https://aghelitecar.ma/ar",
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const featured = CARS.slice(0, 4);
  const t = dict.home;

  return (
    <>
      <section className="relative min-h-[480px] pt-[84px] overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-[60%] h-full bg-[#faf7f1] hidden md:block" />
        <div className="max-w-[1180px] mx-auto px-6 relative z-20">
          <div className="max-w-xl py-12 md:py-16">
            <div className="flex items-center gap-3 text-[#b8893a] text-xl mb-4">
              <span className="w-6 h-6">✦</span>
              <span className="w-12 h-px bg-[#b8893a]" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium leading-tight tracking-tight">
              {t.title}
              <em className="block text-[#b8893a] not-italic">{t.titleHighlight}</em>
            </h1>
            <p className="text-lg font-light text-[#1a1a1a] mt-4 mb-6">{t.subtitle}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#444] mb-8">
              <span>{t.chip1}</span>
              <span>{t.chip2}</span>
              <span>{t.chip3}</span>
            </div>
            <a
              href={whatsappLink(contactMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-br from-[#e9cf94] to-[#c9993f] text-[#2a1e07] rounded-full px-8 py-3.5 font-semibold text-[15px] shadow-lg shadow-[#b8893a]/30 hover:-translate-y-0.5 transition-transform"
            >
              {t.cta} →
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#faf7f1] py-14">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-[0.2em] text-[#8f6a25] mb-1">{t.fleetEyebrow}</p>
              <h2 className="font-serif text-3xl font-medium">{t.fleetTitle}</h2>
            </div>
            <Link href={`/${locale}/flotte`} className="inline-flex items-center gap-2 text-sm hover:text-[#b8893a] transition">
              {t.seeAll} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} locale={locale} perDay={dict.fleet.perDay} popularLabel={dict.fleet.popular} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1180px] mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-medium mb-4">{t.ctaTitle}</h2>
          <p className="text-[#6b6b6b] max-w-lg mx-auto mb-8">{t.ctaText}</p>
          <a
            href={whatsappLink(contactMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white rounded-full px-8 py-3.5 font-medium hover:bg-[#1da851] transition"
          >
            {t.ctaBtn}
          </a>
        </div>
      </section>
    </>
  );
}
