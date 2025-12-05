"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-lg bg-gray-100 dark:bg-gray-800" />;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-gray-700 transition-colors duration-300 group-hover:text-sky-600 dark:text-gray-300 dark:group-hover:text-sky-400" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: !isDark ? 0 : -180,
          scale: !isDark ? 1 : 0,
          opacity: !isDark ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-gray-700 transition-colors duration-300 group-hover:text-sky-600 dark:text-gray-300 dark:group-hover:text-sky-400" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggler;
