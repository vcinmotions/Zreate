import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZREATE - Digital Excellence & Innovation",
    short_name: "ZREATE",
    description:
      "Transform your business with cutting-edge IT solutions. Web Development, SaaS, ERP, Digital Marketing, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2596be",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
