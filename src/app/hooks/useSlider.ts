"use client";

import { useState, useEffect, useCallback } from "react";

type SlideDirection = "prev" | "next" | null;
type SlideReturnType = {
  handleSlide: (slide: SlideDirection) => void;
  transformSlideValue: () => string;
  activeSlide: SlideDirection;
};

const useSlider = (
  initialArray: unknown[],
  l: number,
  ml: number,
  m: number,
  sm: number,
  s: number,
  mo: number,
  mi: number,
  time: number,
  initialWidth?: number
): SlideReturnType => {
  const [width, setWidth] = useState<number>(initialWidth || 0);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<SlideDirection>(null);

  const calculateBoxesPerSlide = useCallback((): number => {
    if (width >= 1920) return l;
    if (width >= 1366 && width < 1920) return ml;
    if (width >= 1024 && width < 1366) return m;
    if (width >= 768 && width < 1024) return sm;
    if (width >= 630 && width < 768) return s;
    if (width >= 430 && width < 630) return mo;
    if (width < 430) return mi;
    return 1;
  }, [width]);

  const handleSlide = (slide: SlideDirection): void => {
    const totalBoxes = initialArray.length;
    const boxesPerSlide = calculateBoxesPerSlide();
    const maxSlideIndex = totalBoxes - boxesPerSlide;

    setSlideIndex((prevIndex) => {
      if (slide === "next") {
        if (prevIndex === maxSlideIndex) return 0;
        return prevIndex + 1;
      }
      if (slide === "prev") {
        if (prevIndex === 0) return maxSlideIndex;
        return prevIndex - 1;
      }
      return prevIndex;
    });
    setActiveSlide(slide);
    setTimeout(() => {
      setActiveSlide(null);
    }, 100);
  };

  const transformSlideValue = (): string => {
    const boxesPerSlide = calculateBoxesPerSlide();
    const slideWidth = 100 / boxesPerSlide;
    return `translateX(-${slideIndex * slideWidth}%)`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleSlide("next");
    }, time);

    return () => clearInterval(intervalId);
  }, [slideIndex]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return {
    handleSlide,
    transformSlideValue,
    activeSlide,
  };
};

export default useSlider;
