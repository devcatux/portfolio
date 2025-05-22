
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCarousel } from "@/hooks/useCarousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeaturedCarouselProps {
  images: { src: string; alt: string }[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  images,
  autoPlay = false,
  interval = 5000,
  className,
}) => {
  const imageUrls = images.map((img) => img.src);
  const { currentIndex, goToNext, goToPrev } = useCarousel({
    images: imageUrls,
    autoPlay,
    interval,
  });
  
  const isMobile = useIsMobile();

  // Calculate the indexes for the carousel display
  // We need to handle wrapping around when at the edges
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="flex h-full items-center justify-center">
        {/* Carousel container */}
        <div className="relative w-full flex justify-center items-center py-8">
          {/* Left (previous) image */}
          {!isMobile && (
            <div className="hidden sm:block absolute left-0 w-1/4 z-10 transform transition-all duration-500 ease-in-out opacity-70 hover:opacity-80">
              <img
                src={images[prevIndex].src}
                alt={images[prevIndex].alt}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}

          {/* Center (current) image */}
          <div className="w-full sm:w-1/2 z-20 transform transition-all duration-500 ease-in-out mx-auto px-4 sm:px-0">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right (next) image */}
          {!isMobile && (
            <div className="hidden sm:block absolute right-0 w-1/4 z-10 transform transition-all duration-500 ease-in-out opacity-70 hover:opacity-80">
              <img
                src={images[nextIndex].src}
                alt={images[nextIndex].alt}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-300 ease-in-out shadow-md"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-300 ease-in-out shadow-md"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
        {images.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
