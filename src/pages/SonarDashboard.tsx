import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectCta from "@/components/ProjectCta";
import TwoColumnTextSection from "@/components/TwoColumnTextSection";
import DesignProcessScroller from "@/components/DesignProcessScroller";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const UX_STEPS = ["Discover", "Define", "Develop", "Deliver", "Impact"];

const SonarDashboard = () => {
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
        progressValue = 100;
      } else if (newStep >= 0) {
        progressValue = newStep * sectionWidth;

        if (newStep < UX_STEPS.length - 1) {
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
          progressValue += sectionWidth * 0.5;
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

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Progress bar - fixed at the top of the viewport */}
      {showProgressBar && (
        <div className="fixed top-16 left-0 right-0 z-40 transition-opacity duration-300 bg-white shadow-md">
          <div className="w-full h-2 bg-gray-200">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-2 bg-portfolio-accent transition-all duration-700 ease-in-out"
            />
          </div>

          <div className="flex justify-between max-w-4xl mx-auto px-4 py-2 text-xs font-semibold text-gray-700">
            {UX_STEPS.map((step, idx) => (
              <div
                key={step}
                className={`flex flex-col items-center ${
                  idx <= currentStep ? "text-portfolio-accent" : "text-gray-400"
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
      <section ref={overviewRef} className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Works", href: "/works" },
                { label: "SONAR Dashboard", isCurrent: true }
              ]} 
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <div className="reveal-animation">
              <span className="text-portfolio-accent font-medium mb-4 inline-block">
                Design Challenge
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                SONAR Dashboard: Healthcare Platform Redesign
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A comprehensive redesign of the SONAR healthcare platform's admin dashboard, focusing on improved usability, accessibility, and visual coherence.
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
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Web
                </span>
              </div>
            </div>

            <div className="reveal-animation-right relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Snapshot of the visual audit"
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
                To improve usability, accessibility, and visual coherence of the SONAR Admin Dashboard while building a functional clickable prototype.
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
                Design Challenge
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
                A comprehensive redesign of the SONAR healthcare platform's admin dashboard, focusing on improved usability, accessibility, and visual coherence.
              </p>
            </div>
          </div>
          <div className="-mx-4 md:-mx-8">
            <DesignProcessScroller 
              images={[
                "/images/sonar/process/1.png",
                "/images/sonar/process/2.png",
                "/images/sonar/process/3.png",
                "/images/sonar/process/4.png",
                "/images/sonar/process/5.png",
                "/images/sonar/process/1.png",
                "/images/sonar/process/2.png",
                "/images/sonar/process/3.png",
                "/images/sonar/process/4.png",
                "/images/sonar/process/5.png"
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
                  During the design challenge, I analyzed the existing SONAR Admin Dashboard to identify usability and accessibility issues. 
                  The project aimed to improve the user experience while maintaining the platform's core functionality.
                </p>
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Research Insights</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-lg">90%</p>
                      <p className="text-gray-600">of users struggled with navigation</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">75%</p>
                      <p className="text-gray-600">reported accessibility issues</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">85%</p>
                      <p className="text-gray-600">wanted better visual hierarchy</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
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
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
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
                    <span>Lack of visual hierarchy (inconsistent heading sizes, spacing, and alignment)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Overuse of colors, not following the 60-30-10 or 90-60-30 design principle</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>No consistent grid or spacing system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Mixed icon styles and sizes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>No personalization or user avatar</span>
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
                <h3 className="text-xl font-semibold mb-4">Design Solutions</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Create a clear visual hierarchy using layout and type scale</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Reduce visual noise by removing rarely used items</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Design for accessibility, with responsive touch areas and screen reader compatibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Redesign the color system to be calmer, friendlier, and NHS-appropriate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Build reusable components with variants in Figma</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Design solutions"
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
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Final design"
                  className="rounded-xl shadow-lg w-full object-cover h-[400px]"
                />
                <div className="absolute -bottom-4 -left-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Final Design Features</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>A cleaner, more inviting dashboard layout</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Logical grouping of quick links, patient info, and referral tasks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Sidebar navigation with clear structure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Personalization with user info and avatar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Alignment with Gestalt principles and cognitive load reduction</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Achievements</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Improved usability through clear visual hierarchy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Enhanced accessibility with proper contrast and labels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Streamlined navigation and user flows</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Created a scalable component system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Delivered a functional clickable prototype</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Impact visualization"
                  className="rounded-xl shadow-lg w-full object-cover h-[400px]"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
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
                <a href="/works/thrive">
                  <span>View Thrive</span>
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

export default SonarDashboard;
