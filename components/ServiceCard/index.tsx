"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ServiceCard = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative cursor-pointer overflow-hidden rounded-xl border border-white/10 ${
        item.variant === "dark"
          ? "bg-[#121212] text-white"
          : "bg-[#f6f6f6] text-black"
      }`}
    >
      {/* Image */}
      <motion.div
        className="relative h-[380px] w-full"
        animate={
          hovered ? { scale: 1.05, opacity: 0.7 } : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover brightness-102"
        />
      </motion.div>

      {/* Label */}
      <div className="px-5 pt-4 text-sm opacity-70">{item.label}</div>

      {/* Title */}
      <div className="px-5 pb-5 text-lg font-semibold">{item.title}</div>

      {/* Sliding Back Content */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute inset-0 px-6 py-6 ${
              item.variant === "dark"
                ? "bg-[#111]/80 text-white"
                : "bg-white/80 text-black"
            } flex flex-col justify-center backdrop-blur-lg`}
          >
            <p className="font-body text-md leading-relaxed">
              {item.description}
            </p>

            <Link
              href={item.link}
              className="font-body text-md mt-5 inline-flex items-center gap-2 font-semibold underline"
            >
              Learn More →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceCard;
