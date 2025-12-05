"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2,
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4,
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      className: "h-6",
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4,
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      className: "h-20",
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 4,
      repeatDelay: 2,
      className: "h-12",
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6",
    },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative flex min-h-[96vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800",
        // h-screen if you want bigger
        className,
      )}
    >
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full bg-neutral-100"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  const duration = beamOptions.duration || 8;
  const delay = beamOptions.delay || 0;
  const repeatDelay = beamOptions.repeatDelay || 0;
  const totalDuration = duration + repeatDelay;
  const initialY = beamOptions.initialY || -200;
  const translateY = beamOptions.translateY || 1800;
  const translateX = beamOptions.translateX || 0;
  const initialX = beamOptions.initialX || 0;
  const rotate = beamOptions.rotate || 0;

  useEffect(() => {
    if (beamRef.current) {
      const beam = beamRef.current;
      const animationName = `beam-animation-${beamKey}-${initialX}-${translateX}`;

      // Create keyframes dynamically for this specific beam
      const styleSheet = document.createElement("style");
      const progressPercent =
        totalDuration > 0 ? (duration / totalDuration) * 100 : 100;

      styleSheet.textContent = `
        @keyframes ${animationName} {
          0% {
            transform: translate(${initialX}px, ${initialY}px) rotate(${rotate}deg);
            opacity: 1;
          }
          ${progressPercent}% {
            transform: translate(${translateX}px, ${translateY}px) rotate(${rotate}deg);
            opacity: 1;
          }
          ${progressPercent + 0.1}%, 100% {
            transform: translate(${initialX}px, ${initialY}px) rotate(${rotate}deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(styleSheet);

      beam.style.setProperty("--beam-duration", `${totalDuration}s`);
      beam.style.setProperty("--beam-delay", `${delay}s`);
      beam.style.animation = `${animationName} var(--beam-duration) linear infinite`;
      beam.style.animationDelay = `var(--beam-delay)`;

      return () => {
        if (document.head.contains(styleSheet)) {
          document.head.removeChild(styleSheet);
        }
      };
    }
  }, [
    beamKey,
    duration,
    delay,
    repeatDelay,
    initialY,
    translateY,
    translateX,
    initialX,
    rotate,
    totalDuration,
  ]);

  return (
    <>
      <div
        key={beamKey}
        ref={beamRef}
        className={cn(
          "absolute top-20 left-0 z-[5] m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
          beamOptions.className,
        )}
        style={{
          transform: `translate(${initialX}px, ${initialY}px) rotate(${rotate}deg)`,
        }}
      />
      {collision.detected && collision.coordinates && (
        <Explosion
          key={`${collision.coordinates.x}-${collision.coordinates.y}`}
          className=""
          style={{
            left: `${collision.coordinates.x}px`,
            top: `${collision.coordinates.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const [isVisible, setIsVisible] = useState(true);
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
    duration: Math.random() * 1.5 + 0.5,
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      {...props}
      className={cn("explosion-enter absolute z-50 h-2 w-2", props.className)}
    >
      <div className="explosion-glow absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"></div>
      {spans.map((span) => (
        <span
          key={span.id}
          className="explosion-particle absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
          style={
            {
              "--particle-x": `${span.directionX}px`,
              "--particle-y": `${span.directionY}px`,
              "--particle-duration": `${span.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
