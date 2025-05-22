
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectCta from "@/components/ProjectCta";
import TwoColumnTextSection from "@/components/TwoColumnTextSection";
import DesignProcessScroller from "@/components/DesignProcessScroller";

const Challenge = () => {
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

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Similar to Urban Sprout */}
      <section className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Works", href: "/works" },
                { label: "Challenge", isCurrent: true }
              ]} 
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-animation">
              <span className="text-portfolio-accent font-medium mb-4 inline-block">
                Design Challenge
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Digital Product Design Challenge
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod metus vel sem bibendum, ut consectetur massa feugiat. Proin bibendum arcu vitae urna fermentum, at sollicitudin lorem efficitur.
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
              </div>
            </div>

            <div className="reveal-animation-right relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Challenge hero image"
                  className="rounded-xl shadow-xl w-full object-cover h-[500px]"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-md -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Goal</h3>
              <p className="text-gray-600">
                Improve usability, accessibility, and visual coherence while building a functional clickable prototype.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Role</h3>
              <p className="text-gray-600">
                Lead UX Designer
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Timeline</h3>
              <p className="text-gray-600">
                2 Week Design Challenge
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Exploration Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-portfolio-accent">Project Exploration</h2>
            <p className="text-lg text-gray-700 mb-8">
              A deep dive into the design process and key decisions that shaped the challenge solution.
            </p>
            <DesignProcessScroller
              images={[
                "https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
                "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
                "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                "https://images.unsplash.com/photo-1581291518856-8b0c42abecd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Analysis Section - From SONAR Dashboard */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="case-study-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 reveal-animation">Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal-animation order-2 lg:order-1">
              <Card className="overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="Snapshot of the visual audit" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 italic">Snapshot of the visual audit</p>
                </div>
              </Card>
            </div>
            <div className="reveal-animation order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4 text-portfolio-purple">The Original Interface Flaws</h3>
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
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Low accessibility (poor contrast, missing labels)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* My Plan Section */}
      <TwoColumnTextSection
        title="My Plan"
        leftColumnContent={
          <div>
            <ul className="space-y-3 text-gray-700 mb-6">
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
              <li className="flex items-start">
                <span className="mr-2 text-portfolio-purple">•</span>
                <span>Deliver a clickable prototype that simulates a real user flow</span>
              </li>
            </ul>
          </div>
        }
        rightColumnContent={
          <Card className="overflow-hidden">
            <AspectRatio ratio={16/9}>
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Visual roadmap for the redesign process" 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <div className="p-4 bg-gray-50">
              <p className="text-sm text-gray-500 italic">Visual roadmap for the redesign process</p>
            </div>
          </Card>
        }
        bgClass="bg-white"
      />

      {/* Dashboard Redesign Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="case-study-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 reveal-animation">Dashboard Redesign</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal-animation order-2 lg:order-1">
              <Card className="overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <img 
                    src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="Screenshot of redesigned dashboard" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 italic">Screenshot of redesigned dashboard</p>
                </div>
              </Card>
            </div>
            <div className="reveal-animation order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4 text-portfolio-purple">The New Design Features</h3>
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
      </section>

      {/* UI & Color Palette Section */}
      <TwoColumnTextSection
        title="UI & Color Palette"
        leftColumnContent={
          <div>
            <p className="mb-6 text-gray-700">
              A fresh but familiar color palette improves clarity, mood, and brand alignment:
            </p>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="mr-2 text-portfolio-purple">•</span>
                <span>Reset: green → orange (warmth, optimism)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-portfolio-purple">•</span>
                <span>Secure: burgundy → adjusted for a more neutral, trustable tone</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-portfolio-purple">•</span>
                <span>Text & neutrals: updated for better contrast and readability</span>
              </li>
            </ul>
          </div>
        }
        rightColumnContent={
          <Card className="overflow-hidden">
            <AspectRatio ratio={16/9}>
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Color theory-driven palette" 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <div className="p-4 bg-gray-50">
              <p className="text-sm text-gray-500 italic">Color theory-driven palette</p>
            </div>
          </Card>
        }
        bgClass="bg-white"
      />

      {/* Components & Systems Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="case-study-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 reveal-animation">Components & Systems</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal-animation">
              <Card className="overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <img 
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="Figma component set with variants" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 italic">Figma component set with variants</p>
                </div>
              </Card>
            </div>
            <div className="reveal-animation">
              <h3 className="text-2xl font-bold mb-4 text-portfolio-purple">Reusable UI Components</h3>
              <p className="mb-4 text-gray-700">I designed reusable UI components including:</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Buttons (default, hover, active)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Input fields with labels and helper text</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Appointment cards</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Navigation items with clear text</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Modals for confirmations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Insights & Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="case-study-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 reveal-animation">Insights & Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="reveal-animation">
              <h3 className="text-2xl font-bold mb-4 text-portfolio-purple">Methods</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Heuristic analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>NHS accessibility principles</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Visual hierarchy theory</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Gestalt grouping</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Designing from real-world constraints</span>
                </li>
              </ul>
            </div>
            <div className="reveal-animation">
              <h3 className="text-2xl font-bold mb-4 text-portfolio-purple">Key Insights</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Small inconsistencies create large friction</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Color and layout choices directly affect usability</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-portfolio-purple">•</span>
                  <span>Designing for real data creates empathy and effectiveness</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Improvements Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="case-study-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 reveal-animation">Accessibility Improvements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="reveal-animation">
              <Card className="h-full p-6">
                <h3 className="text-xl font-bold mb-3 text-portfolio-purple">Touch & Navigation</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Touch targets ≥ 24px</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Proper component spacing</span>
                  </li>
                </ul>
              </Card>
            </div>
            <div className="reveal-animation">
              <Card className="h-full p-6">
                <h3 className="text-xl font-bold mb-3 text-portfolio-purple">Visual Design</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Improved contrast and type hierarchy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Labeled elements</span>
                  </li>
                </ul>
              </Card>
            </div>
            <div className="reveal-animation">
              <Card className="h-full p-6">
                <h3 className="text-xl font-bold mb-3 text-portfolio-purple">User Flow</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Streamlined login flow and form inputs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-portfolio-purple">•</span>
                    <span>Removed redundant actions</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Reflection Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="case-study-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 reveal-animation">Real-World Reflection</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6 reveal-animation">
              This challenge mirrored a real-world scenario with a limited brief and tight scope. It helped me:
            </p>
            <ul className="space-y-3 text-gray-700 mb-8 reveal-animation">
              <li className="flex items-start">
                <span className="mr-2 text-portfolio-purple">•</span>
                <span>Prioritize improvements with speed</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-portfolio-purple">•</span>
                <span>Work within ambiguity</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-portfolio-purple">•</span>
                <span>Think systemically about UX and UI cohesion</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-portfolio-purple">•</span>
                <span>Build usable and polished design assets under pressure</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <ProjectCta
        title="Ready to see more projects?"
        description="Explore my other case studies to see how I approach different design challenges."
        primaryButtonText="View more projects"
        primaryButtonLink="/works"
        secondaryButtonText="Get in touch"
        secondaryButtonLink="/about"
      />
      
      <Footer />
    </div>
  );
};

export default Challenge;
