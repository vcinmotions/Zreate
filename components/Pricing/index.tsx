"use client";
import Link from "next/link";
import React from "react";

const Extra: React.FC = () => {
  const cities = [
    {
      name: "Client",
      href: "/in-en/about/company/integrated-reporting-client-clients-reinvent",
      img: "https://dynamicmedia.accenture.com/is/image/accenture/Client-Thumbnail-260x172-1%3Arad-3x2?ts=1763669539395&dpr=off",
      alt: "Our people help us deliver on the promise of technology and human ingenuity",
    },
    {
      name: "Experience",
      href: "/in-en/about/company/integrated-reporting-experience-clients",
      img: "https://dynamicmedia.accenture.com/is/image/accenture/Experience-Thumbnail-260x172-1%3Arad-3x2?ts=1763669539426&dpr=off",
      alt: "Creating experiences that help build trust",
    },
    {
      name: "Talent",
      href: "/in-en/about/company/integrated-reporting-talent-accessing-talent",
      img: "https://dynamicmedia.accenture.com/is/image/accenture/Talent-Thumbnail-260x172-1%3Arad-3x2?ts=1763669539458&dpr=off",
      alt: "Our people help us deliver on the promise of technology and human ingenuity",
    },
    {
      name: "I&D",
      href: "/in-en/about/company/integrated-reporting-inclusion-diversity-leadership",
      img: "https://dynamicmedia.accenture.com/is/image/accenture/ID-Thumbnail-260x172-1%3Arad-3x2?ts=1763669539491&dpr=off",
      alt: "Embracing diversity to drive innovation and reinvention",
    },
    {
      name: "Sustainability",
      href: "/in-en/about/company/integrated-reporting-sustainability-environment",
      img: "https://dynamicmedia.accenture.com/is/image/accenture/Sustainability-Thumbnail-260x172-1%3Arad-3x2?ts=1763669539522&dpr=off",
      alt: "We believe every business must be a sustainable business",
    },
    {
      name: "Financial",
      href: "/in-en/about/company/integrated-reporting-financial",
      img: "https://dynamicmedia.accenture.com/is/image/accenture/Finance-Thumbnail-260x172%3Arad-3x2?ts=1763669539553&dpr=off",
      alt: "Our financial results enable us to deliver 360° value",
    },
  ];

  return (
    <div className="no-scrollbar w-full bg-gray-50 py-10">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          DISCOVER OUR SIX DIMENSIONS OF 360° VALUE
        </h2>

        <ul className="scrollbar-none flex gap-6 overflow-x-auto px-4 pb-4">
          {cities.map((city) => (
            <li
              key={city.name}
              className="w-64 flex-shrink-0 transform rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={city.href}
                aria-label={city.alt}
                className="block"
                target="_self"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-lg">
                  <img
                    src={city.img}
                    alt={city.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="py-3 text-center font-semibold text-gray-900">
                  {city.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Extra;
