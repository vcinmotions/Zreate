"use client";
import { Metadata } from "next";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import AccordionData from "@/components/Accordian";

export default function marketing() {
  const [openIndex, setOpenIndex] = useState<number | null>(3);
  return (
    <>
      <section className="bg-white py-24 dark:bg-gray-900">
        <div className="container mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mt-19 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
              Data-Driven Digital Strategies That Amplify Growth & Engagement
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              We create tailored digital marketing strategies that elevate your
              brand, boost visibility, and drive measurable business outcomes.
              From SEO to paid campaigns, our approach blends creativity with
              analytics to deliver real impact.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card Component */}
            {[
              {
                title: "Social Media Management",
                desc: "Content planning, scheduling, growth strategies, and brand engagement.",
                img: "/images/features/enterprise.jpg",
              },
              {
                title: "SEO & Content Strategy",
                desc: "Rank higher, attract the right audience, and build long-term visibility.",
                img: "/images/features/enterprise.jpg",
              },
              {
                title: "Paid Advertising",
                desc: "High-performance campaigns on Google, Meta, LinkedIn, and more.",
                img: "/images/features/enterprise.jpg",
              },
              {
                title: "Brand Building",
                desc: "Strong brand identity, storytelling, and omnichannel presence.",
                img: "/images/features/enterprise.jpg",
              },
              {
                title: "Analytics & Performance Tracking",
                desc: "Data-backed insights to optimize campaigns and maximize ROI.",
                img: "/images/features/enterprise.jpg",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:border-blue-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.img}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-body text-xl font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="font-body mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>

                  <div className="font-body mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400">
                    Learn more
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AccordionData />
    </>
  );
}
