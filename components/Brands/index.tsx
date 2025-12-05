import React from "react";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";

const Brands = () => {
  return (
    <section className="border-y-stroke dark:border-y-strokedark relative overflow-hidden border border-x-0 bg-white bg-gradient-to-b from-white to-white py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-8 px-4 sm:gap-10 sm:px-6 md:gap-14 md:px-8 lg:grid-cols-5 lg:px-10 xl:px-12 2xl:px-16">
        {/* LEFT TEXT */}
        <div className="col-span-1 flex flex-col justify-center text-center lg:text-left">
          <h3 className="text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl xl:text-5xl dark:text-white">
            Our Clients
          </h3>
          <p className="font-body mx-auto mt-2 max-w-md text-gray-700 sm:mt-3 sm:text-base lg:mx-0 xl:text-xl dark:text-gray-300">
            Trusted by top global brands across multiple industries.
          </p>
        </div>

        {/* BRANDS SECTION */}
        <div className="relative col-span-4 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-16">
          {[...Array(4)].map((_, rowIndex) => (
            <div key={rowIndex} className="relative overflow-hidden">
              <div
                className={`flex items-center gap-10 whitespace-nowrap md:gap-16 ${
                  rowIndex % 2 === 0
                    ? "animate-infiniteScroll"
                    : "animate-revinfiniteScroll"
                }`}
              >
                {[...brandData, ...brandData].map((brand, index) => (
                  <div key={index} className="inline-block">
                    <SingleBrand brand={brand} />
                  </div>
                ))}
              </div>

              {/* LEFT FADE */}
              <div className="pointer-events-none absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white/80 to-transparent blur-[30px] dark:from-gray-900" />

              {/* RIGHT FADE */}
              <div className="pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white/80 to-transparent blur-[30px] dark:from-gray-950" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
