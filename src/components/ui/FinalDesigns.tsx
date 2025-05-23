import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCarousel } from "@/hooks/useCarousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface FinalDesignsProps {
  images: { src: string; alt: string }[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  title?: string;
}

const FinalDesigns: React.FC<FinalDesignsProps> = ({
  images,
  autoPlay = false,
  interval = 5000,
  className,
  title = "Final Designs",
}) => {
  const imageUrls = images.map((img) => img.src);
  const { currentIndex, goToNext, goToPrev } = useCarousel({
    images: imageUrls,
    autoPlay,
    interval,
  });
  
  const isMobile = useIsMobile();

  // Progress percentage
  const progressPercent = ((currentIndex + 1) / images.length) * 100;

  return (
    <div className={cn("relative w-full overflow-hidden my-16", className)}>
      <div className="bg-gray-50 rounded-[4px] overflow-hidden shadow-sm">
        {/* Top header with progress bar */}
        <div className="bg-white border-b-2 border-gray-200 p-4 flex items-center justify-between">
          <div className="text-xl font-black uppercase">{title}</div>
          <div className="w-36 h-2 bg-gray-200 rounded-[4px] overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Carousel content */}
        <div className="w-full h-full bg-white relative px-4 py-12">
          <div className="flex h-[480px] items-center justify-center">
            {/* Image counter indicator */}
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-[4px] text-sm z-30">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Left (previous) image */}
            {!isMobile && (
              <div className="hidden sm:block absolute left-16 w-1/5 z-10 transform -translate-x-1/4 opacity-60 hover:opacity-70 transition-all duration-500">
                <img
                  src={images[(currentIndex - 1 + images.length) % images.length].src}
                  alt={images[(currentIndex - 1 + images.length) % images.length].alt}
                  className="w-full h-auto object-contain rounded-lg max-h-[300px]"
                />
              </div>
            )}

            {/* Center (current) image */}
            <div className="w-full sm:w-3/5 z-20 transform transition-all duration-500 mx-auto px-4 sm:px-0 flex items-center justify-center">
              <div className="bg-white shadow-md border border-gray-100 rounded-lg">
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="w-full h-auto object-contain max-h-[400px] rounded-lg"
                />
              </div>
            </div>

            {/* Right (next) image */}
            {!isMobile && (
              <div className="hidden sm:block absolute right-16 w-1/5 z-10 transform translate-x-1/4 opacity-60 hover:opacity-70 transition-all duration-500">
                <img
                  src={images[(currentIndex + 1) % images.length].src}
                  alt={images[(currentIndex + 1) % images.length].alt}
                  className="w-full h-auto object-contain rounded-lg max-h-[300px]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="bg-white border-t-2 border-gray-200 p-4 flex justify-start space-x-4">
          <button
            onClick={goToPrev}
            className="w-12 h-12 rounded-full bg-white/80 border-gray-300 border-2 hover:bg-accent/60 flex items-center justify-center shadow-md transition-all hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="w-12 h-12 rounded-full bg-white/80 border-gray-300 border-2 hover:bg-accent/60 flex items-center justify-center shadow-md transition-all hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 z-30">
          {images.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-accent w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalDesigns; 