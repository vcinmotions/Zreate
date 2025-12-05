"use client";
import React, { useEffect, useState, useRef } from "react";
import SectionHeader from "../Common/SectionHeader";

const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  isInView,
}: {
  value: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value) || 0;

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1,
      );

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * numericValue);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericValue, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const FunFact = () => {
  const stats = [
    {
      id: 1,
      value: "500",
      suffix: "+",
      label: "Projects Delivered",
      description: "Successfully completed projects across various industries",
    },
    {
      id: 2,
      value: "200",
      suffix: "+",
      label: "Happy Clients",
      description: "Satisfied businesses trusting our solutions and work",
    },
    {
      id: 3,
      value: "98",
      suffix: "%",
      label: "Client Satisfaction",
      description: "Consistently high satisfaction and quality ratings",
    },
    {
      id: 4,
      value: "50",
      suffix: "+",
      label: "Expert Team Members",
      description: "Skilled professionals and Youths driving innovation",
    },
  ];

  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950"
    >
      {/* Glow effect */}

      <div className="max-w-c-1390 relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "OUR ACHIEVEMENTS",
            subtitle: "Numbers That Speak",
            description:
              "Our track record demonstrates our commitment to excellence. These numbers reflect the trust our clients place in us and the impact we've made in transforming businesses through technology.",
          }}
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-5 md:mt-16 lg:mt-20 lg:grid-cols-4 xl:mt-24">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

function StatCard({ stat, delay }: any) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`group transform rounded-xl border border-gray-200 bg-white p-4 text-center transition-all duration-500 hover:border-blue-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600 ${
        isInView ? "animate-fade-up" : "translate-y-8 opacity-0"
      }`}
    >
      <h3 className="mb-1 text-2xl font-bold text-black select-none sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl dark:text-white">
        <AnimatedCounter
          value={stat.value}
          suffix={stat.suffix}
          isInView={isInView}
        />
      </h3>

      <p className="mb-1 text-xs text-gray-800 select-none sm:text-sm md:text-base lg:text-lg dark:text-gray-200">
        {stat.label}
      </p>

      <p className="hidden text-xs leading-relaxed text-gray-700 select-none sm:text-sm md:block dark:text-gray-300">
        {stat.description}
      </p>
    </div>
  );
}

export default FunFact;
