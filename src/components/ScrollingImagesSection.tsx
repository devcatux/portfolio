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
  className,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    if (containerRef.current && trackRef.current) {
      setMaxScroll(trackRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, [images]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && containerRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        const scrollOffset = window.innerHeight - top;

        if (scrollOffset > 0 && top < window.innerHeight) {
          const scrollProgress = Math.min(
            1,
            scrollOffset / (window.innerHeight + sectionRef.current.offsetHeight)
          );
          setScrollPosition(scrollProgress);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateX = `-${scrollPosition * maxScroll}px`;

  return (
    <section
      ref={sectionRef}
      className="py-32 overflow-hidden bg-gray- ux-process-section"
    >
      <div className="container mx-auto px-4">
        <div className="text-start mb-16">
          <h2 className="text-4xl font-bold text-portfolio-blue mb-6">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 max-w-2xl text-start">{subtitle}</p>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className="scrolling-images-container my-12 mx-auto overflow-hidden"
      >
        <div
          ref={trackRef}
          className="scrolling-images-track flex"
          style={{
            transform: `translateX(${translateX})`,
            transition: "transform 0.1s linear", // optional smooth transition
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="scrolling-image"
              style={{ height: "368px", marginRight: "16px", flexShrink: 0 }}
            >
              <img
                src={image}
                alt={`Project image ${index + 1}`}
                className={`rounded-lg shadow-lg h-full w-auto ${className || ""}`}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollingImagesSection;
