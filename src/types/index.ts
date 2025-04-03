export interface Document {
  id: string;
  title: string;
  description: string;
  category: "e-waste" | "battery";
  fileUrl: string;
  dateAdded: Date;
}
