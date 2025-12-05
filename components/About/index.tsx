import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";

const About = () => {
  return (
    <>
      {/* ============ SECTION 1 ============ */}
      <section
        id="about"
        className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 dark:from-gray-900 dark:to-gray-950"
      >
        {/* Decorative Elements */}
        <div className="pointer-events-none absolute top-20 -left-40 h-[500px] w-[500px] rounded-full bg-sky-500/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-20 left-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="max-w-c-1315 relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "About Our ZREARTE",
              subtitle: "We're on a mission to make building your business",
              description: `ZREATE is a leading IT solutions company dedicated to helping businesses achieve digital excellence. We combine innovation, expertise, and cutting-edge technology to deliver solutions that drive growth and success.`,
            }}
          />

          <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
            <div className="flex flex-col items-center gap-10 sm:gap-12 md:gap-14 lg:flex-row lg:gap-16 xl:gap-20">
              {/* IMAGE */}
              <div className="group animate-about-fade-left relative mx-auto aspect-[588/526.5] w-full max-w-full overflow-hidden rounded-3xl opacity-0 shadow-xl transition-all duration-500 hover:shadow-2xl md:w-1/2">
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-sky-600/20 to-blue-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 opacity-20 blur transition-opacity duration-500 group-hover:opacity-30" />
                <Image
                  src="/images/about/1.jpg"
                  alt="About ZREATE"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 dark:hidden"
                  fill
                />
                <Image
                  src="/images/about/1.jpg"
                  alt="About ZREATE"
                  className="hidden object-cover transition-transform duration-700 group-hover:scale-105 dark:block"
                  fill
                />
              </div>

              {/* TEXT BLOCK */}
              <div className="animate-about-fade-right w-full opacity-0 md:w-1/2">
                <div className="mb-5 sm:mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-600 to-blue-600 px-5 py-2 text-sm font-semibold tracking-wide text-white shadow-lg shadow-sky-600/30 dark:from-sky-500 dark:to-blue-500">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Our Mission
                  </span>
                </div>

                <h2 className="animate-about-fade-up mb-5 text-3xl leading-tight font-bold text-black opacity-0 sm:mb-6 sm:text-4xl md:text-5xl lg:text-5xl dark:text-white">
                  Empowering Businesses Through{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                      Innovation
                    </span>
                    <span className="animate-pulse-custom absolute bottom-2 left-0 z-0 h-4 w-full bg-gradient-to-r from-sky-200 to-blue-200 blur-sm dark:from-sky-900/60 dark:to-blue-900/60"></span>
                  </span>
                </h2>

                <p className="animate-about-fade-up mb-8 text-base leading-relaxed text-gray-600 opacity-0 sm:text-lg md:mb-10 md:text-xl dark:text-gray-400">
                  At ZREATE, we believe technology should be accessible,
                  powerful, and transformative. Our team works tirelessly to
                  deliver solutions that scale with your business.
                </p>

                {/* FEATURES */}
                <div className="grid gap-5 sm:gap-6">
                  {[
                    {
                      id: "01",
                      title: "Expert Team",
                      desc: "Our professionals bring years of experience in SaaS, cloud, and transformation.",
                      gradient: "from-sky-500 to-cyan-500",
                    },
                    {
                      id: "02",
                      title: "Cutting-Edge Solutions",
                      desc: "We use modern tech to build scalable, secure applications.",
                      gradient: "from-blue-500 to-indigo-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.id}
                      className="group animate-about-fade-up relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={`absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10`}
                      />
                      <div className="relative flex items-start gap-4">
                        <div className="flex-1">
                          <h3 className="mb-2 text-xl font-bold text-black transition-colors duration-300 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                            {item.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-gray-600 md:text-base dark:text-gray-400">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 ============ */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24 md:py-28 lg:py-32 xl:py-36 dark:bg-gray-900">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-sky-50 to-transparent dark:from-sky-950/20" />
        <div className="pointer-events-none absolute top-1/4 -left-40 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-3xl" />

        <div className="max-w-c-1315 relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
          <div className="flex flex-col-reverse items-center gap-10 sm:gap-12 md:gap-14 lg:flex-row lg:gap-16 xl:gap-20">
            {/* TEXT */}
            <div className="animate-about-fade-left w-full opacity-0 md:w-1/2">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-600/30 dark:from-sky-500 dark:to-blue-500">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Why Choose Us
              </span>

              <h2 className="animate-about-fade-up mb-6 text-3xl leading-tight font-bold text-black opacity-0 sm:text-4xl md:text-5xl lg:text-5xl dark:text-white">
                Your Trusted Partner for{" "}
                <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Digital Success
                </span>
              </h2>

              <p className="animate-about-fade-up mb-10 text-lg leading-relaxed text-gray-600 opacity-0 dark:text-gray-400">
                We deliver solutions that drive measurable growth for your
                business with cutting-edge technology and dedicated support.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { text: "End-to-end development", color: "sky" },
                  { text: "24/7 support", color: "blue" },
                  { text: "Scalable architecture", color: "cyan" },
                  { text: "Security-first approach", color: "indigo" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group animate-about-fade-up flex items-center gap-3 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 opacity-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md dark:border-gray-800 dark:from-gray-900 dark:to-gray-900/50"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-10"></div>
            </div>

            {/* IMAGE */}
            <div className="group animate-about-fade-right relative aspect-[588/526.5] w-full overflow-hidden rounded-3xl opacity-0 shadow-xl transition-all duration-500 hover:shadow-2xl md:w-1/2">
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-blue-600/20 to-sky-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-500 to-sky-600 opacity-20 blur transition-opacity duration-500 group-hover:opacity-30" />
              <Image
                src="/images/about/2.avif"
                alt="Why Choose ZREATE"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                fill
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
