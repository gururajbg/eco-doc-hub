
export interface Document {
  id: string;
  title: string;
  description: string;
  category: "e-waste" | "battery";
  fileUrl: string;
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
}

export interface DetectionResult {
  image: string; // Base64 encoded image with bounding boxes
  objects: DetectedObject[];
}
