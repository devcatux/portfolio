import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";

interface SliderImage {
  src: string;
  alt: string;
  caption?: string;
  link?: string;
}

interface ImageSliderProps {
  title: string;
  subtitle?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  centeredSlides?: boolean;
}

const ImageSlider = ({ 
  title, 
  subtitle, 
  slidesPerView = 3,
  spaceBetween = 20,
  loop = true,
  centeredSlides = false
}: ImageSliderProps) => {
  // Hardcoded images inside the component
  const images: SliderImage[] = [
    { src: "/images/bba/browseStaff.png", alt: "Browse Staff" },
    { src: "/images/bba/chat.png", alt: "Chat" },
    { src: "/images/bba/companyProfile.png", alt: "Company Profile" },
    { src: "/images/bba/employerDashboard.png", alt: "Employer Dashboard" },
    { src: "/images/bba/employerDashboard2.png", alt: "Employer Dashboard 2" },
    { src: "/images/bba/negotiate.png", alt: "Negotiate" },
    { src: "/images/bba/blog.png", alt: "Blog" },
    { src: "/images/bba/adminPanel.png", alt: "Admin Panel" },
    { src: "/images/bba/jobMarketplace.png", alt: "Job Marketplace" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getResponsiveSlidesPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return slidesPerView;
    }
    return slidesPerView;
  };

  const [responsiveSlidesPerView, setResponsiveSlidesPerView] = useState(getResponsiveSlidesPerView());

  useEffect(() => {
    const handleResize = () => {
      setResponsiveSlidesPerView(getResponsiveSlidesPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesPerView]);

  const maxIndex = Math.max(0, images.length - responsiveSlidesPerView);

  const handlePrevious = () => {
    if (loop && currentIndex === 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const handleNext = () => {
    if (loop && currentIndex >= maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
    }
  };

  const slideWidth = `calc((100% - ${(responsiveSlidesPerView - 1) * spaceBetween}px) / ${responsiveSlidesPerView})`;

  return (
    <div className="py-16 bg-gray-50">
      <div className="case-study-container">
        <div className="reveal-animation">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
          )}
        </div>

        <div 
          className="relative mt-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden rounded-lg">
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / responsiveSlidesPerView + (spaceBetween / responsiveSlidesPerView))}%)`,
                gap: `${spaceBetween}px`
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 group cursor-pointer"
                  style={{ width: slideWidth }}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <LazyImage 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {image.caption && (
                          <p className="text-sm font-medium px-4">{image.caption}</p>
                        )}
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button 
              onClick={handlePrevious}
              variant="outline"
              disabled={!loop && currentIndex === 0}
              className="rounded-full h-12 w-12 p-0 flex items-center justify-center bg-white/90 hover:bg-portfolio-accent hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              onClick={handleNext}
              variant="outline"
              disabled={!loop && currentIndex >= maxIndex}
              className="rounded-full h-12 w-12 p-0 flex items-center justify-center bg-white/90 hover:bg-portfolio-accent hover:text-white disabled:opacity-50"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
            {currentIndex + 1} / {Math.ceil(images.length / responsiveSlidesPerView)}
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-portfolio-accent" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide group ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <div className="inline-flex items-center gap-4 bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="md:hidden">Mobile: 1 slide</span>
            <span className="hidden md:block lg:hidden">Tablet: 2 slides</span>
            <span className="hidden lg:block">Desktop: {slidesPerView} slides</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
