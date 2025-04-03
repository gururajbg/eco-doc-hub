
import React from "react";
import Navbar from "../components/Navbar";
import PdfCard from "../components/PdfCard";
import { useDocuments } from "../context/DocumentContext";
import { Battery } from "lucide-react";

const BatteryRules: React.FC = () => {
  const { documents } = useDocuments();
  const batteryDocuments = documents.filter((doc) => doc.category === "battery");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 dark:bg-eco-green-medium/10">
        <div className="eco-container">
          <div className="flex items-center mb-8">
            <Battery className="h-10 w-10 mr-3 text-eco-blue-dark dark:text-eco-blue-light" />
            <h1 className="page-title">Battery Rules and Regulations</h1>
          </div>
          
          <div className="mb-8">
            <h2 className="section-title">About Battery Management</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Batteries contain various chemicals and metals that can harm the environment if not properly 
              handled and disposed of. Proper battery management is essential for environmental protection 
              and resource conservation.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Different types of batteries require different handling procedures:
            </p>
            
            <div className="bg-white dark:bg-eco-green-dark rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-lg font-medium text-eco-blue-dark dark:text-eco-blue-light mb-3">Key Battery Categories</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-200">
                <li>Lead-acid batteries (car batteries)</li>
                <li>Lithium-ion batteries (electronics, EVs)</li>
                <li>Nickel-cadmium batteries (power tools)</li>
                <li>Alkaline batteries (common household)</li>
                <li>Button cell batteries (watches, hearing aids)</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-eco-green-dark rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-lg font-medium text-eco-blue-dark dark:text-eco-blue-light mb-3">Safety Guidelines</h3>
              <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-200">
                <li>Store batteries in a cool, dry place</li>
                <li>Keep batteries in original packaging until ready to use</li>
                <li>Never mix old and new batteries</li>
                <li>Do not dispose of batteries in fire</li>
                <li>Tape battery terminals before disposal</li>
                <li>Take batteries to designated collection points</li>
              </ol>
            </div>
          </div>
          
          <h2 className="section-title">Battery Regulations Documents</h2>
          {batteryDocuments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {batteryDocuments.map((doc) => (
                <PdfCard key={doc.id} document={doc} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No battery regulation documents available yet.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <footer className="bg-eco-green-dark text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Eco-Doc Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BatteryRules;
