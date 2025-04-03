
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FileText, Battery, ShieldCheck, Leaf } from "lucide-react";
import { fadeIn, scaleIn, slideInFromBottom, slideInFromLeft, slideInFromRight, slideInFromTop, staggeredChildren } from "../lib/animations";

const Index: React.FC = () => {
  const getStaggered = staggeredChildren(fadeIn, 100, 150);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gradient-to-b from-eco-paper to-white dark:from-eco-green-dark dark:to-eco-green-medium">
        <div className="eco-container">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20">
            <div className={`md:w-1/2 mb-8 md:mb-0 ${slideInFromLeft}`}>
              <h1 className="text-4xl md:text-5xl font-bold text-eco-green-dark dark:text-white mb-4">
                Environmental Documentation Hub
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6">
                Access important resources and regulations for e-waste management 
                and battery rules compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/e-waste" className={`${slideInFromBottom} inline-flex items-center bg-eco-green-medium hover:bg-eco-green-dark text-white px-6 py-3 rounded-lg shadow-md transition-colors hover:scale-105 transition-transform duration-200`}>
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  E-Waste Resources
                </Link>
                <Link to="/battery-rules" className={`${slideInFromBottom} delay-150 inline-flex items-center bg-eco-blue-dark hover:bg-eco-blue-light text-white px-6 py-3 rounded-lg shadow-md transition-colors hover:scale-105 transition-transform duration-200`}>
                  <Battery className="mr-2 h-5 w-5" />
                  Battery Regulations
                </Link>
              </div>
            </div>
            <div className={`md:w-1/2 flex justify-center ${slideInFromRight}`}>
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-eco-green-light rounded-full opacity-20 animate-pulse"></div>
                <Leaf className="absolute inset-0 m-auto h-40 w-40 md:h-56 md:w-56 text-eco-green-dark dark:text-eco-green-light animate-bounce animate-duration-[2s]" />
              </div>
            </div>
          </div>
          
          {/* Info Sections */}
          <div className="grid md:grid-cols-2 gap-8 py-12">
            <div className={`${getStaggered(0)} bg-white dark:bg-eco-green-dark rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-eco-green-light dark:bg-eco-green-medium p-3 mr-4">
                  <ShieldCheck className="h-8 w-8 text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-eco-green-dark dark:text-white">E-Waste Management</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                Access critical documentation on electronic waste disposal, recycling procedures, 
                and compliance with environmental regulations.
              </p>
              <Link to="/e-waste" className="text-eco-green-medium dark:text-eco-green-light font-medium hover:underline flex items-center group">
                <span>View documents</span>
                <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className={`${getStaggered(1)} bg-white dark:bg-eco-green-dark rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-eco-blue-dark dark:bg-eco-blue-light p-3 mr-4">
                  <Battery className="h-8 w-8 text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-eco-green-dark dark:text-white">Battery Rules</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                Explore guidelines on proper battery handling, storage, and disposal to ensure 
                regulatory compliance and environmental protection.
              </p>
              <Link to="/battery-rules" className="text-eco-blue-dark dark:text-eco-blue-light font-medium hover:underline flex items-center group">
                <span>View documents</span>
                <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <footer className={`${slideInFromBottom} bg-eco-green-dark text-white py-6`}>
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Eco-Doc Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
