"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const accordionData = [
  {
    id: 0,
    title: "Ecommerce Website",
    description:
      "We build professional and responsive corporate websites tailored to your brand identity, ensuring a strong digital presence.",
    image: "/images/features/webdev.jpg",
    flag: "/images/features/webdev.jpg",
    link: "/images/features/corporate-websites",
  },
  {
    id: 1,
    title: "Logistic Management Website",
    description:
      "Our e-commerce solutions are secure, scalable, and optimized for conversions, delivering seamless shopping experiences.",
    image: "/images/features/webdev.jpg",
    flag: "/images/features/webdev.jpg",
    link: "/services/ecommerce-platforms",
  },
  {
    id: 2,
    title: "SaaS Website",
    description:
      "We design and develop custom web applications that are fast, reliable, and tailored to meet your business needs.",
    image: "/images/features/webdev.jpg",
    flag: "/images/features/webdev.jpg",
    link: "/services/web-applications",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description:
      "Our UI/UX team creates intuitive and engaging designs that enhance user experience and drive engagement.",
    image: "/images/features/webdev.jpg",
    flag: "/images/features/webdev.jpg",
    link: "/services/ui-ux-design",
  },
  {
    id: 4,
    title: "Order Tracking Website",
    description:
      "We ensure your digital products are optimized for speed, secure from vulnerabilities, and perform flawlessly across devices.",
    image: "/images/features/webdev.jpg",
    flag: "/images/features/webdev.jpg",
    link: "/services/speed-security-optimization",
  },
];

export default function AccordionData() {
  const [openIndex, setOpenIndex] = useState<number | null>(3);

  return (
    <section className="w-full border-t border-gray-200 bg-gray-50 px-6 py-20 md:px-10 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
            Our Projects
          </h2>
          <p className="font-body mt-3 text-lg text-gray-600 dark:text-gray-300">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {accordionData.map((item, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-lg border bg-white transition-all duration-300 dark:bg-gray-800 ${
                openIndex === index
                  ? "border-blue-500 shadow-lg dark:border-blue-400"
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left transition"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Image
                      src={item.flag}
                      width={32}
                      height={32}
                      className="rounded-md"
                      alt="Icon"
                    />
                  </div>

                  <span className="font-body text-xl font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </span>
                </div>

                <svg
                  className={`h-6 w-6 text-gray-500 transition-transform duration-300 dark:text-gray-400 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <div className="font-body grid gap-6 lg:grid-cols-2">
                        <div>
                          <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>

                          <p className="mb-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                            {item.description}
                          </p>

                          <Link
                            href={item.link}
                            prefetch
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                          >
                            Learn More
                            <svg
                              className="h-4 w-4"
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
                          </Link>
                        </div>

                        <div>
                          <Image
                            src={item.image}
                            width={600}
                            height={400}
                            alt={item.title}
                            className="rounded-lg border border-gray-200 shadow-md dark:border-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
