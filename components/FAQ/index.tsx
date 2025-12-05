"use client";
import { useEffect, useRef, useState } from "react";
import FAQItem from "./FAQItem";
import faqData from "./faqData";
import SectionHeader from "../Common/SectionHeader";

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState(1);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleFaqToggle = (id: number) => {
    activeFaq === id ? setActiveFaq(0) : setActiveFaq(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 dark:bg-gray-900"
    >
      {/* BLUE GLOW (SAME AS FEATURES) */}
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-[#2596be15] blur-3xl dark:bg-[#2596be10]" />

      <div className="max-w-c-1315 relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
        {/* Section Header */}
        <div
          className={`transform transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
          }`}
        >
          <SectionHeader
            headerInfo={{
              title: "FAQ",
              subtitle: "Frequently Asked Questions",
              description: `Have questions about our services, process, or how we can help your business? Find answers to common questions below. If you don't find what you're looking for, feel free to reach out to our team.`,
            }}
          />
        </div>

        {/* FAQ Items */}
        <div
          className={`mx-auto mt-10 max-w-4xl transform transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {faqData.map((faq, key) => (
              <FAQItem
                key={key}
                faqData={{ ...faq, activeFaq, handleFaqToggle }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
