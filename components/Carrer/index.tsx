"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const Career = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        Math.max(1 - rect.bottom / (windowHeight + rect.height), 0),
        1,
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainImageScale = 1 - 0.58 * scrollProgress;
  const mainImageX = -12 * scrollProgress;
  const secondaryImageY = -20 * scrollProgress;
  const secondaryOpacity = 0.85 + 0.15 * scrollProgress;
  const textX = 60 * (1 - Math.min(scrollProgress * 3, 1));
  const textOpacity = Math.min(Math.max((scrollProgress - 0.25) / 0.2, 0), 1);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-white py-16 md:flex-row md:py-24 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950"
    >
      {/* LEFT MEDIA */}
      <div
        className="relative mb-10 h-[50vh] w-full rounded-xl transition-transform duration-500 ease-out md:mb-0 md:h-[80vh] md:w-auto"
        style={{
          transform: `translateX(${mainImageX}%) scale(${mainImageScale})`,
        }}
      >
        <img
          src="https://dynamicmedia.accenture.com/is/image/accenture/A1-A.com-Careers-Module-Image-1?qlt=85&ts=1764270386858&$1024-PNG$&qlt=25&dpr=off"
          alt="Career"
          className="h-full w-full rounded-xl object-cover shadow-xl"
        />

        <img
          src="https://dynamicmedia.accenture.com/is/content/accenture/Added%20Media-1?ts=1764270386864&dpr=off"
          alt=""
          className="absolute right-4 bottom-4 w-32 rounded-lg shadow-lg transition-transform duration-500 ease-out sm:w-36 md:w-48"
          style={{
            transform: `translateY(${secondaryImageY}%)`,
            opacity: secondaryOpacity,
          }}
        />
      </div>

      {/* TEXT SECTION */}
      <div
        className="max-w-xl px-4 transition-transform duration-500 ease-out md:flex-1 md:px-12"
        style={{
          transform: `translateX(${textX}px)`,
          opacity: textOpacity,
        }}
      >
        <h2 className="mb-4 text-3xl leading-snug font-bold text-black sm:text-4xl md:text-5xl dark:text-white">
          Grow your Business at the heart of change
        </h2>

        <p className="text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl dark:text-gray-300">
          It's your time to shine. Excel your ingenuity, curiosity and big
          ideas.
        </p>

        <Link
          href="/in-en/careers"
          className="mt-6 inline-block text-base font-medium text-black underline underline-offset-4 transition-opacity hover:opacity-80 dark:text-white"
        >
          Join us
        </Link>
      </div>
    </section>
  );
};

export default Career;
