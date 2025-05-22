import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScrollingImagesSection from "@/components/ScrollingImagesSection";
import Breadcrumbs from "../components/Breadcrumbs";
import DesignProcessScroller from "@/components/DesignProcessScroller";
import Services from "./Services";

const About = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  
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

  useEffect(() => {
    const container = scrollContainerRef.current;
    const track = scrollTrackRef.current;
    if (!container || !track) return;

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown.current = true;
      container.style.cursor = 'grabbing';
      startX.current = e.pageX - container.offsetLeft;
      scrollLeft.current = track.scrollLeft;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      container.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX.current) * 2;
      track.style.transform = `translateX(${walk}px)`;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const experiences = [
    {
      role: "Freelance Product Designer",
      company: "",
      period: "2025",
      description: "Product design freelance work and volunteering as a UX/UI Designer at the Scottish Tech Army.",
    },
    {
      role: "Founder, Product Manager & QA",
      company: "",
      period: "2019 - 2024",
      description: "Founded and led the development of 3 digital products, wearing many hats across product strategy, UX/UI design, and quality assurance.",
    },
    {
      role: "Product Design",
      company: "",
      period: "2018",
      description: "Led projects from concept to fully developed mobile and web applications, focusing on user-centered design and product-market fit.",
    }
  ];

  const education = [
    {
      degree: "Master of Arts in Philosophy",
      institution: "University of Aberdeen",
      year: "",
    },
  ];

  const scrollImages = [
    "/images/ski.jpeg",
    "/images/climbing1.png",
    "/images/sup-vid.gif", 
    "/images/foraging.jpg",
    "/images/sun.png",
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2503&q=80",
      alt: "Rock climbing in nature",
      title: "Adventure & Challenge",
      subtitle: "Finding inspiration in the great outdoors"
    },
    {
      url: "https://images.unsplash.com/photo-1601224335112-b74158e231c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Mountain landscape",
      title: "Natural Beauty",
      subtitle: "Drawing from nature's patterns"
    },
    {
      url: "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Sunrise over mountains",
      title: "Natural Light",
      subtitle: "Capturing the perfect moment"
    },
    {
      url: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80",
      alt: "Rock climbing close-up",
      title: "Detail & Texture",
      subtitle: "Finding beauty in the details"
    },
    {
      url: "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80",
      alt: "Mountain vista",
      title: "Expansive Views",
      subtitle: "Broadening perspectives through nature"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "About", isCurrent: true }
              ]} 
            />
          </div>
          
         
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="pb-16 md:pb-24 bg-gradient-to-br from-[#F1F0F7] to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Hello, I'm <span className="text-portfolio-accent">Kaśka</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Product designer and developer passionate about creating meaningful digital experiences that solve real problems.
              </p>
            </div>
            <div className="animate-fade-in-right delay-200">
              <div className="relative">
                <img
                  src="/images/sup-pic.png"
                  alt="Katarzyna - Product Designer & Developer"
                  className="rounded-md shadow-lg relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-2/3 bg-portfolio-accent rounded-md -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Get to Know Me Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-portfolio-blue">Get to Know Me</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Profile Picture - Larger cell spanning 2 rows */}
            <div className="md:row-span-2 md:col-span-1 bg-gradient-to-br from-[#B8B2E8]/20 to-[#E8E5F8] rounded-md p-4 sm:p-6 shadow-md reveal-animation h-auto md:h-[33.5rem]">
              <div className="h-full flex flex-col items-center justify-center">
                <div className="relative w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 rounded-full overflow-hidden mb-4 sm:mb-6 border-4 border-white shadow-md">
                  <img 
                    src="/images/pic.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-center">Katarzyna</h3>
                <p className="text-gray-600 text-center mb-4">Product Designer & Developer</p>
                <div className="bg-white/80 p-3 sm:p-4 rounded-md mb-4 shadow-sm">
                  <p className="text-gray-700 text-sm">
                    I specialize in end-to-end product creation—combining UX/UI design with low-code and front-end development to quickly build user-focused, goal-driven digital products.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Skills Cell - spans 2 columns with arrow layout */}
            <div className="sm:col-span-2 md:col-span-2 bg-white rounded-md p-4 sm:p-6 shadow-md reveal-animation-right relative overflow-hidden group h-auto sm:h-64">
              <img 
                src={galleryImages[2].url} 
                alt={galleryImages[2].alt}
                className="absolute inset-0 w-full h-full object-cover opacity-10"
              />
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-portfolio-blue">Skills</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Business Analysis</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Value Proposition Design</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">UX/UI Design</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">User Research</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Journey Mapping</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">User Flows</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Wireframing</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Prototyping</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Usability Testing</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Data-Driven Design</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Accessibility</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Agile</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Figma</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Typography</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Bootstrap</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">GitHub</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">HTML</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">CSS</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">JavaScript</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">Low-Code/No-Code</span>
                  <span className="px-2 sm:px-3 py-1 bg-[#F0EEF9] text-portfolio-blue rounded-full text-xs md:text-sm">AWS</span>
                </div>
              </div>
            </div>
            
            {/* Quote Cell - narrower */}
            <div className="sm:col-span-1 md:col-span-1 bg-portfolio-accent text-white rounded-md p-4 sm:p-6 shadow-md reveal-animation relative overflow-hidden group h-auto sm:h-64">
              <div className="relative z-10">
                <svg className="w-8 sm:w-10 h-8 sm:h-10 text-white/20 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-base sm:text-lg mb-3 sm:mb-4">Fall in love with the problem, not the solution.</p>
                <p className="font-medium">— Uri Levine</p>
              </div>
            </div>
            
            {/* Facts Cell - back to 1 column with shorter text */}
            <div className="bg-gray-100 text-portfolio-blue rounded-md p-4 sm:p-6 shadow-md reveal-animation-right relative overflow-hidden group h-auto sm:h-64">
              <img 
                src={galleryImages[3].url} 
                alt={galleryImages[3].alt}
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
              />
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quick Facts</h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2 text-portfolio-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                    </span>
                    <span>Based in Glasgow, UK</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-portfolio-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 0 0-8 8a1 1 0 0 0 2 0c0-3.86 3.14-7 7-7a1 1 0 0 0 0-2ZM4.5 7.5a1 1 0 0 0 0 2H5a1 1 0 0 0 0-2h-.5Z"/>
                      </svg>
                    </span>
                    <span>Former startup founder</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-portfolio-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
                      </svg>
                    </span>
                    <span>3 digital products owned</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-portfolio-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                      </svg>
                    </span>
                    <span>Climate & health tech fan</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-portfolio-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
                        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
                      </svg>
                    </span>
                    <span>AI enthusiast</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Food Image Box - now spans 2 columns */}
            <div className="sm:col-span-2 md:col-span-2 reveal-animation">
              <div className="h-auto sm:h-64 overflow-hidden rounded-md shadow-md transition-all duration-300 hover:shadow-lg group">
                <div className="relative h-full">
                  <img 
                    src="/images/sup-vid.gif" 
                    alt="Food and Cooking" 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Food</h3>
                      <p className="text-sm sm:text-base">As a former chef and a foodie, I enjoy foraging, experimenting with new recipes, baking, and getting creative in the kitchen.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current Project Cell - spans 2 columns */}
            <div className="sm:col-span-2 md:col-span-2 reveal-animation">
              <div className="h-auto sm:h-64 overflow-hidden rounded-md shadow-md transition-all duration-300 hover:shadow-lg group">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="w-full sm:w-1/2 relative h-48 sm:h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                      alt="Current project"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 p-4 bg-white flex flex-col justify-center">
                    <h3 className="text-lg font-semibold mb-2 text-portfolio-blue">Current Projects</h3>
                    <p className="text-gray-700 text-sm">I'm currently working with a Scottish startup in the education sector (UX, UI design and front-end) and finalizing design for an impact investing website (UX and UI design).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Image Box - moved to last position */}
            <div className="reveal-animation">
              <div className="h-auto sm:h-64 overflow-hidden rounded-md shadow-md transition-all duration-300 hover:shadow-lg group">
                <div className="relative h-full">
                  <img 
                    src="/images/climbing1.png" 
                    alt="Health and Wellness" 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const img = e.currentTarget;
                      console.error('Image failed to load:', img.src);
                      img.onerror = null;
                      img.src = '/images/foraging.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Learning</h3>
                      <p className="text-sm sm:text-base">Audiobook and podcast addict, always listening to content on health and wellness, biohacking, tech, and psychology.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Health & Wellbeing - with matched height */}
            <div className="reveal-animation">
              <div className="h-auto sm:h-64 overflow-hidden rounded-md shadow-md transition-all duration-300 hover:shadow-lg group">
                <div className="relative h-64 sm:h-full">
                  <img 
                    src="/images/sun.png" 
                    alt="Fitness and Yoga" 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Health & Wellbeing</h3>
                      <p className="text-sm sm:text-base">I've been practicing yoga for 16 years and currently learning inversions. Most days, I'm at the gym, climbing wall, or working out outdoors.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    

      {/* Bio Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="animate-fade-in-left delay-400">
              <h2 className="text-3xl font-bold mb-6">My Story</h2>
              <div className="prose prose-lg">
                <p className="mb-4">
                  As a Co-Founder of digital products, I learned to navigate ambiguity with confidence—balancing strategic planning with adaptability, pivoting when needed, and making data-informed decisions. Wearing many hats gave me a well-rounded perspective on solving real-world challenges.
                </p>
                <p className="mb-4">
                  Before tech, I was a chef—designing beautiful dishes and leading teams in high-pressure kitchens. That experience sharpened my resilience, fast decision-making, and creative problem-solving under fire.
                </p>
                <p>
                  In 2024, I focused on upskilling, completing intensive programs in UX/UI design, testing, front-end development, cloud computing, and software development. I specialize in end-to-end product creation—combining design, low-code development, and coding to build user-focused digital products efficiently.
                </p>
              </div>
            </div>

            <div className="animate-fade-in-right delay-600">
              <h2 className="text-3xl font-bold mb-6">My Approach</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-portfolio-blue">
                    Research & Strategy
                  </h3>
                  <p className="text-gray-700">
                    Understanding user needs and business goals to craft strategic solutions.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-portfolio-blue">
                    Design & Prototype
                  </h3>
                  <p className="text-gray-700">
                    Iterative design focused on usability, aesthetics, and accessibility.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-portfolio-blue">
                    Develop & Deliver
                  </h3>
                  <p className="text-gray-700">
                    Bringing ideas to life with clean code and attention to detail.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-portfolio-blue">
                    Measure & Iterate
                  </h3>
                  <p className="text-gray-700">
                    Continuous improvements driven by data and user feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Inspiration Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <DesignProcessScroller 
            title="Where You'll Find Me"
            subtitle="When I'm not designing or building"
            images={[
              "/images/1.png",
              "/images/2.png",
              "/images/ski.jpg",
              "/images/3.png",
              "/images/climbing 1.png",
              "/images/4.png",
            ]}
          />
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Experience & Education</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="reveal-animation">
              <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue">Work Experience</h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-portfolio-accent">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-portfolio-accent"></div>
                    <h4 className="text-xl font-semibold">{exp.role}</h4>
                    <p className="text-portfolio-blue">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="reveal-animation-right">
              <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue">Education</h3>
              <div className="space-y-8 mb-12">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-portfolio-accent">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-portfolio-accent"></div>
                    <h4 className="text-xl font-semibold">{edu.degree}</h4>
                    <p className="text-portfolio-blue">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl font-semibold mb-6 text-portfolio-blue">Certifications</h3>
              <div className="bg-white p-6 rounded-lg shadow">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3"></span>
                    Full stack Software Development (Edinburgh College)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3"></span>
                    UX/UI Design Re:coded
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3"></span>
                    AWS Cloud Programme
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3"></span>
                    ISTQB Foundation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />


      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-gray-100 rounded-md p-8 md:p-12 text-gray-800 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to work together?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              I'm currently available for freelance projects and full-time opportunities.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Button
                size="lg"
                variant="default"
                asChild
              >
                <a href="mailto:hello@kaska.design">
                  <span>Get in Touch</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="tertiary"
                className="bg-white text-portfolio-blue"
                onClick={() => navigate('/case-study')}
              >
                View My Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
