import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.conditionsTitle,
    description: dict.meta.conditionsDesc,
    path: "/conditions",
  });
}

export default async function ConditionsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = await getDictionary(locale as Locale);
  const t = dict.conditions;
  const sections = (t as { sections?: { title: string; items: string[] }[] }).sections || [];

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

      <section className="bg-[#faf7f1] py-12">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl border border-[#e8dfcc] p-6">
                <h2 className="font-serif text-xl mb-4 text-[#8f6a25]">{s.title}</h2>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[#6b6b6b]">
                      <span className="text-[#b8893a] shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#6b6b6b] mt-8 text-center max-w-2xl mx-auto">{t.note}</p>
        </div>
      </section>
    </div>
  );
}
