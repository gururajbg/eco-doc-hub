
import React from "react";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import PdfCard from "../components/PdfCard";
import { useDocuments } from "../context/DocumentContext";
import { Settings, Archive } from "lucide-react";
import { fadeIn, slideInFromLeft, slideInFromRight, slideInFromTop, staggeredChildren } from "../lib/animations";

const AdminPage: React.FC = () => {
  const { documents } = useDocuments();

  const eWasteDocuments = documents.filter((doc) => doc.category === "e-waste");
  const batteryDocuments = documents.filter((doc) => doc.category === "battery");
  const getStaggered = staggeredChildren(fadeIn, 100, 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 dark:bg-eco-green-medium/10">
        <div className="eco-container">
          <div className={`flex items-center mb-8 ${slideInFromTop}`}>
            <Settings className="h-10 w-10 mr-3 text-gray-700 dark:text-gray-200 animate-spin-slow" />
            <h1 className="page-title">Admin Dashboard</h1>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`md:col-span-1 ${slideInFromLeft}`}>
              <UploadForm />
            </div>
            <div className={`md:col-span-2 ${slideInFromRight}`}>
              <div className="bg-white dark:bg-eco-green-dark rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                <h2 className="text-xl font-semibold text-eco-green-dark dark:text-eco-green-light mb-4">
                  Manage Documents
                </h2>
                
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Archive className="h-5 w-5 mr-2 text-eco-green-medium dark:text-eco-green-light animate-bounce animate-duration-[2s]" />
                    <h3 className="text-lg font-medium text-eco-green-dark dark:text-white">
                      E-Waste Documents ({eWasteDocuments.length})
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {eWasteDocuments.length > 0 ? (
                      eWasteDocuments.map((doc, index) => (
                        <div key={doc.id} className={getStaggered(index)}>
                          <PdfCard document={doc} showDelete={true} />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No e-waste documents available.
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <Archive className="h-5 w-5 mr-2 text-eco-blue-dark dark:text-eco-blue-light animate-bounce animate-duration-[2s] animate-delay-500" />
                    <h3 className="text-lg font-medium text-eco-green-dark dark:text-white">
                      Battery Documents ({batteryDocuments.length})
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {batteryDocuments.length > 0 ? (
                      batteryDocuments.map((doc, index) => (
                        <div key={doc.id} className={getStaggered(index + eWasteDocuments.length)}>
                          <PdfCard document={doc} showDelete={true} />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No battery documents available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-eco-green-dark text-white py-6 animate-in fade-in slide-in-from-bottom duration-500">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Eco-Doc Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
