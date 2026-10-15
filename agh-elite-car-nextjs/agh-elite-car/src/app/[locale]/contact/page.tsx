import type { Metadata } from "next";
import { CONTACT, whatsappLink, contactMessage } from "@/lib/whatsapp";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.meta.contactTitle,
    description: dict.meta.contactDesc,
    alternates: {
      canonical: `https://aghelitecar.ma/${locale}/contact`,
      languages: {
        fr: "https://aghelitecar.ma/fr/contact",
        en: "https://aghelitecar.ma/en/contact",
        ar: "https://aghelitecar.ma/ar/contact",
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.contact;

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
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#444] mt-6">
            <span>{t.chip1}</span>
            <span>{t.chip2}</span>
            <span>{t.chip3}</span>
          </div>
        </div>
      </section>

      <section className="bg-[#faf7f1] py-12">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-[#e8dfcc] p-6">
              <h2 className="font-serif text-xl mb-1">{t.coords}</h2>
              <p className="text-sm text-[#b8893a] mb-6">{t.coordsSub}</p>
              <ul className="space-y-5 text-sm">
                <li>
                  <p className="font-medium">{t.phone}</p>
                  <a href={`tel:${CONTACT.phoneRaw}`} className="text-[#6b6b6b] hover:text-[#b8893a]">
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <p className="font-medium">{t.address}</p>
                  <p className="text-[#6b6b6b]">{CONTACT.address}</p>
                </li>
                <li>
                  <p className="font-medium">{t.email}</p>
                  <a href={`mailto:${CONTACT.email}`} className="text-[#6b6b6b] hover:text-[#b8893a]">
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <p className="font-medium">{t.hours}</p>
                  <p className="text-[#6b6b6b]">{t.hoursValue}</p>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8dfcc] p-6">
              <h2 className="font-serif text-xl mb-1">{t.formTitle}</h2>
              <p className="text-sm text-[#6b6b6b] mb-6">{t.formSub}</p>
              <div className="space-y-4">
                <input type="text" placeholder={t.name} className="w-full rounded-xl border border-[#e8dfcc] px-4 py-3 text-sm bg-[#faf7f1] focus:outline-none focus:border-[#b8893a]" />
                <input type="tel" placeholder={t.phonePlaceholder} className="w-full rounded-xl border border-[#e8dfcc] px-4 py-3 text-sm bg-[#faf7f1] focus:outline-none focus:border-[#b8893a]" />
                <textarea placeholder={t.message} rows={4} className="w-full rounded-xl border border-[#e8dfcc] px-4 py-3 text-sm bg-[#faf7f1] focus:outline-none focus:border-[#b8893a] resize-none" />
                <a
                  href={whatsappLink(contactMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#e9cf94] to-[#c9993f] text-[#2a1e07] rounded-full px-6 py-3 font-semibold text-sm"
                >
                  {t.sendWa} →
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8dfcc] p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] text-2xl mb-4">
                WA
              </div>
              <h2 className="font-serif text-xl mb-2">{t.waTitle}</h2>
              <p className="text-sm text-[#6b6b6b] mb-6">{t.waText}</p>
              <a
                href={whatsappLink(contactMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#25D366] text-[#25D366] rounded-full px-6 py-2.5 text-sm font-medium hover:bg-[#25D366] hover:text-white transition"
              >
                {t.waBtn} →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
