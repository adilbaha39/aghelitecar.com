import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPostBySlug, getAllSlugs, getLocalizedPost } from "@/data/blog";
import { whatsappLink, contactMessage } from "@/lib/whatsapp";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const loc = getLocalizedPost(post, locale);
  return {
    title: loc.title,
    description: loc.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `https://aghelitecar.ma/${locale}/blog/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://aghelitecar.ma/${l}/blog/${slug}`])
      ),
    },
    openGraph: {
      title: loc.title,
      description: loc.excerpt,
      type: "article",
      publishedTime: post.date,
      locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_MA",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const loc = getLocalizedPost(post, locale);
  const dict = await getDictionary(locale as Locale);
  const t = dict.blog;
  const dateLocale = locale === "ar" ? "ar-MA" : locale === "en" ? "en-GB" : "fr-FR";

  const paragraphs = loc.content.trim().split("\n\n").filter((p) => p.trim());

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: loc.title,
    description: loc.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "AGH Elite Car" },
    publisher: {
      "@type": "Organization",
      name: "AGH Elite Car",
      url: "https://aghelitecar.ma",
    },
    mainEntityOfPage: `https://aghelitecar.ma/${locale}/blog/${slug}`,
    keywords: post.keywords.join(", "),
    inLanguage: locale,
  };

  return (
    <div className="pt-[84px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="bg-white">
        <div className="max-w-[800px] mx-auto px-6 py-12 md:py-16">
          <nav className="text-sm text-[#6b6b6b] mb-8">
            <Link href={`/${locale}`} className="hover:text-[#b8893a]">
              {dict.nav.home}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/blog`} className="hover:text-[#b8893a]">
              {dict.nav.blog}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#1a1a1a] line-clamp-1">{loc.title}</span>
          </nav>

          <header className="mb-10">
            <div className="flex items-center gap-3 text-xs text-[#6b6b6b] mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>
                {post.readTime} min {t.readTime}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium leading-tight mb-4">
              {loc.title}
            </h1>
            <p className="text-lg text-[#6b6b6b] leading-relaxed">{loc.excerpt}</p>
          </header>

          <div className="space-y-5 text-[#1a1a1a] leading-relaxed">
            {paragraphs.map((block, i) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={i} className="font-serif text-2xl font-medium mt-10 mb-4">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={i} className="font-serif text-xl font-medium mt-8 mb-3">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
                const items = trimmed.split("\n").filter((l) => l.trim());
                return (
                  <ul key={i} className="list-disc pl-5 space-y-2 my-4">
                    {items.map((item, j) => (
                      <li key={j} className="text-[#444]">
                        {item.replace(/^[-*\d.]+\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (trimmed.startsWith("|")) {
                return (
                  <div
                    key={i}
                    className="overflow-x-auto my-6 text-sm"
                    dangerouslySetInnerHTML={{ __html: renderTable(trimmed) }}
                  />
                );
              }
              const html = trimmed
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(
                  /\[(.*?)\]\((.*?)\)/g,
                  '<a href="$2" class="text-[#b8893a] underline hover:text-[#8f6a25]">$1</a>'
                );
              return (
                <p
                  key={i}
                  className="text-[#444] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            })}
          </div>

          <div className="mt-14 p-6 bg-[#faf7f1] rounded-2xl border border-[#e8dfcc] text-center">
            <h3 className="font-serif text-xl mb-2">{t.ctaTitle}</h3>
            <p className="text-sm text-[#6b6b6b] mb-5">{t.ctaText}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink(contactMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-[#e9cf94] to-[#c9993f] text-[#2a1e07] rounded-full px-6 py-3 font-semibold text-sm"
              >
                {dict.nav.reserve}
              </a>
              <Link
                href={`/${locale}/flotte`}
                className="inline-flex items-center gap-2 border border-[#b8893a] text-[#8f6a25] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#b8893a] hover:text-white transition"
              >
                {t.seeFleet}
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#e8dfcc]">
            <h3 className="font-serif text-lg mb-4">{t.other}</h3>
            <ul className="space-y-3">
              {POSTS.filter((p) => p.slug !== post.slug).map((p) => {
                const other = getLocalizedPost(p, locale);
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/${locale}/blog/${p.slug}`}
                      className="text-[#8f6a25] hover:text-[#b8893a] transition text-sm"
                    >
                      {other.title} →
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}

function renderTable(md: string): string {
  const lines = md.trim().split("\n").filter((l) => l.trim());
  if (lines.length < 2) return "";
  let html = '<table class="w-full border-collapse text-left">';
  lines.forEach((line, idx) => {
    if (line.includes("---")) return;
    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
    const tag = idx === 0 ? "th" : "td";
    html += "<tr>";
    cells.forEach((cell) => {
      html += `<${tag} class="border border-[#e8dfcc] px-3 py-2 ${idx === 0 ? "bg-[#faf7f1] font-medium" : ""}">${cell}</${tag}>`;
    });
    html += "</tr>";
  });
  html += "</table>";
  return html;
}
