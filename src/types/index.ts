
export interface Document {
  id: string;
  title: string;
  description: string;
  category: "e-waste" | "battery";
  fileUrl?: string; // Make fileUrl optional
  dateAdded: Date;
}

export interface DetectedObject {
  label: string;
  score: number;
  box: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
  segmentation?: number[][]; // Optional segmentation data for YOLOv12
  keypoints?: {x: number, y: number, visibility?: number}[]; // Optional keypoints data for YOLOv12
}

export interface DetectionResult {
  image: string; // Base64 encoded image with bounding boxes
  objects: DetectedObject[];
  modelInfo?: {
    name: string;
    version: string;
    type: string;
  };
}
