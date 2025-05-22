import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalSliderProps {
  items: {
    image: string;
    alt: string;
    caption?: string;
  }[];
  title?: string;
  subtitle?: string;
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  items,
  title,
  subtitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const diff = touchStartX - touchCurrentX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsSwiping(false);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === sliderContainerRef.current || 
          sliderContainerRef.current?.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          e.preventDefault();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-6 text-center">
          {title && <h3 className="text-2xl font-semibold mb-2 text-portfolio-blue">{title}</h3>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      <div 
        className="relative bg-gray-100 rounded-2xl p-8 overflow-hidden"
        ref={sliderContainerRef}
        tabIndex={0}
        role="region"
        aria-label="Image slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Content slider */}
        <div className="relative w-full min-h-[320px] md:min-h-[400px] flex items-center justify-center">
          {/* Animation container */}
          <div className="w-full h-full relative">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  idx === currentIndex
                    ? "opacity-100 z-10 translate-x-0"
                    : idx < currentIndex
                    ? "opacity-0 -translate-x-full z-0"
                    : "opacity-0 translate-x-full z-0"
                }`}
                aria-hidden={idx !== currentIndex}
              >
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="max-w-full max-h-[320px] md:max-h-[400px] object-contain rounded-lg shadow-md"
                  />
                  {item.caption && (
                    <p className="mt-4 text-sm text-gray-600 text-center max-w-lg">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-20 hover:scale-110 transition-transform text-portfolio-accent focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-20 hover:scale-110 transition-transform text-portfolio-accent focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                idx === currentIndex ? "bg-portfolio-accent" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === currentIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalSlider; 