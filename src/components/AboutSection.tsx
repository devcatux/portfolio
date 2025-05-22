import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gray-50 rounded-tr-md"></div>
      </div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative reveal-animation">
            <img
              src="/images/designing.jpg"
              alt="Designing with Purpose"
              className="rounded-md shadow-xl relative z-10 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/10 rounded-md"></div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-24 bg-portfolio-accent rounded-md -z-10"></div>
          </div>
          
          <div className="reveal-animation-right">
            <span className="text-portfolio-accent font-medium tracking-wider mb-2 block">ABOUT ME</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Designing with Purpose</h2>
            <p className="text-gray-600 mb-6 text-lg">
              I'm a product designer and developer with experience
              creating digital products that solve real problems for users and businesses.
            </p>
            <p className="text-gray-600 mb-8">
              My approach combines strategic thinking with design craftsmanship
              to create products that are not only visually appealing but also
              functional and intuitive.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-4 rounded-md shadow-sm relative overflow-hidden group">
                
                
                <div className="relative z-10">
                <h4 className="font-bold text-xl text-portfolio-accent mb-2">5+ years</h4>
                <p className="text-gray-600">in Product Management & Strategy</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm relative overflow-hidden group">
                
                
                <div className="relative z-10">
                <h4 className="font-bold text-xl text-portfolio-accent mb-2">100+</h4>
                <p className="text-gray-600">Usability Tests Conducted</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-bold text-xl text-portfolio-accent mb-2">3</h4>
                  <p className="text-gray-600">Products Created & Owned</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-bold text-xl text-portfolio-accent mb-2">∞</h4>
                  <p className="text-gray-600">Ideas</p>
                </div>
              </div>
            </div>
            
            <Button 
              variant="tertiary"
              size="lg"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
