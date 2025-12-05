"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const wordKeyRef = useRef(0);

  const startAnimation = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      const word = words[words.indexOf(currentWord) + 1] || words[0];
      setCurrentWord(word);
      wordKeyRef.current += 1;
      setIsExiting(false);
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, 300);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating && !isExiting)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, isExiting, duration, startAnimation]);

  return (
    <div
      className={cn(
        "relative z-10 inline-block px-1 text-left text-2xl text-white select-none sm:px-2 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl dark:text-neutral-100",
        isExiting && "flip-word-exit",
        !isExiting && "flip-word-enter",
        className,
      )}
      key={wordKeyRef.current}
    >
      {currentWord.split(" ").map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}-${wordKeyRef.current}`}
          className="inline-block whitespace-nowrap flip-word-item"
          style={{
            animationDelay: `${wordIndex * 0.3}s`,
          }}
        >
          {word.split("").map((letter, letterIndex) => (
            <span
              key={`${word}-${letterIndex}-${wordKeyRef.current}`}
              className="inline-block flip-letter"
              style={{
                animationDelay: `${wordIndex * 0.3 + letterIndex * 0.05}s`,
              }}
            >
              {letter}
            </span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </div>
  );
};
