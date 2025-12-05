"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";
const Footer = () => {
  const socials = [
    {
      name: "Facebook",
      url: "https://www.facebook.com",
      icon: Facebook,
    },
    {
      name: "Twitter",
      url: "https://www.twitter.com",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com",
      icon: Linkedin,
    },
  ];
  return (
    <>
      <footer className="border-stroke dark:border-strokedark border-t bg-white dark:bg-gradient-to-b dark:from-[#0b1220] dark:to-[#020617]">
        <div className="max-w-c-1390 relative mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
          {/* Glow background for both modes */}

          {/* Footer Top */}
          <div className="py-8 sm:py-10 lg:py-15">
            <div className="font-body flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-8 lg:justify-between lg:gap-0">
              {/* BRAND */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top w-full sm:w-1/2 lg:w-1/4"
              >
                <Link href="/" className="relative flex items-center gap-1">
                  <Image
                    width={110}
                    height={50}
                    src="/images/logo/logo_light.png"
                    alt="Logo"
                    className="h-25 w-auto dark:hidden"
                  />
                  <Image
                    width={110}
                    height={50}
                    src="/images/logo/logo_dark.png"
                    alt="Logo"
                    className="hidden h-25 w-auto dark:block"
                  />
                  <span className="text-xl font-extrabold tracking-wide text-slate-800 dark:text-white">
                    ZREATE
                  </span>
                </Link>

                <p className="mt-4 mb-6 text-sm text-gray-700 sm:mt-5 sm:mb-8 sm:text-base md:mb-10 dark:text-gray-300">
                  ZREATE — Creating Digital Excellence
                </p>

                <p className="mb-1.5 text-xs tracking-[3px] text-gray-700 uppercase sm:text-sm sm:tracking-[5px] dark:text-gray-400">
                  contact
                </p>

                <Link
                  href="#"
                  className="text-sm font-medium break-all text-black sm:text-base md:text-lg dark:text-white"
                >
                  contact@zreate.com
                </Link>
              </motion.div>

              {/* LINKS */}
              <div className="flex w-full flex-row gap-6 sm:justify-between sm:gap-4 lg:w-2/3 lg:gap-0 xl:w-7/12 xl:flex-row">
                {/* QUICK LINKS */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-4 text-base font-medium text-black sm:mb-5 sm:text-lg md:mb-6 md:text-xl dark:text-white">
                    Quick Links
                  </h4>

                  <ul className="space-y-2 sm:space-y-3">
                    {["Home", "Services", "About Us", "FAQ", "Contact Us"].map(
                      (item, i) => (
                        <li key={i}>
                          <Link
                            href={
                              item === "Home"
                                ? "/"
                                : item === "FAQ"
                                ? "/#faq"
                                : `/${item.toLowerCase().replaceAll(" ", "")}`
                            }
                            className="hover:text-primary inline-block text-sm text-gray-700 sm:text-base dark:text-gray-300"
                          >
                            {item}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </motion.div>

                {/* SERVICES */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-4 text-base font-medium text-black sm:mb-5 sm:text-lg md:mb-6 md:text-xl dark:text-white">
                    Services
                  </h4>

                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      ["Web Development", "/docs/webdev"],
                      ["SaaS Based Solutions", "/docs/saas"],
                      ["Digital Marketing", "/docs/marketing"],
                      ["ERP Software Services", "/docs/erp"],
                      ["IT Talent Outsourcing", "/docs/outsourcing"],
                      ["Corporate Training", "/docs/training"],
                    ].map(([label, url], i) => (
                      <li key={i}>
                        <Link
                          href={url}
                          className="hover:text-primary inline-block text-sm text-gray-700 sm:text-base dark:text-gray-300"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* NEWSLETTER */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top w-full sm:w-auto"
                >
                  <h4 className="mb-4 text-base font-medium text-black sm:mb-6 sm:text-lg md:mb-9 md:text-xl dark:text-white">
                    Newsletter
                  </h4>

                  <p className="mb-3 w-full text-sm text-gray-700 sm:mb-4 sm:w-[90%] sm:text-base dark:text-gray-400">
                    Subscribe to receive future updates
                  </p>

                  <form action="#">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Email address"
                        className="border-stroke shadow-solid-11 focus:border-primary dark:border-strokedark dark:focus:border-primary w-full rounded-full border px-6 py-3 focus:outline-hidden dark:bg-black dark:text-white"
                      />

                      <button
                        aria-label="signup to newsletter"
                        className="absolute right-0 p-4"
                      >
                        <svg
                          className="hover:fill-primary fill-[#757693] dark:fill-white"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3.1 1.17L18.5 9.63C18.7 9.75 18.7 10.25 18.5 10.36L3.1 18.82C2.9 18.93 2.5 18.78 2.5 18.46V1.53C2.5 1.21 2.9 1.06 3.1 1.17Z" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="border-stroke dark:border-strokedark flex flex-col items-center justify-between gap-4 border-t py-6 lg:flex-row">
            <ul className="flex gap-6 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <Link href="#">English</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Support</Link>
              </li>
            </ul>

            <p className="text-sm text-gray-700 dark:text-gray-400">
              &copy; {new Date().getFullYear()} ZREATE. All rights reserved
            </p>

            <ul className="flex items-center gap-5">
              {socials.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i}>
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Icon className="group-hover:text-primary h-6 w-6 text-slate-400 transition-all duration-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
