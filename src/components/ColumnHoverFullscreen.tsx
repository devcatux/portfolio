import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Image {
  src: string;
  alt: string;
}

interface ColumnHoverFullscreenProps {
  images: Image[];
  className?: string;
}

export const ColumnHoverFullscreen: React.FC<ColumnHoverFullscreenProps> = ({
  images,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={`${className} w-full`}>
      {/* Main Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-64 overflow-hidden rounded-[4px] group cursor-pointer bg-gray-100"
            onClick={() => {
              setCurrentIndex(index);
              setFullscreenOpen(true);
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover text overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="font-['Montserrat'] text-white text-lg font-bold transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                {image.alt}
              </h3>

              {/* Fullscreen button */}
              <button
                className="mt-2 bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1 w-fit transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 delay-100 hover:bg-white/30"
              >
                <Expand size={14} />
                <span className="text-sm">View</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 bg-gray-800/90 border-gray-700 shadow-2xl flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Main image */}
            <img
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt}
              className="max-h-full max-w-full object-contain"
              // Removed p-4 padding to maximize visible area
            />

            {/* Close button */}
            <button
              onClick={() => setFullscreenOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-50"
            >
              <X size={24} />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-40"
            >
              <ArrowLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-40"
            >
              <ArrowRight size={24} />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ColumnHoverFullscreen;
