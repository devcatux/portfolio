import React, { useRef, useEffect, useState } from 'react';

interface DesignProcessScrollerProps {
  images: string[];
  title?: string;
  subtitle?: string;
}

const DesignProcessScroller: React.FC<DesignProcessScrollerProps> = ({ images, title, subtitle }) => {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (scrollTrackRef.current) {
        // Calculate the position based on time
        const translateX = -(progress * 0.000625) % 100; // Reduced from 0.00125 to 0.000625 (1/2 speed)
        scrollTrackRef.current.style.transform = `translateX(${translateX}%)`;
      }

      if (isVisible) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isVisible) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible]);

  // Duplicate images multiple times to ensure smooth infinite scroll
  const duplicatedImages = [...images, ...images, ...images, ...images];

  return (
    <div className="w-full overflow-hidden" ref={containerRef}>
      {title && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      <div className="scrolling-images-container">
        <div 
          ref={scrollTrackRef}
          className="scrolling-images-track flex gap-4"
        >
          {duplicatedImages.map((image, index) => (
            <div key={index} className="scrolling-image flex-shrink-0">
              <img 
                src={image} 
                alt={`Design process ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignProcessScroller; 