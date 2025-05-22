
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectCard from "@/components/ProjectCard";

const Works = () => {
  // Projects data
  const projects = [
    {
      id: 1,
      title: "Black Books Air",
      description: "Recruitment saas platform for the hospitality industry.",
      image: "/images/thumbnails/th-bba.png",
      category: "UX, UI, Mobile, Web",
      link: "/BlackBooksAir",
    },
    {
      id: 2,
      title: "Urban Sprout",
      description: "Farm-to-table marketplace that lowers carbon footprint.",
      image: "/images/thumbnails/th-us.png",
      category: "UX, UI, Mobile",
      link: "/UrbanSprout",
    },
    {
      id: 3,
      title: "MedicAir",
      description: "Healthcare booking system for medical professionals.",
      image: "/images/medicair-hero.png",
      category: "UX, UI, Mobile, Web",
      link: "/MedicAir",
    },
    {
      id: 4,
      title: "Thrive",
      description: "AI-Powered personalized health and wellness app for women.",
      image: "/images/thrive/moodboard.png",
      category: "UX, Mobile",
      link: "/Thrive",
    },
    {
      id: 5,
      title: "Sonar",
      description: "Design task for an admin dashboard.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "UX, UI, Web",
      link: "/SonarDashboard",
    },
    {
      id: 6,
      title: "Hackathon: TravelPerk",
      description: "Design challenge to boost the NPS.",
      image: "/images/travelperk-hero.png",
      category: "UX, Mobile",
      link: "/TravelPerkHackathon",
    },
   
  ];

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
      
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Works", isCurrent: true }
              ]} 
            />
          </div>
          
          <div className="text-center mb-16">
            <span className="text-portfolio-purple font-medium mb-4 block">MY PROJECTS</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Portfolio Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore my collection of design projects across various industries and platforms.
              Each project represents a unique challenge and solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project) => (
              <div key={project.id} className="reveal-animation">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  category={project.category}
                  link={project.link}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Works;
