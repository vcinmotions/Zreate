"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Brand } from "@/types/brand";

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { image, href, name, imageLight, id } = brand;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement | null>(null);

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

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className={`group relative mx-auto block h-9 w-[80px] overflow-visible transition-all duration-700 ease-out md:h-14 md:w-[130px] ${
        isVisible ? "brand-fade-up" : "translate-y-5 opacity-0"
      }`}
      style={{ transitionDelay: `${id * 0.1}s` }}
    >
      <Image
        className="object-contain opacity-70 brightness-102 transition-all duration-300 group-hover:opacity-100 dark:hidden"
        src={image}
        alt={name}
        fill
      />

      <Image
        className="hidden object-contain opacity-60 transition-all duration-300 group-hover:opacity-100 dark:block"
        src={imageLight}
        alt={name}
        fill
      />
    </a>
  );
};

export default SingleBrand;
