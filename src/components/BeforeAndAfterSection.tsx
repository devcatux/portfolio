import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BeforeAndAfterSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const slides = [
    {
      label: "Usability Testing",
      title: "Listening to The Users",
      textIntro: `I ran three cycles of moderated and unmoderated testing with 25 stakeholders, refining flows to reduce friction and improve task completion rates.

Moderated usability tests: In-person and online sessions helped me evaluate job posting, application processes, and contract negotiation.

Unmoderated usability tests: Simplified invoicing for freelancers and employers needed quick access to hire temporary workers. Users preferred simplified job search filters, which made applications faster.`,
      image: "/images/bba/befandaft/testing.png",
    },
    {
      title: "Improved Task Completion Rate",
      text: "This small change in the job reposting flow increased task completion rates, making a big difference in user satisfaction and efficiency.",
      image: "/images/bba/befandaft/repost.png",
    },
    {
      title: "Chat for Faster Onboarding",
      text: "Users appreciated the option to directly message employers or employees, speeding up hiring and making communication easier.",
      image: "/images/bba/befandaft/profile-company.png",
    },
    {
      title: "Flexibility in Contracts",
      text: "Users preferred having full control over the types of contracts they engaged with, valuing flexibility and personalization.",
      image: "/images/bba/befandaft/remTemp.png",
    },
    {
      title: "Supporting Full-time Freelancers",
      text: "Version one did not consider freelancers, this change ensured personalization based on contract types.",
      image: "/images/bba/befandaft/tempRate.png",
    },
    {
      title: "Testing Insights",
      text: `I focused on reducing friction and emotional frustration by actively listening to users, asking the right questions, and implementing changes.
I didn’t want to build shelfware—I wanted a tool that felt intuitive from the start. The result is a product that works out of the box, regardless of a user’s tech skill level.`,
      image: "/images/bba/befandaft/test-last.png",
    },
  ];

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const percent =
      (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
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
        {/* Top bar with progress */}
        <div className="bg-white border-b-2 border-gray-200 p-4 flex items-center justify-between">
          <div className="text-xl font-black uppercase">Before and After</div>
          <div className="w-36 h-2 bg-gray-200 rounded-[4px] overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-200"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>
        </div>

        {/* Scrollable slide container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth h-[700px] max-h-[700px] scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {slides.map((slide, index) => {
            const isFirst = index === 0;
            const isLast = index === slides.length - 1;

            return (
              <div
                key={index}
                className="flex-shrink-0 w-full snap-center bg-white border-r-2 border-gray-300 last:border-r-0 relative h-full"
              >
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-[4px] text-sm z-10">
                  {isFirst ? slide.label : `${index + 1} / ${slides.length}`}
                </div>

                <div className={`h-full ${isFirst || isLast ? 'grid grid-cols-1 md:grid-cols-2' : 'flex'} gap-8 p-8 pt-16`}>
                  {/* Left content */}
                  <div className="flex flex-col justify-center space-y-6 w-full h-full">
                    <h2 className="text-4xl font-bold text-black leading-tight">
                      {slide.title}
                    </h2>
                    <div className="w-20 h-1 bg-black rounded-[4px]"></div>
                    <p className={`text-gray-700 leading-relaxed ${isFirst ? 'whitespace-pre-line' : ''}`}>
                      {isFirst ? slide.textIntro : slide.text}
                    </p>
                  </div>

                  {/* Right image */}
                  <div className="flex items-center justify-center h-full w-full overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="max-h-[600px] max-w-full object-contain"
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

export default BeforeAndAfterSection;
