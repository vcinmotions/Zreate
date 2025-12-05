"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ServiceCard from "@/components/ServiceCard";

const ServicePage = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-animate-id") || "";
            setIsVisible((prev) => ({
              ...prev,
              [id]: true,
            }));
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll("[data-animate-id]");
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const servicesData = [
    {
      title: "Web Development",
      label: "Service",
      image: "/images/features/webdev.jpg",
      description:
        "We design and develop high-performance websites and web applications that are fast, secure, scalable, and optimized for conversion and user experience.",
      link: "/docs/webdev",
      variant: "dark",
    },
    {
      title: "SaaS Based Solutions",
      label: "Service",
      image: "/images/features/saas.avif",
      description:
        "We build custom SaaS platforms with robust architectures, subscription systems, dashboards, authentication, automation, and cloud-native capabilities.",
      link: "/docs/saas",
      variant: "light",
    },
    {
      title: "Digital Marketing",
      label: "Service",
      image: "/images/features/marketing.jpg",
      description:
        "Amplify your brand reach with performance-based digital marketing strategies including SEO, SEM, social media, content, and full-funnel campaigns.",
      link: "/docs/marketing",
      variant: "dark",
    },
    {
      title: "ERP Software Services",
      label: "Service",
      image: "/images/features/teams.jpeg",
      description:
        "We implement and customize ERP systems that simplify business operations, integrate processes, and provide real-time business intelligence.",
      link: "/docs/erp",
      variant: "light",
    },
    {
      title: "IT Talent Outsourcing",
      label: "Service",
      image: "/images/features/teams.jpeg",
      description:
        "Get access to skilled and certified IT professionals for long-term or project-based requirements with flexible and cost-efficient hiring models.",
      link: "/docs/outsourcing",
      variant: "dark",
    },
    {
      title: "Corporate Training",
      label: "Service",
      image: "/images/features/enterprise.jpg",
      description:
        "We provide industry-focused corporate training programs to upskill employees in modern technologies, productivity tools, and digital workflows.",
      link: "/docs/training",
      variant: "light",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative border-b border-gray-300 bg-white px-6 py-24 md:px-10 lg:px-16 dark:border-gray-700 dark:bg-gradient-to-b dark:from-[#0b1220] dark:to-[#020617]">
        {/* Glow background in dark mode */}

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 pt-15 lg:grid-cols-2">
          <div
            className={`fade-up-on-scroll ${
              isVisible["service-text"] ? "visible" : ""
            }`}
            data-animate-id="service-text"
          >
            <h4 className="font-body mb-3 text-xl text-gray-600 dark:text-gray-400">
              Our Comprehensive Services
            </h4>

            <h2 className="mb-6 text-4xl leading-tight font-bold text-gray-900 dark:text-white">
              Empowering Your Business Through Technology
            </h2>

            <p className="font-body text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              At ZREATE, we're your dedicated technology partner, committed to
              driving your business forward. With nearly three decades of
              experience, we offer an extensive range of IT services tailored to
              meet your specific needs. From software licensing to managed
              services, our team of experts ensures you have the technology
              solutions to excel in the digital age.
              <br />
              <br />
              We understand the dynamic challenges businesses face, and our
              mission is to empower you through innovation and efficiency.
            </p>
          </div>

          <div
            className={`fade-left-on-scroll ${
              isVisible["service-image"] ? "visible" : ""
            }`}
            data-animate-id="service-image"
          >
            <div className="relative h-[420px] w-full overflow-hidden rounded-xl shadow-lg shadow-black/20 transition duration-500 hover:scale-[1.02] dark:shadow-white/10">
              <Image
                src="/images/features/teams.jpeg"
                alt="Service Image"
                fill
                className="object-cover brightness-102"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative bg-white px-6 py-20 transition-colors duration-300 md:px-12 xl:py-40 dark:bg-gray-900">
        {/* Glow background in dark mode */}

        <div className="relative z-10 mx-auto max-w-7xl">
          <h2 className="font-body mb-12 text-4xl font-semibold text-black dark:text-white">
            Our Services
          </h2>

          <div className="font-body grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((item, index) => (
              <ServiceCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
