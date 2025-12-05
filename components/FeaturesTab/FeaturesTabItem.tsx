import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc1, desc2, image, imageDark } = featureTab;

  return (
    <>
      <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:gap-16">
        {/* Content Block */}
        <div className="w-full md:w-1/2">
          <h2 className="font-heading mb-4 text-2xl leading-tight font-bold text-black select-none sm:mb-5 sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl dark:text-white">
            {title}
          </h2>
          <p className="font-body mb-4 text-sm leading-relaxed text-gray-700 select-none sm:mb-5 sm:text-base md:text-lg dark:text-gray-300">
            {desc1}
          </p>
          <p className="font-body text-sm leading-relaxed text-gray-700 select-none sm:text-base md:text-lg dark:text-gray-300">
            {desc2}
          </p>
        </div>

        {/* Image Block */}
        <div className="relative mx-auto aspect-562/366 w-full max-w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-200/50 select-none sm:max-w-[550px] md:block md:w-1/2 dark:ring-gray-800/50">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover dark:hidden"
          />
          <Image
            src={imageDark}
            alt={title}
            fill
            className="hidden object-cover dark:block"
          />
        </div>
      </div>
    </>
  );
};

export default FeaturesTabItem;
