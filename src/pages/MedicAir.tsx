import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TwoColumnTextSection from "@/components/TwoColumnTextSection";
import ProjectCta from "@/components/ProjectCta";
import ScrollingImagesSection from "@/components/ScrollingImagesSection";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/LazyImage";
import DesignProcessScroller from "@/components/DesignProcessScroller";
import { ArrowRight } from "lucide-react";

const UX_STEPS = ["Discover", "Define", "Develop", "Deliver", "Impact"];

const MedicAir = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isAtCta, setIsAtCta] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [screens] = useState([
    "/images/medicair/screens/1.png",
    "/images/medicair/screens/2.png",
    "/images/medicair/screens/3.png",
    "/images/medicair/screens/4.png",
    "/images/medicair/screens/5.png"
  ]);

  // Section refs for tracking progress
  const overviewRef = useRef<HTMLElement>(null);
  const discoverRef = useRef<HTMLElement>(null);
  const defineRef = useRef<HTMLElement>(null);
  const developRef = useRef<HTMLElement>(null);
  const deliverRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize scroll tracking
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
      const impactPos = getTop(impactRef);
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
        newStep = 4; // Impact (last step)
      } else if (viewportMiddle >= impactPos - buffer) {
        newStep = 4; // Impact
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
                impactPos;

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
  }, [discoverRef, defineRef, developRef, deliverRef, impactRef, ctaRef]);

  // Initialize animation observer
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

    const elements = document.querySelectorAll(".reveal-animation, .reveal-animation-right");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleNextScreen = () => {
    setCurrentScreenIndex((prevIndex) => (prevIndex + 1) % screens.length);
  };

  const handlePreviousScreen = () => {
    setCurrentScreenIndex((prevIndex) => (prevIndex - 1 + screens.length) % screens.length);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Progress bar - fixed at the top of the viewport */}
      {showProgressBar && (
        <div className="fixed top-16 left-0 right-0 z-40 transition-opacity duration-300 bg-white shadow-md">
          {/* Custom progress bar - showing progress between steps */}
          <div className="w-full h-3 bg-gray-200">
            {/* Use smoother calculated progress value */}
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-3 bg-portfolio-accent transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Steps labels */}
          <div className="flex justify-between max-w-4xl mx-auto px-4 py-2 text-xs font-semibold text-gray-700">
            {UX_STEPS.map((step, idx) => (
              <div
                key={step}
                className={`flex flex-col items-center ${
                  idx <= currentStep ? "text-portfolio-accent" : "text-gray-400"
                } transition-colors duration-500`}
              >
                <div
                  className={`w-5 h-5 rounded-full mb-1 border-2 ${
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
      <section ref={overviewRef} className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Works", href: "/works" },
                { label: "MedicAir", isCurrent: true }
              ]} 
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <div className="reveal-animation">
              <span className="text-portfolio-accent font-medium mb-4 inline-block">
                Case Study
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                MedicAir: Healthcare Booking System
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A healthcare booking system designed to address pandemic-driven staff shortages by providing nurses, doctors, and healthcare contractors a seamless, contact-free way to find and book shifts.
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
                  src="/images/medicair/hero.png"
                  alt="MedicAir Interface"
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
                To design a healthcare booking system that addresses pandemic-driven staff shortages by providing a seamless, contact-free way for healthcare professionals to find and book shifts.
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
                Design and development of the first version over 3 months, with ongoing iterations and improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual separator */}
      <div className="border-b border-gray-200 mx-auto w-full max-w-7xl"></div>

      {/* Project Exploration Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 text-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Project Exploration</h2>
            </div>
            <div>
              <p className="text-lg text-gray-600">
                A healthcare booking system designed to streamline staff management during the pandemic.
              </p>
            </div>
          </div>
          <div className="-mx-4 md:-mx-8">
            <DesignProcessScroller 
              images={[
                "/images/medicair/process/1.png",
                "/images/medicair/process/2.png",
                "/images/medicair/process/3.png",
                "/images/medicair/process/4.png",
                "/images/medicair/process/5.png",
                "/images/medicair/process/1.png",
                "/images/medicair/process/2.png",
                "/images/medicair/process/3.png",
                "/images/medicair/process/4.png",
                "/images/medicair/process/5.png"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Screens Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Screens</h2>
            <p className="text-lg text-gray-600">
              Explore the key screens of the MedicAir platform
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative">
              <img 
                src={screens[currentScreenIndex]} 
                alt="MedicAir interface screen" 
                className="w-full rounded-3xl transition-opacity duration-300"
              />
              <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-md -z-10"></div>
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={handlePreviousScreen}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-110"
              aria-label="Previous screen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-blue">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              onClick={handleNextScreen}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-110"
              aria-label="Next screen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-blue">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
            
            {/* Screen counter indicator */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-1.5">
              {screens.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full ${idx === currentScreenIndex ? 'bg-portfolio-accent' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section ref={discoverRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="reveal-animation mb-12">
            <h2 className="text-3xl font-bold mb-4 text-portfolio-accent">Discover</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <p className="text-lg text-gray-700 mb-8">
                  During the research phase, I conducted interviews with healthcare professionals and analyzed existing booking systems to identify pain points and opportunities for improvement.
                </p>
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Research Insights</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-lg">80%</p>
                      <p className="text-gray-600">of healthcare workers struggled with shift management</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">75%</p>
                      <p className="text-gray-600">reported difficulty finding suitable shifts</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">90%</p>
                      <p className="text-gray-600">wanted better mobile accessibility</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/medicair/research.png"
                  alt="User research insights"
                  className="rounded-xl shadow-lg w-full object-cover h-[400px]"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Define Section */}
      <section ref={defineRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="reveal-animation mb-12">
            <h2 className="text-3xl font-bold mb-6 text-portfolio-accent">Define</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="relative">
                <img
                  src="/images/medicair/define.png"
                  alt="User personas and journey mapping"
                  className="rounded-xl shadow-lg w-full object-cover h-[400px]"
                />
                <div className="absolute -bottom-4 -left-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Problems</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Complex and time-consuming shift booking process</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Limited mobile accessibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Lack of real-time availability updates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Poor communication between staff and facilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Inadequate shift filtering and search capabilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Develop Section */}
      <section ref={developRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="border-b border-gray-200 mx-auto w-full max-w-7xl">
            <div className="reveal-animation mb-12">
              <h2 className="text-3xl font-bold mb-6 text-portfolio-accent">Features</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Healthcare-Specific Onboarding</h3>
                  <p className="text-gray-600 mb-4">Streamlined verification process to reduce friction and ensure compliance.</p>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Onboarding screen with credential verification"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Secure Messaging & Document Upload</h3>
                  <p className="text-gray-600 mb-4">Facilitated clear communication and sharing of necessary paperwork.</p>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                    alt="Document upload screen"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Advanced Filtering</h3>
                  <p className="text-gray-600 mb-4">Allowed users to find suitable shifts quickly by role, location, and availability.</p>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                    alt="Filters UI"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Enhanced Booking System</h3>
                  <p className="text-gray-600 mb-4">Simplified scheduling and management of shifts in a contact-free manner.</p>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Mobile responsive booking calendar"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliver Section */}
      <section ref={deliverRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="border-b border-gray-200 mx-auto w-full max-w-7xl">
            <TwoColumnTextSection
              title="Approach"
              leftColumnContent={
                <div className="prose max-w-none">
                  <p>Building on a pre-existing product, I focused on:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Creating a robust onboarding experience for healthcare professionals to verify credentials easily.</li>
                    <li>Implementing secure messaging and document upload for sharing certifications and shift details.</li>
                    <li>Expanding booking functionalities with advanced filters specific to healthcare roles.</li>
                    <li>Conducting usability testing with 6 healthcare professionals to refine workflows.</li>
                  </ul>
                </div>
              }
              rightColumnContent={
                <div className="space-y-6">
                  <p className="text-gray-700">
                    The approach required a careful balance between leveraging existing infrastructure and
                    introducing healthcare-specific workflows that would meet the unique needs of medical professionals.
                  </p>
                  <p className="text-gray-700">
                    By focusing on user research with actual healthcare workers, we identified critical pain points in their
                    booking process and prioritized features that would provide immediate relief.
                  </p>
                </div>
              }
            />

            <ScrollingImagesSection
              title="Design Implementation"
              subtitle="Key screens showing the user journey from onboarding to booking"
              images={[
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1558346648-9757f2fa71ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section ref={impactRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="border-b border-gray-200 mx-auto w-full max-w-7xl">
            <div className="reveal-animation mb-12">
              <h2 className="text-3xl font-bold mb-6 text-portfolio-accent">Impact & Reflection</h2>
              <p className="text-lg text-gray-700 mb-8">
                Though the platform never launched beyond a trial with an Australian agency, this project validated
                the potential to pivot quickly into healthcare using minimal changes to the existing codebase. 
                It also influenced my design approach towards modular, industry-specific UX patterns, useful for future product iterations.
              </p>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex flex-col items-center">
                  <LazyImage
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Healthcare professionals using digital tools"
                    className="w-full max-w-3xl h-auto object-cover rounded-lg mb-6"
                  />
                  <div className="max-w-2xl mx-auto text-center">
                    <p className="text-xl italic text-gray-600 mb-4">
                      "The experience taught me that well-designed, intuitive systems can make a significant difference
                      in high-pressure environments like healthcare, especially during crises."
                    </p>
                    <p className="text-sm text-gray-500">Reflection on project outcomes and learnings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section ref={ctaRef} className="py-16 md:py-20">
        <div className="case-study-container">
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
                <a href="/works/sonar-dashboard">
                  <span>View SONAR Dashboard</span>
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
      </section>

      <Footer />
    </div>
  );
};

export default MedicAir;

