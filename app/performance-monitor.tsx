"use client";

import { useEffect } from "react";

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return;

    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // LCP (Largest Contentful Paint)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          const lcp = lastEntry.renderTime || lastEntry.loadTime;

          if (lcp) {
            console.log("LCP:", lcp);
          }
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {}

      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }

          // Send to analytics
          console.log("CLS:", clsValue);
          // Example: sendToAnalytics('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
      } catch (e) {
        // Fallback for browsers that don't support CLS
      }

      // INP (Interaction to Next Paint) - simplified monitoring
      try {
        const inpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (entry.duration) {
              console.log("INP:", entry.duration);
              // Example: sendToAnalytics('INP', entry.duration);
            }
          }
        });
        inpObserver.observe({ entryTypes: ["event"] });
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  return null;
}
