export const dynamic = "force-static";
export const revalidate = 3600;

import { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FunFact from "@/components/FunFact";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import ClientSections from "@/components/ClientSections";

// Enhanced metadata for SEO
export const metadata: Metadata = {
  title: "Home",
  description:
    "ZREATE - Transform your business with cutting-edge IT solutions. Expert web development, SaaS platforms, ERP systems, digital marketing, and corporate training services.",
  openGraph: {
    title: "ZREATE - Digital Excellence & Innovation",
    description:
      "Transform your business with cutting-edge IT solutions. Expert web development, SaaS platforms, ERP systems, and more.",
    images: ["/images/hero/image.png"],
  },
};

export default function Home() {
  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZREATE",
    description:
      "Leading IT solutions provider offering web development, SaaS platforms, ERP systems, digital marketing, and corporate training services.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://zreate.com",
    logo: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://zreate.com"
    }/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@zreate.com",
    },
    sameAs: [
      // Add your social media links here
    ],
    areaServed: "Worldwide",
    serviceType: [
      "Web Development",
      "SaaS Development",
      "ERP Systems",
      "Digital Marketing",
      "IT Outsourcing",
      "Corporate Training",
    ],
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="overflow-hidden">
        <Hero />
        <About />
        <FunFact />
        <CTA />

        <ClientSections />

        {/* <Contact /> */}
      </main>
    </>
  );
}
