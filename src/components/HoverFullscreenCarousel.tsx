import { useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HoverFullscreenProps {
  images: string[];
  textData?: Array<{
    title?: string;
    description?: string;
  }>;
}

export const HoverFullscreen = ({ images, textData }: HoverFullscreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Get title and description for the current index, defaulting to empty strings if not provided
  const getTitle = (index: number) => {
    return textData && textData[index]?.title ? textData[index].title : `Slide ${index + 1}`;
  };

  const getDescription = (index: number) => {
    return textData && textData[index]?.description ? textData[index].description : '';
  };
  
  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Main Carousel */}
      <div className="relative h-[350px] overflow-hidden rounded-[4px] cursor-pointer bg-gray-800" onClick={() => setFullscreenOpen(true)}>
        <div 
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative group">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Hover text overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="font-['Montserrat'] text-white text-2xl font-bold transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  {getTitle(index)}
                </h3>
                {getDescription(index) && (
                  <p className="font-['Inter'] text-white/90 mt-2 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {getDescription(index)}
                  </p>
                )}
                
                {/* Fullscreen button */}
                <button
                  className="mt-4 bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 w-fit transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 delay-100 hover:bg-white/30"
                >
                  <Expand size={16} />
                  <span>View Fullscreen</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-black/70 transition-all hover:bg-white/60"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
        >
          <ArrowLeft size={18} />
        </button>
        
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-black/70 transition-all hover:bg-white/60"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
        >
          <ArrowRight size={18} />
        </button>
        
        {/* Bottom indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Fullscreen Modal */}
      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 rounded-[4px] border-0 bg-gray-800/90">
          <div className="relative w-full h-[90vh]">
            <img 
              src={images[currentIndex]} 
              alt={`Fullscreen ${currentIndex + 1}`} 
              className="w-full h-full object-contain"
            />
            
            {/* Fullscreen text overlay - only show if we have text data */}
            {textData && textData[currentIndex] && (textData[currentIndex].title || textData[currentIndex].description) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-10">
                {textData[currentIndex].title && (
                  <h2 className="font-['Montserrat'] text-white text-3xl font-bold mb-2">
                    {textData[currentIndex].title}
                  </h2>
                )}
                {textData[currentIndex].description && (
                  <p className="font-['Inter'] text-white/90 text-lg max-w-2xl">
                    {textData[currentIndex].description}
                  </p>
                )}
              </div>
            )}
            
            <button
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all"
              onClick={() => setFullscreenOpen(false)}
            >
              <X size={20} />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-white transition-all hover:bg-black/60"
              onClick={prevSlide}
            >
              <ArrowLeft size={24} />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-white transition-all hover:bg-black/60"
              onClick={nextSlide}
            >
              <ArrowRight size={24} />
            </button>

            {/* Current slide indicator */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 text-white rounded-full text-sm">
              {currentIndex + 1}/{images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
