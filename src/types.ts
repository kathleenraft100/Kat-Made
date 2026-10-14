export type SpecimenCategory = 
  | "all" 
  | "hero" 
  | "secondary" 
  | "blender" 
  | "wild-micro";

export interface PatternSpecimen {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  collectionRole: string; // e.g. "Hypno Chrome Garden — Hero A"
  category: "hero" | "secondary" | "blender" | "wild-micro";
  categoryLabel: string;
  description: string;
  imageUrl: string;
  hexColors: string[];
  colorways: {
    name: string;
    filterCss: string;
    bgHex: string;
  }[];
  substrateRecommendations: string[];
  dimensions: string;
  patternType: "Straight, Half-Drop, and Half-Brick" | "Seamless Square Repeat" | "Radial Mural" | "Engineered Panel";
  displateUrl?: string;
  contradoUrl?: string;
  spoonflowerStatus?: string;
  accentVariant: "lime" | "pink" | "cyan" | "violet";
  tags: string[];
  generationDate: string;
  resolutionMaster: string;
}

export interface LookbookRoom {
  id: string;
  title: string;
  subtitle: string;
  spaceType: string;
  location: string;
  description: string;
  imageUrl: string;
  patternSpecimenId: string;
  patternName: string;
  substrate: string;
  architectureNotes: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  projectType: "residential-wallpaper" | "commercial-hospitality" | "textile-licensing" | "sample-kit" | "custom-mural";
  estimatedSqFt: string;
  substratePreference: "archival-metal" | "silk-chiffon" | "textured-vinyl-wallpaper" | "luxury-velvet" | "uncoated-paper";
  timeline: "urgent" | "standard" | "concept";
  notes: string;
}
