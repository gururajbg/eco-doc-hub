import React, { useState } from "react";
import { Document } from "../types";
import { FileText, Download, Trash2 } from "lucide-react";
import { useDocuments } from "../context/DocumentContext";

interface PdfCardProps {
  document: Document;
  showDelete?: boolean;
}

const PdfCard: React.FC<PdfCardProps> = ({ document, showDelete = false }) => {
  const { removeDocument, getDocumentUrl } = useDocuments();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this document?")) {
      removeDocument(document.id);
    }
  };

  const handleCardClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const url = await getDocumentUrl(document.id);
      if (url) {
        // Open the PDF in a new window
        window.open(url, '_blank', 'noopener,noreferrer');
        
        // Revoke the URL after a short delay to ensure the download starts
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-eco-green-dark rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer hover:transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-eco-blue-dark dark:text-eco-blue-light mr-3" />
            <div>
              <h3 className="text-lg font-medium text-eco-green-dark dark:text-white">
                {document.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {document.description}
              </p>
            </div>
          </div>
          {showDelete && (
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Added: {new Date(document.dateAdded).toLocaleDateString()}
          </span>
          <div className="inline-flex items-center text-eco-green-medium hover:text-eco-green-dark transition-colors">
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-eco-green-medium"></div>
            ) : (
              <>
                <Download className="h-4 w-4 mr-1" />
                <span>Open PDF</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
