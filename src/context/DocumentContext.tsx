
import React, { createContext, useContext, useState, useEffect } from "react";
import { Document } from "../types";
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface DocumentContextType {
  documents: Document[];
  addDocument: (document: Document, file: File) => void;
  removeDocument: (id: string) => void;
  getDocumentUrl: (id: string) => Promise<string | null>;
}

interface DocumentDB extends DBSchema {
  documents: {
    key: string;
    value: {
      id: string;
      title: string;
      description: string;
      category: "e-waste" | "battery";
      dateAdded: Date;
      file: File;
    };
  };
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [db, setDb] = useState<IDBPDatabase<DocumentDB> | null>(null);

  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB<DocumentDB>('documentsDB', 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('documents')) {
              db.createObjectStore('documents', { keyPath: 'id' });
            }
          },
        });
        
        // Correctly set the database
        setDb(database);

        // Load document metadata from IndexedDB
        const tx = database.transaction('documents', 'readonly');
        const store = tx.objectStore('documents');
        const allDocs = await store.getAll();
        
        setDocuments(allDocs.map(doc => ({
          ...doc,
          fileUrl: URL.createObjectURL(doc.file)
        })));
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
      }
    };

    initDB();
  }, []);

  const addDocument = async (document: Document, file: File) => {
    if (!db) return;

    try {
      const tx = db.transaction('documents', 'readwrite');
      const store = tx.objectStore('documents');
      
      // Store the file in IndexedDB
      await store.put({
        ...document,
        file
      });

      // Update the documents state with the new document
      setDocuments(prev => [...prev, {
        ...document,
        fileUrl: URL.createObjectURL(file)
      }]);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const removeDocument = async (id: string) => {
    if (!db) return;

    try {
      const tx = db.transaction('documents', 'readwrite');
      const store = tx.objectStore('documents');
      
      // Get the document to revoke its URL
      const doc = await store.get(id);
      if (doc && doc.file) {
        // No need to revoke URL for items we just loaded from IndexedDB
      }

      // Remove from IndexedDB
      await store.delete(id);

      // Update the documents state
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Error removing document:', error);
    }
  };

  const getDocumentUrl = async (id: string): Promise<string | null> => {
    if (!db) return null;

    try {
      const tx = db.transaction('documents', 'readonly');
      const store = tx.objectStore('documents');
      const doc = await store.get(id);
      
      if (doc && doc.file) {
        return URL.createObjectURL(doc.file);
      }
      return null;
    } catch (error) {
      console.error('Error getting document URL:', error);
      return null;
    }
  };

  return (
    <DocumentContext.Provider value={{ documents, addDocument, removeDocument, getDocumentUrl }}>
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
