import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PersonaCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const slides = [
    {
      title: "User Personas",
      text: "These three user groups experience distinct problems stemming from the same root cause, highlighting different perspectives on a common challenge.",
      image: "/images/bba/personas.png",
    },
    {
      title: "User Persona: Employer",
      text: "Pain point: Hiring costs.",
      image: "/images/bba/employer.png",
    },
    {
      title: "User Persona: Employee",
      text: "Pain point: Lack of transparency.",
      image: "/images/bba/employee.png",
    },
    {
      title: "User Persona: Freelancer",
      text: "Pain point: Freelancers struggle with admin tasks.",
      image: "/images/bba/freelancer.png",
    },
  ];
  

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const percent =
      (container.scrollLeft / (container.scrollWidth - container.clientWidth)) *
      100;
    setScrollPercent(percent);
  };

  const scrollTo = (direction: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slideWidth = container.offsetWidth;
    container.scrollBy({ left: direction * slideWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="relative w-full my-16">
      <div className="bg-gray-50 rounded-[4px] overflow-hidden">
        {/* Top progress bar */}
        <div className="bg-white border-b-2 border-gray-200 p-4 flex items-center justify-between">
          <div className="text-xl font-black uppercase">User Personas</div>
          <div className="w-36 h-2 bg-gray-200 rounded-[4px] overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-200"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>
        </div>

        {/* Horizontal slides */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth h-[480px] scrollbar-hide"
        >
          {slides.map((slide, index) => {
            if (index === 0) {
              // Slide 1: Overview slide
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-full snap-center bg-white border-r-2 border-gray-300 last:border-r-0 relative"
                >
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-[4px] text-sm z-10">
                    {index + 1} / {slides.length}
                  </div>

                  <div className="h-full p-8 pt-16 flex items-center gap-8">
                    {/* Left side: image */}
                    <div className="w-1/3 flex items-center justify-center">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-auto max-h-[400px] object-contain"
                      />
                    </div>

                    {/* Right side: title, description */}
                    <div className="w-2/3 flex flex-col justify-center space-y-6">
                      <h2 className="text-3xl font-bold text-black leading-tight">
                        {slide.title}
                      </h2>
                      <div className="w-12 h-1 bg-black rounded-[4px]"></div>
                      <p className="text-gray-700 leading-relaxed">{slide.text}</p>

                      <div className="grid grid-cols-3 gap-8 mt-4">
                        {/* Hardcoded personas overview */}
                        <div className="flex flex-col items-center text-center space-y-3 border border-gray-200 p-4 rounded-[4px] shadow-sm">
                          <h3 className="text-lg font-semibold text-black">Employer</h3>
                          <p className="text-sm text-gray-600">Struggling with high hiring costs</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-3 border border-gray-200 p-4 rounded-[4px] shadow-sm">
                          <h3 className="text-lg font-semibold text-black">Employee</h3>
                          <p className="text-sm text-gray-600">Facing lack of transparency</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-3 border border-gray-200 p-4 rounded-[4px] shadow-sm">
                          <h3 className="text-lg font-semibold text-black">Freelancer</h3>
                          <p className="text-sm text-gray-600">Overwhelmed with admin tasks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // For other slides (1, 2, 3): left 25% text, right 75% image
            return (
              <div
                key={index}
                className="flex-shrink-0 w-full snap-center bg-white border-r-2 border-gray-300 last:border-r-0 relative"
              >
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-[4px] text-sm z-10">
                  {index + 1} / {slides.length}
                </div>

                <div className="h-full p-8 pt-16 flex items-center gap-8">
                  {/* Left side: title + brief text */}
                  <div className="w-1/4 flex flex-col justify-center space-y-4">
                    <h2 className="text-3xl font-bold text-black leading-tight">
                      {slide.title}
                    </h2>
                    <div className="w-12 h-1 bg-black rounded-[4px]"></div>
                    <p className="text-gray-700 leading-relaxed">{slide.text}</p>
                  </div>

                  {/* Right side: image 75% width */}
                  <div className="w-3/4 bg-white">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-auto max-h-[400px] object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="bg-white border-t-2 border-gray-200 p-4 flex justify-start space-x-4">
          <button
            onClick={() => scrollTo(-1)}
            className="w-12 h-12 rounded-full bg-white/80 border-gray-300 border-2 hover:bg-accent/60 flex items-center justify-center shadow-md transition-all hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scrollTo(1)}
            className="w-12 h-12 rounded-full bg-white/80 border-gray-300 border-2 hover:bg-accent/60 flex items-center justify-center shadow-md transition-all hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonaCarousel;
