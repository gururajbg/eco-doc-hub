
export interface Document {
  id: string;
  title: string;
  category: "e-waste" | "battery";
  fileUrl: string;
  description?: string;
  dateAdded: Date;
}
