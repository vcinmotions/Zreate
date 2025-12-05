"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const SupportPage = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/signin"); // change to your login page route
    }
  }, [user, router]);

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

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    serviceRequest: "",
    subject: "",
    message: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Phone input handler - only allow numbers, +, -, (, ), and spaces
  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9+\-() ]/g, "");
      setFormData((prev) => ({ ...prev, phone: value }));
    },
    [],
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      agreeToTerms: e.target.checked,
    }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          setIsSubmitted(true);
          setIsSubmitting(false);

          // hide success message after 4 seconds and reset form
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              fullName: "",
              companyName: "",
              email: "",
              phone: "",
              serviceRequest: "",
              subject: "",
              message: "",
              agreeToTerms: false,
            });
          }, 4000);
        } else {
          setIsSubmitting(false);
          alert("Something went wrong ❌");
        }
      } catch (error) {
        console.log(error);
        setIsSubmitting(false);
        alert("Server error ❌");
      }
    },
    [formData],
  );

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Address",
      content: "contact@zreate.com",
      link: "mailto:contact@zreate.com",
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Our Location",
      content: "Available worldwide to serve your IT needs",
      link: "#",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri: 9:00 AM - 6:00 PM",
      link: "#",
    },
  ];

  return (
    <>
      <section className="relative min-h-[60vh] w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url('/images/user/support.jpg')`,
              filter: "brightness(120%)",
            }}
          />
        </div>

        <div className="max-w-c-1390 relative z-10 mx-auto px-4 py-24 sm:px-6 sm:py-32 md:px-8 md:py-40 lg:px-10 lg:py-48 xl:px-12 2xl:px-0">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div
              className="fade-up-animate flex flex-col justify-center"
              data-animate-id="support-hero"
            >
              <div
                className="scale-in-animate inline-flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md sm:px-6 sm:py-3"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="pulse-scale h-2.5 w-2.5 rounded-full bg-sky-400" />
                <span className="font-heading text-xs font-semibold tracking-wider text-white uppercase sm:text-sm">
                  Get Support
                </span>
              </div>

              <h1
                className="font-heading fade-up-animate mt-8 text-4xl leading-tight font-semibold text-white sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ animationDelay: "0.3s" }}
              >
                Let's Build Something Amazing Together
              </h1>

              <div
                className="fade-left-animate mt-6 flex items-center gap-3"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-sky-400 to-cyan-400" />
                <p className="font-heading text-xl font-medium text-sky-400 sm:text-2xl">
                  We're Here to Help
                </p>
              </div>

              <p
                className="font-body fade-up-animate mt-8 text-lg leading-relaxed text-white/90 sm:text-xl"
                style={{ animationDelay: "0.6s" }}
              >
                Have a question or ready to start your next project? Our team is
                here to help you every step of the way. Reach out and let's
                discuss how we can transform your business.
              </p>
            </div>

            <div
              className="scale-in-animate relative hidden lg:block"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24 md:py-28 lg:py-32 dark:bg-gray-900">
        <div className="max-w-c-1390 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-20">
            <div
              className={`stagger-container lg:col-span-1 ${
                isVisible["contact-info"] ? "visible" : ""
              }`}
              data-animate-id="contact-info"
            >
              <div
                className={`fade-up-on-scroll ${
                  isVisible["contact-header"] ? "visible" : ""
                }`}
                data-animate-id="contact-header"
              >
                <h2 className="font-heading mb-8 text-3xl font-semibold text-black sm:text-4xl dark:text-white">
                  Contact Information
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-cyan-400" />
              </div>

              <div className="mt-10 space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className={`group fade-up-on-scroll flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:translate-x-2 hover:scale-105 hover:border-sky-400/50 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 ${
                        isVisible[`contact-item-${index}`] ? "visible" : ""
                      }`}
                      data-animate-id={`contact-item-${index}`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-360 group-hover:from-sky-500 group-hover:to-cyan-500 group-hover:text-white dark:from-sky-900/30 dark:to-cyan-900/30 dark:text-sky-400 dark:group-hover:from-sky-500 dark:group-hover:to-cyan-500">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-black dark:text-white">
                          {info.title}
                        </h3>
                        <p className="font-body mt-1 text-base text-gray-700 dark:text-gray-300">
                          {info.content}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div
              className={`fade-up-on-scroll lg:col-span-2 ${
                isVisible["contact-form"] ? "visible" : ""
              }`}
              data-animate-id="contact-form"
            >
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg sm:p-10 md:p-12 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-8">
                  <h2 className="font-heading text-3xl font-semibold text-black sm:text-4xl dark:text-white">
                    Send Us a Message
                  </h2>
                  <div className="mt-4 h-1 w-20 bg-gradient-to-r from-sky-400 to-cyan-400" />
                  <p className="font-body mt-6 text-base text-gray-700 sm:text-lg dark:text-gray-300">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="scale-in-animate flex flex-col items-center justify-center rounded-2xl border-2 border-green-500 bg-green-50 p-12 dark:bg-green-900/20">
                    <div
                      className="scale-in-animate"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-heading mt-6 text-2xl font-semibold text-green-700 dark:text-green-400">
                      Message Sent Successfully!
                    </h3>
                    <p className="font-body mt-2 text-center text-base text-green-600 dark:text-green-300">
                      We'll get back to you and connect within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="fullName"
                            className="font-heading text-md mb-2 block font-medium text-black dark:text-white"
                          >
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            required
                            className="font-body w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-black transition-all duration-300 placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-400"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="companyName"
                            className="font-heading text-md mb-2 block font-medium text-black dark:text-white"
                          >
                            Company Name *
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Company Inc."
                            required
                            className="font-body w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-black transition-all duration-300 placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="email"
                            className="font-heading text-md mb-2 block font-medium text-black dark:text-white"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@company.com"
                            required
                            className="font-body w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-black transition-all duration-300 placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-400"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="font-heading text-md mb-2 block font-medium text-black dark:text-white"
                          >
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="+1 (555) 123-4567"
                            pattern="[0-9+\-() ]+"
                            title="Please enter a valid phone number (numbers, +, -, (), spaces only)"
                            required
                            className="font-body w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-black transition-all duration-300 placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="serviceRequest"
                            className="font-heading text-md mb-2 block font-medium text-black dark:text-white"
                          >
                            Service Request *
                          </label>
                          <select
                            id="serviceRequest"
                            name="serviceRequest"
                            value={formData.serviceRequest}
                            onChange={handleInputChange}
                            required
                            className="font-body w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-black transition-all duration-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-sky-400"
                          >
                            <option value="">Select a service</option>
                            <option value="saas-development">
                              SaaS Development
                            </option>
                            <option value="erp-systems">ERP Systems</option>
                            <option value="web-development">
                              Web Development
                            </option>
                            <option value="digital-marketing">
                              Digital Marketing
                            </option>
                            <option value="it-talent-outsourcing">
                              IT Talent Outsourcing
                            </option>
                            <option value="corporate-training">
                              Corporate Training
                            </option>
                            <option value="consultation">Consultation</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="subject"
                            className="font-heading text-md mb-2 block font-medium text-black dark:text-white"
                          >
                            Subject *
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Project inquiry"
                            required
                            className="font-body w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-black transition-all duration-300 placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="font-heading text-md mb-2 block font-medium text-black dark:text-white"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your project..."
                          rows={6}
                          required
                          className="font-body w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-black transition-all duration-300 placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-400"
                        />
                      </div>

                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="agreeToTerms"
                            name="agreeToTerms"
                            type="checkbox"
                            checked={formData.agreeToTerms}
                            onChange={handleCheckboxChange}
                            required
                            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-sky-600 focus:ring-2 focus:ring-sky-500/20 dark:border-gray-600 dark:bg-gray-700"
                          />
                        </div>
                        <label
                          htmlFor="agreeToTerms"
                          className="font-body text-md ml-3 text-gray-700 dark:text-gray-300"
                        >
                          I agree to ZREATE's privacy policy and terms of
                          service *
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group font-heading w-full rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:from-sky-500 dark:to-cyan-500"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                              <span>Send Message</span>
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportPage;
