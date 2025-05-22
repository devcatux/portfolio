import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CtaSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-portfolio-blue rounded-xl p-8 md:p-12 lg:p-16 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let's collaborate to create something amazing together. Whether you have a specific project
            in mind or just want to explore possibilities, I'm here to help.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              className="bg-portfolio-accent hover:bg-portfolio-accentLight text-white"
              asChild
            >
              <a href="mailto:hello@kaska.design">Get in Touch</a>
            </Button>
            <Button
              size="lg"
              variant="tertiary"
              onClick={() => navigate('/about')}
            >
              View My Process
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
