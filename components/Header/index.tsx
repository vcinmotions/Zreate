"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { RootState } from "@/store";
import { setAuth } from "@/store/slices/authSlice";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const user = useSelector((state: RootState) => state.auth.user);

  const isLoggedIn = !!user;
  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 80);
  };

  // On mount, load localStorage auth (if any)
  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, [dispatch, token]);
  // derive logged-in state from Redux
  console.log("user", user);
  console.log("token", token);
  return (
    <>
      <header
        className={`fixed top-0 left-0 z-99999 w-full py-3 ${
          stickyMenu
            ? "bg-black py-3! shadow-sm transition duration-100 dark:bg-black"
            : "bg-black/50"
        }`}
      >
        <div className="max-w-c-1390 relative mx-auto items-center justify-between px-2 md:px-8 xl:flex 2xl:px-0">
          <div className="flex items-center justify-between xl:w-1/4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo/logo_dark.png"
                alt="logo"
                width={120}
                height={40}
                className="hidden h-17 w-auto dark:block"
                priority
              />
              <Image
                src="/images/logo/logo_light.png"
                alt="logo"
                width={120}
                height={90}
                className="h-17 w-auto dark:hidden"
                priority
              />

              <span className="font-heading text-2xl font-semibold tracking-wide text-white dark:text-white">
                ZREATE
              </span>
            </Link>

            <button
              aria-label="hamburger toggler"
              className="block xl:hidden"
              onClick={() => setNavigationOpen(!navigationOpen)}
            >
              <span className="relative block h-6 w-6 cursor-pointer">
                {/* Hamburger */}
                <span className="absolute inset-0 flex flex-col justify-center space-y-1.5">
                  <span
                    className={`block h-0.5 bg-white transition-all duration-300 ${
                      navigationOpen ? "opacity-0" : "w-full"
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 bg-white transition-all duration-300 ${
                      navigationOpen ? "opacity-0" : "w-full"
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 bg-white transition-all duration-300 ${
                      navigationOpen ? "opacity-0" : "w-full"
                    }`}
                  ></span>
                </span>

                {/* X icon */}
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    navigationOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="absolute h-0.5 w-6 rotate-45 bg-white"></span>
                  <span className="absolute h-0.5 w-6 -rotate-45 bg-white"></span>
                </span>
              </span>
            </button>
          </div>

          <div
            className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${
              navigationOpen &&
              "navbar shadow-solid-5 dark:bg-blacksection no-scrollbar visible! mt-4 h-auto max-h-[400px] rounded-md bg-black p-7.5 xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
            }`}
          >
            <nav>
              <ul className="flex flex-col gap-5 xl:ml-20 xl:flex-row xl:items-center xl:gap-16">
                {menuData.map((menuItem, key) => {
                  const isActive = pathUrl === menuItem.path;
                  return (
                    <li
                      key={key}
                      className={menuItem.submenu ? "group relative" : ""}
                    >
                      {menuItem.submenu ? (
                        <>
                          <button
                            onClick={() => setDropdownToggler(!dropdownToggler)}
                            className={`font-heading flex cursor-pointer items-center gap-3 transition ${
                              isActive
                                ? "text-sky-500"
                                : "text-white hover:text-sky-500 dark:text-slate-200"
                            }`}
                          >
                            {menuItem.title}
                            <svg
                              className="fill-waterloo h-3 w-3 cursor-pointer transition group-hover:fill-sky-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                          </button>
                          <ul
                            className={`dropdown ${
                              dropdownToggler ? "flex" : ""
                            }`}
                          >
                            {menuItem.submenu.map((item, i) => (
                              <li
                                key={i}
                                className="font-body text-white transition hover:text-sky-500"
                              >
                                <Link href={item.path || "#"}>
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <Link
                          href={`${menuItem.path}`}
                          className={`font-heading text-xl ${
                            isActive
                              ? "text-sky-500"
                              : "text-white transition hover:text-sky-500 dark:text-slate-100"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-7 flex items-center gap-6 xl:mt-0">
              <ThemeToggler />
              {isLoggedIn ? (
                <Link
                  href="/support"
                  className="group from-primary ] inline-flex items-center rounded-full border border-transparent bg-gradient-to-r via-indigo-500 to-cyan-400 p-[1px] text-sm font-semibold text-black shadow-[0_10px_30px_-15px_rgba(37,150,190,0.8)] transition hover:-translate-y-0.5"
                >
                  <span className="font-body inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2 text-xl transition group-hover:bg-white dark:bg-slate-900/80 dark:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-4 w-4"
                    >
                      <path d="M3 7l9 6 9-6" />
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                    </svg>
                    Let's Talk
                  </span>
                </Link>
              ) : (
                <Link
                  href="/auth/signup"
                  className="group from-primary hover:-translate-y-0.5] inline-flex items-center rounded-full border border-transparent bg-gradient-to-r via-indigo-500 to-cyan-400 p-[1px] text-sm font-semibold text-black shadow-[0_10px_30px_-15px_rgba(37,150,190,0.8)] transition"
                >
                  <span className="font-body inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2 text-xl transition group-hover:bg-white dark:bg-slate-900/80 dark:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-4 w-4"
                    >
                      <path d="M3 7l9 6 9-6" />
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                    </svg>
                    Register
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
