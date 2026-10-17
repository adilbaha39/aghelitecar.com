import type { Metadata } from "next";
import { locales, type Locale, defaultLocale } from "@/i18n/config";

export const SITE_URL = "https://aghelitecar.ma";
export const SITE_NAME = "AGH Elite Car";
export const OG_IMAGE = `${SITE_URL}/images/logo-og.webp`;
export const LOGO_URL = `${SITE_URL}/images/logo-transparent.webp`;

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function ogLocale(locale: Locale): string {
  if (locale === "ar") return "ar_MA";
  if (locale === "en") return "en_US";
  return "fr_MA";
}

/** Build hreflang alternates for a path without locale prefix (e.g. "/flotte" or "") */
export function languageAlternates(path: string = ""): Record<string, string> {
  const clean = path === "/" ? "" : path;
  const map: Record<string, string> = {};
  for (const l of locales) {
    map[l] = `${SITE_URL}/${l}${clean}`;
  }
  map["x-default"] = `${SITE_URL}/${defaultLocale}${clean}`;
  return map;
}

export function canonicalUrl(locale: Locale, path: string = ""): string {
  const clean = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${clean}`;
}

type BuildMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  locale,
  title,
  description,
  path = "",
  ogType = "website",
  image = OG_IMAGE,
  imageAlt = SITE_NAME,
  noIndex = false,
}: BuildMetaInput): Metadata {
  const url = canonicalUrl(locale, path);
  const fullTitle = title.includes(SITE_NAME) ? title : title;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: ogType,
      locale: ogLocale(locale),
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      images: [
        {
          url: image,
          width: 800,
          height: 800,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
