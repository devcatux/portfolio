import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface CarouselResearchProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

const CarouselResearch: React.FC<CarouselResearchProps> = ({
  images,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getShortTitle = (alt: string) => {
    const words = alt.split(" ");
    return words.length <= 3 ? alt : words.slice(0, 2).join(" ");
  };

  return (
    <div className={`reveal-animation ${className}`}>
      {/* Main image with dialog (fullscreen) */}
      <Dialog>
  <DialogTrigger asChild>
    <div className="flex items-center justify-center h-[400px] w-full bg-white rounded-xl shadow-xl">
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  </DialogTrigger>
  <DialogContent className="max-w-5xl w-[95vw] h-auto p-1 bg-transparent border-none shadow-2xl">
    <img
      src={images[currentIndex].src}
      alt={images[currentIndex].alt}
      className="w-full h-auto object-contain rounded-md"
    />
  </DialogContent>
</Dialog>


      {/* Two mini thumbnails */}
      <div className="flex justify-center mt-4 gap-4">
        {images.slice(0, 2).map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative h-16 w-24 rounded-md overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? "border-2 border-portfolio-accent scale-110 shadow-md"
                : "border border-gray-200 hover:border-portfolio-accent/50 hover:scale-105"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1 ${
                index === currentIndex
                  ? "opacity-100"
                  : "opacity-0 hover:opacity-100"
              } transition-opacity`}
            >
              <span className="text-[9px] text-white font-medium line-clamp-1 w-full text-center">
                {getShortTitle(image.alt)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarouselResearch;
