import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, User, FileText } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/85 shadow-md backdrop-blur-xl py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-display font-bold text-portfolio-blue">
          <img src="/images/logo copy.png" alt="Kaska Design Logo" className="h-6 w-auto" />
          KAŚKA DESIGN
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/about"
            className="text-portfolio-blue hover:text-[#7369AF] transition-colors font-medium"
          >
            About
          </Link>
          <Link
            to="/works"
            className="text-portfolio-blue hover:text-[#7369AF] transition-colors font-medium"
          >
            Works
          </Link>
          <Button
            asChild
            variant="default"
          >
            <a href="mailto:hello@kaska.design">Get in Touch</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="h-6 w-6 text-portfolio-blue" />
          ) : (
            <Menu className="h-6 w-6 text-portfolio-blue" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white absolute w-full shadow-lg py-4">
          <div className="flex flex-col space-y-4 px-4">
            <Link
              to="/about"
              className="flex items-center gap-2 text-portfolio-blue py-2 hover:bg-gray-100 px-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} /> About
            </Link>
            <Link
              to="/works"
              className="flex items-center gap-2 text-portfolio-blue py-2 hover:bg-gray-100 px-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              <FileText size={18} /> Works
            </Link>
            <Button
              asChild
              variant="default"
              className="w-full"
            >
              <a href="mailto:hello@kaska.design">Get in Touch</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
