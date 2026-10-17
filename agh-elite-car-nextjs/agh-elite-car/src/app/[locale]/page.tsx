import Link from "next/link";
import { CARS } from "@/data/cars";
import CarCard from "@/components/CarCard";
import { whatsappLink, contactMessage } from "@/lib/whatsapp";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.homeTitle,
    description: dict.meta.homeDesc,
    path: "",
  });
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
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
              <span className="w-6 h-6" aria-hidden>✦</span>
              <span className="w-12 h-px bg-[#b8893a]" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium leading-tight tracking-tight">
              {t.title}
              <em className="block text-[#b8893a] not-italic">{t.titleHighlight}</em>
            </h1>
            <p className="text-lg font-light text-[#1a1a1a] mt-4 mb-6">{t.subtitle}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#444] mb-8 list-none">
              <li>{t.chip1}</li>
              <li>{t.chip2}</li>
              <li>{t.chip3}</li>
            </ul>
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

      {/* SEO content section */}
      <section className="py-14 bg-white border-t border-[#e8dfcc]">
        <div className="max-w-[1180px] mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
            {t.seoSectionTitle}
          </h2>
          <p className="text-[#6b6b6b] leading-relaxed max-w-3xl mb-8">
            {t.seoSectionText}
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[t.seoBenefit1, t.seoBenefit2, t.seoBenefit3, t.seoBenefit4].map(
              (b) => (
                <li
                  key={b}
                  className="bg-[#faf7f1] border border-[#e8dfcc] rounded-xl px-4 py-3 text-sm text-[#1a1a1a]"
                >
                  {b}
                </li>
              )
            )}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/flotte`}
              className="inline-flex items-center gap-2 border border-[#b8893a] text-[#8f6a25] rounded-full px-6 py-2.5 text-sm font-medium hover:bg-[#b8893a] hover:text-white transition"
            >
              {t.seoCtaFleet}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#8f6a25] hover:text-[#b8893a]"
            >
              {t.seoCtaContact} →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#faf7f1] py-14">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-[0.2em] text-[#8f6a25] mb-1">
                {t.fleetEyebrow}
              </p>
              <h2 className="font-serif text-3xl font-medium">{t.fleetTitle}</h2>
            </div>
            <Link
              href={`/${locale}/flotte`}
              className="inline-flex items-center gap-2 text-sm hover:text-[#b8893a] transition"
            >
              {t.seeAll} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                locale={locale}
                perDay={dict.fleet.perDay}
                popularLabel={dict.fleet.popular}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1180px] mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-medium mb-4">{t.ctaTitle}</h2>
          <p className="text-[#6b6b6b] max-w-lg mx-auto mb-8">{t.ctaText}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink(contactMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white rounded-full px-8 py-3.5 font-medium hover:bg-[#1da851] transition"
            >
              {t.ctaBtn}
            </a>
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 border border-[#e8dfcc] rounded-full px-6 py-3 text-sm hover:border-[#b8893a] transition"
            >
              Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
