import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCtaProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const ProjectCta: React.FC<ProjectCtaProps> = ({
  title = "Ready to see more?",
  description = "Explore my other case studies to see how I approach different design challenges.",
  primaryButtonText = "View more projects",
  primaryButtonLink = "/works",
  secondaryButtonText = "Get in touch",
  secondaryButtonLink = "/about",
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 py-20">
      <div className="case-study-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild
              size="lg" 
              className="group bg-portfolio-accent hover:bg-portfolio-accent/90"
            >
              <Link to={primaryButtonLink}>
                {primaryButtonText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-gray-300 hover:bg-gray-100 hover:text-portfolio-blue hover:border-portfolio-blue"
            >
              <Link to={secondaryButtonLink}>
                {secondaryButtonText}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCta; 