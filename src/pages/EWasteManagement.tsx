
import React from "react";
import Navbar from "../components/Navbar";
import PdfCard from "../components/PdfCard";
import { useDocuments } from "../context/DocumentContext";
import { Recycle } from "lucide-react";

const EWasteManagement: React.FC = () => {
  const { documents } = useDocuments();
  const eWasteDocuments = documents.filter((doc) => doc.category === "e-waste");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 dark:bg-eco-green-medium/10">
        <div className="eco-container">
          <div className="flex items-center mb-8">
            <Recycle className="h-10 w-10 mr-3 text-eco-green-dark dark:text-eco-green-light" />
            <h1 className="page-title">E-Waste Management Resources</h1>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Electronic waste, or e-waste, refers to discarded electrical or electronic devices. 
              Proper e-waste management is crucial for protecting the environment and human health 
              from hazardous materials often found in these products.
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              The resources below provide essential information on e-waste handling, recycling 
              procedures, and regulatory compliance. Click on any document to view or download.
            </p>
          </div>
          
          {eWasteDocuments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {eWasteDocuments.map((doc) => (
                <PdfCard key={doc.id} document={doc} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No e-waste management documents available yet.
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

export default EWasteManagement;
