import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BrutalistScrollClean = () => {
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
      hmwQuestions: [
        "HMW promote fair and transparent wages aligned with industry standards?",
        "HMW make the job search process more accessible and user-friendly?",
        "HMW empower employees to confidently negotiate their salaries?",
        "HMW improve job satisfaction and long-term retention in the workforce?",
        "HMW help freelancers manage clients and schedules more effectively?",
        "HMW foster better communication between employers and candidates?",
        "HMW create a platform that ensures equitable access to job opportunities?",
      ],
      image: "/images/bba/employee make an offer.png",
    },
    {
      title: "Employee Making an Offer",
      text: "User flows empower employees to proactively negotiate job offers.",
      image: "/images/bba/employee make an offer.png",
    },
    {
      title: "Employer Received an Offer",
      text: "Employers can receive and review offers, facilitating smooth hiring.",
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
          {slides.map((slide, index) => {
            if (index === 2 || index === 3) {
              // Slide 3 and 4 layout: left 25% text, right 75% image
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
                    <div className="w-3/4 bg-white shadow-[6px_6px_0px_0px_rgba(115,105,175,1)]">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-auto max-h-[400px] object-contain"
                      />
                    </div>
                  </div>
                </div>
              );
            }

            if (index === 1) {
              // Slide 2: no image, split left text (title + intro), right box with HMW questions and accent decoration
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-full snap-center bg-white border-r-2 border-gray-300 last:border-r-0 relative"
                >
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-[4px] text-sm z-10">
                    {index + 1} / {slides.length}
                  </div>

                  <div className="h-full p-8 pt-16 flex items-center gap-8">
                    {/* Left side: title + intro paragraphs */}
                    <div className="w-1/4 flex flex-col justify-center space-y-6">
                      <h2 className="text-3xl font-bold text-black leading-tight">{slide.title}</h2>
                      <div className="w-12 h-1 bg-black rounded-[4px]"></div>
                      <p>
                        To guide the design process, we framed How Might We (HMW) questions based on the key research pain points.
                      </p>
                      <p>
                        These questions help us focus on creating solutions that address user needs and improve overall experience.
                      </p>
                    </div>

                    {/* Right side: HMW questions box with accent decoration */}
                    <div className="w-3/4 bg-white p-8 shadow-[6px_6px_0px_0px_rgba(115,105,175,1)] border-2 border-gray-200 rounded-[4px] max-h-[400px] overflow-y-auto">
                      <ul className="list-disc list-inside space-y-3 text-gray-700">
                        {slide.hmwQuestions?.map((question, i) => (
                          <li key={i}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }

            // Slide 0 (default layout) - simplified quote with left border only
            return (
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

                    <p
  className="relative text-gray-700 leading-relaxed bg-gray-50 p-6 border-l-4 border-accent/60 rounded-[4px] italic
             before:absolute before:top-0 before:left-2 before:text-8xl before:text-gray-300 before:font-serif before:content-['“']"
  style={{ paddingLeft: "3.5rem" }} // increase left padding to make space for quote
>
  {slide.text}
</p>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="bg-white shadow-[6px_6px_0px_0px_rgba(115,105,175,1)]">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-auto max-h-[320px] object-contain"
                      />
                    </div>
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

export default BrutalistScrollClean;
