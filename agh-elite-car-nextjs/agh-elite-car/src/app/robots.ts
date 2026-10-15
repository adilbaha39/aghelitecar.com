import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://aghelitecar.ma/sitemap.xml",
    host: "https://aghelitecar.ma",
  };
}
