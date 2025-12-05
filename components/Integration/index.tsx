"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";

const Integration = () => {
  const integrations = [
    {
      id: 1,
      name: "Jira",
      logo: "/images/brand/brand-07.svg",
      description: "Team collaboration",
    },
    {
      id: 2,
      name: "GitHub",
      logo: "/images/brand/brand-08.svg",
      description: "Version control",
    },
    {
      id: 3,
      name: "AWS",
      logo: "/images/brand/brand-09.svg",
      description: "Cloud infrastructure",
    },
    {
      id: 4,
      name: "Stripe",
      logo: "/images/brand/brand-10.svg",
      description: "Payment processing",
    },
    {
      id: 5,
      name: "Docker",
      logo: "/images/brand/brand-11.svg",
      description: "CRM integration",
    },
    {
      id: 6,
      name: "Analytics",
      logo: "/images/brand/brand-12.svg",
      description: "Cloud services",
    },
  ];

  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !visibleItems.includes(index)) {
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 },
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => {
      refs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, [visibleItems]);

  return (
    <section
      id="integrations"
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 dark:bg-gray-900"
    >
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-[#2596be15] blur-3xl dark:bg-[#2596be10]" />
      <div className="max-w-c-1390 relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
        {/* Section Header */}
        <SectionHeader
          headerInfo={{
            title: "INTEGRATIONS",
            subtitle: "Seamless Integration with Leading Platforms",
            description: `ZREATE solutions integrate seamlessly with the tools and platforms your business already uses. We ensure your systems work together harmoniously, enabling smooth workflows and enhanced productivity.`,
          }}
        />

        {/* Integrations Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-3 md:gap-6 lg:mt-20 lg:grid-cols-3 xl:mt-24 xl:grid-cols-6">
          {integrations.map((integration, index) => (
            <div
              key={integration.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              data-index={index}
              className={`group integration-animate relative ${
                visibleItems.includes(index) ? "visible" : ""
              }`}
            >
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-blue-300 hover:bg-white hover:shadow-lg hover:shadow-blue-500/10 sm:p-5 md:p-6 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600 dark:hover:bg-gray-800">
                {/* Logo Container */}
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 select-none group-hover:scale-110 group-hover:border-blue-300 group-hover:bg-blue-50 group-hover:shadow-md sm:mb-4 sm:h-20 sm:w-20 sm:p-4 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-blue-600 dark:group-hover:bg-gray-700">
                  <Image
                    width={60}
                    height={60}
                    src={integration.logo}
                    alt={integration.name}
                    className="h-auto w-full object-contain transition-all duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Name */}
                <h4 className="font-heading mb-1 text-center text-xs font-semibold text-gray-800 select-none sm:text-sm md:text-base dark:text-gray-200">
                  {integration.name}
                </h4>

                {/* Description */}
                <p className="font-body text-center text-[10px] text-gray-700 select-none sm:text-xs dark:text-gray-300">
                  {integration.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integration;
