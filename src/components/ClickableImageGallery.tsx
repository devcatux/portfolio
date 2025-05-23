import { useState, useEffect, useRef } from "react";

const ClickableImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const images = [
    "/images/bba/timekeeping/01.png",
    "/images/bba/timekeeping/02.png",
    "/images/bba/timekeeping/03.png",
    "/images/bba/timekeeping/04.png",
    "/images/bba/timekeeping/05.png",
    "/images/bba/timekeeping/06.png",
    "/images/bba/timekeeping/07.png",

  ];

  // Use a ref to hold the interval id so we can clear it easily
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, images.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true); // Pause slideshow when user clicks
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="relative max-w-xs mx-auto">
      <img
        src={images[currentIndex]}
        alt={`Timekeeping interface screen ${currentIndex + 1}`}
        className="w-full rounded-3xl transition-opacity duration-300"
      />
      <div className="absolute -bottom-4 -right-4 h-24 w-2/3 rounded-md -z-10"></div>

      {/* Image counter indicator with wider active dot */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to image ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
              idx === currentIndex
                ? "bg-portfolio-accent w-6"
                : "bg-gray-300 w-2 hover:bg-portfolio-accent"
            }`}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ClickableImageGallery;
