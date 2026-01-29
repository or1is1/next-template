import { env } from "./src/lib/env.ts";

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: env.NEXT_PUBLIC_APP_URL,
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        // allow: "/rss.xml",
        disallow: "/api/*",
        crawlDelay: 10,
      },
    ],
    // additionalSitemaps: [
    //     `${env.NEXT_PUBLIC_APP_URL}/ingredient/sitemap.xml`,
    //     `${env.NEXT_PUBLIC_APP_URL}/recipe/sitemap.xml`,
    // ],
  },
  exclude: [
    "/",
    // "/ingredient/sitemap.xml",
    // "/recipe/sitemap.xml",
  ],
  priority: 0.7,
  additionalPaths: async (config) => {
    return [
      {
        loc: `${config.siteUrl}`,
        changefreq: "yearly",
        priority: 1.0,
      },
    ];
  },
};

export default sitemapConfig;
