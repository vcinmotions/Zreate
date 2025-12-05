"use client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React, { useState, useCallback } from "react";

const Contact = () => {
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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  // Phone input handler - only allow numbers, +, -, (, ), and spaces
  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9+\-() ]/g, "");
      setFormData((prev) => ({ ...prev, phone: value }));
    },
    [],
  );

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          setSuccess(true);
          setLoading(false);

          // hide success message after 4 seconds and reset form
          setTimeout(() => {
            setSuccess(false);
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
          setLoading(false);
          alert("Something went wrong ❌");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert("Server error ❌");
      }
    },
    [formData],
  );

  return (
    <section
      id="support"
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 dark:bg-gray-900"
    >
      <div className="max-w-c-1390 relative mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
        <div className="flex flex-col-reverse gap-6 sm:gap-8 md:flex-row md:justify-between xl:gap-20">
          {/* FORM */}
          <div className="w-full transform rounded-lg border border-gray-200 bg-white p-5 shadow-lg transition-transform sm:p-6 md:w-3/5 md:p-7.5 lg:w-3/4 xl:p-15 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="xl:text-sectiontitle2 mb-8 text-2xl font-semibold text-black sm:mb-10 sm:text-3xl md:mb-12 lg:mb-15 dark:text-white">
              Get in Touch with ZREATE
            </h2>

            {success ? (
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-24">
                {/* Animated Success Icon */}
                <div className="relative mb-6">
                  {/* Circular background animation */}
                  <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75"></div>
                  <div className="absolute inset-0 animate-pulse rounded-full bg-green-500 opacity-50"></div>

                  {/* Success checkmark SVG */}
                  <svg
                    className="relative h-20 w-20 sm:h-24 sm:w-24"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="#10b981"
                      className="animate-scale-in"
                      style={{
                        animation: "scaleIn 0.5s ease-out forwards",
                      }}
                    />
                    {/* Checkmark */}
                    <path
                      d="M30 50 L45 65 L70 35"
                      stroke="white"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      className="animate-checkmark"
                      style={{
                        strokeDasharray: 60,
                        strokeDashoffset: 60,
                        animation: "drawCheck 0.5s ease-out 0.3s forwards",
                      }}
                    />
                  </svg>
                </div>

                {/* Success Message */}
                <h3 className="animate-fade-in-up mb-2 text-center text-2xl font-bold text-green-600 sm:text-3xl dark:text-green-400">
                  Message Sent Successfully!
                </h3>
                <p
                  className="animate-fade-in-up text-center text-base text-gray-600 sm:text-lg dark:text-gray-400"
                  style={{ animationDelay: "0.2s" }}
                >
                  We'll get back to you shortly.
                </p>

                {/* Confetti effect */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="animate-confetti absolute"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: "-10px",
                        width: "10px",
                        height: "10px",
                        backgroundColor: [
                          "#10b981",
                          "#3b82f6",
                          "#f59e0b",
                          "#ef4444",
                          "#8b5cf6",
                        ][Math.floor(Math.random() * 5)],
                        animationDelay: `${Math.random() * 0.5}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="mb-5 flex flex-col gap-5 sm:mb-6 sm:gap-6 md:mb-7.5 md:gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="border-stroke w-full border-b bg-transparent pb-3 text-sm text-black transition-colors outline-none placeholder:text-gray-400 focus:border-sky-600 focus:placeholder:text-black sm:pb-3.5 sm:text-base lg:w-1/2 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-500 dark:focus:placeholder:text-white"
                  />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    required
                    className="border-stroke w-full border-b bg-transparent pb-3 text-sm text-black transition-colors outline-none placeholder:text-gray-400 focus:border-sky-600 focus:placeholder:text-black sm:pb-3.5 sm:text-base lg:w-1/2 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-500 dark:focus:placeholder:text-white"
                  />
                </div>

                {/* Row 2 */}
                <div className="mb-5 flex flex-col gap-5 sm:mb-6 sm:gap-6 md:mb-7.5 md:gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    className="border-stroke w-full border-b bg-transparent pb-3 text-sm text-black transition-colors outline-none placeholder:text-gray-400 focus:border-sky-600 focus:placeholder:text-black sm:pb-3.5 sm:text-base lg:w-1/2 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-500 dark:focus:placeholder:text-white"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your phone number"
                    pattern="[0-9+\-() ]+"
                    title="Please enter a valid phone number (numbers, +, -, (), spaces only)"
                    required
                    className="border-stroke w-full border-b bg-transparent pb-3 text-sm text-black transition-colors outline-none placeholder:text-gray-400 focus:border-sky-600 focus:placeholder:text-black sm:pb-3.5 sm:text-base lg:w-1/2 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-500 dark:focus:placeholder:text-white"
                  />
                </div>

                {/* Row 3 */}
                <div className="mb-5 flex flex-col gap-5 sm:mb-6 sm:gap-6 md:mb-7.5 md:gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <select
                    name="serviceRequest"
                    value={formData.serviceRequest}
                    onChange={handleInputChange}
                    required
                    className="border-stroke w-full border-b bg-transparent pb-3 text-sm text-black transition-colors outline-none focus:border-sky-600 sm:pb-3.5 sm:text-base lg:w-1/2 dark:text-white dark:focus:border-sky-500"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option
                      value="saas-development"
                      className="dark:text-black"
                    >
                      SaaS Development
                    </option>
                    <option value="erp-systems" className="dark:text-black">
                      ERP Systems
                    </option>
                    <option
                      value="web-development "
                      className="dark:text-black"
                    >
                      Web Development
                    </option>
                    <option
                      value="digital-marketing"
                      className="dark:text-black"
                    >
                      Digital Marketing
                    </option>
                    <option
                      value="it-talent-outsourcing"
                      className="dark:text-black"
                    >
                      IT Talent Outsourcing
                    </option>
                    <option
                      value="corporate-training"
                      className="dark:text-black"
                    >
                      Corporate Training
                    </option>
                    <option value="consultation" className="dark:text-black">
                      Consultation
                    </option>
                    <option value="other" className="dark:text-black">
                      Other
                    </option>
                  </select>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter message subject"
                    required
                    className="border-stroke w-full border-b bg-transparent pb-3 text-sm text-black transition-colors outline-none placeholder:text-gray-400 focus:border-sky-600 sm:pb-3.5 sm:text-base lg:w-1/2 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-500"
                  />
                </div>

                {/* Message - Full Width */}
                <div className="mb-8 sm:mb-10 md:mb-11.5">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message here..."
                    rows={4}
                    required
                    className="border-stroke w-full border-b bg-transparent pb-3 text-sm text-black transition-colors outline-none placeholder:text-gray-400 focus:border-sky-600 sm:text-base dark:text-white dark:placeholder:text-gray-500 dark:focus:border-sky-500"
                  />
                </div>

                {/* Checkbox + Button */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <label className="flex items-start gap-2 text-sm text-gray-600 sm:items-center dark:text-gray-400">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleCheckboxChange}
                      required
                      className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 bg-gray-100 outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 sm:mt-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-sky-500"
                    />
                    <span>
                      I agree to ZREATE's privacy policy and terms of service
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`group flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-3 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-8 sm:py-4 sm:text-sm ${
                      loading ? "cursor-not-allowed opacity-70" : "opacity-100"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        Sending...
                        <svg
                          className="h-5 w-5 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                      </span>
                    ) : (
                      <>
                        Get Started{" "}
                        <ArrowRightIcon className="ml-2 h-5 w-5 transition-all duration-500 group-hover:translate-x-1 group-hover:rotate-360" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* CONTACT INFO */}
          <div className="w-full transform transition-transform hover:scale-[1.01] md:w-2/5 lg:w-[26%]">
            <h2 className="mb-8 text-2xl font-semibold text-black sm:text-3xl dark:text-white">
              Contact Information
            </h2>

            <div className="mb-5">
              <h3 className="mb-3 text-base font-medium text-black sm:text-lg dark:text-white">
                Our Location
              </h3>
              <p className="text-sm text-gray-700 sm:text-base dark:text-gray-300">
                We're available worldwide to serve your IT needs.
              </p>
            </div>

            <div className="mb-5">
              <h3 className="mb-3 text-base font-medium text-black sm:text-lg dark:text-white">
                Email Address
              </h3>
              <p className="text-sm break-all text-gray-700 sm:text-base dark:text-gray-300">
                <Link
                  href="mailto:contact@zreate.com"
                  className="text-primary hover:underline"
                >
                  contact@zreate.com
                </Link>
              </p>
            </div>

            <div className="mb-5">
              <h3 className="mb-3 text-base font-medium text-black sm:text-lg dark:text-white">
                Business Hours
              </h3>
              <p className="text-sm text-gray-700 sm:text-base dark:text-gray-300">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-base font-medium text-black sm:text-lg dark:text-white">
                Website
              </h4>
              <p className="text-sm text-gray-700 sm:text-base dark:text-gray-300">
                <Link
                  href="https://www.zreate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.zreate.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Contact;
