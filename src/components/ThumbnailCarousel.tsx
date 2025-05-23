import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";

const ThumbnailCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const title = "Final Designs";
  const subtitle = "A showcase of polished, production-ready screens.";

  const images = [
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

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Large Image */}
          <div className="lg:col-span-2 reveal-animation">
            <div className="relative">
              <LazyImage
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-[500px] object-cover rounded-lg shadow-lg transition-all duration-500 ease-in-out"
              />

              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="rounded-full h-12 w-12 p-0 flex items-center justify-center bg-white/90 hover:bg-portfolio-accent hover:text-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={handleNext}
                  variant="outline"
                  className="rounded-full h-12 w-12 p-0 flex items-center justify-center bg-white/90 hover:bg-portfolio-accent hover:text-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Caption (optional) */}
            {images[currentIndex].caption && (
              <div className="text-center mt-4 text-gray-700 italic">
                {images[currentIndex].caption}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="reveal-animation-right">
            <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
                    index === currentIndex
                      ? "ring-2 ring-portfolio-accent shadow-lg transform scale-105"
                      : "hover:shadow-md hover:transform hover:scale-102 opacity-80 hover:opacity-100"
                  }`}
                >
                  <LazyImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-24 object-cover transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-portfolio-accent"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
