"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Career = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 20%"],
    // 🔥 Triggers EARLIER — when top 30% is visible
  });

  // ---------------- IMAGE ANIMATION ----------------
  const imageWrapperWidth = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    ["100%", "75%", "45%"], // shrink earlier + smoother
  );

  const imageX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "-6%", "-14%"], // starts sliding earlier
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [1, 0.97, 0.92], // starts shrinking sooner
  );

  const secondaryY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const secondaryOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  // ---------------- TEXT ANIMATION ----------------
  const textOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.55], // APPEAR EARLY
    [1, 1],
  );

  const textX = useTransform(
    scrollYProgress,
    [0.4, 0.7], // SLIDE earlier
    ["60px", "0px"],
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-transparent py-24"
    >
      <motion.div
        style={{ width: imageWrapperWidth, x: imageX, scale: imageScale }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="relative h-[80vh] rounded-xl"
      >
        <img
          src="https://dynamicmedia.accenture.com/is/image/accenture/A1-A.com-Careers-Module-Image-1?qlt=85&ts=1764270386858&$1024-PNG$&qlt=25&dpr=off"
          alt="Career"
          className="h-full w-full rounded-xl object-cover shadow-xl"
        />

        <motion.img
          src="https://dynamicmedia.accenture.com/is/content/accenture/Added%20Media-1?ts=1764270386864&dpr=off"
          alt=""
          style={{ y: secondaryY, opacity: secondaryOpacity }}
          className="absolute right-4 bottom-4 w-40 rounded-lg shadow-lg md:w-48"
        />
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity, x: textX }}
        transition={{ type: "spring", stiffness: 55, damping: 20 }}
        className="max-w-xl flex-1 pr-10 pl-12"
      >
        <div className="mb-3 text-sm tracking-wide text-gray-500 uppercase dark:text-gray-400">
          Careers
        </div>

        <h2 className="mb-4 text-4xl leading-relaxed font-bold text-black md:text-5xl dark:text-white">
          Grow your career at the heart of change
        </h2>

        <p className="text-lg leading-tight text-gray-700 md:text-xl dark:text-gray-300">
          It's your time to shine. Bring your ingenuity, curiosity and big
          ideas.
        </p>

        <a
          href="/in-en/careers"
          className="mt-8 inline-block text-base font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          Join us
        </a>
      </motion.div>
    </section>
  );
};

export default Career;
