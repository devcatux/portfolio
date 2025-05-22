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

const UrbanSprout = () => {
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
        <div className="fixed top-[70px] left-0 right-0 z-40 transition-opacity duration-300 bg-white shadow-md">
          <div className="w-full h-3 bg-gray-200">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-3 bg-portfolio-accent transition-all duration-700 ease-in-out"
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
                { label: "Urban Sprout", isCurrent: true }
              ]} 
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-animation">
              <span className="text-portfolio-accent font-medium mb-4 inline-block">
                Case Study
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Urban Sprout: Urban Gardening Platform
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A platform connecting urban gardeners with sustainable farmers, making local produce accessible and transparent.
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
                  src="/images/urbansprout-hero.png"
                  alt="Urban Sprout Interface"
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
                To create a platform that connects urban gardeners with sustainable farmers, making local produce more accessible while promoting transparency in food sourcing.
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
                A platform connecting urban gardeners with sustainable farmers, making local produce accessible and transparent.
              </p>
            </div>
          </div>
          <div className="-mx-4 md:-mx-8">
            <DesignProcessScroller 
              images={[
                "/images/urbansprout/process/1.png",
                "/images/urbansprout/process/2.png",
                "/images/urbansprout/process/3.png",
                "/images/urbansprout/process/4.png",
                "/images/urbansprout/process/5.png",
                "/images/urbansprout/process/1.png",
                "/images/urbansprout/process/2.png",
                "/images/urbansprout/process/3.png",
                "/images/urbansprout/process/4.png",
                "/images/urbansprout/process/5.png"
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
                  During a UX bootcamp, I led the design of Urban Sprout, a platform connecting urban gardeners with sustainable farmers. 
                  The project aimed to address the growing demand for local, sustainable produce while supporting small-scale farmers.
                </p>
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Research Insights</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-lg">85%</p>
                      <p className="text-gray-600">of consumers want to support local farmers</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">70%</p>
                      <p className="text-gray-600">struggle to find local produce</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">60%</p>
                      <p className="text-gray-600">are willing to pay more for transparency</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <LazyImage
                  src="/images/urbansprout/discover.png"
                  alt="User research insights"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-animation">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">User Quotes</h3>
                <div className="space-y-4">
                  <blockquote className="text-gray-600 italic">
                    "I want to know exactly where my food comes from and support farmers who care about sustainability."
                    <footer className="text-sm mt-2">- Magda, Consumer</footer>
                  </blockquote>
                  <blockquote className="text-gray-600 italic">
                    "We need a better way to connect with local customers and showcase our sustainable practices."
                    <footer className="text-sm mt-2">- Dean, Farmer</footer>
                  </blockquote>
                </div>
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
                <LazyImage
                  src="/images/urbansprout/define.png"
                  alt="User personas and journey mapping"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Confused Consumer</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Wants to support local farmers</li>
                      <li>• Values transparency in food sourcing</li>
                      <li>• Willing to pay premium for quality</li>
                      <li>• Needs clear product information</li>
                    </ul>
                  </div>
                  <div className="bg-white p-8 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Sustainable Farmer</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Small-scale, eco-friendly practices</li>
                      <li>• Needs better market access</li>
                      <li>• Wants to showcase sustainability</li>
                      <li>• Values direct customer relationships</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-animation">
              <h3 className="text-2xl font-bold mb-6">How Might We Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <p className="text-gray-700">How might we make local produce more accessible to urban consumers?</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <p className="text-gray-700">How might we help farmers showcase their sustainable practices?</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <p className="text-gray-700">How might we build trust between consumers and farmers?</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <p className="text-gray-700">How might we simplify the farm-to-table process?</p>
                </div>
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
                <div className="bg-gray-50 p-8 rounded-xl mb-8">
                  <h3 className="text-xl font-semibold mb-4">Farmer Dashboard</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Eco-certification verification</li>
                    <li>• Shop setup wizard</li>
                    <li>• Inventory management</li>
                    <li>• Order processing</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Consumer Features</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• QR code product tracking</li>
                    <li>• AI-powered recommendations</li>
                    <li>• Sustainable practice badges</li>
                    <li>• Direct messaging</li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <LazyImage
                  src="/images/urbansprout/develop.png"
                  alt="Platform features and wireframes"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
              </div>
            </div>

            <ScrollingImagesSection
              title="Design Implementation"
              subtitle="Key screens showing the user journey from onboarding to purchase"
              images={[
                "/images/urbansprout/screens/1.png",
                "/images/urbansprout/screens/2.png",
                "/images/urbansprout/screens/3.png",
              ]}
            />
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
                <LazyImage
                  src="/images/urbansprout/deliver.png"
                  alt="Final design implementation"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-2xl font-bold text-portfolio-accent mb-2">25%</h4>
                    <p className="text-gray-600">Faster task completion</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-2xl font-bold text-portfolio-accent mb-2">80%</h4>
                    <p className="text-gray-600">AI recommendation accuracy</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-2xl font-bold text-portfolio-accent mb-2">35%</h4>
                    <p className="text-gray-600">Satisfaction increase</p>
                  </div>
                </div>
              </div>
            </div>

            <ScrollingImagesSection
              title="Final Designs"
              subtitle="Key screens showcasing the user journey from discovery to purchase"
              images={[
                "/images/urbansprout/final/1.png",
                "/images/urbansprout/final/2.png",
                "/images/urbansprout/final/3.png",
                "/images/urbansprout/final/4.png",
                "/images/urbansprout/final/5.png"
              ]}
            />

            <TwoColumnTextSection
              title="Design System"
              leftColumnContent={
                <div className="prose max-w-none">
                  <p>Developed a cohesive design system focusing on:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Accessible color palette with high contrast ratios</li>
                    <li>Consistent component library</li>
                    <li>Responsive grid system</li>
                    <li>Clear typography hierarchy</li>
                  </ul>
                </div>
              }
              rightColumnContent={
                <div className="space-y-6">
                  <p className="text-gray-700">
                    The design system was created to ensure consistency across all platform features while maintaining accessibility standards.
                  </p>
                  <p className="text-gray-700">
                    Special attention was paid to color contrast and text readability to accommodate users with visual impairments.
                  </p>
                </div>
              }
            />
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
                <p className="text-lg text-gray-700 mb-8">
                  The project received positive feedback from both the bootcamp cohort and potential users. 
                  Key learnings included improved Figma skills, accessibility awareness, and presentation abilities.
                </p>
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Key Learnings</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-portfolio-accent mr-2">•</span>
                      <span>Importance of user research in validating assumptions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-accent mr-2">•</span>
                      <span>Designing for accessibility from the start</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-accent mr-2">•</span>
                      <span>Balancing user needs with business goals</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <LazyImage
                  src="/images/urbansprout/impact.png"
                  alt="Project impact and outcomes"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex flex-col items-center">
                <LazyImage
                  src="/images/urbansprout/presentation.png"
                  alt="Project presentation"
                  className="w-full max-w-3xl h-auto object-cover rounded-lg mb-6"
                />
                <div className="max-w-2xl mx-auto text-center">
                  <p className="text-xl italic text-gray-600 mb-4">
                    "The experience taught me the importance of user research and accessibility in creating meaningful digital products."
                  </p>
                  <p className="text-sm text-gray-500">Reflection on project outcomes and learnings</p>
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
                <a href="/works/medic-air">
                  <span>View MedicAir</span>
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

export default UrbanSprout; 