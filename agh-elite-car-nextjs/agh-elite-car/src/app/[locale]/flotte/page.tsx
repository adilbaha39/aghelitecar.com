import { CARS } from "@/data/cars";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";
import { buildPageMetadata, canonicalUrl } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";
import FlotteFilters from "./FlotteFilters";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.fleetTitle,
    description: dict.meta.fleetDesc,
    path: "/flotte",
  });
}

export default async function FlottePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = await getDictionary(locale);
  const t = dict.fleet;

  const crumbs = breadcrumbSchema([
    { name: dict.nav.home, url: canonicalUrl(locale, "") },
    { name: dict.nav.fleet, url: canonicalUrl(locale, "/flotte") },
  ]);

  return (
    <div className="pt-[84px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(crumbs) }}
      />
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1180px] mx-auto px-6">
          <p className="text-xs tracking-[0.15em] text-[#b8893a] mb-3">{t.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium leading-tight">
            {t.title}
            <em className="block text-[#b8893a] not-italic">{t.titleHighlight}</em>
          </h1>
          <p className="text-[#6b6b6b] mt-4 max-w-2xl">{t.subtitle}</p>
          {t.intro && (
            <p className="text-[#444] mt-4 max-w-2xl leading-relaxed">{t.intro}</p>
          )}
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
