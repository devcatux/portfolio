import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";

interface BeforeAfterImage {
  before: {
    src: string;
    alt: string;
  };
  after: {
    src: string;
    alt: string;
  };
  caption?: string;
}

interface BeforeAfterCarouselProps {
  title: string;
  subtitle?: string;
  images: BeforeAfterImage[];
}

const BeforeAfterCarousel = ({ title, subtitle, images }: BeforeAfterCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="case-study-container">
        <div className="reveal-animation">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
          )}
        </div>

        <div className="relative mt-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before Image */}
            <div className="reveal-animation relative">
              <div className="absolute top-4 left-4 bg-gray-900/80 text-white text-sm font-medium px-3 py-1 rounded-full z-10">
                Before
              </div>
              <LazyImage 
                src={images[currentIndex].before.src} 
                alt={images[currentIndex].before.alt}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg" 
              />
            </div>
            
            {/* After Image */}
            <div className="reveal-animation-right relative">
              <div className="absolute top-4 left-4 bg-portfolio-accent text-white text-sm font-medium px-3 py-1 rounded-full z-10">
                After
              </div>
              <LazyImage 
                src={images[currentIndex].after.src} 
                alt={images[currentIndex].after.alt}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg" 
              />
            </div>
          </div>

          {/* Caption */}
          {images[currentIndex].caption && (
            <div className="text-center mt-6 text-gray-700 italic">
              {images[currentIndex].caption}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              onClick={handlePrevious}
              variant="outline"
              className="rounded-full h-12 w-12 p-0 flex items-center justify-center border-gray-300 hover:bg-portfolio-accent hover:text-white hover:border-portfolio-accent"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-portfolio-accent" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <Button 
              onClick={handleNext}
              variant="outline"
              className="rounded-full h-12 w-12 p-0 flex items-center justify-center border-gray-300 hover:bg-portfolio-accent hover:text-white hover:border-portfolio-accent"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterCarousel; 