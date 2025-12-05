"use client";
import Image from "next/image";
import { useState } from "react";
import FeaturesTabItem from "./FeaturesTabItem";
import featuresTabData from "./featuresTabData";
import SectionHeader from "../Common/SectionHeader";

const FeaturesTab = () => {
  const [currentTab, setCurrentTab] = useState("tabOne");

  const tabs = [
    { id: "tabOne", label: "Enterprise-Grade Quality" },
    { id: "tabTwo", label: "Client-Centric Approach" },
    { id: "tabThree", label: "Expert Team" },
  ];

  return (
    <section
      id="features-tab"
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 dark:bg-gray-900"
    >
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-[#2596be15] blur-3xl dark:bg-[#2596be10]" />

      <div className="max-w-c-1390 relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "OUR EXPERTISE",
            subtitle: "Why Choose ZREATE",
            description:
              "We combine technical excellence with business insight to deliver solutions that drive real results. Our approach is built on proven methodologies and a deep understanding of modern technology needs.",
          }}
        />

        {/* Mobile Tabs */}
        <div className="no-scrollbar font-body mt-10 flex gap-2 overflow-x-auto pb-2 sm:mt-12 sm:hidden sm:gap-3 md:mt-16 lg:mt-20 xl:mt-24">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
              className={`fade-up group relative flex min-w-[180px] flex-shrink-0 items-center justify-center rounded-lg border-2 px-3 py-2.5 text-xs transition-all duration-300 sm:min-w-[200px] sm:px-4 sm:py-3 ${
                currentTab === tab.id
                  ? "border-[#2596be] bg-[#2596be33] shadow-sm shadow-[#2596be] dark:bg-[#2596be20]"
                  : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
              }`}
            >
              {currentTab === tab.id && (
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#2596be] to-[#2596be80] opacity-20" />
              )}
              <span
                className={`relative z-10 ${
                  currentTab === tab.id
                    ? "font-body text-[#16627d] dark:text-blue-100"
                    : "font-body text-black dark:text-white"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Desktop Tabs */}
        <div className="mt-10 hidden flex-wrap justify-center gap-4 sm:mt-12 sm:flex md:mt-16 lg:mt-20 xl:mt-24">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
              className={`fade-up group font-body relative flex w-full items-center justify-center rounded-xl border-2 px-6 py-4 transition-all duration-300 sm:w-[300px] md:px-8 md:py-5 ${
                currentTab === tab.id
                  ? "border-[#2596be] bg-[#2596be20] shadow-md shadow-[#2596be50] dark:bg-[#2596be20]"
                  : "border-gray-200 bg-white hover:border-[#2596be60] hover:bg-[#2596be10] hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-[#2596be]"
              }`}
            >
              {currentTab === tab.id && (
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#2596be40] to-[#2596be20]" />
              )}
              <span
                className={`relative z-10 text-sm font-semibold md:text-base ${
                  currentTab === tab.id
                    ? "text-[#16627d] dark:text-blue-100"
                    : "text-black dark:text-white"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Features Content */}
        <div className="max-w-c-1154 mx-auto mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24">
          {featuresTabData.map((feature, index) => (
            <div
              key={feature.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className={`fade-up transition-all duration-500 ease-out ${
                feature.id === currentTab ? "block" : "hidden"
              }`}
            >
              <FeaturesTabItem featureTab={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesTab;
