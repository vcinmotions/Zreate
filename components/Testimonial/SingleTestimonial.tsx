import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleTestimonial = ({ review }: { review: Testimonial }) => {
  const { name, designation, image, content } = review;
  return (
    <div className="shadow-solid-9 max-h-[19rem] rounded-lg border border-gray-200 bg-white p-6 pt-6 sm:p-7 sm:pt-7 md:p-9 md:pt-7.5 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
      <div className="border-stroke dark:border-strokedark mb-6 flex justify-between border-b pb-5 sm:mb-7 sm:pb-6 md:mb-7.5">
        <div>
          <h3 className="mb-1.5 text-base font-semibold text-black sm:text-lg dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {designation}
          </p>
        </div>
        <Image width={60} height={50} className="" src={image} alt={name} />
      </div>

      <p className="text-sm leading-relaxed text-gray-700 sm:text-base dark:text-gray-300">
        {content}
      </p>
    </div>
  );
};

export default SingleTestimonial;
