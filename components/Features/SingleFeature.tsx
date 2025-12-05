import React, { useEffect, useRef, useState } from "react";
import { Feature } from "@/types/feature";
import Image from "next/image";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, description } = feature;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group single-feature-animate relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_0_25px_rgba(120,60,255,0.25)] backdrop-blur-xl transition-all duration-500 hover:scale-[1.04] xl:p-12 dark:bg-white/5 ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,70,255,0.25),transparent_70%)] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-40" />

      <div className="absolute inset-0 bg-gradient-to-br from-[#5b2cff20] via-[#7f4dff15] to-[#3b1dff20] opacity-0 transition-all duration-700 group-hover:opacity-100" />

      <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-[0_0_20px_rgba(150,50,255,0.45)] backdrop-blur-xl transition-all duration-500 group-hover:shadow-[0_0_35px_rgba(160,55,255,0.7)]">
        <Image src={icon} width={36} height={36} alt={title} />
      </div>

      <h3 className="mt-7 mb-4 text-2xl font-semibold text-white transition-all duration-500 group-hover:translate-x-2">
        {title}
      </h3>

      <p className="leading-relaxed text-white/70 transition-all duration-500 group-hover:translate-x-2">
        {description}
      </p>
    </div>
  );
};

export default SingleFeature;
