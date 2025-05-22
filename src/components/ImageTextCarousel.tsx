import React, { useState } from "react";

interface Slide {
  image: { src: string; alt: string };
  title: string;
  subtitle?: string;
  description: string;
}

interface ImageTextCarouselProps {
  slides: Slide[];
  fullscreenBg?: string;
}

const ImageTextCarousel: React.FC<ImageTextCarouselProps> = ({ slides, fullscreenBg = "bg-black/80" }) => {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const goTo = (idx: number) => {
    if (idx === current) return;
    setDirection(idx > current ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  const slide = slides[current];

  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-50 rounded-xl shadow-lg p-6 gap-8 relative overflow-hidden">
      {/* Image with accent */}
      <div className="relative w-full md:w-2/3 max-w-2xl cursor-pointer group transition-all duration-300" onClick={() => setFullscreen(true)}>
        <img
          src={slide.image.src}
          alt={slide.image.alt}
          className={`rounded-xl shadow-xl w-full h-80 md:h-96 object-cover object-center transition-all duration-500 ${animating ? (direction === 'right' ? 'animate-slide-left' : 'animate-slide-right') : ''}`}
        />
        {/* Fullscreen icon overlay */}
        <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7369AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3m8-18h3a2 2 0 0 1 2 2v3m0 8v3a2 2 0 0 1-2 2h-3"/></svg>
        </div>
        <div className="absolute -bottom-4 -right-4 h-20 w-2/3 bg-portfolio-accent rounded-xl -z-10" />
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-2xl font-bold mb-2 text-portfolio-blue">{slide.title}</h3>
        {slide.subtitle && <div className="text-lg font-medium mb-2 text-portfolio-accent">{slide.subtitle}</div>}
        <p className="text-gray-700 text-base md:text-lg">{slide.description}</p>
      </div>
      {/* Navigation */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <button onClick={prev} className="bg-white/80 hover:bg-white rounded-full shadow p-2 transition-all">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <button onClick={next} className="bg-white/80 hover:bg-white rounded-full shadow p-2 transition-all">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
      {/* Lines/bars for navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 w-32">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'bg-portfolio-accent w-8' : 'bg-gray-300 w-4'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      {/* Fullscreen Modal */}
      {fullscreen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${fullscreenBg}`} onClick={() => setFullscreen(false)}>
          <img
            src={slide.image.src}
            alt={slide.image.alt}
            className="max-w-3xl max-h-[90vh] rounded-xl shadow-2xl border-4 border-white"
          />
          <button
            className="absolute top-8 right-8 text-gray-800 text-3xl font-bold bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow"
            onClick={e => { e.stopPropagation(); setFullscreen(false); }}
            aria-label="Close fullscreen"
          >
            &times;
          </button>
        </div>
      )}
      {/* Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .animate-slide-left {
              animation: slideLeft 0.3s;
            }
            .animate-slide-right {
              animation: slideRight 0.3s;
            }
            @keyframes slideLeft {
              0% { opacity: 0; transform: translateX(40px); }
              100% { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideRight {
              0% { opacity: 0; transform: translateX(-40px); }
              100% { opacity: 1; transform: translateX(0); }
            }
          `
        }}
      />
    </div>
  );
};

export default ImageTextCarousel; 