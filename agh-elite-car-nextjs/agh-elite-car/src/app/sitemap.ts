import type { MetadataRoute } from "next";
import { CARS } from "@/data/cars";
import { POSTS } from "@/data/blog";
import { locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/seo";

const SITE_UPDATED = "2026-10-15";

const staticPaths: {
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/flotte", changeFrequency: "weekly", priority: 0.9 },
  { path: "/apropos", changeFrequency: "monthly", priority: 0.6 },
  { path: "/conditions", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: SITE_UPDATED,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}${page.path}`])
          ),
        },
      });
    }

    for (const car of CARS) {
      entries.push({
        url: `${SITE_URL}/${locale}/voiture/${car.id}`,
        lastModified: SITE_UPDATED,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/voiture/${car.id}`])
          ),
        },
      });
    }

    for (const post of POSTS) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.date,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
