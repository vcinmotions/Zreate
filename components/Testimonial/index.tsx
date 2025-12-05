"use client";

import SectionHeader from "../Common/SectionHeader";
import { useEffect, useRef, useState } from "react";
import SingleTestimonial from "./SingleTestimonial";
import { testimonialData } from "./testimonialData";

const Testimonial = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate slides per view based on screen size
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  // Intersection Observer for fade-in animation
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = testimonialData.length - slidesPerView;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 3500);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, slidesPerView]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    const maxIndex = testimonialData.length - slidesPerView;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    const maxIndex = testimonialData.length - slidesPerView;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const maxDots = Math.ceil(testimonialData.length / slidesPerView);

  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 dark:bg-gray-900">
      <div className="max-w-c-1315 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
        {/* Section Header */}
        <div
          ref={containerRef}
          className={`mx-auto transform text-center transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
          }`}
        >
          <SectionHeader
            headerInfo={{
              title: `TESTIMONIALS`,
              subtitle: `What Our Clients Say`,
              description: `Discover how ZREATE has helped businesses transform their operations with cutting-edge IT solutions. Our clients share their success stories and experiences working with our team.`,
            }}
          />
        </div>
      </div>

      <div
        className={`max-w-c-1235 font-body mx-auto mt-10 transform px-4 transition-all duration-700 ease-out sm:mt-12 sm:px-6 md:mt-15 md:px-8 xl:mt-20 xl:px-0 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
        }`}
      >
        {/* Custom Carousel */}
        <div className="relative mb-12 sm:mb-16 md:mb-20">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / slidesPerView)
                }%)`,
              }}
            >
              {testimonialData.map((review) => (
                <div
                  key={review?.id}
                  className="flex-shrink-0 px-2.5 sm:px-4 md:px-5"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <SingleTestimonial review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-sky-600 hover:text-white focus:ring-2 focus:ring-sky-600 focus:outline-none sm:-translate-x-6 sm:p-3 md:-translate-x-8 dark:bg-gray-800 dark:hover:bg-sky-600"
            aria-label="Previous testimonial"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-sky-600 hover:text-white focus:ring-2 focus:ring-sky-600 focus:outline-none sm:translate-x-6 sm:p-3 md:translate-x-8 dark:bg-gray-800 dark:hover:bg-sky-600"
            aria-label="Next testimonial"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="mt-8 flex justify-center gap-2 sm:mt-10">
            {Array.from({ length: maxDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:outline-none sm:h-3 ${
                  currentIndex === index
                    ? "w-8 bg-sky-600 sm:w-10"
                    : "w-2.5 bg-gray-300 hover:bg-sky-400 sm:w-3 dark:bg-gray-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
