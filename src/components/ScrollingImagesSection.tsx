import React, { useEffect, useRef, useState } from "react";

interface ScrollingImagesSectionProps {
  title: string;
  subtitle?: string;
  images: string[];
  className?: string;
}

const ScrollingImagesSection: React.FC<ScrollingImagesSectionProps> = ({
  title,
  subtitle,
  images,
  className
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        const scrollOffset = window.innerHeight - top;
        
        if (scrollOffset > 0 && top < window.innerHeight) {
          // Calculate a value between 0 and 1 based on how much of the section is visible
          const scrollProgress = Math.min(1, scrollOffset / (window.innerHeight + sectionRef.current.offsetHeight));
          setScrollPosition(scrollProgress * 100);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateX = `-${scrollPosition * 0.4}%`; // Reduced multiplier for smoother scrolling

  return (
    <section ref={sectionRef} className="py-32 overflow-hidden bg-gray-50 ux-process-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-portfolio-blue mb-6">{title}</h2>
          {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      </div>
      
      <div className="scrolling-images-container my-12 max-w-[90%] mx-auto">
        <div 
          className="scrolling-images-track"
          style={{ 
            transform: `translateX(${translateX})`,
            width: `${images.length * 40}%` // Makes the track narrower for better sizing
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="scrolling-image w-[342px]">
              <img
                src={image}
                alt={`Project image ${index + 1}`}
                className={`rounded-lg shadow-lg w-full object-cover ${className || 'h-64 md:h-72'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollingImagesSection;
