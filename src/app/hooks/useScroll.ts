"use client";

import { useState, useEffect, useCallback } from "react";

type ScrollDirection = "prev" | "next" | null;
type ScrollReturnType = {
  handleScroll: (scroll: ScrollDirection) => void;
  transformValue: () => string;
  activeScroll: ScrollDirection;
};

const useScroll = (
  initialArray: unknown[],
  initialWidth?: number
): ScrollReturnType => {
  const [width, setWidth] = useState<number>(initialWidth || 0);
  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const [activeScroll, setActiveScroll] = useState<ScrollDirection>(null);

  const calculateBoxesPerSlide = useCallback((): number => {
    if (width >= 1920) return 6;
    if (width >= 1366 && width < 1920) return 4;
    if (width >= 1024 && width < 1366) return 3;
    if (width >= 768 && width < 1024) return 2;
    if (width >= 630 && width < 768) return 3;
    if (width >= 430 && width < 630) return 2;
    if (width < 430) return 1;
    return 1;
  }, [width]);

  const handleScroll = (scroll: ScrollDirection): void => {
    const totalBoxes = initialArray.length;

    const maxScrollIndex = (): number => {
      const boxesPerSlide = calculateBoxesPerSlide();
      return totalBoxes - boxesPerSlide;
    };

    setScrollIndex((prevIndex) => {
      if (scroll === "prev") return Math.max(prevIndex - 1, 0);
      if (scroll === "next") return Math.min(prevIndex + 1, maxScrollIndex());
      return prevIndex;
    });

    setActiveScroll(scroll);
    setTimeout(() => {
      setActiveScroll(null);
    }, 100);
  };

  const transformValue = (): string => {
    const boxesPerSlide = calculateBoxesPerSlide();
    const slideWidth = 100 / boxesPerSlide;
    return `translateX(-${scrollIndex * slideWidth}%)`;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return {
    handleScroll,
    transformValue,
    activeScroll,
  };
};

export default useScroll;
