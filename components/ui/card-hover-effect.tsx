"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    icon: string;
    title: string;
    description: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 py-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:gap-10",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group relative block h-full w-full cursor-pointer p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Ultra-smooth hover background */}
          {hoveredIndex === idx && (
            <span
              className="absolute inset-0 h-full w-full rounded-3xl bg-neutral-200/40 dark:bg-slate-800/60 hover-background-enter"
            />
          )}

          <SmoothCard>
            <FeatureCardContent item={item} />
          </SmoothCard>
        </div>
      ))}
    </div>
  );
};

/* Smooth Card Motion */
export const SmoothCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{ willChange: "transform" }}
      className={cn(
        "group relative z-0 h-full w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 transition-all duration-300 lg:p-8 dark:border-gray-800/80 dark:bg-gray-900",
        "shadow-md shadow-gray-200/40 dark:shadow-black/40",
        "hover:border-blue-300/50 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:border-blue-700/40 dark:hover:shadow-blue-900/20",
        "hover:scale-[1.01] hover:-translate-y-0.5",
        "smooth-card-hover",
        className,
      )}
    >
      {/* Subtle border gradient on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

      {children}
    </div>
  );
};

/* Extracted Card Content */
const FeatureCardContent = ({ item }: any) => (
  <div className="relative z-0 h-full">
    {/* Soft Glow - Keep hover effect */}
    <div className="from-primary/30 pointer-events-none absolute inset-0 bg-gradient-to-br to-blue-500/30 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-20" />

    {/* Smooth Spotlight - Keep hover effect */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

    {/* Modern Icon Container */}
    <div className="relative mb-6">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-br from-[#2596be] to-[#2596be]/90 shadow-lg shadow-[#2596be] transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#2596be] dark:from-[#2596be] dark:to-[#2596be40]">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
        <Image
          src={item.icon}
          width={36}
          height={36}
          alt={item.title}
          className="relative z-10 drop-shadow-sm"
        />
      </div>
    </div>

    {/* Title with modern typography */}
    <h3 className="font-heading mb-3 text-xl leading-tight font-bold text-black transition-colors duration-300 lg:text-2xl dark:text-white">
      {item.title}
    </h3>

    {/* Description with improved spacing */}
    <p className="font-body text-base leading-relaxed text-gray-600 dark:text-gray-400">
      {item.description}
    </p>
  </div>
);
