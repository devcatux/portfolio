import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FullWidthScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const slides = [
    {
      title: "Addressing pain points",
      text: "As a user, I want to be able to apply for jobs that I really want and not settle for less. I want to be able to make an offer to the employer and not have to accept the jobs below the market rate.",
      image: "/images/bba/problem.png",
    },
    {
      title: "How Might We Questions",
      text: "To guide the design process, we framed How Might We (HMW) questions based on the key research pain points.",
      image: "/images/bba/employee make an offer.png",
    },
    {
      title: "Make an Offer",
      text: "Employees are encouraged to proactively negotiate job offers.",
      image: "/images/bba/employee make an offer.png",
    },
    {
      title: "Salary Negotiations",
      text: "Employers can counter-offer, facilitating faster hiring.",
      image: "/images/bba/employer offer received.png",
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
          <div className="text-xl font-black uppercase">Empowering jobseekers</div>
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
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full snap-center bg-white border-r-2 border-gray-300 last:border-r-0 relative"
            >
              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-[4px] text-sm z-10">
                {index + 1} / {slides.length}
              </div>

              <div className="h-full p-8 pt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center space-y-6">
                  <h2 className="text-4xl font-bold text-black leading-tight">
                    {slide.title}
                  </h2>
                  <div className="w-20 h-1 bg-black rounded-[4px]"></div>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 border-l-4 border-accent/60 rounded-[4px] italic">
                    {slide.text}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <div className="bg-white shadow-md">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-auto max-h-[320px] object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default FullWidthScroll; 