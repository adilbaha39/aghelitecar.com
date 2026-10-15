import type { Metadata } from "next";
import { CARS } from "@/data/cars";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import FlotteFilters from "./FlotteFilters";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.meta.fleetTitle,
    description: dict.meta.fleetDesc,
    alternates: {
      canonical: `https://aghelitecar.ma/${locale}/flotte`,
      languages: {
        fr: "https://aghelitecar.ma/fr/flotte",
        en: "https://aghelitecar.ma/en/flotte",
        ar: "https://aghelitecar.ma/ar/flotte",
      },
    },
  };
}

export default async function FlottePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.fleet;

  return (
    <div className="pt-[84px]">
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1180px] mx-auto px-6">
          <p className="text-xs tracking-[0.15em] text-[#b8893a] mb-3">{t.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium leading-tight">
            {t.title}
            <em className="block text-[#b8893a] not-italic">{t.titleHighlight}</em>
          </h1>
          <p className="text-[#6b6b6b] mt-4 max-w-xl">{t.subtitle}</p>
        </div>
      </section>

      <section className="bg-[#faf7f1] py-12" id="vehicules">
        <div className="max-w-[1180px] mx-auto px-6">
          <FlotteFilters cars={CARS} locale={locale} dict={dict} />
        </div>
      </section>
    </div>
  );
}
