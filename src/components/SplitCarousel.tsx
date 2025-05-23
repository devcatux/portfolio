import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";

const SplitCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        <h2 className="text-3xl font-bold mb-4">Final Designs</h2>
        <p className="text-xl text-gray-600 mb-8">
          A showcase of polished, production-ready screens.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <LazyImage
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-[500px] object-cover rounded-lg shadow-lg transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="rounded-full h-12 w-12 bg-white/90 hover:bg-portfolio-accent hover:text-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={handleNext}
                  variant="outline"
                  className="rounded-full h-12 w-12 bg-white/90 hover:bg-portfolio-accent hover:text-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
            <div className="text-center mt-4 text-gray-700 italic">
              {images[currentIndex].alt}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative cursor-pointer transition-all duration-500 ease-in-out rounded-lg overflow-hidden ${
                  index === currentIndex
                    ? "ring-2 ring-portfolio-accent shadow-lg transform scale-105"
                    : "hover:shadow-md hover:transform hover:scale-102 opacity-80 hover:opacity-100"
                }`}
              >
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center mt-8 gap-4 lg:hidden">
          <Button onClick={handlePrevious} variant="outline" className="rounded-full h-12 w-12">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button onClick={handleNext} variant="outline" className="rounded-full h-12 w-12">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplitCarousel;
