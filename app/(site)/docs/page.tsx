import SidebarLink from "@/components/Docs/SidebarLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Documentation - ZREATE",
  description:
    "Explore all technology services offered by ZREATE including Web Development, SaaS solutions, ERP systems, Marketing, Training, and more.",
};

export default function DocsPaZge() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            {/* Sidebar */}
            <div className="w-full px-4 lg:w-1/4">
              <div className="sticky top-[80px] rounded-xl border border-white/20 bg-white/40 p-4 shadow-md backdrop-blur-md transition-all dark:border-white/10 dark:bg-white/5">
                <ul className="space-y-2">
                  <SidebarLink />
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-4 lg:w-3/4">
              <div className="rounded-xl bg-white px-8 py-10 shadow-md sm:p-[50px] dark:bg-gray-900">
                <h1 className="mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
                  Explore Our Services Documentation
                </h1>

                <p className="mb-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  Welcome to the ZREATE service documentation hub. Here, you can
                  explore detailed information about the wide range of
                  technology solutions we provide — from web development to
                  full-scale SaaS platforms, ERP systems, marketing solutions,
                  talent outsourcing, and corporate training.
                </p>

                <p className="mb-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  Use the navigation menu on the left to browse through
                  different service categories. Each section provides a clear
                  overview of what we offer, how it benefits your business, and
                  the technical capabilities we bring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
