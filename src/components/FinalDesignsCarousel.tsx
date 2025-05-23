import React, { useState, useEffect, useCallback } from "react";
import { 
  Carousel, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface FinalDesignsCarouselProps {
  images: string[];
  title?: string;
  subtitle?: string;
}

const FinalDesignsCarousel: React.FC<FinalDesignsCarouselProps> = ({ 
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

  const onSlideChange = useCallback(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    api.on('select', onSlideChange);
    setCurrentIndex(api.selectedScrollSnap());

    return () => {
      api.off('select', onSlideChange);
    };
  }, [api, onSlideChange]);

  const getTitleFromPath = (path: string) => {
    const filename = path.split('/').pop()?.split('.')[0] || '';
    return filename
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

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

        <div className="relative">
          {/* Carousel wrapper with previous/next buttons */}
          <Carousel
            opts={{ align: "start" }}
            className="w-full relative"
            setApi={setApi}
          >
            {/* Horizontal scroll with grid-like layout */}
            <ScrollArea className="w-full overflow-x-auto no-scrollbar py-4">
              <div className="flex gap-4 px-2">
                {images.map((image, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div
                        className={`group rounded-md bg-white shadow-lg cursor-pointer transform transition-all duration-300
                          hover:scale-105 hover:shadow-xl
                          ${currentIndex === index ? "scale-110 shadow-2xl border-2 border-portfolio-accent" : "border border-gray-200"}`}
                        onClick={() => onThumbnailClick(index)}
                        style={{ minWidth: "240px" }}
                      >
                        <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-md">
                          <img
                            src={image}
                            alt={`${getTitleFromPath(image)} screen`}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                          />
                        </AspectRatio>
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium text-portfolio-blue truncate">
                            {getTitleFromPath(image)}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl w-[95vw] p-1 bg-transparent border-none shadow-2xl rounded-md">
                      <img
                        src={image}
                        alt={`${getTitleFromPath(image)} enlarged`}
                        className="w-full h-auto object-contain rounded-md"
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </ScrollArea>

            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10" />
          </Carousel>
        </div>

        {/* Navigation dots */}
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
      </div>
    </section>
  );
};

export default FinalDesignsCarousel;
