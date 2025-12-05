// import { MetadataRoute } from "next";

// export default function sitemap(): MetadataRoute.Sitemap {
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zreate.com";

//   const routes = [
//     "",
//     "/about",
//     "/service",
//     "/support",
//     "/docs",
//     "/docs/webdev",
//     "/docs/saas",
//     "/docs/marketing",
//     "/docs/erp",
//     "/docs/outsourcing",
//     "/docs/training",
//   ];

//   return routes.map((route) => ({
//     url: `${baseUrl}${route}`,
//     lastModified: new Date(),
//     changeFrequency: route === "" ? "daily" : "weekly",
//     priority: route === "" ? 1 : 0.8,
//   }));
// }
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zreate.com";

  const routes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/service", priority: 0.8 },
    { path: "/support", priority: 0.7 },

    { path: "/docs", priority: 0.8 },
    { path: "/docs/webdev", priority: 0.8 },
    { path: "/docs/saas", priority: 0.8 },
    { path: "/docs/marketing", priority: 0.8 },
    { path: "/docs/erp", priority: 0.8 },
    { path: "/docs/outsourcing", priority: 0.8 },
    { path: "/docs/training", priority: 0.8 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.path === "" ? "daily" : "weekly",
    priority: route.priority,
  }));
}
