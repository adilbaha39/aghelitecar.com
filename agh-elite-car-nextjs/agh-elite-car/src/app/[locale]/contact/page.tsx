import type { Metadata } from "next";
import { CONTACT, whatsappLink, contactMessage } from "@/lib/whatsapp";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";
import { buildPageMetadata, canonicalUrl } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";
import ContactForm from "@/components/ContactForm";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.contactTitle,
    description: dict.meta.contactDesc,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = await getDictionary(locale);
  const t = dict.contact;

  const crumbs = breadcrumbSchema([
    { name: dict.nav.home, url: canonicalUrl(locale, "") },
    { name: dict.nav.contact, url: canonicalUrl(locale, "/contact") },
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
          <p className="text-[#6b6b6b] mt-4 max-w-xl">{t.subtitle}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#444] mt-6 list-none">
            <li>{t.chip1}</li>
            <li>{t.chip2}</li>
            <li>{t.chip3}</li>
          </ul>
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
                  <p className="text-xs text-[#6b6b6b]">WhatsApp</p>
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
              <ContactForm
                labels={{
                  name: t.name,
                  phone: t.phonePlaceholder,
                  message: t.message,
                  submit: t.sendWa,
                }}
              />
            </div>

            <div className="bg-white rounded-2xl border border-[#e8dfcc] p-6 flex flex-col items-center text-center">
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
