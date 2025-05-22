import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface PersonaCarouselSectionProps {
  images: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
  title?: string;
  subtitle?: string;
  className?: string;
  alignment?: 'center' | 'left';
}

const PersonaCarouselSection: React.FC<PersonaCarouselSectionProps> = ({ 
  images, 
  title = "User Personas",
  subtitle = "Comprehensive profiles of our target users with their goals, pain points, and motivations",
  className = "",
  alignment = "center"
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
      <div className={`${alignment === 'center' ? 'text-center' : 'text-left'} mb-8`}>
        <h2 className="text-3xl font-bold text-portfolio-blue mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className={`text-gray-600 ${alignment === 'center' ? 'max-w-2xl mx-auto' : 'max-w-full'}`}>
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
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
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

export default PersonaCarouselSection; 