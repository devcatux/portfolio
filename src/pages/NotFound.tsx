
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <SearchX className="h-24 w-24 text-portfolio-purple animate-pulse" />
            <span className="absolute top-0 right-0 bg-portfolio-accent text-white text-lg font-bold rounded-full h-10 w-10 flex items-center justify-center">
              ?
            </span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 pink-gradient-text">404</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Oops! This page seems to have wandered off
        </p>
        
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          The page you're looking for might have been moved, deleted, or possibly
          never existed. Let's get you back on track.
        </p>
        
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
          <Button 
            variant="default" 
            size="lg" 
            className="group"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Return Home</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            asChild
          >
            <Link to="/works">
              <span>Browse Projects</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-16 text-sm text-gray-500">
        <p>Looking for something specific? <Link to="/contact" className="text-portfolio-purple hover:underline">Get in touch</Link></p>
      </div>
    </div>
  );
};

export default NotFound;
