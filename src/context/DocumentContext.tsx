
import React, { createContext, useContext, useState } from "react";
import { Document } from "../types";

interface DocumentContextType {
  documents: Document[];
  addDocument: (document: Document) => void;
  removeDocument: (id: string) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "E-Waste Management Guidelines",
      category: "e-waste",
      fileUrl: "/sample/e-waste-guidelines.pdf",
      description: "Official guidelines for managing electronic waste",
      dateAdded: new Date("2023-01-15")
    },
    {
      id: "2",
      title: "Computer Recycling Procedure",
      category: "e-waste",
      fileUrl: "/sample/computer-recycling.pdf",
      description: "Standard procedure for recycling computer equipment",
      dateAdded: new Date("2023-02-20")
    },
    {
      id: "3",
      title: "Battery Disposal Regulations",
      category: "battery",
      fileUrl: "/sample/battery-disposal.pdf",
      description: "Latest regulations for disposing batteries",
      dateAdded: new Date("2023-03-10")
    },
    {
      id: "4",
      title: "Lithium Battery Handling Manual",
      category: "battery",
      fileUrl: "/sample/lithium-battery-manual.pdf",
      description: "Safety procedures for handling lithium batteries",
      dateAdded: new Date("2023-04-05")
    }
  ]);

  const addDocument = (document: Document) => {
    setDocuments(prev => [...prev, document]);
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <DocumentContext.Provider value={{ documents, addDocument, removeDocument }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
};
