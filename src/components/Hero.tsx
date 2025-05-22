import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-portfolio-accentLight/10 to-[#F0EEF9]/5 -z-10" />
      <div className="container mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="pt-24 lg:pt-42 xl:pt-48">
            <div className="lg:text-left">
              <span className="block text-portfolio-accent font-medium tracking-wider mb-1">KAŚKA DESIGN</span>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Design-driven</span>
                <span className="block text-portfolio-accent">digital products</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
                Crafting innovative digital experiences that solve real problems
                and delight users through thoughtful design and robust development.
              </p>
              <div className="mt-8 sm:mt-10 flex gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/works')}
                >
                  <span>View My Work</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/about')}
                >
                  <span>About Me</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/images/home.jpg"
          alt="Home Hero"
        />
        <div className="absolute top-0 left-0 w-full" style={{
          height: '64px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 80%, transparent 100%)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          pointerEvents: 'none',
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent lg:from-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
