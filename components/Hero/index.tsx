"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { ArrowRightIcon } from "lucide-react";
import { AuroraBackground } from "../ui/aurora-background";
import { FlipWords } from "../ui/flip-words";
import Link from "next/link";

const Hero = () => {
  const [email, setEmail] = useState("");

  const words = [
    "Digital Excellence",
    "Digital Innovation",
    "Digital Impact",
    "Digital Growth",
  ];

  return (
    <>
      <section className="relative flex min-h-[550px] w-full overflow-hidden pt-45 pb-16 sm:pb-20 md:pt-40 md:pb-24 lg:h-screen lg:pt-50 lg:pb-28 xl:h-screen xl:pt-60 xl:pb-36 2xl:pt-67 2xl:pb-52">
        {/* Background Image - Optimized for LCP */}
        <div className="absolute inset-0 -z-10">
          {/* Light mode image */}
          <Image
            src="/images/hero/hero6.png"
            alt="Hero Background Light"
            fill
            className="object-cover object-center dark:hidden"
            priority
            quality={85}
            sizes="100vw"
          />

          {/* Dark mode image */}
          <Image
            src="/images/hero/hero.jpg"
            alt="Hero Background Dark"
            fill
            className="hidden object-cover object-center dark:block"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>

        {/* <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/40 via-gray-900/30 to-black/60 dark:from-black/30 dark:via-gray-900/20 dark:to-black/50"></div> */}

        <div className="relative z-10">
          <div className="max-w-c-1990 mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-20">
            <div className="flex flex-col lg:items-center lg:gap-8 xl:flex-row xl:gap-62.5">
              <div className="w-full max-w-full overflow-x-hidden lg:max-w-[860px]">
                <h1 className="font-display mb-5 text-2xl leading-[1.2] font-semibold text-white sm:mb-6 sm:text-3xl md:mb-7 md:text-4xl lg:mb-8 lg:text-5xl xl:ml-6 xl:text-6xl 2xl:text-7xl dark:text-white dark:drop-shadow-lg">
                  <span className="relative inline-block">
                    <span className="font-heading relative z-10 text-3xl leading-[1.2] text-white select-none sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                      ZREATE
                    </span>

                    <svg
                      className="absolute -bottom-1 left-0 z-0 h-2 w-32 sm:h-3 sm:w-48 md:h-4 md:w-56 lg:w-64"
                      viewBox="0 0 256 20"
                      fill="none"
                    >
                      <path
                        d="M0 12 C 51.2 2, 102.4 22, 153.6 12 S 204.8 2, 256 12"
                        stroke="#2596be"
                        strokeWidth="4"
                        opacity="0.9"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0 8 C 51.2 -2, 102.4 18, 153.6 8 S 204.8 -2, 256 8"
                        stroke="#e9cc2955"
                        strokeWidth="4"
                        opacity="0.7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0 4 C 51.2 -6, 102.4 14, 153.6 4 S 204.8 -6, 256 4"
                        stroke="#0b2b9422"
                        strokeWidth="4"
                        opacity="0.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  <span className="font-heading ml-3 text-3xl leading-[1.2] text-white select-none sm:text-4xl md:ml-3 md:text-5xl lg:ml-4 lg:text-6xl xl:ml-6 xl:text-7xl 2xl:ml-7 2xl:text-8xl">
                    Unlock
                  </span>

                  <br className="hidden sm:block" />

                  <div className="mt-1 sm:mt-2 xl:ml-3">
                    <FlipWords words={words} />
                  </div>
                </h1>

                <p className="font-body mb-8 text-sm leading-relaxed text-white select-none sm:mb-9 sm:text-base md:mb-10 md:text-lg lg:mb-12 lg:text-xl xl:ml-6 xl:text-2xl 2xl:text-3xl dark:text-white dark:drop-shadow-md">
                  We help companies transform their operations with reliable,
                  secure and future-ready technology.
                </p>

                <div className="mt-8 w-full sm:mt-10 md:mt-12 lg:mt-14 xl:mt-19">
                  <div className="flex flex-col flex-wrap items-stretch gap-3 sm:items-center sm:gap-3 md:gap-3 lg:gap-4 xl:flex-row xl:gap-5">
                    <Link
                      href="/support"
                      className="w-auto sm:shrink-0 xl:ml-6"
                    >
                      <button className="group font-body relative flex items-center justify-center rounded-full bg-white px-5 py-3 text-xs font-semibold text-black shadow-lg shadow-[#2596be]/30 transition-all duration-500 hover:bg-transparent hover:text-white sm:text-sm md:text-sm lg:text-base xl:px-9 xl:py-6">
                        <span className="relative z-10 flex cursor-pointer items-center space-x-1.5 sm:space-x-2">
                          <span className="font-heading whitespace-nowrap select-none">
                            Get Started
                          </span>
                          <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-black transition-all duration-500 group-hover:translate-x-1 group-hover:rotate-360 group-hover:text-white sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                        </span>
                      </button>
                    </Link>

                    <Link
                      href="/support"
                      className="w-auto sm:shrink-0 xl:ml-6"
                    >
                      <button className="group font-body relative flex items-center justify-center rounded-full bg-white px-5 py-3 text-xs font-semibold text-black shadow-lg shadow-[#2596be]/30 transition-all duration-500 hover:bg-transparent hover:text-white sm:text-sm md:text-sm lg:text-base xl:px-9 xl:py-6">
                        <span className="relative z-10 flex cursor-pointer items-center space-x-1.5 sm:space-x-2">
                          <span className="font-heading whitespace-nowrap select-none">
                            Schedule a Free Strategy Call
                          </span>
                          <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-black transition-all duration-500 group-hover:translate-x-1 group-hover:rotate-360 group-hover:text-white sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
