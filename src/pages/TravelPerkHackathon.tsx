import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

const UX_STEPS = ["Discover", "Define", "Develop", "Deliver", "Impact"];

const TravelPerkHackathon = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isAtCta, setIsAtCta] = useState(false);

  // Section refs for tracking progress
  const discoverRef = useRef<HTMLElement>(null);
  const defineRef = useRef<HTMLElement>(null);
  const developRef = useRef<HTMLElement>(null);
  const deliverRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const overviewRef = useRef<HTMLElement>(null);

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
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Progress bar - fixed at the top of the viewport */}
      {showProgressBar && (
        <div className="fixed top-[70px] left-0 right-0 z-40 transition-opacity duration-300 bg-white shadow-md">
          {/* Custom progress bar - showing progress between steps */}
          <div className="w-full h-3 bg-gray-200">
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
                { label: "TravelPerk Hackathon", isCurrent: true }
              ]} 
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <div className="reveal-animation">
              <span className="text-portfolio-accent font-medium mb-4 inline-block">
                Hackathon
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                TravelPerk Hackathon: Sustainable Business Travel Platform
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A platform designed to help business travelers find and book sustainable accommodations while meeting corporate travel requirements.
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
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
                  alt="TravelPerk Interface"
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
                To create a platform that makes sustainable accommodations more accessible to business travelers while maintaining corporate travel requirements.
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
                48-hour hackathon
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
                A platform designed to help business travelers find and book sustainable accommodations while meeting corporate travel requirements.
              </p>
            </div>
          </div>
          <div className="-mx-4 md:-mx-8">
            <DesignProcessScroller 
              images={[
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              ]}
            />
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
                  During the research phase, I conducted interviews with business travelers and analyzed existing travel platforms to identify pain points and opportunities for improvement.
                </p>
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Research Insights</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-lg">85%</p>
                      <p className="text-gray-600">of business travelers want sustainable options</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">70%</p>
                      <p className="text-gray-600">struggle to find eco-friendly accommodations</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">90%</p>
                      <p className="text-gray-600">need to comply with corporate policies</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
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
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
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
                    <span>Difficulty finding sustainable accommodations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Limited eco-friendly options in business travel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Complex corporate travel policies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Lack of sustainability information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Time-consuming booking process</span>
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
          <div className="reveal-animation mb-12">
            <h2 className="text-3xl font-bold mb-6 text-portfolio-accent">Develop</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Solution Approach</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Integrated sustainability scoring system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Smart filtering for eco-friendly options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Corporate policy compliance checker</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Detailed sustainability metrics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Streamlined booking workflow</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Development process"
                  className="rounded-xl shadow-lg w-full object-cover h-[400px]"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliver Section */}
      <section ref={deliverRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="reveal-animation mb-12">
            <h2 className="text-3xl font-bold mb-6 text-portfolio-accent">Deliver</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Final design"
                  className="rounded-xl shadow-lg w-full object-cover h-[400px]"
                />
                <div className="absolute -bottom-4 -left-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Final Solution</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Intuitive sustainability scoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Policy-compliant recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>One-click booking process</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Detailed sustainability metrics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Corporate policy integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section ref={impactRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="reveal-animation mb-12">
            <h2 className="text-3xl font-bold mb-6 text-portfolio-accent">Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="font-bold text-2xl text-portfolio-accent mb-2">40%</p>
                <p className="text-gray-700">Increase in sustainable bookings</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="font-bold text-2xl text-portfolio-accent mb-2">85%</p>
                <p className="text-gray-700">User satisfaction rate</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="font-bold text-2xl text-portfolio-accent mb-2">30%</p>
                <p className="text-gray-700">Reduction in booking time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section ref={ctaRef} className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
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
                <a href="/BlackBooksAir">
                  <span>View Black Books Air</span>
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

export default TravelPerkHackathon; 