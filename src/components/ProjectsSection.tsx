
import React from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectsSection = () => {
  const navigate = useNavigate();
  
  const projects = [
    {
      id: 1,
      title: "Black Books Air",
      description: "Recruitment saas platform for the hospitality industry.",
      image: "/images/thumbnails/th-bba.png",
      category: "UX, UI",
      link: "/BlackBooksAir",
    },
    {
      id: 2,
      title: "Urban Sprout",
      description: "Farm-to-table marketplace that lowers carbon footprint.",
      image: "/images/thumbnails/th-us.png",
      category: "UX, UI",
      link: "/UrbanSprout",
    },
    {
      id: 3,
      title: "Design Challenge",
      description: "Digital product design challenge showcasing problem-solving.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "UX, UI",
      link: "/Challenge",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-portfolio-purple font-medium tracking-wider mb-2 block">SELECTED WORK</span>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          </div>
          <p className="text-gray-600 max-w-md mt-4 md:mt-0">
            Explore some of my recent work across various industries and platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              category={project.category}
              link={project.link}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            variant="tertiary"
            size="lg"
            onClick={() => navigate("/works")}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
