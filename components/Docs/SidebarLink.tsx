"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

const SidebarLink = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/docs/webdev", label: "Web Development" },
    { href: "/docs/saas", label: "SaaS Based Solutions" },
    { href: "/docs/marketing", label: "Digital Marketing" },
    { href: "/docs/erp", label: "ERP Software Services" },
    { href: "/docs/outsourcing", label: "IT Talent Outsourcing" },
    { href: "/docs/training", label: "Corporate Training" },
  ];

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <div className="mb-0 block lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 text-left text-[16px] font-medium shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <span>Services Menu</span>
          <span className="text-xl">{open ? "▲" : "▼"}</span>
        </button>

        {/* MOBILE COLLAPSIBLE CONTENT */}
        {open && (
          <ul className="mt-3 space-y-2 rounded-xl border border-gray-200 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-900">
            {links.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-4 py-2 text-[15px] transition-all ${
                    active
                      ? "bg-blue-50 font-semibold text-[#2596BE] dark:bg-white/10"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </ul>
        )}
      </div>

      {/* DESKTOP SIDEBAR */}
      <li className="hidden lg:block">
        {links.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-[15px] font-medium text-gray-800 backdrop-blur-md transition-all dark:text-white ${
                active
                  ? "border-gray-300/40 bg-white/70 shadow-sm dark:border-white/10 dark:bg-white/10"
                  : "hover:bg-gray-100/60 dark:hover:bg-white/5"
              }`}
            >
              {/* Active Left Indicator */}
              {active && (
                <span
                  className="absolute top-0 left-0 h-full w-[3px] rounded-r-full"
                  style={{ backgroundColor: "#2596BE" }}
                ></span>
              )}

              <span
                className={`transition-all ${active ? "font-semibold" : ""}`}
                style={{
                  color: active ? "#2596BE" : undefined,
                }}
              >
                {item.label}
              </span>

              {/* Hover Accent */}
              {!active && (
                <span
                  className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(37,150,190,0.25)",
                  }}
                ></span>
              )}
            </Link>
          );
        })}
      </li>
    </>
  );
};

export default SidebarLink;
