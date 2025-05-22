import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollingImagesSection from "@/components/ScrollingImagesSection";
import ImageCarousel from "@/components/ImageCarousel";
import CarouselResearch from "@/components/CarouselResearch";
import PersonaCarouselSection from "@/components/PersonaCarouselSection";
import SketchesCarousel from "@/components/SketchesCarousel";
import UserFlowsCarousel from "@/components/UserFlowsCarousel";
import FinalDesignsCarousel from "@/components/FinalDesignsCarousel";
import BeforeAfterCarousel from "@/components/BeforeAfterCarousel";
import SimpleCarousel from "@/components/SimpleCarousel";
import ProjectCta from "@/components/ProjectCta";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext 
} from "@/components/ui/carousel";
import DesignProcessScroller from "@/components/DesignProcessScroller";
import ImageTextCarousel from "../components/ImageTextCarousel";
import { SliderCarousel } from "../components/SliderCarousel";
import { HoverFullscreen } from "../components/HoverFullscreenCarousel";
import { ColumnHoverFullscreen } from "../components/ColumnHoverFullscreen";
import FeaturedCarousel from "../components/ui/PersonaGallery";
import FinalDesigns from "../components/ui/FinalDesigns";
import TextImg4 from '@/components/TextImg4'

const UX_STEPS = ["Discover", "Define", "Develop", "Deliver", "Impact"];

// Add a new component for the clickable image gallery
const ClickableImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/images/bba/timekeeping/01.png",
    "/images/bba/timekeeping/02.png",
    "/images/bba/timekeeping/03.png",
    "/images/bba/timekeeping/04.png",
    "/images/bba/timekeeping/05.png",
    "/images/bba/timekeeping/06.png",
    "/images/bba/timekeeping/07.png",
    "/images/bba/timekeeping/08.png"
  ];

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative max-w-xs mx-auto">
      <img 
        src={images[currentIndex]} 
        alt={`Timekeeping interface screen ${currentIndex + 1}`} 
        className="w-full rounded-3xl transition-opacity duration-300"
      />
      <div className="absolute -bottom-4 -right-4 h-24 w-2/3 rounded-md -z-10"></div>
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-110"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-blue">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-110"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-blue">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
      
      {/* Image counter indicator */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-portfolio-accent' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      
      
    </div>
  );
};

// Add a new component for the prototype gallery with its own separate logic
const PrototypeGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/images/bba/prototype_last/01.png",
    "/images/bba/prototype_last/02.png",
    "/images/bba/prototype_last/03.png",
    "/images/bba/prototype_last/04.png",
    "/images/bba/prototype_last/05.png",
    "/images/bba/prototype_last/06.png",
    "/images/bba/prototype_last/07.png",
    "/images/bba/prototype_last/08.png"
  ];

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative max-w-xs mx-auto">
      <img 
        src={images[currentIndex]} 
        alt={`Prototype screen ${currentIndex + 1}`} 
        className="w-full rounded-3xl transition-opacity duration-300"
      />
      <div className="absolute -bottom-4 -right-4 h-24 w-2/3 rounded-md -z-10"></div>
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-110"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-blue">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-110"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-blue">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
      
      {/* Image counter indicator */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-portfolio-accent' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

// New Enhanced Prototype Gallery component with more images
const EnhancedPrototypeGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/images/bba/protoype_last/01.png",
    "/images/bba/protoype_last/02.png",
    "/images/bba/protoype_last/03.png",
    "/images/bba/protoype_last/04.png",
    "/images/bba/protoype_last/05.png",
    "/images/bba/protoype_last/06.png",
    "/images/bba/protoype_last/07.png",
    "/images/bba/protoype_last/08.png",
    "/images/bba/protoype_last/09.png",
    "/images/bba/protoype_last/10.png",
    "/images/bba/protoype_last/11.png",
    "/images/bba/protoype_last/12.png"
  ];

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative max-w-xs mx-auto">
      <img 
        src={images[currentIndex]} 
        alt={`Interactive prototype screen ${currentIndex + 1}`} 
        className="w-full rounded-3xl transition-opacity duration-300"
      />
      <div className="absolute -bottom-4 -right-4 h-24 w-2/3 rounded-md -z-10"></div>
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-110"
        aria-label="Previous prototype image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-blue">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-110"
        aria-label="Next prototype image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-blue">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
      
      {/* Image counter indicator */}
      <div className="absolute -bottom-8 left-0 right-0 flex flex-wrap justify-center gap-1.5 max-w-xs mx-auto">
        {images.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-portfolio-accent' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      
      {/* Current image number indicator */}
      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};

// New custom SketchesSliderCarousel component with enhanced visibility
const SketchesSliderCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const toggleExpand = () => {
    setIsExpanding(!isExpanding);
  };
  
  return (
    <div className="relative max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-portfolio-blue">Wireframe Sketches</h3>
      <div 
        className={`relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer rounded-[4px] bg-gray-900 ${
          isExpanding ? "h-[500px]" : "h-[350px]"
        }`}
        onClick={toggleExpand}
      >
        <div 
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={src}
                alt={`Sketch ${index + 1}`}
                className="w-full h-full object-contain p-4"
              />
              
              {/* Expand indicator */}
              <div className="absolute bottom-4 right-4 bg-black/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-gray-700">
                {isExpanding ? "Click to collapse" : "Click to expand"}
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all border border-white/50 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/30"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows - Made larger and more visible */}
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center text-gray-900 transition-all hover:bg-white/70 border-2 border-white/70"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
      >
        <ArrowLeft size={24} />
      </button>
      
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center text-gray-900 transition-all hover:bg-white/70 border-2 border-white/70"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
      >
        <ArrowRight size={24} />
      </button>
      
      {/* Current slide indicator */}
      <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};

const BlackBooksAir = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isAtCta, setIsAtCta] = useState(false);

  // Section refs for tracking progress
  const overviewRef = useRef<HTMLElement>(null);
  const discoverRef = useRef<HTMLElement>(null);
  const defineRef = useRef<HTMLElement>(null);
  const developRef = useRef<HTMLElement>(null); 
  const deliverRef = useRef<HTMLElement>(null);
  const insightsRef = useRef<HTMLElement>(null);
  const insightsContentRef = useRef<HTMLElement>(null); // Detailed Insights section
  const ctaRef = useRef<HTMLElement>(null); // Reference for the CTA section at the bottom

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
  const handleScroll = () => {
      const scrollTop = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
      setShowProgressBar(scrollTop > 50);
      
      const viewportHeight = window.innerHeight;
      const buffer = viewportHeight * 0.15;
      const viewportMiddle = scrollTop + viewportHeight / 2;

      const getTop = (ref: React.RefObject<HTMLElement>) =>
        ref.current?.getBoundingClientRect().top + scrollTop || 0;

      const discoverPos = getTop(discoverRef);
      const definePos = getTop(defineRef);
      const developPos = getTop(developRef);
      const deliverPos = getTop(deliverRef);
      const insightsPos = getTop(insightsRef);
      const ctaPos = getTop(ctaRef);

      // Check if we're near the bottom of the page or at the CTA section
      const nearBottom = scrollTop + viewportHeight > document.documentElement.scrollHeight - 100;
      const atCta = ctaRef.current && viewportMiddle >= ctaPos - buffer;
      
      setIsNearBottom(nearBottom);
      setIsAtCta(atCta);

      // Determine which section is currently active
      let newStep = 0;
      
      if (nearBottom || atCta) {
        // If near the bottom of the page or at the CTA, always highlight the last step
        newStep = 4; // Insights (last step)
      } else if (viewportMiddle >= insightsPos - buffer) {
        newStep = 4; // Insights
      } else if (viewportMiddle >= deliverPos - buffer) {
        newStep = 3; // Deliver
      } else if (viewportMiddle >= developPos - buffer) {
        newStep = 2; // Develop
      } else if (viewportMiddle >= definePos - buffer) {
        newStep = 1; // Define
      } else if (viewportMiddle >= discoverPos - buffer) {
        newStep = 0; // Discover
    } else {
        newStep = -1; // Before any section
      }
      
      // Calculate progress percentage based on section boundaries
      const sectionWidth = 100 / UX_STEPS.length;
      let progressValue = 0;
      
      if (nearBottom || atCta) {
        // If near the bottom or at CTA, show full progress
        progressValue = 100;
      } else if (newStep >= 0) {
        // Base progress is the completed sections
        progressValue = newStep * sectionWidth;
        
        // Add progress within the current section
        if (newStep < UX_STEPS.length - 1) { // Not for the last section
          const currentSectionStart = newStep === 0 ? discoverPos : 
                         newStep === 1 ? definePos :
                         newStep === 2 ? developPos :
                         deliverPos;
          
          const nextSectionStart = newStep === 0 ? definePos :
                      newStep === 1 ? developPos :
                      newStep === 2 ? deliverPos :
                      insightsPos;
          
          const sectionProgress = Math.min(100, Math.max(0, 
            (viewportMiddle - currentSectionStart) / (nextSectionStart - currentSectionStart) * 100
          ));
          
          progressValue += (sectionProgress / 100) * sectionWidth;
        } else {
          // For the last section, add a fixed amount to show completion
          progressValue += sectionWidth * 0.5; // Show 50% through the last section
        }
      }
      
      setCurrentStep(Math.max(0, newStep));
      setProgressPercent(Math.min(100, progressValue));
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    handleScroll();
    return () => window.removeEventListener("scroll", scrollListener);
  }, [discoverRef, defineRef, developRef, deliverRef, insightsRef, ctaRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(
      ".reveal-animation, .reveal-animation-right"
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  
  // Images for the scrolling section
  const projectImages = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  ];

  // Additional high-quality images for the carousel
  const finalDesignImages = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    ...projectImages,
  ];
  
  // User persona images for the carousel
  const personaImages = [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Progress bar - fixed at the top of the viewport */}
      {showProgressBar && (
        <div className="fixed top-[70px] left-0 right-0 z-40 transition-opacity duration-300 bg-white shadow-md">
          {/* Custom progress bar - showing progress between steps */}
          <div className="w-full h-2 bg-gray-200">
            {/* Use smoother calculated progress value */}
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-2 bg-portfolio-accent transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Steps labels */}
          <div className="flex justify-between max-w-4xl mx-auto px-4 py-2 text-xs font-semibold text-gray-700">
            {UX_STEPS.map((step, idx) => (
              <div
                key={step}
                className={`flex flex-col items-center ${
                  idx <= currentStep
                    ? "text-portfolio-accent"
                    : "text-gray-400"
                } transition-colors duration-500`}
              >
                <div
                  className={`w-3 h-3 rounded-full mb-1 border-2 ${
                    idx <= currentStep
                      ? "border-portfolio-accent bg-portfolio-accent"
                      : "border-gray-400"
                  } transition-all duration-500 flex items-center justify-center`}
                >
                  {(idx < currentStep || (idx === UX_STEPS.length - 1 && currentStep === UX_STEPS.length - 1 && (isNearBottom || isAtCta))) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Works", href: "/works" },
                { label: "Black Books Air", isCurrent: true }
              ]}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <div className="reveal-animation">
              <span className="text-portfolio-accent font-medium mb-4 inline-block">
                Case Study
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Black Books Air: A Platform for Black-Owned Bookstores
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A platform designed to connect readers with Black-owned bookstores, making it easier to discover and support these important community spaces.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-portfolio-accent/10 text-portfolio-accent">
                  UX Research
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-portfolio-blue/10 text-portfolio-blue">
                  UX Design
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  UI Design
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Product Strategy
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  Mobile
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Web
                </span>
              </div>
            </div>
            <div className="reveal-animation-right relative">
              <div className="relative">
                <img
                  src="/images/bba/header.png"
                  alt="Black Books Air Interface"
                  className="rounded-xl shadow-xl w-full object-cover h-[500px]"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-md -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section ref={overviewRef} className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="reveal-animation">
              <h3 className="text-xl font-semibold mb-4 text-portfolio-blue">
                Goal
              </h3>
              <p className="text-gray-700">
                Design a meaningful hiring experience, promote pay transparency, strengthen employee retention, and lower recruitment costs.
              </p>
            </div>
            <div className="reveal-animation">
              <h3 className="text-xl font-semibold mb-4 text-portfolio-blue">
                My Role
              </h3>
              <p className="text-gray-700">
                Lead UX Designer, responsible for research, design, and implementation.<br />UI Designer in a team of 2.
              </p>
            </div>
            <div className="reveal-animation">
              <h3 className="text-xl font-semibold mb-4 text-portfolio-blue">
                Timeline
              </h3>
              <p className="text-gray-700">
                First release: 3 months, iterations over 5 years
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual separator */}
      <div className="border-b border-gray-300 mx-auto w-full max-w-7xl"></div>

      {/* Project Exploration Section */}
      <section className="py-16">
        
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 text-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Project Exploration</h2>
            </div>
            <div>
              <p className="text-lg text-gray-600">
                A recruitment platform for the hospitality industry linking employers and job seekers directly.
              </p>
            </div>
          </div>
          <div className="-mx-4 md:-mx-8">
            <DesignProcessScroller 
              images={[
                "/images/bba/projectpics/1.png",
                "/images/bba/projectpics/2.png",
                "/images/bba/projectpics/3.png",
                "/images/bba/projectpics/4.png",
                "/images/bba/projectpics/5.png",
                "/images/bba/projectpics/1.png",
                "/images/bba/projectpics/2.png",
                "/images/bba/projectpics/3.png",
                "/images/bba/projectpics/4.png",
                "/images/bba/projectpics/5.png"
              ]}
            />
          </div>
        </div>
      </section>


      {/* Problem Statement Section */}
      <section className="py-16 bg-gray-50 ux-process-section relative">
        <img src="images/bba/quest.png" alt="Problem statement visualization" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none" style={{zIndex:0}} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1">
            <div className="reveal-animation mb-12">
              <h2 className="text-3xl font-bold mb-6">The Problem Statement</h2>
              <div className="prose prose-lg">
                <p className="text-lg md:text-xl leading-relaxed">
                  How might we <span className="font-bold text-portfolio-accent">reduce hiring friction, lower recruitment costs and improve staff retention</span> in the hospitality industry, while <span className="font-bold text-portfolio-accent">empowering employees with pay transparency, fair wages and negotiation tools</span>—ensuring a hiring process that is not just functional but also engaging?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Research Section */}
      <section ref={discoverRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1">
            <div className="reveal-animation mb-12">
              <h2 className="text-3xl font-bold mb-4 text-portfolio-accent">Discover</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-4 text-portfolio-blue">
                User Research
                </h3>
              <div className="prose prose-lg">
                <p>
                The hospitality sector faces persistent staffing issues as workers frequently change jobs. Seasonal shifts in labor demand are worsened by recruitment agencies that struggle to supply qualified staff when needed. During peak times, shortages occur; in the off-season, temporary workers leave for full-time roles—only to exit again when demand returns. This creates a constant hiring loop, leaving businesses either overstaffed or short-handed.</p>
                <br />
                <p>
                I conducted desk research and user interviews with 15 hospitality professionals.
                </p>
              </div>
                  </div>

            <div className="reveal-animation-right">
              <h3 className="text-2xl font-semibold mb-4 text-portfolio-blue">
                Key Insights
                </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium mb-2">
                    High recruitment costs
                  </h4>
                <p className="text-gray-700">
                    80% of businesses reported dissatisfaction with recruitment costs.
                </p>
              </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium mb-2">Frequent job switching</h4>
                  <p className="text-gray-700">
                    40% of employees changed jobs in the past year for a better salary.
                  </p>
            </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium mb-2">Dissatisfaction with agencies</h4>
                  <p className="text-gray-700">
                    61% of temporary chefs were dissatisfied with agencies taking a cut of their salary.
                  </p>
          </div>
              </div>
            </div>
            
            {/* Research Process Carousel */}
            <div className="mt-12 reveal-animation">
              <h3 className="text-2xl font-semibold mb-4 text-portfolio-blue">Research Process</h3>
              <HoverFullscreen
                images={[
                  "/images/bba/diagram.svg",
                  "/images/bba/stats.png"
                ]}
                textData={[
                  {
                    title: "Research Methodology",
                    description: "Our systematic approach to understanding user needs and market challenges"
                  },
                  {
                    title: "Key Statistics", 
                    description: "Quantitative insights from surveys and market analysis"
                  }
                ]}
              />
            </div>
          </div>
            
         
            
          </div>
         
        </section>



      {/* Define section - with background */}
      <section ref={defineRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1">
            <div className="reveal-animation mb-12">
              <h2 className="text-3xl font-bold mb-4 text-portfolio-accent">Define</h2>
            </div>
          </div>

          {/* Strategy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue">Connecting research to solutions</h3>
              <div className="prose prose-lg">
                <p className="text-gray-700">
                  Synthesizing qualitative insights and quantitative data, I uncovered systemic challenges in recruitment.
                </p>
              </div>
            </div>

            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue">Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium mb-2 text-portfolio-blue">Unsustainable hiring costs</h4>
                  <p className="text-gray-700">
                    High recruitment fees made it difficult for businesses to scale or replace staff efficiently.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium mb-2 text-portfolio-blue">Poor employee retention</h4>
                  <p className="text-gray-700">
                    Rapid turnover drained time and resources, disrupting team stability and continuity.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium mb-2 text-portfolio-blue">Chronic job switching</h4>
                  <p className="text-gray-700">
                    A mismatch in expectations, rigid roles, and burnout drove frequent career changes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium mb-2 text-portfolio-blue">Inefficient hiring processes</h4>
                  <p className="text-gray-700">
                    Disjointed systems and slow workflows resulted in delays and missed talent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User personas section */}
          <div className="reveal-animation bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue">User Personas</h3>
            <div className="prose prose-lg mb-8">
              <p className="text-gray-700">
                Employer, Employee and Freelancer personas
              </p>
            </div>
            <div className="mt-4">
              <FeaturedCarousel
                images={[
                  {
                    src: "/images/bba/employer.png",
                    alt: "Employer Persona"
                  },
                  {
                    src: "/images/bba/employee.png",
                    alt: "Employee Persona"
                  },
                  {
                    src: "/images/bba/freelancer.png",
                    alt: "Freelancer Persona"
                  }
                ]}
                autoPlay={false}
              />
            </div>
          </div>
        </div>
      </section>



  
  {/* Develop Section - from Urban Sprout */}
  <section ref={developRef} className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 md:px-8">
      <div className="reveal-animation mb-12">
        <h2 className="text-3xl font-bold mb-6 text-portfolio-accent">Develop</h2>

          {/* procuct differentiation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue">Product Differentiation</h3>
              <div className="prose prose-lg">
                <p className="text-gray-700">
                  I focused on designing for what users need to know, do, and feel throughout their hiring journey.

I focused on features facilitating negotiations and improving retention.
                </p>
              </div>
            </div>

            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue">Addressing pain points</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium mb-2 text-portfolio-blue">Negotation is encouraged</h4>
                  <p className="text-gray-700">
                  Direct negotiation reduces hiring friction, enabling better alignment between employers and employees.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium mb-2 text-portfolio-blue">Make an offer</h4>
                  <p className="text-gray-700">
                  This shift from a passive to an active job-seeking approach gives candidates greater control.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium mb-2 text-portfolio-blue">Timekeeping module</h4>
                  <p className="text-gray-700">
                  Automated shift tracking and invoicing reduces manual work, errors, and prevents time theft.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium mb-2 text-portfolio-blue">Direct booking of contractors</h4>
                  <p className="text-gray-700">
                  Live availability and bookings calendar, skipping waitlist and empwering freelancers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          
          <ScrollingImagesSection
          title="Sketches"
          subtitle="
              I focused on features facilitating negotiations and improving job retention."
          images={[
            "/images/bba/employer dashboard.svg",
            
            "/images/bba/favourite jobs.svg",
            "/images/bba/employee profile.svg",
            "/images/bba/guest marketplace.svg",
            "/images/bba/timekeeping.svg",
          ]}
        />
 {/* User Flows with HoverFullscreen Carousel */}
 <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 text-left text-portfolio-blue">User Flows</h3>
              <HoverFullscreen
                images={[
                  "/images/bba/employee make an offer.png",
                  "/images/bba/employer offer received.png"
                ]}
              />
            </div>
        <TextImg4 />


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <div className="bg-gray-50 p-8 rounded-xl mb-8">
              <h3 className="text-xl font-semibold mb-4">User flows guided by HMW questions</h3>
              <ul className="space-y-3 text-gray-600">
              <li>
                <span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3 inline-block"></span>
                HMW promote fair and transparent wages?
                </li>
                <li>
                <span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3 inline-block"></span>
                HMW make the job search process more user-friendly?
                </li>
                <li>
                <span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3 inline-block"></span>
                HMW empower employees to confidently negotiate salaries?
                </li>
                <li>
                <span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3 inline-block"></span>
                HMW influencelong-term retention in the workforce?
                </li>
                <li>
                <span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3 inline-block"></span>
                HMW improve the speed of communication?
                </li>
                
              </ul>
            </div>
            
          </div>
          <div className="relative">
      
          </div>
          
        </div>

        {/* New Timekeeping Section */}
        <div className="my-16">
            <h2 className="text-3xl font-bold text-portfolio-blue mb-6 text-center">Timekeeping</h2>
            <p className="text-gray-600 max-w-3xl text-center mb-10">
              Streamlining time tracking and administrative tasks for staff and management
            </p>
           
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
              {/* Text content - takes up more space on larger screens */}
              <div className="lg:col-span-7 space-y-6">
                
                  
               
                
               
                <div className="text-center mt-4 text-sm text-gray-500">
                  <p>Click through the screens to see the interface in action →</p>
                </div>
              </div>
             
              {/* Image gallery - takes up less space but still prominent */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <ClickableImageGallery />
              </div>
            </div>
          </div>


       
      </div>
    </div>
  </section>

    <section ref={deliverRef} className="py-16 md:py-24 bg-gray-50 mb-0">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1">
          <div className="reveal-animation mb-12">
            <h2 className="text-3xl font-bold mb-6 text-portfolio-accent">Deliver</h2>
          </div>
        </div>
      </div>
    </section>

    {/* Final Designs Section */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="reveal-animation bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue">Final Designs</h3>
          <div className="prose prose-lg mb-8">
            <p className="text-gray-700">
              Explore the high-fidelity mockups and final screens from the Black Books Air platform
            </p>
          </div>
          <div className="mt-4">
            <FinalDesigns
              images={[
                { src: "/images/bba/browseStaff.png", alt: "Browse Staff" },
                { src: "/images/bba/chat.png", alt: "Chat" },
                { src: "/images/bba/companyProfile.png", alt: "Company Profile" },
                { src: "/images/bba/employerDashboard.png", alt: "Employer Dashboard" },
                { src: "/images/bba/employerDashboard2.png", alt: "Employer Dashboard" },
                { src: "/images/bba/negotiate.png", alt: "Negotiate" },
                { src: "/images/bba/jobMarketplace.png", alt: "Job Marketplace" }
              ]}
              autoPlay={false}
            />
          </div>
        </div>
      </div>
    </section>

    {/* Interactive Prototype section */}
    <section className="mt-16 mb-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1">
          <h2 className="text-3xl font-bold mb-8">Interactive Prototype</h2>
          <p className="text-gray-600 max-w-3xl text-left mb-10">
            Explore the final interactive prototype showcasing the complete user journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          {/* Text content - takes up more space on larger screens */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-portfolio-blue mb-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-portfolio-accent/20 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-accent"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                Complete user journey
              </h3>
              <p className="text-gray-700">
                The interactive prototype demonstrates the <span className="text-portfolio-accent font-medium">complete user journey</span> from registration to job negotiation. Users can navigate through the platform's core features, experiencing the <span className="text-portfolio-accent font-medium">intuitive interface</span> and seamless transitions between different sections.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-portfolio-blue mb-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-portfolio-accent/20 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-accent"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                </div>
                User testing insights
              </h3>
              <p className="text-gray-700">
                This high-fidelity prototype was used in <span className="text-portfolio-accent font-medium">user testing sessions</span> to validate design decisions and identify areas for improvement. The feedback collected helped refine the final product, ensuring it meets both user needs and business objectives.
              </p>
            </div>
            
            <div className="text-center mt-4 text-sm text-gray-500">
              <p>Click through the screens to explore the prototype →</p>
            </div>
            
            <div className="flex justify-center mt-8">
              <a 
                href="/images/bba/protoype_last/01.png" 
                target="_blank" 
                className="inline-flex items-center px-4 py-2 bg-portfolio-accent text-white rounded-md hover:bg-portfolio-accent/90 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                </svg>
                View Full Interactive Prototype
              </a>
            </div>
          </div>
          
          {/* Image gallery - takes up less space but still prominent */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <EnhancedPrototypeGallery />
          </div>
        </div>
      </div>
    </section>



    {/* Testing and Iterations section - replaced with just the section title */}
    <section ref={insightsRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1">
          <div className="reveal-animation mb-12">
            <h2 className="text-3xl font-bold mb-6 text-portfolio-accent">Impact</h2>
          </div>
        </div>
      </div>
    </section>

    


    {/* Results Section */}
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1">
          <div className="reveal-animation">
            <h2 className="text-3xl font-bold mb-8">Results & Impact</h2>
            <div className="prose prose-lg max-w-none mt-32 mb-24">
              <p>
                The Black Books Air platform launched to enthusiastic user reception, with significant achievements in the first three months:
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-portfolio-accent flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>
              </div>
              <h4 className="text-xl font-semibold text-portfolio-blue">42% Increase</h4>
            </div>
            <p className="text-gray-700">in successful negotiations compared to traditional hiring platforms</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-portfolio-accent flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22l-3-3.88z"/></svg>
              </div>
              <h4 className="text-xl font-semibold text-portfolio-blue">85% Satisfaction</h4>
            </div>
            <p className="text-gray-700">with the negotiation process reported by both employers and candidates</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-portfolio-accent flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>
              </div>
              <h4 className="text-xl font-semibold text-portfolio-blue">38% Retention</h4>
            </div>
            <p className="text-gray-700">improvement after 6 months compared to industry standard</p>
          </div>
        </div>
      </div>
    </section>

{/* Reflections Section - Enhanced version */}
<section className="py-16 bg-gradient-to-b from-white to-gray-50">
  <div className="container mx-auto px-4 md:px-8">
    <div className="grid grid-cols-1">
      <div className="reveal-animation">
        <h2 className="text-3xl font-bold mb-8 text-left">Reflections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue flex items-center">
              <div className="w-10 h-10 rounded-full bg-portfolio-accent/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-accent"><path d="m13 2-2 2.5h3L12 7"/><path d="M19 9a7 7 0 1 1-14 0"/><path d="M16 16a4 4 0 0 1-8 0"/></svg>
              </div>
              Challenges
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-portfolio-blue mb-1">Redefining target users</h4>
                <p className="text-gray-700">
                  Shifting focus from large companies to small and medium businesses significantly improved impact.
                </p>
              </div>
             
              <div>
                <h4 className="font-semibold text-portfolio-blue mb-1">Adapting to new legislation</h4>
                <p className="text-gray-700">
                  Redesigned registration flow for IR35 compliance and added verification for freelancers.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-portfolio-blue mb-1">Design + development</h4>
                <p className="text-gray-700">
                  Close collaboration and clear documentation eliminated inconsistencies in execution.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue flex items-center">
              <div className="w-10 h-10 rounded-full bg-portfolio-accent/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-accent"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
              </div>
              Lessons Learned
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-portfolio-blue mb-1">Some things can't be tested</h4>
                <p className="text-gray-700">
                  Real-world use revealed missed insights that improved satisfaction when addressed.
                </p>
              </div>
             
              <div>
                <h4 className="font-semibold text-portfolio-blue mb-1">Flexibility is key</h4>
                <p className="text-gray-700">
                  Adapting to post-pandemic changes kept the product relevant for evolving work patterns.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-portfolio-blue mb-1">Guiding decisions by impact</h4>
                <p className="text-gray-700">
                  Balancing user needs with business goals fostered sustainable growth over immediate gains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Next Project CTA */}
<section ref={ctaRef} className="py-16 md:py-20">
  <div className="container mx-auto px-4 md:px-8">
    <div className="grid grid-cols-1">
      <div className="bg-gray-100 rounded-md p-8 md:p-12 text-gray-800 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Next Project
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Explore more of my work
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <Button
            size="lg"
            className="bg-portfolio-accent hover:bg-portfolio-accentLight text-white"
            asChild
          >
            <a href="/works/travelperk-hackathon">
              <span>View TravelPerk Hackathon</span>
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="tertiary"
            className="bg-white text-portfolio-blue"
            onClick={() => window.location.href = '/works'}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>

<Footer />
</div>
);
};

export default BlackBooksAir;