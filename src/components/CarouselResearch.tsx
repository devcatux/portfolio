import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface CarouselResearchProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
  height?: string;
}

const CarouselResearch: React.FC<CarouselResearchProps> = ({ 
  images,
  className = "",
  height = "h-[400px]"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  const onSlideChange = React.useCallback(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    
    api.on('select', onSlideChange);
    // Initialize the current index
    setCurrentIndex(api.selectedScrollSnap());
    
    return () => {
      api.off('select', onSlideChange);
    };
  }, [api, onSlideChange]);

  // Function to extract title from alt text
  const getShortTitle = (alt: string) => {
    // Extract a short title from alt text
    const words = alt.split(' ');
    if (words.length <= 3) return alt;
    return words.slice(0, 2).join(' ');
  };

  return (
    <div className={`reveal-animation ${className}`}>
      <div className={`w-full ${height}`}>
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full h-full"
          setApi={setApi}
        >
          <CarouselContent className="h-full">
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-full h-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer h-full">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="rounded-xl shadow-xl w-full object-cover h-full"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl w-[95vw] h-auto p-1 bg-transparent border-none shadow-2xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-contain rounded-md"
                    />
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white/80 hover:bg-white shadow-md" />
          <CarouselNext className="right-0 bg-white/80 hover:bg-white shadow-md" />
        </Carousel>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-8 rounded-full transition-colors ${
              index === currentIndex ? "bg-portfolio-accent" : "bg-gray-300"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="bg-white/80 rounded-md border border-gray-200 p-4 w-auto">
          <div className="flex justify-center flex-wrap gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative h-16 w-24 rounded-md overflow-hidden shadow-sm transition-all duration-300 ${
                  index === currentIndex 
                    ? "border-2 border-portfolio-accent scale-110 shadow-md" 
                    : "border border-gray-200 hover:border-portfolio-accent/50 hover:scale-105"
                }`}
                onClick={() => api?.scrollTo(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1 ${
                  index === currentIndex ? "opacity-100" : "opacity-0 hover:opacity-100"
                } transition-opacity`}>
                  <span className="text-[9px] text-white font-medium line-clamp-1 w-full text-center">
                    {getShortTitle(image.alt)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselResearch; 