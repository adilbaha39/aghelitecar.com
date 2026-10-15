import Link from "next/link";
import { CONTACT, whatsappLink, contactMessage } from "@/lib/whatsapp";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function Footer({ locale, dict }: Props) {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-header-transparent.webp"
                alt="AGH Elite Car"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="font-serif text-xl">Elite Car</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{dict.footer.desc}</p>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-[#e3c27d]">{dict.footer.nav}</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href={`/${locale}`} className="hover:text-white transition">{dict.nav.home}</Link></li>
              <li><Link href={`/${locale}/flotte`} className="hover:text-white transition">{dict.nav.fleet}</Link></li>
              <li><Link href={`/${locale}/blog`} className="hover:text-white transition">{dict.nav.blog}</Link></li>
              <li><Link href={`/${locale}/apropos`} className="hover:text-white transition">{dict.nav.about}</Link></li>
              <li><Link href={`/${locale}/conditions`} className="hover:text-white transition">{dict.nav.conditions}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-white transition">{dict.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-[#e3c27d]">{dict.footer.contact}</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href={`tel:${CONTACT.phoneRaw}`} className="hover:text-white">{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
              <li>{CONTACT.address}</li>
              <li>{dict.contact.hoursValue}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-[#e3c27d]">{dict.footer.reserve}</h3>
            <p className="text-sm text-white/70 mb-4">{dict.footer.reserveText}</p>
            <a
              href={whatsappLink(contactMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-[#1da851] transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} AGH Elite Car. {dict.footer.rights}</p>
          <p>{dict.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
