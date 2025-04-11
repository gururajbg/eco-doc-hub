import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, Maximize, X, Save, RefreshCw } from "lucide-react";
import { pipeline } from "@huggingface/transformers";
import { DetectedObject, DetectionResult } from "../types";
import { useToast } from "@/hooks/use-toast";

const ObjectDetection: React.FC = () => {
  const { toast } = useToast();
  const [mode, setMode] = useState<"webcam" | "upload" | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [detector, setDetector] = useState<any>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelSource, setModelSource] = useState<"default" | "custom">("default");
  const [modelVersion, setModelVersion] = useState<string>("YOLOv12");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        
        let modelId = "Xenova/yolos-tiny";
        
        if (modelSource === "custom") {
          modelId = "/models/best_web_model";
          console.log("Loading YOLOv12 model from local path:", modelId);
          toast({
            title: "Loading YOLOv12 Model",
            description: "Initializing your custom YOLOv12 model. This may take a moment.",
            duration: 5000,
          });
        } else {
          console.log("Loading default model from:", modelId);
          toast({
            title: "Loading Default Model",
            description: "Initializing the default detection model.",
            duration: 3000,
          });
        }
        
        const objectDetector = await pipeline(
          "object-detection", 
          modelId,
          { 
            device: "cpu",
            quantized: modelSource === "custom" ? false : true,
          }
        );
        
        setDetector(objectDetector);
        console.log("Object detection model loaded successfully");
        
        toast({
          title: "Model Loaded Successfully",
          description: modelSource === "custom" 
            ? "Your YOLOv12 model is ready to use" 
            : "Default detection model is ready",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error loading object detection model:", error);
        
        toast({
          title: "Model Loading Failed",
          description: "Could not load the detection model. Falling back to default.",
          variant: "destructive",
          duration: 5000,
        });
        
        if (modelSource === "custom") {
          setModelSource("default");
          // Try loading the default model
          loadModel();
        }
      } finally {
        setIsModelLoading(false);
      }
    };

    loadModel();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [modelSource, toast]);

  const toggleModelSource = () => {
    setModelSource(prev => prev === "default" ? "custom" : "default");
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream;
      }
      
      setMode("webcam");
    } catch (error) {
      console.error("Error accessing webcam:", error);
      alert("Unable to access the webcam. Please check permissions and try again.");
    }
  };

  const stopWebcam = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setMode(null);
    setDetectedObjects([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setMode("upload");
      setDetectedObjects([]);
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current && mode === "webcam") {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg");
      }
    }
    return null;
  };

  const detectObjects = async () => {
    if (!detector) {
      toast({
        title: "Model Not Ready",
        description: "Please wait for the model to finish loading.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      setIsDetecting(true);
      
      let imageToProcess: string | HTMLImageElement | null = null;
      
      if (mode === "webcam") {
        imageToProcess = captureFrame();
      } else if (mode === "upload" && imageUrl) {
        imageToProcess = imageUrl;
      }
      
      if (imageToProcess) {
        const detectionOptions = {
          threshold: modelSource === "custom" ? 0.25 : 0.5,
          percentage: true,
          segmentation: modelSource === "custom",
          keypoints: modelSource === "custom",
        };
        
        console.log("Running detection with options:", detectionOptions);
        
        const results = await detector(imageToProcess, detectionOptions);
        
        console.log("Detection results:", results);
        
        const formattedResults = results.map((obj: any) => ({
          label: obj.label,
          score: obj.score,
          box: {
            xmin: obj.box.xmin,
            ymin: obj.box.ymin,
            xmax: obj.box.xmax,
            ymax: obj.box.ymax
          },
          ...(obj.segmentation && { segmentation: obj.segmentation }),
          ...(obj.keypoints && { keypoints: obj.keypoints }),
        }));
        
        setDetectedObjects(formattedResults);
        
        if (canvasRef.current) {
          drawBoundingBoxes(results);
        }
        
        if (formattedResults.length === 0) {
          toast({
            title: "No Objects Detected",
            description: "Try adjusting the camera angle or using a different image.",
            duration: 3000,
          });
        } else {
          toast({
            title: `${formattedResults.length} Object(s) Detected`,
            description: `Using ${modelSource === "custom" ? "YOLOv12" : "default"} model`,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error detecting objects:", error);
      toast({
        title: "Detection Error",
        description: "An error occurred during object detection. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsDetecting(false);
    }
  };

  const drawBoundingBoxes = (objects: any[]) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    if (mode === "upload" && imageUrl) {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawBoxes();
      };
      img.src = imageUrl;
    } else {
      drawBoxes();
    }
    
    function drawBoxes() {
      objects.forEach(obj => {
        const { box, label, score } = obj;
        const x = box.xmin * canvas.width;
        const y = box.ymin * canvas.height;
        const width = (box.xmax - box.xmin) * canvas.width;
        const height = (box.ymax - box.ymin) * canvas.height;
        
        const hue = Math.floor(Math.random() * 360);
        ctx.strokeStyle = `hsl(${hue}, 100%, 40%)`;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);
        
        const labelWidth = ctx.measureText(`${label}: ${Math.round(score * 100)}%`).width + 10;
        ctx.fillStyle = `hsl(${hue}, 100%, 35%)`;
        ctx.fillRect(x, y - 30, labelWidth, 30);
        
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px Arial";
        ctx.fillText(`${label}: ${Math.round(score * 100)}%`, x + 5, y - 10);
        
        if (obj.segmentation && modelSource === "custom") {
          ctx.fillStyle = `hsla(${hue}, 100%, 40%, 0.3)`;
          ctx.beginPath();
          
          for (let i = 0; i < obj.segmentation.length; i++) {
            const [x, y] = obj.segmentation[i];
            if (i === 0) {
              ctx.moveTo(x * canvas.width, y * canvas.height);
            } else {
              ctx.lineTo(x * canvas.width, y * canvas.height);
            }
          }
          
          ctx.closePath();
          ctx.fill();
        }
        
        if (obj.keypoints && modelSource === "custom") {
          obj.keypoints.forEach((point: any) => {
            if (point.visibility && point.visibility > 0.5) {
              ctx.fillStyle = "#ffff00";
              ctx.beginPath();
              ctx.arc(
                point.x * canvas.width, 
                point.y * canvas.height, 
                5, 0, 2 * Math.PI
              );
              ctx.fill();
            }
          });
        }
      });
    }
  };

  const resetDetection = () => {
    setDetectedObjects([]);
    
    if (canvasRef.current && mode === "upload" && imageUrl) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = imageUrl;
      }
    }
  };

  const saveDetectionResult = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/jpeg");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "e-waste-detection.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const closeDetection = () => {
    stopWebcam();
    setImageUrl(null);
    setMode(null);
    setDetectedObjects([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gray-50 dark:bg-eco-green-medium/10 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-8 animate-in fade-in slide-in-from-top duration-500">
            <Maximize className="h-10 w-10 mr-3 text-gray-700 dark:text-gray-200" />
            <h1 className="text-3xl font-bold text-eco-green-dark dark:text-eco-green-light">
              E-Waste Object Detection
            </h1>
          </div>

          {isModelLoading ? (
            <div className="flex flex-col items-center justify-center p-10 bg-white dark:bg-eco-green-dark rounded-lg shadow-md animate-pulse">
              <RefreshCw className="h-16 w-16 text-eco-green-medium mb-4 animate-spin" />
              <p className="text-xl text-gray-700 dark:text-gray-200">
                Loading object detection model...
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                This may take a moment depending on your connection.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 animate-in fade-in slide-in-from-bottom duration-500">
                <div className="bg-white dark:bg-eco-green-dark/90 rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-medium text-eco-green-dark dark:text-white mb-2">
                    Model Selection
                  </h3>
                  <div className="flex items-center">
                    <button
                      onClick={toggleModelSource}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        modelSource === "default" 
                          ? "bg-eco-green-medium text-white" 
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
                      }`}
                    >
                      Default Model
                    </button>
                    <button
                      onClick={toggleModelSource}
                      className={`ml-3 px-4 py-2 rounded-md transition-colors ${
                        modelSource === "custom" 
                          ? "bg-eco-blue-dark text-white" 
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
                      }`}
                    >
                      Custom Model (best.pt)
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {modelSource === "default" 
                      ? "Using pre-trained Hugging Face model for general object detection." 
                      : "Using your custom-trained model for e-waste detection. Make sure you've placed your model in public/models/best_web_model/"}
                  </p>
                </div>
              </div>

              {!mode && (
                <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom duration-500">
                  <div 
                    className="bg-white dark:bg-eco-green-dark rounded-lg shadow-md p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={startWebcam}
                  >
                    <Camera className="h-20 w-20 text-eco-green-medium mb-4" />
                    <h2 className="text-xl font-semibold text-eco-green-dark dark:text-eco-green-light mb-2">
                      Use Webcam
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      Detect e-waste objects in real-time using your camera
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-eco-green-dark rounded-lg shadow-md p-8 flex flex-col items-center justify-center relative transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <Upload className="h-20 w-20 text-eco-blue-dark dark:text-eco-blue-light mb-4" />
                    <h2 className="text-xl font-semibold text-eco-green-dark dark:text-eco-green-light mb-2">
                      Upload Image
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      Upload an image to detect e-waste objects
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              )}
              
              {mode && (
                <div className="bg-white dark:bg-eco-green-dark rounded-lg shadow-md p-6 animate-in fade-in slide-in-from-bottom duration-500">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-eco-green-dark dark:text-eco-green-light">
                      {mode === "webcam" ? "Webcam Detection" : "Image Detection"}
                    </h2>
                    <button
                      onClick={closeDetection}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative">
                      {mode === "webcam" && (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full rounded-lg border border-gray-300 dark:border-eco-green-medium"
                        />
                      )}
                      
                      {mode === "upload" && imageUrl && (
                        <img
                          src={imageUrl}
                          alt="Uploaded"
                          className="w-full rounded-lg border border-gray-300 dark:border-eco-green-medium"
                        />
                      )}
                      
                      <canvas
                        ref={canvasRef}
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="mb-4 flex gap-2">
                        <button
                          onClick={detectObjects}
                          disabled={isDetecting}
                          className="flex-1 bg-eco-green-medium hover:bg-eco-green-dark text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isDetecting ? (
                            <>
                              <RefreshCw className="h-5 w-5 animate-spin" />
                              <span>Detecting...</span>
                            </>
                          ) : (
                            <>
                              <Camera className="h-5 w-5" />
                              <span>Detect Objects</span>
                            </>
                          )}
                        </button>
                        
                        {detectedObjects.length > 0 && (
                          <>
                            <button
                              onClick={resetDetection}
                              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white py-2 px-4 rounded-md transition-colors"
                            >
                              <RefreshCw className="h-5 w-5" />
                            </button>
                            
                            <button
                              onClick={saveDetectionResult}
                              className="bg-eco-blue-dark hover:bg-eco-blue-dark/80 text-white py-2 px-4 rounded-md transition-colors"
                            >
                              <Save className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                      
                      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-eco-green-dark/50 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-eco-green-dark dark:text-white mb-3">
                          Detected Objects ({detectedObjects.length})
                        </h3>
                        
                        {detectedObjects.length > 0 ? (
                          <div className="space-y-2">
                            {detectedObjects.map((obj, index) => (
                              <div
                                key={index}
                                className="bg-white dark:bg-eco-green-dark/80 rounded p-3 shadow-sm"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-eco-green-dark dark:text-eco-green-light">
                                    {obj.label}
                                  </span>
                                  <span className="text-sm bg-eco-green-medium/20 text-eco-green-dark dark:text-white px-2 py-1 rounded">
                                    {Math.round(obj.score * 100)}%
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  Location: x:{Math.round(obj.box.xmin * 100)}% y:{Math.round(obj.box.ymin * 100)}%
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No objects detected yet.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
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

export default ObjectDetection;
