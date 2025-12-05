"use client";

type FaqData = {
  activeFaq: number;
  id: number;
  handleFaqToggle: (id: number) => void;
  quest: string;
  ans: string;
};

import { useRef, useState, useEffect } from "react";

const FAQItem = ({ faqData }: { faqData: FaqData }) => {
  const { activeFaq, id, handleFaqToggle, quest, ans } = faqData;
  const isActive = activeFaq === id;
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isActive]);

  return (
    <div className="group border-b border-gray-200/50 last-of-type:border-none dark:border-gray-800/50">
      <button
        onClick={() => handleFaqToggle(id)}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left transition-all duration-300 hover:bg-gray-50/50 lg:px-8 lg:py-6 dark:hover:bg-gray-800/50"
      >
        <span className="font-heading pr-4 text-base font-semibold text-black md:text-lg dark:text-white">
          {quest}
        </span>

        <div
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isActive
              ? "bg-[#2596be] text-white dark:bg-blue-500"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {isActive ? (
            <svg
              width="18"
              height="4"
              viewBox="0 0 18 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300"
            >
              <path
                d="M17.1666 0.833374H10.1666H7.83331H0.833313V3.16671H7.83331H10.1666H17.1666V0.833374Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300"
            >
              <path
                d="M7.83331 7.83337V0.833374H10.1666V7.83337H17.1666V10.1667H10.1666V17.1667H7.83331V10.1667H0.833313V7.83337H7.83331Z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
      </button>

      {/* Answer with smooth height transition */}
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <p className="font-body px-6 pb-5 text-base leading-relaxed text-gray-700 lg:px-8 lg:pb-6 dark:text-gray-300">
          {ans}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;
