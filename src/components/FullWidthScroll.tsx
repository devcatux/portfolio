import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FullWidthScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollSlide = (direction: number) => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    container.scrollBy({ left: direction * width, behavior: "smooth" });
  };

  const slides = [
    {
      title: "Understanding the Problem",
      text: "Based on the research findings, I framed How Might We (HMW) questions to guide my design process and create user flows that solve real problems",
      image: "/images/bba/problem.png",

    },
    {
      title: "How Might We Questions",
      text: "HMW promote fair and transparent wages aligned with industry standards? HMW make the job search process more accessible and user-friend HMW empower employees to confidently negotiate their salari HMW improve job satisfaction and long-term retention in the workfor HMW help freelancers manage clients and schedules more effective HMW foster better communication between employers and candidat HMW create a platform that ensures equitable access to job opportunities?",
      image: "/images/bba/employee make an offer.png",
    },
    {
      title: "Make an offer",
      text: "More user-friendly job applications I created user flows for the Make an Offer feature, designed to empower both employees and employers by enabling direct negotiation.. This approach not only reduces hiring friction but also promotes long-term retention, enabling better alignment between job expectations and working conditions.",
      image: "images/bba/employer offer received.png",
    },
    {
        title: "Proposed Solution",
        text: "Employees are no longer restricted to applying for jobs they are not 100% satisfied with. Instead, they can proactively tailor their job offers, ensuring a better fit for both parties. This shift from a passive to an active job-seeking approach gives candidates greater control over their career choices.",
        image: "images/bba/employer offer received.png",
      },
  ];

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden my-16 bg-gray-50 rounded-xl shadow-sm">
      <div
        ref={containerRef}
        className="flex w-full h-full overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {slides.map((slide, index) => (
          <section
            key={index}
            className="flex-shrink-0 w-full h-full flex flex-col justify-center items-center px-8 snap-center"
          >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-portfolio-blue mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl text-gray-700">{slide.text}</p>
              </div>
              <div>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto max-h-[500px] object-contain"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => scrollSlide(-1)}
                className="bg-white p-3 rounded-full shadow hover:bg-gray-100"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={() => scrollSlide(1)}
                className="bg-white p-3 rounded-full shadow hover:bg-gray-100"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FullWidthScroll;
