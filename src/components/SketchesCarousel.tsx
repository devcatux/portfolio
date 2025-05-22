import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface SketchesCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

const SketchesCarousel: React.FC<SketchesCarouselProps> = ({ 
  images,
  className = ""
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

  return (
    <div className={`reveal-animation my-8 ${className}`}>
      <div className="relative">
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer p-2">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="rounded-lg shadow-xl w-full object-contain max-h-[600px]"
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
    </div>
  );
};

export default SketchesCarousel; 