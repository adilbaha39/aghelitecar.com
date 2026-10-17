import type { Metadata } from "next";
import Link from "next/link";
import { POSTS, getLocalizedPost } from "@/data/blog";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { buildPageMetadata, canonicalUrl } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.blogTitle,
    description: dict.meta.blogDesc,
    path: "/blog",
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.blog;
  const dateLocale = locale === "ar" ? "ar-MA" : locale === "en" ? "en-GB" : "fr-FR";

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
          <div className="grid md:grid-cols-3 gap-6">
            {POSTS.map((post) => {
              const loc = getLocalizedPost(post, locale);
              return (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl border border-[#e8dfcc] overflow-hidden hover:shadow-lg hover:border-[#b8893a]/40 transition-all flex flex-col"
                >
                  <div className="h-40 bg-gradient-to-br from-[#f5f0e6] to-[#e8dfcc] flex items-center justify-center px-4">
                    <span className="text-[#b8893a] font-serif text-lg text-center line-clamp-2">
                      {loc.title.split(":")[0]}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-[#6b6b6b] mb-3">
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
                    <h2 className="font-serif text-xl font-medium mb-3 leading-snug">
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="hover:text-[#b8893a] transition"
                      >
                        {loc.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed mb-5 flex-1">
                      {loc.excerpt}
                    </p>
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#8f6a25] hover:text-[#b8893a] transition"
                    >
                      {t.read} →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
