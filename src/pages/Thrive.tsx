import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TwoColumnTextSection from "@/components/TwoColumnTextSection";
import ProjectCta from "@/components/ProjectCta";
import ScrollingImagesSection from "@/components/ScrollingImagesSection";
import FinalDesignsCarousel from "@/components/FinalDesignsCarousel";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/LazyImage";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import DesignProcessScroller from "@/components/DesignProcessScroller";

const UX_STEPS = ["Discover", "Define", "Develop", "Deliver", "Impact"];

const Thrive = () => {
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

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Progress bar scroll handler
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
                  idx <= currentStep
                    ? "text-portfolio-accent"
                    : "text-gray-400"
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
                { label: "Thrive", isCurrent: true }
              ]} 
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-animation">
              <span className="text-portfolio-accent font-medium mb-4 inline-block">
                Case Study
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Thrive: AI-Powered Health App
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                AI-Powered Health App designed to deliver personalized, context-aware health insights
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
                  src="/images/thrive/moodboard.png"
                  alt="Thrive Interface"
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
                To create an AI-powered health app that delivers personalized, context-aware health insights while encouraging healthy habits without causing anxiety.
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
                Design and development of the first version over 4 weeks, with ongoing iterations and improvements.
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
                AI-Powered Health App designed to deliver personalized, context-aware health insights
              </p>
            </div>
          </div>
          <div className="-mx-4 md:-mx-8">
            <DesignProcessScroller 
              images={[
                "/images/thrive/process/1.png",
                "/images/thrive/process/2.png",
                "/images/thrive/process/3.png",
                "/images/thrive/process/4.png",
                "/images/thrive/process/5.png",
                "/images/thrive/process/1.png",
                "/images/thrive/process/2.png",
                "/images/thrive/process/3.png",
                "/images/thrive/process/4.png",
                "/images/thrive/process/5.png"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section ref={discoverRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-3xl font-bold mb-4 text-portfolio-accent">Discover</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding user needs and frustrations with current health tracking apps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-4">Research Methods</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-medium text-portfolio-accent mb-2">Desk Research</h4>
                  <p className="text-gray-600">
                    Performed a competitive feature analysis and explored emerging market trends in health tech.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-portfolio-accent mb-2">Surveys & Quantitative Data</h4>
                  <p className="text-gray-600">
                    30 participants shared insights on their priorities and trust factors.
                  </p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-portfolio-accent mb-1">53%</p>
                      <p className="text-gray-600">Prioritized activity tracking</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-portfolio-accent mb-1">21%</p>
                      <p className="text-gray-600">Concerned about privacy and data control</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-portfolio-accent mr-2">•</span>
                      <span>Strong interest in heart rate & sleep tracking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-portfolio-accent mr-2">•</span>
                      <span>High expectation for personalization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="reveal-animation-right">
              <LazyImage
                src="/images/thrive/Competitive Analysis.png"
                alt="Competitive Analysis"
                className="rounded-lg shadow-md mb-6"
              />
              <p className="text-sm text-gray-500 text-center">Competitive Analysis of health tracking apps</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-4">Survey Results</h3>
              <LazyImage
                src="/images/thrive/Survey.svg"
                alt="Survey Data Visualization"
                className="rounded-lg shadow-md mb-6"
              />
              <p className="text-sm text-gray-500 text-center">Survey data showing user priorities and preferences</p>
            </div>
            <div className="reveal-animation-right">
              <h3 className="text-2xl font-semibold mb-4">Affinity Diagram</h3>
              <LazyImage
                src="/images/thrive/Affinity Diagram.png"
                alt="Affinity Diagram"
                className="rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-500 text-center mt-2">Affinity Diagram organizing user pain points</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal-animation order-2 lg:order-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LazyImage
                  src="/images/thrive/persona-barber.png"
                  alt="User Persona - James"
                  className="rounded-lg shadow-md"
                />
                <LazyImage
                  src="/images/thrive/User Journey Map.png"
                  alt="User Journey Map"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
            <div className="reveal-animation-right order-1 lg:order-2">
              <h3 className="text-2xl font-semibold mb-4">User Interviews & Diary Studies</h3>
              <p className="text-gray-600 mb-6">
                Conducted in-depth interviews and diary studies to uncover emotional pain points and day-to-day frustrations with current health tracking apps.
              </p>
            </div>
          </div>
          
          <div className="reveal-animation bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Key Findings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="font-medium text-portfolio-accent mb-1">Personalization</p>
                <p className="text-gray-600">High interest in contextual, personalized suggestions</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="font-medium text-portfolio-accent mb-1">Frustration</p>
                <p className="text-gray-600">Manual logging is time-consuming</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="font-medium text-portfolio-accent mb-1">Technical Issues</p>
                <p className="text-gray-600">Accuracy and syncing inconsistencies</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="font-medium text-portfolio-accent mb-1">User Experience</p>
                <p className="text-gray-600">Need for a calm, emotionally supportive interface</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="font-medium text-portfolio-accent mb-1">Security</p>
                <p className="text-gray-600">Privacy and data transparency is essential</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Define Section */}
      <section ref={defineRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-3xl font-bold mb-4 text-portfolio-accent">Define</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Identifying the core problems and setting design goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-4">Affinity Diagram</h3>
              <LazyImage
                src="/images/thrive/Affinity Diagram.png"
                alt="Affinity Diagram"
                className="rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-500 text-center mt-2">Affinity Diagram organizing user pain points</p>
            </div>
            <div className="reveal-animation-right">
              <h3 className="text-2xl font-semibold mb-4">How Might We Board</h3>
              <LazyImage
                src="/images/thrive/hmw.png"
                alt="How Might We Board"
                className="rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-500 text-center mt-2">How Might We (HMW) exploration board</p>
            </div>
          </div>
          
          <div className="reveal-animation bg-white p-8 rounded-lg shadow-sm mb-12">
            <h3 className="text-2xl font-semibold mb-4">Problem Statement</h3>
            <p className="text-lg text-gray-600">
              Women aged 30-45 need a health tracking app that provides personalized insights and recommendations while maintaining privacy and data control, as current solutions often fail to address their specific needs and concerns.
            </p>
          </div>
        </div>
      </section>

      {/* Develop Section */}
      <section ref={developRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-3xl font-bold mb-4 text-portfolio-accent">Develop</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ideation, key features, and design exploration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-4">Ideation & Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-portfolio-accent mb-1">AI Personalization</h4>
                  <p className="text-gray-600 text-sm">Tailored suggestions based on activity, sleep, stress, mood</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-portfolio-accent mb-1">Accurate Data Sync</h4>
                  <p className="text-gray-600 text-sm">Integrates with wearables and minimizes errors</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-portfolio-accent mb-1">Lifestyle Suggestions</h4>
                  <p className="text-gray-600 text-sm">Breathwork, hydration, rest, and food prompts</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-portfolio-accent mb-1">Modular Dashboards</h4>
                  <p className="text-gray-600 text-sm">Customizable to fit user preferences</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-portfolio-accent mb-1">Social Motivation</h4>
                  <p className="text-gray-600 text-sm">Badges, friend groups, private/public goals</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-medium text-portfolio-accent mb-1">Privacy & Control</h4>
                  <p className="text-gray-600 text-sm">User manages data access and storage</p>
                </div>
              </div>
            </div>
            <div className="reveal-animation-right">
              <h3 className="text-2xl font-semibold mb-4">Early Concepts</h3>
              <p className="text-gray-600 mb-6">
                Initial paper sketches exploring key features and user flows.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <LazyImage
                  src="/images/thrive/sketch-cycle.png"
                  alt="Cycle Tracker Sketch"
                  className="rounded-lg shadow-sm"
                />
                <LazyImage
                  src="/images/thrive/sketch-recordings.png"
                  alt="Recordings Sketch"
                  className="rounded-lg shadow-sm"
                />
                <LazyImage
                  src="/images/thrive/sketch-sleep.png"
                  alt="Sleep Tracker Sketch"
                  className="rounded-lg shadow-sm"
                />
              </div>
              <p className="text-sm text-gray-500 text-center mt-2">Paper sketches exploring different tracking features</p>
            </div>
          </div>
          
          <div className="reveal-animation mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-center">Moodboard & Visual Exploration</h3>
            <div className="max-w-3xl mx-auto">
              <LazyImage
                src="/images/thrive/moodboard.png"
                alt="Design Moodboard"
                className="rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-500 text-center mt-2">Moodboard demonstrating tone and style: calm, energetic, supportive</p>
            </div>
          </div>
          
          <div className="reveal-animation bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Diary Study Feedback</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="font-medium text-portfolio-accent mb-1">UI Design</p>
                <p className="text-gray-600">UI seen as "clean, calming"</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="font-medium text-portfolio-accent mb-1">Onboarding</p>
                <p className="text-gray-600">Desired better onboarding for understanding AI</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <p className="font-medium text-portfolio-accent mb-1">Tone of Voice</p>
                <p className="text-gray-600">Warm, encouraging feedback preferred</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliver Section */}
      <section ref={deliverRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-3xl font-bold mb-4 text-portfolio-accent">Deliver</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Final product features and strategy.
            </p>
          </div>

          <FinalDesignsCarousel 
            title="Final Designs" 
            subtitle="Explore the high-fidelity mockups and final screens from the Thrive health app"
            images={[
              "/images/thrive/mockups/onboarding.png",
              "/images/thrive/mockups/dashboard.png",
              "/images/thrive/mockups/tracking.png",
              "/images/thrive/mockups/insights.png",
              "/images/thrive/mockups/profile.png"
            ]} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-4">MVP Feature Set</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-portfolio-accent mr-2">•</span>
                  <span>Activity + HR + Sleep Tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-portfolio-accent mr-2">•</span>
                  <span>Smart AI Dashboard with daily suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-portfolio-accent mr-2">•</span>
                  <span>Meal Prompts (circadian + energy-based)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-portfolio-accent mr-2">•</span>
                  <span>Private and Social Badges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-portfolio-accent mr-2">•</span>
                  <span>Cross-platform Sync (Apple, Android, Garmin, Fitbit)</span>
                </li>
              </ul>
            </div>
            <div className="reveal-animation-right">
              <h3 className="text-2xl font-semibold mb-4">Pricing Strategy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="border-portfolio-accent/20 bg-portfolio-accent/5">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-medium mb-2">Freemium</h4>
                    <p className="text-gray-600 mb-4">Core features free</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-portfolio-accent mr-2">✓</span>
                        <span>Basic tracking</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-portfolio-accent mr-2">✓</span>
                        <span>Limited AI insights</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-portfolio-accent mr-2">✓</span>
                        <span>Social features</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-portfolio-purple/20 bg-portfolio-purple/5">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-medium mb-2">Premium</h4>
                    <p className="text-gray-600 mb-4">£7.99/month</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-portfolio-purple mr-2">✓</span>
                        <span>Advanced tracking</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-portfolio-purple mr-2">✓</span>
                        <span>Deeper AI insights</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-portfolio-purple mr-2">✓</span>
                        <span>Personalized training</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section ref={impactRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-3xl font-bold mb-4 text-portfolio-accent">Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Results and future potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-4">Short-Term Results</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <p className="font-medium text-portfolio-accent mb-1">Engagement</p>
                  <p className="text-gray-600">Better user engagement with AI suggestions</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <p className="font-medium text-portfolio-accent mb-1">User Experience</p>
                  <p className="text-gray-600">Less friction around manual logging</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <p className="font-medium text-portfolio-accent mb-1">Satisfaction</p>
                  <p className="text-gray-600">Improved emotional satisfaction</p>
                </div>
              </div>
            </div>
            <div className="reveal-animation-right">
              <h3 className="text-2xl font-semibold mb-4">Long-Term Potential</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <p className="font-medium text-portfolio-purple mb-1">Preventative Care</p>
                  <p className="text-gray-600">Drives preventative care behavior</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <p className="font-medium text-portfolio-purple mb-1">Stress Management</p>
                  <p className="text-gray-600">Supports stress and burnout prevention</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <p className="font-medium text-portfolio-purple mb-1">Early Intervention</p>
                  <p className="text-gray-600">Enables early intervention via personalized insights</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <p className="font-medium text-portfolio-purple mb-1">Future Tech</p>
                  <p className="text-gray-600">Foundation for future wearables and deeper health tech integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section ref={ctaRef} className="py-16 md:py-20">
        <ProjectCta 
          title="Next Project"
          description="Explore more of my work"
          primaryButtonText="View MedicAir"
          primaryButtonLink="/MedicAir"
          secondaryButtonText="View All Projects"
          secondaryButtonLink="/works"
        />
      </section>

      <Footer />
    </div>
  );
};

export default Thrive;
