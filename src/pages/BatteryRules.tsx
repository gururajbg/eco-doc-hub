
import React from "react";
import Navbar from "../components/Navbar";
import PdfCard from "../components/PdfCard";
import { useDocuments } from "../context/DocumentContext";
import { Battery } from "lucide-react";
import { fadeIn, slideInFromBottom, slideInFromLeft, slideInFromRight, slideInFromTop, staggeredChildren } from "../lib/animations";

const BatteryRules: React.FC = () => {
  const { documents } = useDocuments();
  const batteryDocuments = documents.filter((doc) => doc.category === "battery");
  const getStaggered = staggeredChildren(fadeIn, 100, 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 dark:bg-eco-green-medium/10">
        <div className="eco-container">
          <div className={`flex items-center mb-8 ${slideInFromTop}`}>
            <Battery className="h-10 w-10 mr-3 text-eco-blue-dark dark:text-eco-blue-light animate-pulse" />
            <h1 className="page-title">Battery Rules and Regulations</h1>
          </div>
          
          <div className="mb-8">
            <h2 className={`section-title ${slideInFromLeft}`}>About Battery Management</h2>
            <p className={`text-gray-700 dark:text-gray-200 mb-4 ${fadeIn}`}>
              Batteries contain various chemicals and metals that can harm the environment if not properly 
              handled and disposed of. Proper battery management is essential for environmental protection 
              and resource conservation.
            </p>
            <p className={`text-gray-700 dark:text-gray-200 mb-4 ${fadeIn} delay-100`}>
              Different types of batteries require different handling procedures:
            </p>
            
            <div className={`bg-white dark:bg-eco-green-dark rounded-lg shadow-sm p-6 mb-8 ${slideInFromRight} hover:shadow-lg transition-all duration-300`}>
              <h3 className="text-lg font-medium text-eco-blue-dark dark:text-eco-blue-light mb-3">Key Battery Categories</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-200">
                <li className="animate-fade-in-down delay-[50ms]">Lead-acid batteries (car batteries)</li>
                <li className="animate-fade-in-down delay-[100ms]">Lithium-ion batteries (electronics, EVs)</li>
                <li className="animate-fade-in-down delay-[150ms]">Nickel-cadmium batteries (power tools)</li>
                <li className="animate-fade-in-down delay-[200ms]">Alkaline batteries (common household)</li>
                <li className="animate-fade-in-down delay-[250ms]">Button cell batteries (watches, hearing aids)</li>
              </ul>
            </div>
            
            <div className={`bg-white dark:bg-eco-green-dark rounded-lg shadow-sm p-6 mb-8 ${slideInFromLeft} hover:shadow-lg transition-all duration-300`}>
              <h3 className="text-lg font-medium text-eco-blue-dark dark:text-eco-blue-light mb-3">Safety Guidelines</h3>
              <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-200">
                <li className="animate-fade-in-down delay-[50ms]">Store batteries in a cool, dry place</li>
                <li className="animate-fade-in-down delay-[100ms]">Keep batteries in original packaging until ready to use</li>
                <li className="animate-fade-in-down delay-[150ms]">Never mix old and new batteries</li>
                <li className="animate-fade-in-down delay-[200ms]">Do not dispose of batteries in fire</li>
                <li className="animate-fade-in-down delay-[250ms]">Tape battery terminals before disposal</li>
                <li className="animate-fade-in-down delay-[300ms]">Take batteries to designated collection points</li>
              </ol>
            </div>
          </div>
          
          <h2 className={`section-title ${slideInFromTop}`}>Battery Regulations Documents</h2>
          {batteryDocuments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {batteryDocuments.map((doc, index) => (
                <div key={doc.id} className={getStaggered(index)}>
                  <PdfCard document={doc} />
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${fadeIn}`}>
              <p className="text-gray-500 dark:text-gray-400">
                No battery regulation documents available yet.
              </p>
            </div>
          )}
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

export default BatteryRules;
