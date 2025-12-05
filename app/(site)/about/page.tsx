"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import {
  CheckCircle2,
  Users,
  Target,
  Award,
  TrendingUp,
  Globe,
  Zap,
  Shield,
  ArrowRightIcon,
} from "lucide-react";

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      { threshold: 0.1, rootMargin: "-100px" },
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

  const parallaxOpacity = 1 - scrollProgress;
  const parallaxY = scrollProgress * 100;

  const stats = [
    { value: "30+", label: "Years of Excellence", icon: Award },
    { value: "500+", label: "Happy Clients", icon: Users },
    { value: "1000+", label: "Projects Delivered", icon: Target },
    { value: "98%", label: "Client Satisfaction", icon: TrendingUp },
  ];

  const values = [
    {
      title: "Our Vision",
      description:
        "To be an organization that consistently delivers satisfaction through transparency, integrity, and accountability.",
      icon: Target,
      color: "blue",
    },
    {
      title: "Our Mission",
      description:
        "To become the most preferred IT provider with the latest technologies and cost-effective solutions.",
      icon: Zap,
      color: "green",
    },
    {
      title: "Core Values",
      description:
        "Our core values guide how we operate and collaborate with clients, partners, and employees.",
      icon: Shield,
      color: "purple",
    },
  ];

  const features = [
    {
      title: "Established in 2021",
      description:
        "We have grown into a trusted partner with customer-first and employee-first values.",
      icon: CheckCircle2,
    },
    {
      title: "Latest Technologies",
      description:
        "We provide cutting-edge technologies helping businesses achieve long-term sustainability.",
      icon: CheckCircle2,
    },
    {
      title: "People-First Approach",
      description:
        "Our success is built on strong relationships with clients, partners, and our dedicated team.",
      icon: CheckCircle2,
    },
    {
      title: "Global Reach",
      description:
        "Strong presence across Gujarat & Maharashtra with plans for nationwide expansion.",
      icon: Globe,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[65vh] w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black xl:min-h-screen"
      >
        {/* Background Image with Parallax */}
        <div
          className="parallax-bg absolute inset-0"
          style={{
            opacity: parallaxOpacity,
            transform: `translateY(${parallaxY}px)`,
            transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/blog/business.jpg')`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="max-w-c-1390 relative z-10 mx-auto px-4 py-24 sm:px-6 sm:py-32 md:px-8 md:py-40 lg:px-10 lg:py-48 xl:px-12 2xl:px-0">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div
              className="fade-up-animate flex flex-col justify-center"
              data-animate-id="hero-content"
            >
              <div
                className="scale-in-animate inline-flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md sm:px-6 sm:py-3"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="pulse-scale h-2.5 w-2.5 rounded-full bg-sky-400" />
                <span className="font-heading text-xs font-semibold tracking-wider text-white uppercase sm:text-sm">
                  About Us
                </span>
              </div>

              <h1
                className="font-heading fade-up-animate mt-8 text-4xl leading-tight font-semibold text-white sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ animationDelay: "0.3s" }}
              >
                Your Trusted IT Solutions Partner
              </h1>

              <div
                className="fade-left-animate mt-6 flex items-center gap-3"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-sky-400 to-cyan-400" />
                <p className="font-heading text-xl font-medium text-sky-400 sm:text-2xl">
                  Since 2021
                </p>
              </div>

              <p
                className="font-body fade-up-animate mt-8 text-lg leading-relaxed text-white/90 sm:text-xl"
                style={{ animationDelay: "0.6s" }}
              >
                At ZREATE, we empower success through innovative solutions,
                cutting-edge technology, and unwavering commitment to
                excellence.
              </p>

              {/* Stats Grid */}
              <div
                className="fade-up-animate mt-12 grid grid-cols-2 gap-4 sm:gap-6"
                style={{ animationDelay: "0.8s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="relative border-y border-gray-200 bg-white py-20 sm:py-24 md:py-28 lg:py-32 dark:border-gray-700 dark:bg-gray-900">
        {/* Glow background in dark mode */}

        <div className="max-w-c-1390 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
          <div
            className="fade-up-on-scroll mb-16 text-center sm:mb-20"
            data-animate-id="vision-header"
          >
            <h2 className="font-heading text-4xl font-semibold text-black sm:text-5xl md:text-6xl dark:text-white">
              What Drives Us Forward
            </h2>
            <div className="mx-auto mt-6 h-1 w-20 bg-gradient-to-r from-sky-400 to-cyan-400" />
            <p className="font-body mx-auto mt-6 max-w-2xl text-lg text-gray-700 sm:text-xl dark:text-gray-300">
              Our vision, mission, and values shape everything we do
            </p>
          </div>

          <div
            className="stagger-container grid gap-8 md:grid-cols-3"
            data-animate-id="values-container"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white",
                green:
                  "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white",
                purple:
                  "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white",
              };

              return (
                <div
                  key={index}
                  className="group fade-up-on-scroll relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                  data-animate-id={`value-${index}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:to-gray-700/50" />
                  <div className="relative">
                    <h3 className="font-heading mb-4 text-2xl font-semibold text-black sm:text-3xl dark:text-white">
                      {value.title}
                    </h3>

                    <p className="font-body text-base leading-relaxed text-gray-700 sm:text-lg dark:text-gray-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="bg-white py-20 sm:py-24 md:py-28 lg:py-32 dark:bg-gray-900">
        <div className="max-w-c-1390 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div
              className="scale-in-on-scroll order-2 lg:order-1"
              data-animate-id="company-image"
            >
              <div className="group relative overflow-hidden rounded-3xl border border-gray-200 shadow-2xl dark:border-gray-700">
                <div className="aspect-[4/3] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-110">
                    <Image
                      src="/images/about/com.jpg"
                      alt="Company team working"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div
                className="fade-up-on-scroll mt-8 grid grid-cols-2 gap-4"
                data-animate-id="stats-grid"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                  <div className="font-heading text-4xl font-bold text-blue-600 dark:text-blue-400">
                    98%
                  </div>
                  <div className="font-body mt-2 text-sm text-gray-700 sm:text-base dark:text-gray-300">
                    Client Satisfaction
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                  <div className="font-heading text-4xl font-bold text-green-200 dark:text-green-400">
                    24/7
                  </div>
                  <div className="font-body mt-2 text-sm text-gray-700 sm:text-base dark:text-gray-300">
                    Customer Support
                  </div>
                </div>
              </div>
            </div>

            <div
              className="fade-up-on-scroll order-1 lg:order-2"
              data-animate-id="company-content"
            >
              <div
                className="font-heading fade-left-on-scroll inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-semibold tracking-wider text-gray-700 uppercase dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                data-animate-id="company-badge"
              >
                Company Overview
              </div>

              <h2 className="font-heading mt-8 text-4xl font-semibold text-black sm:text-5xl md:text-6xl dark:text-white">
                Leading IT Solutions Provider
              </h2>

              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-sky-400 to-cyan-400" />

              <p className="font-body mt-8 text-xl leading-relaxed text-gray-700 sm:text-2xl dark:text-gray-300">
                ZREATE is one of the leading IT solutions providers with a
                strong presence across Gujarat & Maharashtra.
              </p>

              <div className="mt-10 space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group fade-left-on-scroll flex gap-5 transition-transform duration-300 hover:translate-x-2"
                      data-animate-id={`feature-${index}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-360 group-hover:from-sky-500 group-hover:to-cyan-500 group-hover:text-white dark:from-sky-900/30 dark:to-cyan-900/30 dark:text-sky-400 dark:group-hover:from-sky-500 dark:group-hover:to-cyan-500">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="font-heading text-lg font-semibold text-black sm:text-xl dark:text-white">
                          {feature.title}
                        </h4>
                        <p className="font-body mt-1.5 text-base text-gray-700 sm:text-lg dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="fade-up-on-scroll mt-12"
                data-animate-id="cta-button"
                style={{ animationDelay: "0.4s" }}
              >
                <button className="group font-heading inline-flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:translate-x-1 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/50 active:scale-95 dark:from-sky-500 dark:to-cyan-500">
                  Learn More About Us
                  <ArrowRightIcon className="ml-2 h-5 w-5 transition-all duration-500 group-hover:translate-x-1 group-hover:rotate-360" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
