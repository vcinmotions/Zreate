import React from "react";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="overflow-hidden bg-white py-14 sm:py-20 md:py-24 lg:py-28 dark:bg-gray-900">
      <div className="mx-auto max-w-[1390px] px-4 sm:px-6 lg:px-10">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16 xl:py-12 dark:border dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}
            <div className="w-full text-center lg:w-[60%] lg:text-left">
              <h2 className="mb-4 text-2xl leading-tight font-semibold text-black sm:text-3xl lg:text-4xl dark:text-white">
                Join ZREATE Today & Transform Your Digital Growth
              </h2>

              <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg lg:mx-0 dark:text-gray-300">
                Empower your business with modern technology, scalable
                solutions, and expert support. From SaaS development to web
                solutions and digital marketing, ZREATE helps you accelerate
                productivity, boost efficiency, and build long-term digital
                success.
              </p>
            </div>

            {/* Right Content */}
            <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-center lg:w-[40%] lg:justify-end xl:flex-row">
              <img
                width={240}
                height={240}
                src="/images/shape/shape-06.png"
                alt="Decorative shape"
                className="hidden brightness-105 xl:block xl:w-[240px]"
              />

              <button
                aria-label="Get started with ZREATE"
                className="group relative flex w-full max-w-[280px] items-center justify-center gap-2.5 overflow-hidden rounded-full bg-black px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:bg-gray-800 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 sm:max-w-none sm:px-10 sm:py-5 lg:max-w-[240px] xl:px-8 xl:py-4 dark:bg-white dark:text-black dark:shadow-gray-500/20 dark:hover:bg-gray-100 dark:hover:shadow-gray-500/30"
              >
                <span className="tracking-wide">Get Started</span>
                <ArrowRight className="h-5 w-5 transition-all duration-500 group-hover:translate-x-1 group-hover:rotate-360" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
