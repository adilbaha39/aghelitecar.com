"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { whatsappLink, contactMessage } from "@/lib/whatsapp";
import type { Locale } from "@/i18n/config";
import { locales, localeNames } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const nav = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/flotte`, label: dict.nav.fleet },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/apropos`, label: dict.nav.about },
    { href: `/${locale}/conditions`, label: dict.nav.conditions },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  // Replace current locale in path for language switch
  function switchLocale(newLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/") || `/${newLocale}`;
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-[1180px] mx-auto px-6 h-[84px] flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-header-transparent.webp"
            alt="AGH Elite Car"
            width={56}
            height={56}
            className="w-14 h-14 object-contain"
          />
          <span className="hidden sm:block font-serif text-lg text-[#1a1a1a]">
            Elite Car
          </span>
        </Link>

        <nav
          className={`${
            open
              ? "flex flex-col absolute top-[84px] left-0 right-0 bg-white border-b border-[#e8dfcc] p-6 gap-4 shadow-lg"
              : "hidden"
          } md:flex md:static md:flex-row md:bg-transparent md:border-0 md:p-0 md:shadow-none md:gap-7 text-sm`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`py-1 border-b border-transparent hover:text-[#b8893a] hover:border-[#b8893a] transition-colors ${
                pathname === item.href ? "text-[#b8893a] border-[#b8893a]" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm px-2 py-1 rounded-lg hover:bg-[#faf7f1] transition"
              aria-label="Language"
            >
              <span className="uppercase font-medium">{locale}</span>
              <span className="text-xs">▾</span>
            </button>
            {langOpen && (
              <ul className="absolute top-full end-0 mt-1 bg-white border border-[#e8dfcc] rounded-lg shadow-lg min-w-[120px] overflow-hidden z-50">
                {locales.map((l) => (
                  <li key={l}>
                    <Link
                      href={switchLocale(l)}
                      onClick={() => setLangOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-[#faf7f1] ${
                        l === locale ? "text-[#b8893a] font-medium" : ""
                      }`}
                    >
                      {localeNames[l]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            href={whatsappLink(contactMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 border border-[#b8893a] text-[#8f6a25] rounded-full px-4 py-2 text-[13px] font-medium bg-white/70 hover:bg-[#b8893a] hover:text-white transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {dict.nav.reserve}
          </a>

          <button
            type="button"
            className="md:hidden text-2xl text-[#1a1a1a]"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
