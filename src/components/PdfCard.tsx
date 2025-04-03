
import React from "react";
import { Document } from "../types";
import { FileText, Download, Trash } from "lucide-react";
import { useDocuments } from "../context/DocumentContext";

interface PdfCardProps {
  document: Document;
  showDelete?: boolean;
}

const PdfCard: React.FC<PdfCardProps> = ({ document, showDelete = false }) => {
  const { removeDocument } = useDocuments();
  
  const formattedDate = document.dateAdded.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${document.title}"?`)) {
      removeDocument(document.id);
    }
  };

  return (
    <a
      href={document.fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-eco-green-dark border border-gray-200 dark:border-eco-green-medium rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="p-4 flex items-start">
        <div className="mr-3 mt-1">
          <FileText className="h-8 w-8 text-eco-blue-dark hover:scale-110 transition-transform duration-200" />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-lg text-eco-green-dark dark:text-eco-green-light mb-1">
            {document.title}
          </h3>
          {document.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              {document.description}
            </p>
          )}
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Added: {formattedDate}
            </span>
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-eco-blue-dark dark:text-eco-blue-light hover:scale-125 transition-transform duration-200" />
              {showDelete && (
                <button 
                  onClick={handleDelete} 
                  className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transform hover:rotate-12 transition-all duration-200"
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default PdfCard;
