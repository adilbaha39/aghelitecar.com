import type { MetadataRoute } from "next";
import { CARS } from "@/data/cars";
import { POSTS } from "@/data/blog";
import { locales } from "@/i18n/config";

const BASE = "https://aghelitecar.ma";

const staticPaths = ["", "/flotte", "/apropos", "/conditions", "/contact", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" || path === "/flotte" || path === "/blog" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/flotte" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}${path}`])
          ),
        },
      });
    }

    for (const car of CARS) {
      entries.push({
        url: `${BASE}/${locale}/voiture/${car.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}/voiture/${car.id}`])
          ),
        },
      });
    }

    for (const post of POSTS) {
      entries.push({
        url: `${BASE}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
