"use client";

import React, { useState, useRef } from "react";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const tooltipRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>, itemId: number) => {
    const img = event.currentTarget;
    const rect = img.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const offsetX = event.clientX - rect.left - halfWidth;
    
    // Calculate transform values similar to spring animation
    const translateX = Math.max(-50, Math.min(50, offsetX * 0.5));
    const rotate = Math.max(-45, Math.min(45, offsetX * 0.45));
    
    setMousePosition({ x: translateX, y: rotate });
    
    // Apply transform directly to tooltip
    const tooltip = tooltipRefs.current[itemId];
    if (tooltip) {
      tooltip.style.transform = `translateX(${translateX}px) rotate(${rotate}deg)`;
    }
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="group relative -mr-4"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => {
            setHoveredIndex(null);
            const tooltip = tooltipRefs.current[item.id];
            if (tooltip) {
              tooltip.style.transform = '';
            }
          }}
        >
          {hoveredIndex === item.id && (
            <div
              ref={(el) => {
                tooltipRefs.current[item.id] = el;
              }}
              className="tooltip-enter absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl whitespace-nowrap"
              style={{
                transform: `translateX(${mousePosition.x}px) rotate(${mousePosition.y}deg)`,
                transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
              <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
              <div className="relative z-30 text-base font-bold text-white">
                {item.name}
              </div>
              <div className="text-xs text-white">{item.designation}</div>
            </div>
          )}
          <img
            onMouseMove={(e) => handleMouseMove(e, item.id)}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
          />
        </div>
      ))}
    </>
  );
};
