"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import ToasterContext from "../context/ToastContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PerformanceMonitor } from "../performance-monitor";

import "../globals.css";
import { usePathname } from "next/navigation";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PerformanceMonitor />
      <Lines />
      {!isAdmin && <Header />}
      <ToasterContext />

      <main className="min-h-screen">{children}</main>

      {!isAdmin && <Footer />}
      <ScrollToTop />
    </ThemeProvider>
  );
}
