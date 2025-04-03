import React, { useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { useDocuments } from "../context/DocumentContext";

const UploadForm: React.FC = () => {
  const { addDocument } = useDocuments();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"e-waste" | "battery">("e-waste");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;
    
    setIsSubmitting(true);
    
    const newDoc = {
      id: Date.now().toString(),
      title,
      description,
      category,
      dateAdded: new Date()
    };
    
    addDocument(newDoc, file);
    
    // Reset form
    setTitle("");
    setDescription("");
    setCategory("e-waste");
    setFile(null);
    setIsSubmitting(false);
    
    alert("Document added successfully!");
  };
  
  return (
    <div className="bg-white dark:bg-eco-green-dark rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-eco-green-dark dark:text-eco-green-light mb-4">
        Upload New Document
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-eco-green-medium rounded-md focus:outline-none focus:ring-1 focus:ring-eco-green-medium"
            placeholder="Enter document title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-eco-green-medium rounded-md focus:outline-none focus:ring-1 focus:ring-eco-green-medium"
            placeholder="Enter document description (optional)"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as "e-waste" | "battery")}
            className="w-full px-3 py-2 border border-gray-300 dark:border-eco-green-medium rounded-md focus:outline-none focus:ring-1 focus:ring-eco-green-medium"
          >
            <option value="e-waste">E-Waste Management</option>
            <option value="battery">Battery Rules</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            PDF File *
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-eco-green-medium border-dashed rounded-md">
            {!file ? (
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label className="relative cursor-pointer rounded-md bg-white dark:bg-transparent font-medium text-eco-green-medium hover:text-eco-green-dark">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF up to 10MB</p>
              </div>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-eco-green-medium rounded">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-eco-blue-dark dark:text-white mr-2" />
                    <span className="text-sm truncate max-w-xs">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !title || !file}
            className="w-full bg-eco-green-medium hover:bg-eco-green-dark text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
