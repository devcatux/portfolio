import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-portfolio-blue text-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">KAŚKA DESIGN</h3>
            <p className="text-gray-300 mb-4">
              Creating digital experiences.
            </p>
            <img src="/images/logo copy.png" alt="Kaska Design Logo" className="h-6 w-auto opacity-50" />
          </div>
          
          <div>
            <h4 className="text-xl font-medium mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/works" className="text-gray-300 hover:text-white transition-colors">Works</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-medium mb-4">Get in Touch</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@kaska.design" className="text-gray-300 hover:text-[#7369AF] transition-colors">
                  Email
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/kazimierczuk/" className="text-gray-300 hover:text-[#7369AF] transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 KK. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
