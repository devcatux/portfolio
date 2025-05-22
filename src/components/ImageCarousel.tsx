import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ImageCarouselProps {
  images: string[];
  title?: string;
  subtitle?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  title, 
  subtitle 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  
  const onThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    api?.scrollTo(index);
  };

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
    <section className="py-16 bg-gradient-to-br from-white to-[#F0EEF9]">
      <div className="case-study-container">
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-portfolio-accent mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative py-4">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="group overflow-hidden rounded-md bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                        <AspectRatio ratio={4/3} className="overflow-hidden">
                          <img
                            src={image}
                            alt={`Design preview ${index + 1}`}
                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          />
                        </AspectRatio>
                        <div className="p-3 text-center">
                          <p className="text-sm text-gray-500">
                            Screen {index + 1}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl w-[95vw] h-auto p-1 bg-transparent border-none shadow-2xl">
                      <img
                        src={image}
                        alt={`Design preview ${index + 1} enlarged`}
                        className="w-full h-auto object-contain rounded-md"
                      />
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-0 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${
                index === currentIndex ? "bg-portfolio-accent" : "bg-gray-300"
              }`}
              onClick={() => onThumbnailClick(index)}
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
                  onClick={() => onThumbnailClick(index)}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1 ${
                    index === currentIndex ? "opacity-100" : "opacity-0 hover:opacity-100"
                  } transition-opacity`}>
                    <span className="text-[9px] text-white font-medium line-clamp-1 w-full text-center">
                      Screen {index + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
