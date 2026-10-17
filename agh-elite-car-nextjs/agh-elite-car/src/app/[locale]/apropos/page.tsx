import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { whatsappLink, contactMessage } from "@/lib/whatsapp";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDesc,
    path: "/apropos",
  });
}

export default async function AproposPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = await getDictionary(locale as Locale);
  const t = dict.about;

  return (
    <div className="pt-[84px]">
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1180px] mx-auto px-6">
          <p className="text-xs tracking-[0.15em] text-[#b8893a] mb-3">{t.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium leading-tight max-w-2xl">
            {t.title}
            <em className="block text-[#b8893a] not-italic">{t.titleHighlight}</em>
          </h1>
          <p className="text-[#6b6b6b] mt-6 max-w-2xl leading-relaxed">{t.text}</p>
        </div>
      </section>

      <section className="bg-[#faf7f1] py-14">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-[#e8dfcc] p-6">
              <h3 className="font-serif text-xl mb-3 text-[#8f6a25]">{t.v1Title}</h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">{t.v1Text}</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#e8dfcc] p-6">
              <h3 className="font-serif text-xl mb-3 text-[#8f6a25]">{t.v2Title}</h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">{t.v2Text}</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#e8dfcc] p-6">
              <h3 className="font-serif text-xl mb-3 text-[#8f6a25]">{t.v3Title}</h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">{t.v3Text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-[1180px] mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-medium mb-4">{t.ctaTitle}</h2>
          <p className="text-[#6b6b6b] mb-8 max-w-md mx-auto">{t.ctaText}</p>
          <a
            href={whatsappLink(contactMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-br from-[#e9cf94] to-[#c9993f] text-[#2a1e07] rounded-full px-8 py-3.5 font-semibold shadow-md hover:-translate-y-0.5 transition-transform"
          >
            {t.ctaBtn}
          </a>
        </div>
      </section>
    </div>
  );
}
