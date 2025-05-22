import { useState, useEffect, useCallback } from "react";

interface UseCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  initialIndex?: number;
}

export function useCarousel({
  images,
  autoPlay = false,
  interval = 5000,
  initialIndex = 0,
}: UseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  const goToSlide = useCallback(
    (index: number) => {
      const newIndex = Math.max(0, Math.min(index, images.length - 1));
      setCurrentIndex(newIndex);
    },
    [images.length]
  );

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      goToNext();
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, goToNext]);

  return {
    currentIndex,
    goToNext,
    goToPrev,
    goToSlide,
  };
} 