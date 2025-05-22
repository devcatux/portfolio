import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface SimpleCarouselProps {
  images: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({ 
  images, 
  title,
  subtitle,
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
    <div className={`my-16 ${className}`}>
      <div className="text-center mb-8">
        {title && (
          <h2 className="text-3xl font-bold text-portfolio-blue mb-4">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative py-4">
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 px-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                      <AspectRatio ratio={4/3} className="overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                        />
                      </AspectRatio>
                      <div className="p-6">
                        {image.title && (
                          <h4 className="text-xl font-semibold mb-2 text-portfolio-blue">{image.title}</h4>
                        )}
                        {image.description && (
                          <p className="text-gray-700">{image.description}</p>
                        )}
                      </div>
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

export default SimpleCarousel; 