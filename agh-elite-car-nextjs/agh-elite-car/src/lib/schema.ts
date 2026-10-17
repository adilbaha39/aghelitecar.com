import { SITE_URL, LOGO_URL, OG_IMAGE, SITE_NAME } from "./seo";
import type { Locale } from "@/i18n/config";
import type { Car } from "@/data/cars";

export function localBusinessSchema(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    description,
    url: `${SITE_URL}/${locale}`,
    telephone: "+212664443173",
    email: "agh.elitecar@gmail.com",
    image: OG_IMAGE,
    logo: LOGO_URL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "32 Rue de Cologne",
      addressLocality: "Fès",
      addressRegion: "Fès-Meknès",
      addressCountry: "MA",
    },
    areaServed: {
      "@type": "City",
      name: "Fès",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "22:00",
      },
    ],
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productSchema(car: Car, locale: Locale, description: string) {
  const title = car.title || car.name;
  const url = `${SITE_URL}/${locale}/voiture/${car.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${title} ${car.year}`,
    description,
    brand: {
      "@type": "Brand",
      name: car.name.split(" ")[0],
    },
    category: car.type,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "MAD",
      price: String(car.price),
      availability: "https://schema.org/LimitedAvailability",
      seller: { "@id": `${SITE_URL}/#business` },
    },
  };
}

export function blogPostingSchema(input: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: `${SITE_URL}/${input.locale}/blog/${input.slug}`,
    inLanguage: input.locale,
    keywords: input.keywords?.join(", "),
  };
}

export function jsonLdScript(data: object | object[]) {
  return JSON.stringify(data);
}
