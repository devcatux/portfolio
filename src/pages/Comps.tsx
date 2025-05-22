import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/LazyImage";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import HorizontalSlider from "@/components/HorizontalSlider";

// TextImg1: Text on right, image on left
const TextImg1 = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
      <div className="relative">
        <LazyImage
          src="/images/urbansprout/discover.png"
          alt="User research insights"
          className="rounded-xl shadow-lg"
        />
        <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
      </div>
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
    </div>
  );
};

// TextImg2: Text on left, image on right
const TextImg2 = () => {
  return (
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
        <div className="absolute -bottom-4 -left-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
      </div>
    </div>
  );
};

// TextImg3: Text with small image carousel
const TextImg3 = () => {
  return (
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
        <Carousel className="w-full max-w-md mx-auto">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <LazyImage
                  src="/images/urbansprout/discover.png"
                  alt="User research insights 1"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <LazyImage
                  src="/images/urbansprout/define.png"
                  alt="User research insights 2"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <LazyImage
                  src="/images/urbansprout/develop.png"
                  alt="User research insights 3"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
        <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10"></div>
      </div>
    </div>
  );
};

// TextImg4: Text with split screen image spilling off screen
const TextImg4 = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
        <div className="lg:pr-12">
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
        <div className="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2 xl:w-2/5">
          <div className="h-full w-full">
            <LazyImage
              src="/images/urbansprout/hero.png"
              alt="Urban Sprout hero image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10 lg:hidden"></div>
        </div>
      </div>
    </div>
  );
};

const Comps = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Component Library
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A collection of reusable text and image components for use across the site.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-12">Text and Image Components</h2>
          
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">1. Text on Right, Image on Left</h3>
            <TextImg1 />
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">2. Text on Left, Image on Right</h3>
            <TextImg2 />
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">3. Text with Image Carousel</h3>
            <TextImg3 />
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">4. Text with Split Screen Image</h3>
            <TextImg4 />
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">5. Horizontal Image Slider with Grey Background</h3>
            <p className="text-gray-600 mb-8">
              A horizontal image slider with grey background and accent-colored navigation arrows.
            </p>
            <HorizontalSlider
              title="Sketches Examples"
              subtitle="Navigate through the sketches using the arrow buttons"
              items={[
                {
                  image: "/images/bba/employer dashboard.svg",
                  alt: "Employer dashboard sketch",
                  caption: "Employer Dashboard - Streamlined management interface"
                },
                {
                  image: "/images/bba/favourite jobs.svg",
                  alt: "Favourite jobs sketch",
                  caption: "Favourite Jobs - Easily track preferred opportunities"
                },
                {
                  image: "/images/bba/employee profile.svg",
                  alt: "Employee profile sketch",
                  caption: "Employee Profile - Showcase skills and experience"
                },
                {
                  image: "/images/bba/guest marketplace.svg",
                  alt: "Guest marketplace sketch",
                  caption: "Guest Marketplace - Discover available positions"
                }
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Comps;
