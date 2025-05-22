
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const ProjectCard = ({ title, description, image, category, link }: ProjectCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full reveal-animation">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-portfolio-accent/80 rounded-full mb-2">
              {category}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="self-end">
          <Button 
            variant="button-link"
            onClick={() => navigate(link)}
          >
            View Case Study
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
