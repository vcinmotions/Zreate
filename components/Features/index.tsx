import React from "react";
import SectionHeader from "../Common/SectionHeader";
import { FocusCards } from "../ui/focus-cards";

const Feature = () => {
  const cards = [
    {
      title: "SaaS-Based Solutions",
      src: "https://media.istockphoto.com/id/477042452/photo/3d-man-with-our-services-sign-board.jpg?s=612x612&w=0&k=20&c=1jZJvr0-NqHas7715eO6U3QRG714dEleBvJ_tZeouYM=",
    },
    {
      title: "Web Development",
      src: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Digital Marketing",
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "ERP Software Services",
      src: "/images/features/marketing.jpg",
    },
    {
      title: "IT Talent Outsourcing",
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Corporate Training",
      src: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-[#2596be15] blur-3xl dark:bg-[#2596be25]" />

      <div className="max-w-c-1315 relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Our Work Domains",
            subtitle: "What We Deliver",
            description: `At ZREATE, we provide high-quality digital solutions tailored to your business needs. Our comprehensive suite of services helps companies transform their operations with reliable, secure, and future-ready technology.`,
          }}
        />

        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24">
          <FocusCards cards={cards} />
        </div>
      </div>
    </section>
  );
};

export default Feature;
