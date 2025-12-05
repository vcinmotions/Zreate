import { store } from "@/store";
import { ThemeProvider } from "next-themes";
import { Nunito } from "next/font/google";
import Providers from "./providers";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-nunito",
  fallback: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: true,
  preload: true,
});

export const metadata = {
  title: {
    default: "ZREATE",
    template: "ZREATE  ",
  },
  description: "ZREATE - Creative Digital Agency",
  icons: {
    icon: "/images/logo/logo_light.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
