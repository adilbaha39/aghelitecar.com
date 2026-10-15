import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { locales, type Locale, localeDir } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    metadataBase: new URL("https://aghelitecar.ma"),
    title: {
      default: dict.meta.homeTitle,
      template: `%s | AGH Elite Car`,
    },
    description: dict.meta.homeDesc,
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        fr: "https://aghelitecar.ma/fr",
        en: "https://aghelitecar.ma/en",
        ar: "https://aghelitecar.ma/ar",
        "x-default": "https://aghelitecar.ma/fr",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_MA",
      siteName: "AGH Elite Car",
      title: dict.meta.homeTitle,
      description: dict.meta.homeDesc,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const dir = localeDir[locale as Locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AGH Elite Car",
    description: dict.meta.homeDesc,
    url: `https://aghelitecar.ma/${locale}`,
    telephone: "+212664443173",
    email: "agh.elitecar@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "32 Rue de Cologne",
      addressLocality: "Fès",
      addressCountry: "MA",
    },
    openingHours: "Mo-Su 08:00-22:00",
    priceRange: "$$",
    areaServed: "Fès",
  };

  return (
    <html lang={locale} dir={dir}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        <Header locale={locale as Locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
