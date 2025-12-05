// SplashIntro.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashIntro({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Duration: show for some time, then hide
    const timer1 = setTimeout(() => {
      setVisible(false);
    }, 2000); // show for 2 seconds

    // Call onFinish after exit animation is done
    const timer2 = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-4xl font-bold text-gray-900 dark:text-gray-100"
          >
            Welcome to ZREATE
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
